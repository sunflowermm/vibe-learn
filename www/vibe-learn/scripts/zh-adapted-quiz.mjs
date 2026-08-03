/**
 * 把改编题库里的英文题译成中文，并按导图新节点重绑 relatedNodes。
 * 代理：HTTP_PROXY=http://127.0.0.1:7890
 * pnpm run quiz:zh
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ProxyAgent, fetch as ufetch } from 'undici';
import { inferRelated } from './lib/infer-related.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bankDir = path.join(root, 'src/data/quiz/bank');
const setsDir = path.join(root, 'src/data/quiz/sets');
const PROXY =
  process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY || '';

const cache = new Map();
const dispatcher = PROXY ? new ProxyAgent(PROXY) : undefined;

function needsZh(s) {
  const t = String(s || '');
  if (!t.trim()) return false;
  const han = (t.match(/[\u4e00-\u9fff]/g) || []).length;
  const lat = (t.match(/[A-Za-z]/g) || []).length;
  if (lat < 8) return false;
  return han * 2 < lat;
}

function polishZh(s) {
  return String(s || '')
    .replace(/\bRAG\b/g, 'RAG')
    .replace(/检索增强生成（RAG）（RAG）/g, '检索增强生成（RAG）')
    .replace(/大语言模型（LLM）/g, '大语言模型（LLM）')
    .replace(/嵌入嵌入/g, '嵌入')
    .replace(/微 调/g, '微调')
    .replace(/令 牌/g, '令牌')
    .trim();
}

async function translateOne(text) {
  const raw = String(text || '');
  if (!needsZh(raw)) return raw;
  if (cache.has(raw)) return cache.get(raw);
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=' +
    encodeURIComponent(raw.slice(0, 4500));
  const opts = { signal: AbortSignal.timeout(45000), headers: { 'User-Agent': 'vibe-learn-zh' } };
  if (dispatcher) opts.dispatcher = dispatcher;
  const res = await ufetch(url, opts);
  if (!res.ok) throw new Error(`translate ${res.status}`);
  const j = await res.json();
  const out = polishZh((j[0] || []).map((x) => x[0]).join(''));
  cache.set(raw, out || raw);
  return cache.get(raw);
}

async function translateQuestion(q) {
  const next = { ...q };
  next.q = await translateOne(q.q);
  next.choices = [];
  for (const c of q.choices || []) {
    next.choices.push({
      ...c,
      t: await translateOne(c.t),
      why: await translateOne(c.why || ''),
    });
  }
  const hay = [next.q, ...(next.choices || []).map((c) => c.t)].join(' ');
  next.relatedNodes = inferRelated(hay);
  return next;
}

function esc(s) {
  return JSON.stringify(s);
}

function emitSetFile(setMeta, questions) {
  const lines = [];
  lines.push(`import { defineQuizSet } from '../schema.js';`);
  lines.push('');
  lines.push(`/**`);
  lines.push(` * 系统非原创：面向 AI 全栈工程师的开源面经改编（中文）。`);
  lines.push(` * 来源：${setMeta.attribution}`);
  lines.push(` * ${setMeta.attributionUrl}`);
  lines.push(` */`);
  lines.push(`export default defineQuizSet({`);
  lines.push(`  id: ${esc(setMeta.id)},`);
  lines.push(`  title: ${esc(setMeta.title)},`);
  lines.push(`  kind: ${esc(setMeta.kind)},`);
  lines.push(`  domain: ${esc(setMeta.domain)},`);
  lines.push(`  tags: ${esc(setMeta.tags)},`);
  lines.push(`  relatedNodes: ${esc(setMeta.relatedNodes)},`);
  lines.push(`  caption: ${esc(setMeta.caption)},`);
  lines.push(`  origin: 'adapted',`);
  lines.push(`  attribution: ${esc(setMeta.attribution)},`);
  lines.push(`  attributionUrl: ${esc(setMeta.attributionUrl)},`);
  lines.push(`  questions: [`);
  for (const q of questions) {
    lines.push(`    {`);
    lines.push(`      id: ${esc(q.id)},`);
    lines.push(`      q: ${esc(q.q)},`);
    lines.push(`      choices: [`);
    for (const c of q.choices) {
      lines.push(
        `        { t: ${esc(c.t)}, ok: ${Boolean(c.ok)}, why: ${esc(c.why || '')} },`
      );
    }
    lines.push(`      ],`);
    lines.push(`      relatedNodes: ${esc(q.relatedNodes || [])},`);
    lines.push(`      origin: 'adapted',`);
    lines.push(`      attribution: ${esc(setMeta.attribution)},`);
    lines.push(`      attributionUrl: ${esc(setMeta.attributionUrl)},`);
    lines.push(`    },`);
  }
  lines.push(`  ],`);
  lines.push(`});`);
  lines.push('');
  return lines.join('\n');
}

function emitBankShard(questions, setMeta) {
  const rows = questions.map((q) => ({
    id: q.id,
    q: q.q,
    choices: q.choices,
    kind: setMeta.kind,
    domain: setMeta.domain,
    tags: [...new Set([...(setMeta.tags || []), '系统非原创', 'adapted', 'AI全栈', '中文'])],
    relatedNodes: q.relatedNodes || setMeta.relatedNodes,
    source: 'adapted',
    origin: 'adapted',
    attribution: setMeta.attribution,
    attributionUrl: setMeta.attributionUrl,
    setId: setMeta.id,
  }));
  return `/**
 * 改编题库 · ${setMeta.id}
 * 系统非原创 · AI 全栈向 · 中文 · ${setMeta.attribution}
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = ${JSON.stringify(rows, null, 2)};
`;
}

async function mapPool(items, concurrency, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i;
      i += 1;
      out[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return out;
}

async function main() {
  const bankFiles = fs
    .readdirSync(bankDir)
    .filter((n) => n.startsWith('adapted-') && n.endsWith('.js'));
  /** @type {Map<string, { meta: object, questions: object[] }>} */
  const bySet = new Map();
  let translated = 0;

  for (const name of bankFiles) {
    const mod = await import(pathToFileURL(path.join(bankDir, name)).href + `?t=${Date.now()}`);
    const list = mod.QUESTIONS || [];
    if (!list.length) continue;
    process.stdout.write(`${name} (${list.length}) … `);
    const zhList = await mapPool(list, 4, async (q) => {
      const before = needsZh(q.q) || (q.choices || []).some((c) => needsZh(c.t) || needsZh(c.why));
      const next = await translateQuestion(q);
      if (before) translated += 1;
      return next;
    });
    console.log('ok');

    const setId = list[0].setId || name.replace(/\.js$/, '');
    const setMeta = {
      id: setId,
      title: String(list[0].tags?.[0] ? `开源改编 · ${list[0].tags[0]}` : setId),
      kind: list[0].kind || 'interview',
      domain: list[0].domain || 'ai',
      tags: list[0].tags || ['AI全栈'],
      relatedNodes: [
        ...new Set(zhList.flatMap((q) => q.relatedNodes || [])),
      ].slice(0, 3),
      caption: `系统非原创 · AI 全栈向 · 中文改编 · ${list[0].attribution || ''}`,
      attribution: list[0].attribution || '',
      attributionUrl: list[0].attributionUrl || '',
    };

    // 尽量保留原 set 标题
    const setPath = path.join(setsDir, `${setId}.js`);
    if (fs.existsSync(setPath)) {
      try {
        const setMod = await import(pathToFileURL(setPath).href + `?t=${Date.now()}`);
        const s = setMod.default;
        if (s?.title) setMeta.title = await translateOne(s.title);
        if (s?.caption) setMeta.caption = await translateOne(s.caption);
        if (s?.tags) setMeta.tags = s.tags;
        if (s?.kind) setMeta.kind = s.kind;
        if (s?.domain) setMeta.domain = s.domain;
      } catch {
        /* ignore */
      }
    }

    bySet.set(setId, { meta: setMeta, questions: zhList });
    fs.writeFileSync(
      path.join(bankDir, name),
      emitBankShard(zhList, setMeta),
      'utf8'
    );
  }

  for (const { meta, questions } of bySet.values()) {
    fs.writeFileSync(path.join(setsDir, `${meta.id}.js`), emitSetFile(meta, questions), 'utf8');
  }

  console.log(`done · sets ${bySet.size} · questions-translated ${translated} · cache ${cache.size}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
