/**
 * knowledgeEdges 故事线（精炼）：孤立 / 反向先修 / 同章短环 / 跨章大环仅记账
 * node scripts/_map-edges-story.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { knowledgeNodes, knowledgeEdges } from '../src/data/nodes.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const byId = new Map(knowledgeNodes.map((n) => [n.id, n]));
const topicIds = new Set(knowledgeNodes.map((n) => n.id));

const deg = new Map();
const adj = new Map();
for (const id of topicIds) {
  deg.set(id, { in: 0, out: 0 });
  adj.set(id, []);
}

const badTargets = [];
const selfLoops = [];
for (const e of knowledgeEdges) {
  if (e.source === e.target) selfLoops.push(e.id);
  if (!topicIds.has(e.source) || !topicIds.has(e.target)) {
    /* 允许指到章框等；只记两边都不是 topic 的怪边 */
    continue;
  }
  deg.get(e.source).out += 1;
  deg.get(e.target).in += 1;
  adj.get(e.source).push(e.target);
}

const isolated = [...topicIds].filter(
  (id) => deg.get(id).in + deg.get(id).out === 0
);

/** 反向：本课 → 其先修（误导） */
const reversePrereq = [];
const missingEdgeForPrereq = [];
for (const n of knowledgeNodes) {
  for (const p of n.prereqs || []) {
    const pid = typeof p === 'string' ? p : p.id;
    if (!pid || !topicIds.has(pid)) continue;
    if (knowledgeEdges.some((e) => e.source === n.id && e.target === pid)) {
      reversePrereq.push({ node: n.id, prereq: pid });
    }
    if (!knowledgeEdges.some((e) => e.source === pid && e.target === n.id)) {
      missingEdgeForPrereq.push({ node: n.id, prereq: pid });
    }
  }
}

/** 同章短环（≤6）= 误导风险；跨章大环仅计数 */
const shortSameChapter = [];
let crossChapterCycleCount = 0;
const color = new Map();
const stack = [];

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
      if (parents.size === 1 && cyc.length <= 6) {
        shortSameChapter.push(cyc.join(' → '));
      } else {
        crossChapterCycleCount += 1;
      }
    } else if (c === 0) {
      dfs(v);
    }
  }
  stack.pop();
  color.set(u, 2);
}

for (const id of topicIds) {
  if ((color.get(id) || 0) === 0) dfs(id);
}

const dump = {
  generatedAt: new Date().toISOString(),
  edgeCount: knowledgeEdges.length,
  topicCount: topicIds.size,
  isolated,
  selfLoops,
  reversePrereq,
  missingEdgeForPrereqCount: missingEdgeForPrereq.length,
  missingEdgeForPrereqSample: missingEdgeForPrereq.slice(0, 25),
  shortSameChapterCycles: [...new Set(shortSameChapter)],
  crossChapterCycleCount,
  verdict: {
    isolatedOk: isolated.length === 0,
    reverseOk: reversePrereq.length === 0,
    shortCycleOk: shortSameChapter.length === 0,
    note: '跨章大环为故事亲和边常见现象；面板 prereqs 可不强制有直连边',
  },
};

fs.writeFileSync(
  path.join(root, 'scripts/_map-edges-story.json'),
  JSON.stringify(dump, null, 2)
);
console.log(JSON.stringify({
  ...dump.verdict,
  isolated: dump.isolated.length,
  reverse: dump.reversePrereq.length,
  shortCycles: dump.shortSameChapterCycles.length,
  missingPrereqEdges: dump.missingEdgeForPrereqCount,
  crossChapterCycles: dump.crossChapterCycleCount,
}, null, 2));
