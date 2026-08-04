/**
 * 从词典生成名词选择题（静态落盘）。
 *
 * 名词→释义：选项只显示释义正文（剥掉词条名前缀），作答后用 reveal 揭晓名词。
 * 释义→名词：选项显示名词，作答后 reveal 揭晓释义摘要。
 *
 * node scripts/rewrite-glossary-bank.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { normalizeChoices, shuffleCopy } from '../src/data/quiz/schema.js';
import { inferDomain } from '../src/data/quiz/derive/infer-domain.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outFile = path.join(root, 'src/data/quiz/bank/glossary.js');

/**
 * @param {string} term
 * @returns {string[]}
 */
function termAliases(term) {
  const t = String(term || '').trim();
  const out = new Set();
  if (t) out.add(t);
  const m = t.match(/^(.+?)\s*[（(]([^）)]+)[）)]\s*$/);
  if (m) {
    out.add(m[1].trim());
    out.add(m[2].trim());
    for (const part of m[2].split(/[/／、,，;；]/)) {
      const p = part.trim();
      if (p.length >= 2) out.add(p);
    }
  }
  // 「A2A / ACP」→ 也认无空格形态，便于泄漏检测
  if (t.includes('/')) {
    out.add(t.replace(/\s*\/\s*/g, '/'));
    out.add(t.replace(/\s*\/\s*/g, ' / '));
  }
  return [...out].filter(Boolean).sort((a, b) => b.length - a.length);
}

/** @param {string} s */
function normKey(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s+/g, '');
}

/** 英文冒号若属 URL scheme / 权威分隔，不可当「标签头」剥掉 */
function startsWithUrlScheme(s) {
  return /^(?:https?|ftp|wss?):\/\//i.test(String(s || ''));
}

/**
 * 剥掉释义开头的「词条名：」/「English（中文）：」泄漏，避免题干/选项剧透。
 * 只剥真正的词条标签头；勿把正文里的「例：」「http://」「::1」等当成标签。
 * @param {string} brief
 * @param {string} term
 */
function definitionBody(brief, term) {
  let s = String(brief || '')
    .replace(/\s+/g, ' ')
    .trim();

  for (let i = 0; i < 2; i += 1) {
    const before = s;
    if (startsWithUrlScheme(s)) break;

    // 词条别名 + 可选括号说明 + 冒号（冒号后空白可选：词典常见「）：正文」）
    for (const a of termAliases(term)) {
      const esc = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(
        `^${esc}(?:\\s*[（(][^）)]{0,80}[）)])?\\s*[：:]\\s*`,
        'i'
      );
      if (re.test(s)) {
        s = s.replace(re, '');
        break;
      }
      // VibeHub 常见：「Vibe Coding 就是…」「Token 是…」无冒号标签
      const reLead = new RegExp(
        `^${esc}(?:\\s*[（(][^）)]{0,40}[）)])?\\s*(?:就是|是指|指的是|指|为|即)\\s*`,
        'i'
      );
      if (reLead.test(s)) {
        s = s.replace(reLead, '');
        break;
      }
    }
    if (s !== before) continue;
    if (startsWithUrlScheme(s)) break;

    // 「English Name（中文/缩写）：」—— 排除 https:// 这类 scheme
    const engLabeled = s.match(
      /^([A-Za-z][\w\s./+-]{0,80}(?:\s*[（(][^）)]{0,80}[）)])?)\s*[：:]\s*/
    );
    if (
      engLabeled &&
      !/^(?:https?|ftp|wss?)$/i.test(engLabeled[1].trim()) &&
      !startsWithUrlScheme(engLabeled[0])
    ) {
      s = s.slice(engLabeled[0].length);
      continue;
    }

    // 「中文名：」短标签；只用中文冒号，且标签头不含句读，避免扫到「例：」或「…（如 http:」
    const zhLabeled = s.match(
      /^(?:[\u4e00-\u9fff][^\s：。；，]{0,15}|[\u4e00-\u9fff][^：。；，]{0,12})：\s*/
    );
    if (zhLabeled && !/[A-Za-z]{3,}/.test(zhLabeled[0])) {
      s = s.slice(zhLabeled[0].length);
      continue;
    }

    // 「Authorization header：」/「TCP 80：」等短英文标签（仍排除 URL scheme）
    const shortEng = s.match(/^([A-Za-z][\w\s./+-]{0,40})\s*[：:]\s*/);
    if (
      shortEng &&
      !/^(?:https?|ftp|wss?)$/i.test(shortEng[1].trim()) &&
      !startsWithUrlScheme(shortEng[0])
    ) {
      s = s.slice(shortEng[0].length);
    }

    if (s === before) break;
  }

  return s.trim();
}

/**
 * @param {string} brief
 * @param {number} max
 */
