/**
 * 导入 layout.js：跑齐各章 assertNoCardOverlap + 章框重叠断言；再检绝对坐标。
 * node scripts/_map-layout-overlap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CARD_W, CARD_H } from '../src/utils/layout-from-edges.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

let importError = null;
try {
  await import(pathToFileURL(path.join(root, 'src/data/layout.js')).href);
} catch (e) {
  importError = String(e?.message || e);
}

const layout = await import(
  pathToFileURL(path.join(root, 'src/data/layout.js')).href
).catch(() => null);
const nodes = await import(
  pathToFileURL(path.join(root, 'src/data/nodes.js')).href
);

const origins = nodes.getOriginPositions();
const boxes = [];
for (const [id, p] of origins) {
  const isFrame = String(id).startsWith('chapter-') || id === 'knowledge-hub';
  boxes.push({
    id,
    x: p.x,
    y: p.y,
    w: isFrame ? (p.width || 400) : CARD_W,
    h: isFrame ? (p.height || 200) : CARD_H,
  });
}

/* 仅 topic 卡 vs topic 卡；章框与其子卡允许「包含」 */
const topicIds = new Set(nodes.knowledgeNodes.map((n) => n.id));
const overlaps = [];
const topics = boxes.filter((b) => topicIds.has(b.id));
for (let i = 0; i < topics.length; i += 1) {
  for (let j = i + 1; j < topics.length; j += 1) {
    const a = topics[i];
    const b = topics[j];
    const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (ox > 2 && oy > 2) overlaps.push({ a: a.id, b: b.id, ox, oy });
  }
}

const frameBoxes = Object.entries(layout?.LAYOUT || {}).map(([k, p]) => ({
  id: k,
  x: p.x,
  y: p.y,
  w: p.width,
  h: p.height,
}));
const frameOverlaps = [];
for (let i = 0; i < frameBoxes.length; i += 1) {
  for (let j = i + 1; j < frameBoxes.length; j += 1) {
    const a = frameBoxes[i];
    const b = frameBoxes[j];
    const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (ox > 2 && oy > 2) frameOverlaps.push({ a: a.id, b: b.id, ox, oy });
  }
}

const dump = {
  generatedAt: new Date().toISOString(),
  importError,
  topicCount: topics.length,
  frameCount: frameBoxes.length,
  topicCrossOverlaps: overlaps.slice(0, 40),
  topicCrossOverlapCount: overlaps.length,
  frameOverlaps,
  frameOverlapCount: frameOverlaps.length,
  ok: !importError && overlaps.length === 0 && frameOverlaps.length === 0,
};

fs.writeFileSync(
  path.join(root, 'scripts/_map-layout-overlap.json'),
  JSON.stringify(dump, null, 2)
);
console.log(
  JSON.stringify(
    {
      ok: dump.ok,
      importError,
      topicCount: dump.topicCount,
      topicCrossOverlapCount: dump.topicCrossOverlapCount,
      frameOverlapCount: dump.frameOverlapCount,
      sample: overlaps.slice(0, 8),
    },
    null,
    2
  )
);
