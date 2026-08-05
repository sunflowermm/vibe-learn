/**
 * 导图盘点：薄课 / 无验收 / 互动块分布 / 章节覆盖
 * 运行：node scripts/_map-inv-baseline.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const lessonsDir = join(__dirname, '../src/data/lessons');
const quizDir = join(__dirname, '../src/data/quiz/sets');

const INTERACTIVE = new Set([
  'algo',
  'viz',
  'animate',
  'flip',
  'cards',
  'match',
  'check',
  'checklist',
  'shell',
  'vibe-shell',
  'term',
  'vibe-term',
  'quiz',
  'reveal',
  'spot',
  'decide',
  'path',
  'steps',
  'timeline',
  'ports',
  'sort',
  'env',
  'dialect',
  'compare',
  'roles',
  'fill',
  'blank',
  'pick',
  'classify',
]);

/** 源码模板字面量里是 \`\`\`lang；渲染后才是 ```lang */
const fenceRe = /(?:\\`\\`\\`|```)([a-zA-Z][\w-]*)/g;

function extractBody(src) {
  const m = src.match(/export default `([\s\S]*)`\s*;?\s*$/);
  return m ? m[1] : src;
}

const files = readdirSync(lessonsDir).filter((f) => f.endsWith('.js'));
const stats = [];
const widgetKinds = new Map();

for (const f of files) {
  const src = readFileSync(join(lessonsDir, f), 'utf8');
  const body = extractBody(src);
  const chars = body.length;
  const hasAccept = /学会之后/.test(body);
  const fences = [...body.matchAll(fenceRe)].map((x) => x[1].toLowerCase());
  for (const k of fences) widgetKinds.set(k, (widgetKinds.get(k) || 0) + 1);
  const iw = fences.filter((k) => INTERACTIVE.has(k));
  const algo = iw.filter((k) => k === 'algo' || k === 'viz' || k === 'animate').length;
  stats.push({
    id: f.replace(/\.js$/, ''),
    isChapter: f.startsWith('chapter-'),
    chars,
    hasAccept,
    iw: iw.length,
    algo,
    kinds: [...new Set(iw)],
  });
}

stats.sort((a, b) => a.chars - b.chars);
const topics = stats.filter((s) => !s.isChapter);

// relatedNodes from quiz
const quizRelated = new Map();
for (const f of readdirSync(quizDir).filter((x) => x.endsWith('.js'))) {
  const src = readFileSync(join(quizDir, f), 'utf8');
  const ids = [...src.matchAll(/relatedNodes\s*:\s*\[([^\]]*)\]/g)];
  for (const m of ids) {
    const inner = m[1];
    for (const idm of inner.matchAll(/['"]([\w-]+)['"]/g)) {
      const id = idm[1];
      if (!quizRelated.has(id)) quizRelated.set(id, []);
      quizRelated.get(id).push(f.replace(/\.js$/, ''));
    }
  }
}

const noQuiz = topics.filter((t) => !quizRelated.has(t.id));
const thin = topics.filter((t) => t.chars < 1800);
const noAccept = topics.filter((t) => !t.hasAccept);
const noIw = topics.filter((t) => t.iw === 0);
const genericHeavy = topics.filter(
  (t) => t.iw >= 3 && t.algo === 0 && t.kinds.every((k) => ['flip', 'match', 'steps', 'quiz', 'check'].includes(k))
);

const dump = {
  generatedAt: new Date().toISOString(),
  totals: {
    lessons: files.length,
    topics: topics.length,
    chapters: stats.filter((s) => s.isChapter).length,
    medianChars: topics[Math.floor(topics.length / 2)]?.chars,
    noAccept: noAccept.length,
    thinUnder1800: thin.length,
    noInteractive: noIw.length,
    noQuizLink: noQuiz.length,
    genericOnlyWidgets: genericHeavy.length,
  },
  widgetFenceCounts: Object.fromEntries([...widgetKinds.entries()].sort((a, b) => b[1] - a[1])),
  thinnest25: topics.slice(0, 25),
  noAcceptIds: noAccept.map((t) => t.id),
  noInteractiveIds: noIw.map((t) => t.id),
  noQuizIds: noQuiz.map((t) => t.id),
  genericHeavyIds: genericHeavy.map((t) => ({ id: t.id, chars: t.chars, kinds: t.kinds })),
  algoLessons: topics.filter((t) => t.algo > 0).map((t) => ({ id: t.id, algo: t.algo, kinds: t.kinds })),
};

dump.architecture = {
  refs: [
    'OSTEP (virtualization / concurrency / persistence)',
    'Microsoft Learn: Discover the basics of computing; Network fundamentals',
    'Tech Interview Handbook: sorting-searching (complexity & language default sort)',
    'VisuAlgo: sorting visualizations',
  ],
  keep: [
    '序章四课：系统总入口 / OS 本质 / 软硬件联动 / 算存层次 — 与 MS Learn「部件如何协作」对齐，VPN/身份放到网络·Clash，不塞进序章',
    'DSA 十四课保留分课：薄的是深度不够，不是该合并成一坨',
  ],
  add: [
    'algo viz：归并 / 堆排（dsa-sort；VisuAlgo 标配，现有仅冒泡/插入/选择/快排）',
    'algo viz：调度时间片（os-essence；OSTEP CPU 虚拟化直觉）',
    '题库挂鉤：ai-arch-beyond / ai-pi-agent / lang-csharp / lang-php / adev-compare',
  ],
  mergeOrThinCarefully: [
    '不建议合并序章四课',
    'AI 薄课（ai-arch-beyond 等）优先加厚或并入相邻叙事，勿再拆更碎节点',
    '通用 flip/match/quiz 过密的 24 课：删同构块，换成章专属 viz 或更深对照表',
  ],
  widgetAudit: {
    overused: ['quiz', 'flip', 'steps', 'match'],
    underusedChapterCraft: ['algo', 'shell', 'term', 'ports', 'compare', 'decide'],
    algoLessonsOnly: dump.algoLessons.map((x) => x.id),
    genericHeavyIds: dump.genericHeavyIds.map((x) => x.id),
  },
};

writeFileSync(join(__dirname, '_map-inv-baseline.json'), JSON.stringify(dump, null, 2));

console.log('=== totals ===');
console.log(dump.totals);
console.log('\n=== widget fences (top) ===');
for (const [k, v] of Object.entries(dump.widgetFenceCounts).slice(0, 25)) {
  console.log(String(v).padStart(4), k);
}
console.log('\n=== thinnest 20 topics ===');
for (const s of topics.slice(0, 20)) {
  console.log(String(s.chars).padStart(5), s.hasAccept ? 'Y' : 'N', String(s.iw).padStart(2), s.id, s.kinds.join(',') || '-');
}
console.log('\n=== algo lessons ===', dump.algoLessons.length);
console.log(dump.algoLessons.map((x) => x.id).join(', '));
console.log('\n=== no 学会之后 ===', noAccept.length);
console.log(noAccept.map((t) => t.id).join(', ') || '(none)');
console.log('\n=== no interactive ===', noIw.length);
console.log(noIw.slice(0, 40).map((t) => t.id).join(', '));
console.log('\n=== no quiz relatedNodes ===', noQuiz.length);
console.log(noQuiz.slice(0, 40).map((t) => t.id).join(', '));
console.log('\nwrote scripts/_map-inv-baseline.json');
