/**
 * 节点契约抽检：knowledgeNodes 必有 label/markdown；边端点存在。
 * node scripts/_map-inv-schema.mjs
 */
import { knowledgeNodes, knowledgeEdges, graphFrames } from '../src/data/nodes.js';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const byId = new Map(knowledgeNodes.map((n) => [n.id, n]));
const frameIds = new Set(graphFrames.map((f) => f.id));

const issues = [];
for (const n of knowledgeNodes) {
  if (!n.label) issues.push({ id: n.id, issue: 'missing label' });
  if (!n.markdown || String(n.markdown).trim().length < 80) {
    issues.push({ id: n.id, issue: 'thin or missing markdown' });
  }
  if (!n.parentId || (!frameIds.has(n.parentId) && n.parentId !== 'knowledge-hub')) {
    // knowledge-hub may be special
    if (n.id !== 'knowledge-hub' && !frameIds.has(n.parentId)) {
      issues.push({ id: n.id, issue: `bad parentId: ${n.parentId}` });
    }
  }
}

const orphanEnds = [];
for (const e of knowledgeEdges) {
  if (!byId.has(e.source) && !frameIds.has(e.source)) {
    orphanEnds.push({ edge: e.id, end: 'source', id: e.source });
  }
  if (!byId.has(e.target) && !frameIds.has(e.target)) {
    orphanEnds.push({ edge: e.id, end: 'target', id: e.target });
  }
}

const dump = {
  generatedAt: new Date().toISOString(),
  topics: knowledgeNodes.length,
  edges: knowledgeEdges.length,
  frames: graphFrames.length,
  issues,
  orphanEnds,
  ok: issues.length === 0 && orphanEnds.length === 0,
};

writeFileSync(join(__dirname, '_map-inv-schema.json'), JSON.stringify(dump, null, 2));
console.log(JSON.stringify({ ok: dump.ok, issues: issues.length, orphanEnds: orphanEnds.length, topics: dump.topics }, null, 2));
if (issues.slice(0, 15).length) console.log('issues sample', issues.slice(0, 15));
if (orphanEnds.slice(0, 15).length) console.log('orphan sample', orphanEnds.slice(0, 15));
