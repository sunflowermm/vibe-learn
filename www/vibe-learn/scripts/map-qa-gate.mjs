/**
 * 导图质检闸门：薄课 / 无验收 / 断边死链 / 布局重叠 / 题库挂鉤 / 桥死链
 * node scripts/map-qa-gate.mjs
 * 失败 exit 1
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readdirSync, readFileSync } from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const toUrl = (p) => pathToFileURL(path.join(root, p)).href;

const fails = [];
const warns = [];

function fail(msg) {
  fails.push(msg);
}
function warn(msg) {
  warns.push(msg);
}

/* —— 1. layout 导入（章内卡 + 章框重叠断言） —— */
try {
  await import(toUrl('src/data/layout.js'));
} catch (e) {
  fail(`layout import: ${e.message || e}`);
}

/* —— 2. 课体：薄课 / 无验收 / 截断 —— */
const lessonsDir = path.join(root, 'src/data/lessons');
const fenceRe = /(?:\\`\\`\\`|```)([a-zA-Z][\w-]*)/g;
const ACCEPT_RE = /学会之后|## 本仓怎么做|```check/;
const THIN = 1800;

function extractBody(src) {
  const m = src.match(/export default `([\s\S]*)`\s*;?\s*$/);
  return m ? m[1] : src;
}

const lessonFiles = readdirSync(lessonsDir).filter((f) => f.endsWith('.js'));
const thinLessons = [];
const noAccept = [];
const truncated = [];

for (const f of lessonFiles) {
  const id = f.replace(/\.js$/, '');
  if (id.startsWith('chapter-')) continue;
  const src = readFileSync(path.join(lessonsDir, f), 'utf8');
  const body = extractBody(src);
  if (body.length < THIN) thinLessons.push({ id, chars: body.length });
  if (!ACCEPT_RE.test(body)) noAccept.push(id);
  /* 显式截断标记；文中「MongoDB…」类省略号不算 */
  if (/TODO_LESSON|未完待续/.test(body)) {
    truncated.push(id);
  }
  void fenceRe;
}

if (noAccept.length) fail(`无验收段 ${noAccept.length}: ${noAccept.slice(0, 12).join(', ')}`);
if (truncated.length) fail(`疑似截断 ${truncated.length}: ${truncated.join(', ')}`);
if (thinLessons.length > 40) {
  warn(`薄课(<${THIN}) ${thinLessons.length}（仅告警）`);
}

/* —— 3. 边：孤立 / 反向先修 / 同章短环 —— */
const { knowledgeNodes, knowledgeEdges } = await import(toUrl('src/data/nodes.js'));
const topicIds = new Set(knowledgeNodes.map((n) => n.id));
const byId = new Map(knowledgeNodes.map((n) => [n.id, n]));
const deg = new Map();
const adj = new Map();
for (const id of topicIds) {
  deg.set(id, { in: 0, out: 0 });
  adj.set(id, []);
}
for (const e of knowledgeEdges) {
  if (!topicIds.has(e.source) || !topicIds.has(e.target)) continue;
  deg.get(e.source).out += 1;
  deg.get(e.target).in += 1;
  adj.get(e.source).push(e.target);
}
const isolated = [...topicIds].filter(
  (id) => deg.get(id).in + deg.get(id).out === 0
);
if (isolated.length) fail(`孤立 topic: ${isolated.join(', ')}`);

const reverse = [];
for (const n of knowledgeNodes) {
  for (const p of n.prereqs || []) {
    const pid = typeof p === 'string' ? p : p.id;
    if (!pid || !topicIds.has(pid)) continue;
    if (knowledgeEdges.some((e) => e.source === n.id && e.target === pid)) {
      reverse.push(`${n.id}→${pid}`);
    }
  }
}
if (reverse.length) fail(`反向先修边: ${reverse.slice(0, 10).join('; ')}`);

