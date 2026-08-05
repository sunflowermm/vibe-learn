/**
 * 导图2 content-pass 摘要（续 _map2-inv.json）
 * node scripts/_map2-content-pass-note.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const invPath = path.join(root, 'scripts/_map2-inv.json');
const inv = JSON.parse(fs.readFileSync(invPath, 'utf8'));
const pack = await import(
  pathToFileURL(path.join(root, 'src/data/vibehub/graph-pack.js')).href
);
const br = await import(
  pathToFileURL(path.join(root, 'src/data/map-bridges.js')).href
);

const cards = pack.VIBEHUB_TERM_CARDS;
const bodies = pack.VIBEHUB_BODIES;
const lessonIds = new Set(cards.map((c) => c.lessonId));

const missingLearn = cards
  .filter((c) => !/\*\*学会之后\*\*/.test(bodies[c.id] || ''))
  .map((c) => c.id);
const dangling = [];
for (const c of cards) {
  const b = bodies[c.id] || '';
  const re = /\*\*(?:前置|相关|接着看)\*\*[：:]\s*([^\n]+)/g;
  let m;
  while ((m = re.exec(b))) {
    for (const part of m[1].split(/[、,，]/).map((s) => s.trim()).filter(Boolean)) {
      const hit =
        lessonIds.has(part) ||
        cards.some(
          (x) =>
            x.label === part ||
            x.label.startsWith(`${part}（`) ||
            x.lessonId === part
        );
      if (!hit && part.length > 1) dangling.push({ from: c.id, ref: part });
    }
  }
}

inv.contentPass = {
  at: new Date().toISOString(),
  fixedMissingApiLesson: true,
  cardsNow: cards.length,
  hasVhApi: Boolean(cards.find((c) => c.id === 'vh-api')),
  danglingInternalRefs: dangling.length,
  danglingSample: dangling.slice(0, 10),
  noLearningOutcome: {
    count: missingLearn.length,
    note: '源站无 learningOutcome 的组件/设计/Git 用法型词条；不硬灌「学会之后」',
    byZone: Object.fromEntries(
      ['frontend', 'backend', 'product', 'technology', 'ai', 'git', 'design'].map(
        (z) => [
          z,
          missingLearn.filter(
            (id) => cards.find((c) => c.id === id)?.macroSlug === z
          ).length,
        ]
      )
    ),
  },
  bridgeTweaks: {
    addedApiTo: ['api-frontend', 'http-web', 'xrk-http-www', 'xrk-subserver'],
    addedGitAtoms: ['git-workspace→commit/diff', 'git-forges→pull'],
    addedTesting: ['craft-testing', 'craft-ci'],
  },
  syncFix: 'SKIP_PATHS 去掉 api；FORCE_LESSON_IDS 含 api',
  policy: {
    noMap1Watering: '导图2 保持 VibeHub 词典体；本仓落点靠跨导图芯片，不往词条正文塞课全文',
    designNoPractice: 22,
  },
  sampleBackBridges: {
    'vh-api': br.bridgesForMap2('vh-api').map((x) => x.id),
    'vh-commit': br.bridgesForMap2('vh-commit').map((x) => x.id),
    'vh-unit-test': br.bridgesForMap2('vh-unit-test').map((x) => x.id),
  },
};

fs.writeFileSync(invPath, JSON.stringify(inv, null, 2));
console.log(JSON.stringify(inv.contentPass, null, 2));
