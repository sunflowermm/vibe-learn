/**
 * 导图2 盘点：七大区 × 词条卡 / 正文厚度 / 桥接覆盖
 * node scripts/_map2-inv.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const toUrl = (p) => pathToFileURL(path.join(root, p)).href;

const pack = await import(toUrl('src/data/vibehub/graph-pack.js'));
const bridges = await import(toUrl('src/data/map-bridges.js'));
const overrides = await import(toUrl('src/data/map-bridges-overrides.js'));
const nodesMod = await import(toUrl('src/data/nodes.js'));

const frames = pack.VIBEHUB_MACRO_FRAMES;
const cards = pack.VIBEHUB_TERM_CARDS;
const bodies = pack.VIBEHUB_BODIES;
const entryIds = new Set(pack.VIBEHUB_ENTRY_IDS || []);
const hubId = pack.VIBE_HUB_ID;

const knowledgeNodes = (nodesMod.knowledgeNodes || nodesMod.default || []).filter(
  (n) => n && n.id && n.role !== 'hub'
);
const knowledgeIds = new Set(
  (nodesMod.knowledgeNodes || Object.values(nodesMod.nodesById || {}) || [])
    .map?.((n) => n.id)
    .filter(Boolean) || []
);

/** @type {Map<string, object>} */
let nodeById = nodesMod.nodesById || nodesMod.byId;
if (!nodeById) {
  nodeById = new Map();
  const list =
    nodesMod.knowledgeNodes ||
    nodesMod.KNOWLEDGE_NODES ||
    nodesMod.nodes ||
    [];
  if (Array.isArray(list)) {
    for (const n of list) nodeById.set(n.id, n);
  } else if (list && typeof list === 'object') {
    nodeById = new Map(Object.entries(list));
  }
}
if (!(nodeById instanceof Map)) {
  nodeById = new Map(Object.entries(nodeById));
}

const allKnowledgeIds = [...nodeById.keys()].filter(
  (id) => !String(id).startsWith('vh-')
);

const ZONE_ORDER = [
  'frontend',
  'backend',
  'product',
  'technology',
  'ai',
  'git',
  'design',
];

/** @type {Record<string, any>} */
const zones = {};
for (const slug of ZONE_ORDER) {
  zones[slug] = {
    slug,
    frameId: null,
    label: null,
    subtitle: null,
    frameChildCount: 0,
    cards: [],
    categories: {},
  };
}

for (const f of frames) {
  const slug = f.slug;
  if (!zones[slug]) {
    zones[slug] = {
      slug,
      frameId: f.id,
      label: f.label,
      subtitle: f.subtitle,
      frameChildCount: (f.childIds || []).length,
      cards: [],
      categories: {},
    };
  } else {
    zones[slug].frameId = f.id;
    zones[slug].label = f.label;
    zones[slug].subtitle = f.subtitle;
    zones[slug].frameChildCount = (f.childIds || []).length;
  }
}

const cardById = new Map(cards.map((c) => [c.id, c]));
const bodyStats = [];
const missingBody = [];
const shortRole = [];
const noPractice = [];

for (const c of cards) {
  const z = zones[c.macroSlug] || (zones[c.macroSlug] = {
    slug: c.macroSlug,
    frameId: null,
    label: c.macroTitle,
    subtitle: '',
    frameChildCount: 0,
    cards: [],
    categories: {},
  });
  const body =
    bodies[c.id] || bodies[c.lessonId] || bodies[`vh-${c.lessonId}`] || '';
  const bodyLen = String(body).length;
  const hasDemo = /vh-demo|iframe/.test(String(body));
  const hasUsage = /\*\*用法\*\*|## 用法/.test(String(body));
  const hasAdjacent = /与相邻概念/.test(String(body));
  const cat = c.category || '(无分类)';
  if (!z.categories[cat]) z.categories[cat] = [];
  z.categories[cat].push(c.id);
  z.cards.push({
    id: c.id,
    lessonId: c.lessonId,
    label: c.label,
    category: cat,
    roleLen: String(c.role || '').length,
    bodyLen,
    hasPractice: !!c.hasPractice,
    hasDemo,
    hasUsage,
    hasAdjacent,
    glossaryIds: c.glossaryIds || [],
  });
  bodyStats.push({ id: c.id, bodyLen, macro: c.macroSlug });
  if (!bodyLen) missingBody.push(c.id);
  if (String(c.role || '').length < 12) shortRole.push(c.id);
  if (!c.hasPractice) noPractice.push(c.id);
}

