/**
 * 将手写课核清单落盘到 bank/{domain}.js（无自动水题）。
 * 真源：scripts/handcraft-cores.mjs
 * 用法：node scripts/rewrite-bank-beginner.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CORES } from './handcraft-cores.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const bankDir = path.join(root, 'src/data/quiz/bank');
const DOMAINS = ['dsa', 'net', 'os-db', 'lang', 'craft', 'xrk', 'ai', 'ops'];

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
    lines.push(`      { t: ${esc(c.t)}, ok: ${c.ok ? 'true' : 'false'}${why} },`);
  }
  lines.push('    ],');
  lines.push(`    kind: ${esc(q.kind)},`);
  lines.push(`    domain: ${esc(q.domain)},`);
  if (q.tags?.length) lines.push(`    tags: ${esc(q.tags)},`);
  if (q.relatedNodes?.length) {
    lines.push(`    relatedNodes: ${esc(q.relatedNodes)},`);
  }
  lines.push(`    source: 'static',`);
  lines.push('  }');
  return lines.join('\n');
}

function renderFile(domain, questions) {
  const body = questions.map(renderQuestion).join(',\n');
  return `/**
 * 静态题库 · ${domain}
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
${body}
];
`;
}

function renderIndex() {
  return `/**
 * 静态题库分片汇总（生产 bank.js 只读这里）
 *
 * adapted-* 真源仍在本目录，经 \`pnpm quiz:sync-sets\` 生成 sets/ 后由 REGISTRY 入库；
 * 勿再 spread 进 STATIC_QUESTIONS，避免与精选题组双计。
 * guo-* 除 obs 外多为笔记 dump（表格/代码块/框线），REGISTRY 暂不收录，待 scrub 成短选项。
 */
import { QUESTIONS as dsa } from './dsa.js';
import { QUESTIONS as net } from './net.js';
import { QUESTIONS as osDb } from './os-db.js';
import { QUESTIONS as lang } from './lang.js';
import { QUESTIONS as craft } from './craft.js';
import { QUESTIONS as xrk } from './xrk.js';
import { QUESTIONS as ai } from './ai.js';
import { QUESTIONS as ops } from './ops.js';
import { QUESTIONS as glossary } from './glossary.js';

/** @type {import('../schema.js').QuizQuestion[]} */
export const STATIC_QUESTIONS = [
  ...dsa,
  ...net,
  ...osDb,
  ...lang,
  ...craft,
  ...xrk,
  ...ai,
  ...ops,
  ...glossary,
];
`;
}

function main() {
  /** @type {Map<string, import('../src/data/quiz/schema.js').QuizQuestion[]>} */
  const byDomain = new Map(DOMAINS.map((d) => [d, []]));
  const seenId = new Set();

  for (const item of CORES) {
    if (!DOMAINS.includes(item.domain)) {
      throw new Error(`unknown domain: ${item.domain} (${item.id})`);
    }
    if (seenId.has(item.id)) throw new Error(`duplicate id: ${item.id}`);
    seenId.add(item.id);
    if (!item.nodes?.length) throw new Error(`no nodes: ${item.id}`);
    if (!item.wrong || item.wrong.length !== 3) {
      throw new Error(`need 3 wrongs: ${item.id}`);
    }

    const choices = [
      { t: item.ok, ok: true, why: item.whyOk },
      ...item.wrong.map(([t, why]) => ({ t, ok: false, why })),
    ];
    if (choices.length !== 4 || !choices[0].ok) {
      throw new Error(`bad choices: ${item.id}`);
    }

    byDomain.get(item.domain).push({
      id: `s:${item.id}:core`,
      q: item.q,
      choices,
      kind: 'concept',
      domain: item.domain,
      tags: ['场景', '课核'],
      relatedNodes: item.nodes,
      source: 'static',
    });
  }

  fs.mkdirSync(bankDir, { recursive: true });
  let total = 0;
  for (const d of DOMAINS) {
    const qs = (byDomain.get(d) || []).sort((a, b) =>
      String(a.id).localeCompare(String(b.id))
    );
    fs.writeFileSync(path.join(bankDir, `${d}.js`), renderFile(d, qs), 'utf8');
    total += qs.length;
    console.log(`${d}: ${qs.length}`);
  }
  fs.writeFileSync(path.join(bankDir, 'index.js'), renderIndex(), 'utf8');

  const nodeCover = new Set(CORES.flatMap((c) => c.nodes));
  console.log(
    `total cores: ${total}, node coverage: ${nodeCover.size}, source items: ${CORES.length}`
  );
}

main();
