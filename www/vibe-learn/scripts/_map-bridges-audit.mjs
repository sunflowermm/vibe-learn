/**
 * 跨导图桥审计：死链 / 空桥 / overrides 与 gen NO_BRIDGE 对齐
 * node scripts/_map-bridges-audit.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { knowledgeNodes, graphFrames } from '../src/data/nodes.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const toUrl = (p) => pathToFileURL(path.join(root, p)).href;

const br = await import(toUrl('src/data/map-bridges.js'));
const ov = await import(toUrl('src/data/map-bridges-overrides.js'));
const pack = await import(toUrl('src/data/vibehub/graph-pack.js'));

const cardIds = new Set(pack.VIBEHUB_TERM_CARDS.map((c) => c.id));
const frameIds = new Set(pack.VIBEHUB_MACRO_FRAMES.map((f) => f.id));
frameIds.add(pack.VIBE_HUB_ID);
const valid = (id) => cardIds.has(id) || frameIds.has(id);

/** 与 gen-map-bridges.mjs NO_BRIDGE 应对齐的期望清空集（含 overrides） */
const EXPECT_EMPTY = new Set([
  'computer-system',
  'hw-sw-link',
  'chip-units',
  'chapter-machine',
  'chapter-esp',
  'chapter-dsa',
  'esp-mcu',
  'esp-esp32',
  'esp-toolchain',
  'esp-link',
  'dsa-complexity',
  'dsa-linear',
  'dsa-hash',
  'dsa-tree',
  'dsa-graph',
  'dsa-sort',
  'dsa-recurse',
  'dsa-two-pointers',
  'dsa-union-find',
  'dsa-string',
  'dsa-bitwise',
  'dsa-dp',
  'dsa-ml',
  'dsa-hot',
]);

const overrides = ov.KNOWLEDGE_MAP2_OVERRIDES || {};
const allNodes = [...knowledgeNodes, ...graphFrames];

const dead = [];
const emptyIntentional = [];
const emptySurprise = [];
const withBridge = [];
const overrideEmptyMissing = [];
const overrideNonEmpty = [];

for (const n of allNodes) {
  const links = br.bridgesForKnowledge(n.id);
  const isOv = Object.prototype.hasOwnProperty.call(overrides, n.id);
  if (isOv && Array.isArray(overrides[n.id]) && overrides[n.id].length === 0) {
    emptyIntentional.push(n.id);
  } else if (!links.length) {
    if (EXPECT_EMPTY.has(n.id)) emptyIntentional.push(n.id);
    else emptySurprise.push(n.id);
  } else {
    withBridge.push(n.id);
    for (const l of links) {
      if (!valid(l.id)) dead.push({ from: n.id, to: l.id });
    }
  }
  if (EXPECT_EMPTY.has(n.id) && !isOv) {
    overrideEmptyMissing.push(n.id);
  }
  if (isOv && overrides[n.id]?.length) {
    overrideNonEmpty.push({ id: n.id, n: overrides[n.id].length });
  }
}

/** gen NO_BRIDGE 子集 vs EXPECT（读脚本源） */
const genSrc = fs.readFileSync(
  path.join(root, 'scripts/gen-map-bridges.mjs'),
  'utf8'
);
const m = genSrc.match(/const NO_BRIDGE = new Set\(\[([\s\S]*?)\]\);/);
const genNoBridge = new Set();
if (m) {
  for (const x of m[1].matchAll(/'([^']+)'/g)) genNoBridge.add(x[1]);
}
const expectNotInGen = [...EXPECT_EMPTY].filter((id) => !genNoBridge.has(id));
const genNotInExpect = [...genNoBridge].filter((id) => !EXPECT_EMPTY.has(id));

const dump = {
  generatedAt: new Date().toISOString(),
  totals: {
    nodes: allNodes.length,
    withBridge: withBridge.length,
    emptyIntentional: emptyIntentional.length,
    emptySurprise: emptySurprise.length,
    dead: dead.length,
    overrideKeys: Object.keys(overrides).length,
    overrideEmptyMissingInFile: overrideEmptyMissing.length,
  },
  dead,
  emptySurprise: emptySurprise.sort(),
  emptyIntentional: emptyIntentional.sort(),
  overrideEmptyMissing,
  expectNotInGenNoBridge: expectNotInGen,
  genNoBridgeExtra: genNotInExpect,
  overrideNonEmptySample: overrideNonEmpty.slice(0, 20),
};

fs.writeFileSync(
  path.join(root, 'scripts/_map-bridges-audit.json'),
  JSON.stringify(dump, null, 2)
);
console.log(JSON.stringify(dump.totals, null, 2));
console.log('emptySurprise', dump.emptySurprise);
console.log('expectNotInGen', dump.expectNotInGen);
console.log('dead', dump.dead.length);