// frame childIds vs cards
const frameGaps = [];
for (const f of frames) {
  const kids = f.childIds || [];
  const missing = kids.filter((id) => !cardById.has(id) && id !== hubId);
  const extra = cards
    .filter((c) => c.macroSlug === f.slug && !kids.includes(c.id))
    .map((c) => c.id);
  if (missing.length || extra.length) {
    frameGaps.push({
      frame: f.id,
      slug: f.slug,
      missingInCards: missing,
      cardsNotInFrame: extra.slice(0, 20),
      cardsNotInFrameCount: extra.length,
    });
  }
}

// bridge coverage
const ov = overrides.KNOWLEDGE_MAP2_OVERRIDES || {};
const k2m = bridges.KNOWLEDGE_TO_MAP2 || {};
const m2k = bridges.MAP2_TO_KNOWLEDGE || {};

const bridgeFromKnowledge = {};
const emptyOverride = [];
const deadBridgeTargets = [];
const knowledgeNoBridge = [];
const knowledgeWithBridge = [];

for (const kid of allKnowledgeIds) {
  const links = bridges.bridgesForKnowledge(kid);
  if (Object.prototype.hasOwnProperty.call(ov, kid) && Array.isArray(ov[kid]) && ov[kid].length === 0) {
    emptyOverride.push(kid);
  }
  if (!links.length) {
    knowledgeNoBridge.push(kid);
  } else {
    knowledgeWithBridge.push(kid);
    bridgeFromKnowledge[kid] = links.map((l) => l.id);
    for (const l of links) {
      const tid = l.id;
      if (
        tid !== hubId &&
        !cardById.has(tid) &&
        !frames.some((f) => f.id === tid) &&
        !entryIds.has(tid)
      ) {
        deadBridgeTargets.push({ from: kid, to: tid });
      }
    }
  }
}

/** map2 cards never referenced from knowledge bridges */
const referencedMap2 = new Set();
for (const links of Object.values(bridgeFromKnowledge)) {
  for (const id of links) referencedMap2.add(id);
}
for (const [mid, links] of Object.entries(m2k)) {
  referencedMap2.add(mid);
  for (const l of links) referencedMap2.add(l.id);
}
const orphanMap2Cards = cards
  .map((c) => c.id)
  .filter((id) => !referencedMap2.has(id));

const bodyLens = bodyStats.map((b) => b.bodyLen).sort((a, b) => a - b);
const median = bodyLens[Math.floor(bodyLens.length / 2)] || 0;
const thinnest = [...bodyStats].sort((a, b) => a.bodyLen - b.bodyLen).slice(0, 25);
const thickest = [...bodyStats].sort((a, b) => b.bodyLen - a.bodyLen).slice(0, 10);

const zoneSummary = ZONE_ORDER.map((slug) => {
  const z = zones[slug];
  const lens = z.cards.map((c) => c.bodyLen);
  lens.sort((a, b) => a - b);
  return {
    slug,
    frameId: z.frameId,
    label: z.label,
    subtitle: z.subtitle,
    cardCount: z.cards.length,
    frameChildCount: z.frameChildCount,
    categoryCount: Object.keys(z.categories).length,
    categories: Object.fromEntries(
      Object.entries(z.categories).map(([k, v]) => [k, v.length])
    ),
    bodyMedian: lens[Math.floor(lens.length / 2)] || 0,
    bodyMin: lens[0] || 0,
    bodyMax: lens[lens.length - 1] || 0,
    noPractice: z.cards.filter((c) => !c.hasPractice).length,
    missingBody: z.cards.filter((c) => !c.bodyLen).length,
  };
});

