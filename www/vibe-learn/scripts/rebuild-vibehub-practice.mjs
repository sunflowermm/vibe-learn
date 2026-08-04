/**
 * 离线：用已有 vibehub/lessons.json 重写 quiz/sets/vibehub-practice.js
 *
 * node scripts/rebuild-vibehub-practice.mjs
 * 全量联网同步：pnpm vibehub:sync
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  practiceToQuestion,
  renderPracticeSetJs,
} from './lib/vibehub-practice.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const lessons = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/vibehub/lessons.json'), 'utf8')
);

const practiceQs = lessons
  .map((lesson) => practiceToQuestion(lesson))
  .filter(Boolean)
  .sort((a, b) => a.id.localeCompare(b.id));

const derived = practiceQs.filter((q) =>
  (q.tags || []).includes('usage-derived')
).length;

fs.writeFileSync(
  path.join(root, 'src/data/quiz/sets/vibehub-practice.js'),
  renderPracticeSetJs(practiceQs),
  'utf8'
);

const metaPath = path.join(root, 'src/data/vibehub/meta.json');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
meta.practiceCount = practiceQs.length;
meta.practiceCoverage = `${practiceQs.length}/${lessons.length}（原站 lessonPractice + 无练习时用 usage.use/avoid 合成）`;
meta.note =
  '静态学习快照；释义与练习版权归 VibeHub 原作者。词典与本仓去重；导图保留全量词条卡。刷题 relatedNodes 由 bank 按跨导图桥展开。重新同步：pnpm vibehub:sync';
fs.writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

console.log(
  `[rebuild-vibehub-practice] ${practiceQs.length} 题（usage 合成 ${derived}）→ sets/vibehub-practice.js`
);
