/**
 * Smoke: diff / fill / pick parse + sample lesson fences.
 * Does not import lesson-widgets.js (pulls .vue).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const play = await import(pathToFileURL(join(root, 'src/utils/lesson-widget-play.js')).href);

const {
  parseDiffSource,
  parseFillSource,
  parsePickSource,
} = play;

const widgetsSrc = readFileSync(join(root, 'src/utils/lesson-widgets.js'), 'utf8');
for (const k of ['diff', 'pairfix', 'fill', 'blank', 'pick', 'classify']) {
  if (!new RegExp(`\\b${k}:\\s*\\(`).test(widgetsSrc)) {
    throw new Error(`MOUNTERS missing ${k}`);
  }
}

const diff = parseDiffSource(
  JSON.stringify({
    title: 't',
    bad: 'a',
    good: 'b',
    why: 'w',
  }),
);
if (diff.bad !== 'a' || diff.good !== 'b') throw new Error('parseDiffSource failed');

const fill = parseFillSource(
  JSON.stringify({
    template: 'curl -___ https://x',
    answers: ['I'],
  }),
);
if (fill.answers[0] !== 'I' || !fill.template.includes('___')) {
  throw new Error('parseFillSource failed');
}

const pick = parsePickSource(
  JSON.stringify({
    bins: [{ id: 'a', label: 'A' }],
    items: [{ id: '1', text: 'x', bin: 'a' }],
  }),
);
if (pick.bins.length !== 1 || pick.items[0].bin !== 'a') {
  throw new Error('parsePickSource failed');
}

const lessonDir = join(root, 'src/data/lessons');
const fenceRe = /```(diff|pairfix|fill|blank|pick|classify)\n([\s\S]*?)```/g;
let fences = 0;
const badJson = [];

for (const name of readdirSync(lessonDir).filter((n) => n.endsWith('.js'))) {
  const mod = await import(pathToFileURL(join(lessonDir, name)).href);
  const md = String(mod.default ?? '');
  let m;
  fenceRe.lastIndex = 0;
  while ((m = fenceRe.exec(md))) {
    fences += 1;
    const lang = m[1];
    const body = m[2].trim();
    try {
      const j = JSON.parse(body);
      if (lang === 'diff' || lang === 'pairfix') {
        if (!j.bad && !j.wrong) badJson.push(`${name}: diff missing bad`);
        if (!j.good && !j.right) badJson.push(`${name}: diff missing good`);
        parseDiffSource(body);
      }
      if (lang === 'fill' || lang === 'blank') {
        if (!j.template && !j.line) badJson.push(`${name}: fill missing template`);
        if (!Array.isArray(j.answers) && typeof j.answer !== 'string') {
          badJson.push(`${name}: fill missing answers`);
        }
        parseFillSource(body);
      }
      if (lang === 'pick' || lang === 'classify') {
        if (!Array.isArray(j.bins) || !Array.isArray(j.items)) {
          badJson.push(`${name}: pick missing bins/items`);
        }
        parsePickSource(body);
      }
    } catch (err) {
      badJson.push(`${name}: ${lang} JSON ${err.message}`);
    }
  }
}

if (badJson.length) {
  console.error(badJson.join('\n'));
  process.exit(1);
}

if (fences < 8) {
  console.error(`expected >=8 new fences, got ${fences}`);
  process.exit(1);
}

console.log(`ok: langs registered; fences=${fences}`);