const dump = {
  generatedAt: new Date().toISOString(),
  source: pack.VIBEHUB_SITE,
  revision: pack.VIBEHUB_REVISION,
  hubId,
  totals: {
    frames: frames.length,
    cards: cards.length,
    bodies: Object.keys(bodies).length,
    entryIds: entryIds.size,
    knowledgeNodes: allKnowledgeIds.length,
    knowledgeWithBridge: knowledgeWithBridge.length,
    knowledgeNoBridge: knowledgeNoBridge.length,
    emptyOverrideCleared: emptyOverride.length,
    deadBridgeTargets: deadBridgeTargets.length,
    orphanMap2Cards: orphanMap2Cards.length,
    missingBody: missingBody.length,
    shortRole: shortRole.length,
    noPractice: noPractice.length,
    bodyMedian: median,
    bodyMin: bodyLens[0] || 0,
    bodyMax: bodyLens[bodyLens.length - 1] || 0,
  },
  zoneSummary,
  frameGaps,
  emptyOverrideCleared: emptyOverride,
  knowledgeNoBridge: knowledgeNoBridge.sort(),
  deadBridgeTargets,
  orphanMap2CardsSample: orphanMap2Cards.slice(0, 60),
  orphanMap2ByZone: Object.fromEntries(
    ZONE_ORDER.map((slug) => [
      slug,
      orphanMap2Cards.filter((id) => cardById.get(id)?.macroSlug === slug),
    ])
  ),
  noPractice,
  missingBody,
  shortRole,
  thinnestBodies: thinnest,
  thickestBodies: thickest,
  /** 精修优先级：AI / Git / technology 与导图1重叠大 → 先审准确与去灌水 */
  contentPassPriority: [
    {
      zone: 'ai',
      why: '与导图1 AI 章概念重叠；词条需准、可跳、勿复述课全文',
      cards: zones.ai?.cards.map((c) => c.id) || [],
    },
    {
      zone: 'git',
      why: '与导图1 环境章 Git 课重叠',
      cards: zones.git?.cards.map((c) => c.id) || [],
    },
    {
      zone: 'technology',
      why: '语言/框架/测试与导图1 语言章重叠',
      cards: zones.technology?.cards.map((c) => c.id) || [],
    },
    {
      zone: 'backend',
      why: '网络/部署与导图1 网络·运维重叠',
      cards: zones.backend?.cards.map((c) => c.id) || [],
    },
    {
      zone: 'frontend',
      why: '体量大；组件名词以词典准度为先，少扩课',
      cardCount: zones.frontend?.cards.length || 0,
    },
    {
      zone: 'product',
      why: '产品词表；核对一句话与用法边界',
      cards: zones.product?.cards.map((c) => c.id) || [],
    },
    {
      zone: 'design',
      why: '无练习 22 课；释义准即可，勿硬补题',
      cards: zones.design?.cards.map((c) => c.id) || [],
    },
  ],
};

fs.writeFileSync(
  path.join(root, 'scripts/_map2-inv.json'),
  JSON.stringify(dump, null, 2)
);

console.log(JSON.stringify(dump.totals, null, 2));
console.log('\n=== zoneSummary ===');
for (const z of zoneSummary) {
  console.log(
    `${z.slug.padEnd(12)} cards=${String(z.cardCount).padStart(3)} cats=${String(z.categoryCount).padStart(2)} bodyMed=${z.bodyMedian} noPrac=${z.noPractice}`
  );
}
console.log('\nframeGaps', frameGaps.length);
console.log('emptyOverride', emptyOverride.length);
console.log('knowledgeNoBridge', knowledgeNoBridge.length, knowledgeNoBridge.slice(0, 20));
console.log('deadBridgeTargets', deadBridgeTargets.length, deadBridgeTargets.slice(0, 10));
console.log('orphanMap2', orphanMap2Cards.length);
console.log('noPractice', noPractice.length, noPractice);
console.log('\nwrote scripts/_map2-inv.json');