{
  const color = new Map();
  const stack = [];
  const short = [];
  function dfs(u) {
    color.set(u, 1);
    stack.push(u);
    for (const v of adj.get(u) || []) {
      const c = color.get(v) || 0;
      if (c === 1) {
        const i = stack.indexOf(v);
        const cyc = stack.slice(i).concat(v);
        const parents = new Set(
          cyc.slice(0, -1).map((id) => byId.get(id)?.parentId)
        );
        if (parents.size === 1 && cyc.length <= 6) short.push(cyc.join('→'));
      } else if (c === 0) dfs(v);
    }
    stack.pop();
    color.set(u, 2);
  }
  for (const id of topicIds) if ((color.get(id) || 0) === 0) dfs(id);
  if (short.length) fail(`同章短环: ${[...new Set(short)].slice(0, 5).join(' | ')}`);
}

/* —— 4. 桥死链 —— */
const bridges = await import(toUrl('src/data/map-bridges.js'));
const pack = await import(toUrl('src/data/vibehub/graph-pack.js'));
const cardIds = new Set(pack.VIBEHUB_TERM_CARDS.map((c) => c.id));
const frameIds = new Set(pack.VIBEHUB_MACRO_FRAMES.map((f) => f.id));
frameIds.add(pack.VIBE_HUB_ID);
const deadBridges = [];
for (const n of knowledgeNodes) {
  for (const l of bridges.bridgesForKnowledge(n.id)) {
    if (!cardIds.has(l.id) && !frameIds.has(l.id)) {
      deadBridges.push(`${n.id}→${l.id}`);
    }
  }
}
if (deadBridges.length) fail(`桥死链 ${deadBridges.length}: ${deadBridges.slice(0, 8).join('; ')}`);

/* —— 5. glossary / NODE_TERMS —— */
const { GLOSSARY, resolveGlossary, VIBEHUB_GLOSSARY_MERGE } = await import(
  toUrl('src/data/glossary.js')
);
void VIBEHUB_GLOSSARY_MERGE;
const { NODE_TERMS } = await import(toUrl('src/data/terms-by-node.js'));
const missingTerms = [];
const missingGloss = [];
for (const n of knowledgeNodes) {
  if (n.kind === 'chapter') continue;
  const ids = NODE_TERMS[n.id];
  if (!ids?.length) missingTerms.push(n.id);
  else {
    for (const id of ids) {
      if (!resolveGlossary([id]).length) missingGloss.push(`${n.id}:${id}`);
    }
  }
}
if (missingTerms.length) fail(`无 NODE_TERMS: ${missingTerms.join(', ')}`);
if (missingGloss.length) fail(`词典缺键: ${missingGloss.slice(0, 10).join('; ')}`);

/* —— 6. 题库挂鉤 —— */
const bank = await import(toUrl('src/data/quiz/bank.js'));
const quizThin = [];
for (const n of knowledgeNodes) {
  if (n.kind === 'chapter') continue;
  const c = bank.quizTopicQuestionCount(n.id);
  if (c < 3) quizThin.push(`${n.id}=${c}`);
}
if (quizThin.length) fail(`题库不足(<3): ${quizThin.slice(0, 15).join('; ')}`);

/* —— 7. 导图2 缺 api / 内链 —— */
if (!pack.VIBEHUB_TERM_CARDS.some((c) => c.id === 'vh-api')) {
  fail('导图2 缺少 vh-api');
}

const dump = {
  generatedAt: new Date().toISOString(),
  ok: fails.length === 0,
  fails,
  warns,
  thinLessonCount: thinLessons.length,
  thinSample: thinLessons.slice(0, 10),
  quizTotal: bank.quizQuestionCount(),
  map2Cards: pack.VIBEHUB_TERM_CARDS.length,
  glossaryKeys: Object.keys(GLOSSARY).length,
};

fs.writeFileSync(
  path.join(root, 'scripts/_map-qa-gate.json'),
  JSON.stringify(dump, null, 2)
);

console.log(JSON.stringify(dump, null, 2));
if (fails.length) {
  console.error(`\n✗ map-qa-gate: ${fails.length} fail(s)`);
  process.exitCode = 1;
} else {
  console.log('\n✓ map-qa-gate green');
}
