/**
 * 题库挂鉤盘点：节点 relatedNodes / NODE_TERMS / curated 覆盖
 * node scripts/_map-quiz-coverage.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { knowledgeNodes } from '../src/data/nodes.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const bank = await import(pathToFileURL(path.join(root, 'src/data/quiz/bank.js')).href);

const topicIds = knowledgeNodes
  .filter((n) => n.kind !== 'chapter')
  .map((n) => n.id);

/** @type {Map<string, number>} */
const counts = new Map();
for (const id of topicIds) counts.set(id, 0);

const list =
  typeof bank.listQuestions === 'function' ? bank.listQuestions() : [];

function bump(id) {
  if (!id || !counts.has(id)) return;
  counts.set(id, counts.get(id) + 1);
}

for (const q of list) {
  for (const id of q.relatedNodes || []) bump(id);
}

/** 以 questionsForNode 为准（含 derive / 展开） */
const forNodeCounts = {};
for (const id of topicIds) {
  const qs =
    typeof bank.questionsForNode === 'function'
      ? bank.questionsForNode(id) || []
      : [];
  forNodeCounts[id] = qs.length;
}

const zero = topicIds.filter((id) => (forNodeCounts[id] || 0) === 0);
const thin = topicIds.filter((id) => {
  const n = forNodeCounts[id] || 0;
  return n > 0 && n < 3;
});

const dump = {
  generatedAt: new Date().toISOString(),
  questionCount: list.length,
  topicCount: topicIds.size,
  zeroCount: zero.length,
  zero,
  thinCount: thin.length,
  thin: thin.map((id) => ({ id, n: forNodeCounts[id] })),
  relatedBumpZero: topicIds.filter((id) => (counts.get(id) || 0) === 0).length,
};

fs.writeFileSync(
  path.join(root, 'scripts/_map-quiz-coverage.json'),
  JSON.stringify(dump, null, 2)
);
console.log(JSON.stringify({
  questionCount: dump.questionCount,
  topicCount: dump.topicCount,
  zeroCount: dump.zeroCount,
  thinCount: dump.thinCount,
  zeroSample: zero.slice(0, 30),
  thinSample: dump.thin.slice(0, 15),
}, null, 2));