function clipBrief(brief, max = 140) {
  const s = String(brief || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (s.length <= max) return s;
  const slice = s.slice(0, max);
  const cut = Math.max(
    slice.lastIndexOf('。'),
    slice.lastIndexOf('；'),
    slice.lastIndexOf('，')
  );
  if (cut > 40) {
    const ch = slice[cut];
    return `${slice.slice(0, cut + (ch === '。' || ch === '；' ? 1 : 0)).trim()}${ch === '，' ? '…' : ''}`;
  }
  return `${slice.trim()}…`;
}

function esc(s) {
  return JSON.stringify(s);
}

function renderQuestion(q) {
  const lines = ['  {'];
  lines.push(`    id: ${esc(q.id)},`);
  lines.push(`    q: ${esc(q.q)},`);
  lines.push('    choices: [');
  for (const c of q.choices) {
    const why = c.why ? `, why: ${esc(c.why)}` : '';
    const reveal = c.reveal ? `, reveal: ${esc(c.reveal)}` : '';
    lines.push(
      `      { t: ${esc(c.t)}, ok: ${c.ok ? 'true' : 'false'}${why}${reveal} },`
    );
  }
  lines.push('    ],');
  lines.push(`    kind: ${esc(q.kind)},`);
  lines.push(`    domain: ${esc(q.domain)},`);
  if (q.tags?.length) lines.push(`    tags: ${esc(q.tags)},`);
  if (q.relatedNodes?.length) lines.push(`    relatedNodes: ${esc(q.relatedNodes)},`);
  lines.push(`    source: 'static',`);
  lines.push('  }');
  return lines.join('\n');
}

/**
 * 从释义正文抹掉目标词别名，避免选项剧透（如 AGENTS.md 定义里出现 docs/agents.md）。
 * @param {string} body
 * @param {string} term
 */
function scrubTermMentions(body, term) {
  let s = String(body || '');
  for (const a of termAliases(term)) {
    if (a.length < 2) continue;
    const esc = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (/^[A-Za-z0-9][A-Za-z0-9+._-]*$/.test(a) && a.length <= 4) {
      s = s.replace(
        new RegExp(`(?:^|[^A-Za-z0-9])(${esc})(?=[^A-Za-z0-9]|$)`, 'gi'),
        (m, g1) => m.replace(g1, '该概念')
      );
    } else {
      s = s.replace(new RegExp(esc, 'gi'), '该概念');
    }
  }
  return s.replace(/\s+/g, ' ').trim();
}

/**
 * 题干/选项是否仍剧透目标词（前缀标签或正文点名）
 * @param {string} text
 * @param {string} term
 */
function leaksTerm(text, term) {
  const t = String(text || '').trim();
  if (!t) return true;
  if (startsWithUrlScheme(t)) return false;

  // 仍以「词条别名：」开头
  for (const a of termAliases(term)) {
    const esc = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (
      new RegExp(
        `^${esc}(?:\\s*[（(][^）)]{0,80}[）)])?\\s*[：:]`,
        'i'
      ).test(t)
    ) {
      return true;
    }
  }

  // 仍以短英文标签头开头（排除 https://）；勿把正文里的「例：」算泄漏
  const lead = t.match(
    /^([A-Za-z][\w\s./+-]{0,40}(?:\s*[（(][^）)]{0,40}[）)])?)\s*[：:]/
  );
  if (lead && !/^(?:https?|ftp|wss?)$/i.test(lead[1].trim())) {
    return true;
  }

  return termAliases(term).some((a) => aliasMentions(t, a));
}

/**
 * 正文是否点名该别名。短拉丁缩写用边界，避免 "AI" 误伤 "training"。
 * @param {string} text
 * @param {string} alias
 */
