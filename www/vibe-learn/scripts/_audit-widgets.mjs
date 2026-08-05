import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js') && !f.startsWith('vh-'));
const kinds = [
  'flip', 'quiz', 'steps', 'match', 'shell', 'term', 'env', 'compare',
  'reveal', 'check', 'decide', 'ports', 'sort', 'diff', 'fill', 'pick',
  'prompt', 'mermaid',
];
const counts = Object.fromEntries(kinds.map((k) => [k, 0]));
const has = Object.fromEntries(kinds.map((k) => [k, 0]));
const none = [];
const flipOnly = [];
const rich = [];

for (const f of files) {
  const t = String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default || '');
  const used = {};
  for (const k of kinds) {
    const n = (t.match(new RegExp(`^\`\`\`${k}\\b`, 'gm')) || []).length;
    if (n) {
      counts[k] += n;
      has[k]++;
      used[k] = n;
    }
  }
  if (!Object.keys(used).length && !f.startsWith('chapter-')) none.push(f);
  if (used.flip && !used.quiz && !used.steps && !used.match && !used.check && !used.decide) {
    flipOnly.push(f);
  }
  const total = Object.values(used).reduce((a, b) => a + b, 0);
  if (total >= 5) rich.push([f, used]);
}

console.log('instances', counts);
console.log('lessons_with', has);
console.log('non-chapter zero widgets', none.length, none.slice(0, 30));
console.log('flip-dominated', flipOnly.length);
console.log('rich>=5', rich.length, rich.slice(0, 12));
