/**
 * 一次性迁移：把原 derive 题库落盘到 bank/{domain}.js（不进生产 import）。
 * 用法：node scripts/migrate-quiz-dump.mjs
 *
 * 内嵌「允许填充」规范化，仅用于导出草稿；生产 schema 禁止填充。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const quizDir = path.join(root, 'src/data/quiz');
const bankDir = path.join(quizDir, 'bank');
const deriveDir = path.join(quizDir, 'derive');

const GENERIC_FILLERS = [
  '以上说法均不成立',
  '与题干无关，可直接排除',
  '仅在极端特例下成立，非通识答案',
  '表述过绝对，缺少必要边界条件',
];

function legacyNormalizeChoices(choices, extraFillers = []) {
  const raw = (Array.isArray(choices) ? choices : [])
    .map((c) => ({
      t: String(c?.t ?? c?.text ?? '').trim(),
      ok: Boolean(c?.ok),
      why: c?.why != null ? String(c.why) : '',
    }))
    .filter((c) => c.t);

  let correct = raw.filter((c) => c.ok);
  let wrong = raw.filter((c) => !c.ok);

  if (correct.length === 0 && raw.length) {
    raw[0].ok = true;
    correct = [raw[0]];
    wrong = raw.slice(1);
  } else if (correct.length > 1) {
    correct = [correct[0]];
    wrong = [
      ...wrong,
      ...raw
        .filter((c) => c.ok)
        .slice(1)
        .map((c) => ({ ...c, ok: false })),
    ];
  }

  const fillers = [...extraFillers, ...GENERIC_FILLERS].map((t) => String(t).trim()).filter(Boolean);
  const used = new Set([correct[0]?.t, ...wrong.map((w) => w.t)].filter(Boolean));
  let fi = 0;
  while (wrong.length < 3 && fi < fillers.length * 2) {
    const t = fillers[fi % fillers.length];
    fi += 1;
    if (!t || used.has(t)) continue;
    used.add(t);
    wrong.push({ t, ok: false, why: '干扰项。' });
  }
  while (wrong.length < 3) {
    const t = `干扰项 ${wrong.length + 1}：与正确概念不符`;
    if (used.has(t)) break;
    used.add(t);
    wrong.push({ t, ok: false, why: '干扰项。' });
  }

  const out = [correct[0], ...wrong.slice(0, 3)].filter(Boolean);
  while (out.length < 4) {
    out.push({ t: `干扰项 ${out.length}：表述不成立`, ok: false, why: '干扰项。' });
  }
  return out.slice(0, 4);
}

function unique(arr) {
  const out = [];
  const seen = new Set();
  for (const x of arr) {
    const s = String(x || '').trim();
    if (!s || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

function coerceQuestion(q) {
  if (!q?.id || !q?.q) return null;
  const choices = legacyNormalizeChoices(q.choices || []);
  if (!choices.some((c) => c.ok)) return null;
  return {
    id: String(q.id),
    q: String(q.q).trim(),
    choices,
    kind: q.kind || 'concept',
    domain: q.domain || 'lang',
    tags: unique(q.tags || []),
    relatedNodes: unique(q.relatedNodes || []).slice(0, 3),
    source: 'static',
    setId: q.setId || undefined,
    _origin: q.source || 'derive',
  };
}

function esc(s) {
  return JSON.stringify(s);
}

function renderQuestion(q) {
  const lines = [];
  lines.push('  {');
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
  if (q.relatedNodes?.length) lines.push(`    relatedNodes: ${esc(q.relatedNodes)},`);
  lines.push(`    source: 'static',`);
  if (q.setId) lines.push(`    setId: ${esc(q.setId)},`);
  lines.push('  }');
  return lines.join('\n');
}

function renderFile(domain, questions) {
  const body = questions.map(renderQuestion).join(',\n');
  return `/**
 * 静态题库 · ${domain}
 * 人工可审；勿在运行时再 derive。改题直接改本文件。
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
${body}
];
`;
}

async function loadDerive() {
  // derive 依赖生产 schema 的 normalizeQuestion（现已严格）——直接读模块导出的原始拼装较难。
  // 改为：动态 import 并 monkey 用 legacy：先 import 各 derive 源文件的逻辑不可行。
  // 做法：临时 patch — import derive 前注入 legacy normalize 到 schema？不可。
  // 改为内联调用：复制 derive 的 build 路径——import 现有 derive，它们会用 strict normalize 丢掉大量题。
  //
  // 解决：在 migrate 中直接 import 旧逻辑文件副本 _migrate/*.js
  // 更快：用 vite-node / 先写 _migrate 包装
  //
  // 最简：把 derive 改成导出「原始题」再在 migrate 里 legacyNormalize。
  // 检查 derive 是否在 normalize 前就有完整 choices……
  const { deriveGlossaryQuestions } = await import(
    pathToFileURL(path.join(deriveDir, 'glossary.js')).href
  );
  const { deriveLessonQuestions } = await import(
    pathToFileURL(path.join(deriveDir, 'lesson.js')).href
  );
  const { deriveNodeQuestions } = await import(
    pathToFileURL(path.join(deriveDir, 'node.js')).href
  );
  return {
    glossary: deriveGlossaryQuestions(),
    lesson: deriveLessonQuestions(),
    node: deriveNodeQuestions(),
  };
}

async function main() {
  const { listQuizSets } = await import(
    pathToFileURL(path.join(quizDir, 'index.js')).href
  );
  const curatedIds = new Set();
  for (const set of listQuizSets()) {
    for (const q of set.questions || []) curatedIds.add(q.id);
  }

  // derive 经 strict schema 会大幅缩水 —— 先恢复 migrate 专用 derive 入口
  // 见 _migrate/raw-derive.js
  const rawMod = await import(
    pathToFileURL(path.join(quizDir, '_migrate/raw-derive.js')).href
  );
  const rawList = [
    ...rawMod.rawGlossaryQuestions(),
    ...rawMod.rawLessonQuestions(),
    ...rawMod.rawNodeQuestions(),
  ];

  const byDomain = new Map();
  let kept = 0;
  let skippedCurated = 0;
  for (const raw of rawList) {
    if (!raw?.id) continue;
    if (curatedIds.has(raw.id)) {
      skippedCurated += 1;
      continue;
    }
    const q = coerceQuestion(raw);
    if (!q) continue;
    const dom = q.domain || 'lang';
    if (!byDomain.has(dom)) byDomain.set(dom, []);
    byDomain.get(dom).push(q);
    kept += 1;
  }

  fs.mkdirSync(bankDir, { recursive: true });
  const domains = ['dsa', 'net', 'os-db', 'lang', 'craft', 'xrk', 'ai', 'ops'];
  for (const d of domains) {
    const qs = byDomain.get(d) || [];
    qs.sort((a, b) => String(a.id).localeCompare(String(b.id)));
    fs.writeFileSync(path.join(bankDir, `${d}.js`), renderFile(d, qs), 'utf8');
    console.log(`[dump] ${d}: ${qs.length}`);
  }

  // index re-export
  fs.writeFileSync(
    path.join(bankDir, 'index.js'),
    `/**
 * 静态题库分片汇总（生产 bank.js 只读这里）
 */
import { QUESTIONS as dsa } from './dsa.js';
import { QUESTIONS as net } from './net.js';
import { QUESTIONS as osDb } from './os-db.js';
import { QUESTIONS as lang } from './lang.js';
import { QUESTIONS as craft } from './craft.js';
import { QUESTIONS as xrk } from './xrk.js';
import { QUESTIONS as ai } from './ai.js';
import { QUESTIONS as ops } from './ops.js';

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
];
`,
    'utf8'
  );

  console.log(`[dump] total static ${kept}, skipped curated overlap ${skippedCurated}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