function aliasMentions(text, alias) {
  const a = String(alias || '').trim();
  if (a.length < 2) return false;
  // 纯拉丁短缩写：词界匹配
  if (/^[A-Za-z0-9][A-Za-z0-9+._-]*$/.test(a) && a.length <= 4) {
    const esc = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(?:^|[^A-Za-z0-9])${esc}(?:[^A-Za-z0-9]|$)`, 'i').test(
      text
    );
  }
  return normKey(text).includes(normKey(a));
}

async function main() {
  const { listGlossary } = await import(
    pathToFileURL(path.join(root, 'src/data/glossary.js')).href
  );
  const { getNodeById } = await import(
    pathToFileURL(path.join(root, 'src/data/nodes.js')).href
  );
  const { NODE_TERMS } = await import(
    pathToFileURL(path.join(root, 'src/data/terms-by-node.js')).href
  );

  /** 反查：哪些课挂了该词典 id（补 relatedNodes，让面板「刷本课相关题」能吃到词典题） */
  function nodesForGlossaryId(gid) {
    /** @type {string[]} */
    const out = [];
    for (const [nid, ids] of Object.entries(NODE_TERMS || {})) {
      if (Array.isArray(ids) && ids.includes(gid)) out.push(nid);
    }
    return out;
  }

  const VALID_DOMAINS = new Set([
    'dsa',
    'net',
    'os-db',
    'lang',
    'craft',
    'xrk',
    'ai',
    'ops',
    'vibe',
  ]);

  const all = listGlossary().filter((e) => e.term && e.brief && e.brief.length >= 16);
  /** @type {object[]} */
  const out = [];
  let skippedLeak = 0;

  for (const e of all) {
    const related = [
      ...new Set([...(e.also || []), ...nodesForGlossaryId(e.id)]),
    ]
      .filter((id) => getNodeById(id))
      .slice(0, 4);
    const domain =
      (typeof e.domain === 'string' && VALID_DOMAINS.has(e.domain) && e.domain) ||
      inferDomain(related[0] || e.id, e.term);
    const others = shuffleCopy(all.filter((x) => x.id !== e.id));
    const level =
      e.brief.length > 90 || /架构|协议|事务|并发|隔离/.test(e.brief)
        ? '进阶'
        : '零基础';
    const tags = ['名词', level, e.id];
    const correctDefRaw = clipBrief(definitionBody(e.brief, e.term), 140);
    const correctDef = scrubTermMentions(correctDefRaw, e.term);
    if (correctDef.length < 12) continue;
    // 剥过头：只剩 URL 碎片 / 纯路径，不能当「释义」选项
    if (
      /^\/\//.test(correctDef) ||
      startsWithUrlScheme(correctDef) ||
      /^[\w./:?&=%#@+-]+$/.test(correctDef)
    ) {
      skippedLeak += 1;
      continue;
    }

    // ① 名词 → 释义：只显示释义；作答后 reveal = 名词
    const wrongDefs = [];
    const seenB = new Set([correctDef]);
    for (const o of others) {
      const body = scrubTermMentions(
        clipBrief(definitionBody(o.brief, o.term), 140),
        o.term
      );
      if (body.length < 12 || seenB.has(body)) continue;
      if (
        /^\/\//.test(body) ||
        startsWithUrlScheme(body) ||
        /^[\w./:?&=%#@+-]+$/.test(body)
      ) {
        continue;
      }
      if (leaksTerm(body, e.term) || leaksTerm(body, o.term)) continue;
      seenB.add(body);
      wrongDefs.push({ entry: o, body });
      if (wrongDefs.length >= 3) break;
    }
    if (
      wrongDefs.length === 3 &&
      !leaksTerm(correctDef, e.term) &&
      correctDef.length >= 12
    ) {
      const choices = normalizeChoices([
        {
          t: correctDef,
          ok: true,
          reveal: e.term,
          why: `正确。这正是「${e.term}」的释义。`,
        },
        ...wrongDefs.map(({ entry, body }) => ({
          t: body,
          ok: false,
          reveal: entry.term,
          why: `这段释义对应的名词是「${entry.term}」，不是「${e.term}」。`,
        })),
      ]);
      if (choices) {
        out.push({
          id: `g:${e.id}:def`,
          q: `下列哪一项最准确解释「${e.term}」？（先看释义再选，作答后会揭晓各选项对应的名词）`,
          choices,
          kind: 'concept',
          domain,
          tags,
          relatedNodes: related,
          source: 'static',
        });
      }
    } else {
      skippedLeak += 1;
    }

    // ② 释义 → 名词：选项是名词；作答后 reveal = 释义摘要
    const wrongTerms = [];
    const seenT = new Set([e.term]);
    for (const o of others) {
      if (!o.term || seenT.has(o.term)) continue;
      seenT.add(o.term);
      wrongTerms.push(o);
      if (wrongTerms.length >= 3) break;
    }
    if (wrongTerms.length === 3) {
      const stemDef = clipBrief(correctDef, 160);
      // 释义→名词：题干绝不能再含词条名 / 「英文名：」标签
      if (stemDef.length >= 12 && !leaksTerm(stemDef, e.term)) {
        const choices = normalizeChoices([
          {
            t: e.term,
            ok: true,
            reveal: stemDef,
            why: `正确。这段话描述的是「${e.term}」。`,
          },
          ...wrongTerms.map((o) => ({
            t: o.term,
            ok: false,
            reveal: clipBrief(definitionBody(o.brief, o.term), 100),
            why: `你选的是「${o.term}」；这段释义对应的名词是「${e.term}」。`,
          })),
        ]);
        if (choices) {
          out.push({
            id: `g:${e.id}:term`,
            q: `读完下面这段释义，它描述的是哪一个名词？\n「${stemDef}」`,
            choices,
            kind: 'concept',
            domain,
            tags,
            relatedNodes: related,
            source: 'static',
          });
        }
      } else {
        skippedLeak += 1;
      }
    }
  }

  out.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const body = out.map(renderQuestion).join(',\n');
  const file = `/**
 * 静态题库 · 名词释义（可人工审改）
 * 答题时不剧透词条名；作答后用 choice.reveal 揭晓。
 * 重新生成：node scripts/rewrite-glossary-bank.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
${body}
];
`;
  fs.writeFileSync(outFile, file, 'utf8');
  console.log(
    `[glossary-bank] wrote ${out.length} questions (skip weak/leak ${skippedLeak}) → bank/glossary.js`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
