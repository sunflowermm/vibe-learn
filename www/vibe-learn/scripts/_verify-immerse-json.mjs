import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  parseCheckSource,
  parseDecideSource,
  parsePortsSource,
  parseRevealSource,
  parseSortSource,
} from '../src/utils/lesson-widget-play.js';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = [
  'workbench-troubleshoot.js',
  'tcp-udp.js',
  'clash.js',
  'code-read-errors.js',
  'data-json.js',
  'reverse-proxy.js',
  'net-nginx.js',
  'protocol-stack.js',
  'chapter-env.js',
  'code-async.js',
];
const map = {
  check: parseCheckSource,
  decide: parseDecideSource,
  ports: parsePortsSource,
  reveal: parseRevealSource,
  sort: parseSortSource,
  term: (r) => {
    const j = JSON.parse(r);
    if (!Array.isArray(j.steps)) throw new Error('no steps');
    return j;
  },
};

let bad = 0;
for (const f of files) {
  const t = String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default);
  for (const [lang, parse] of Object.entries(map)) {
    let idx = 0;
    const fence = '```' + lang;
    while (true) {
      const a = t.indexOf(fence, idx);
      if (a < 0) break;
      const b = t.indexOf('```', a + fence.length);
      const raw = t.slice(a + fence.length, b).trim();
      try {
        const m = parse(raw);
        console.log('ok', f, lang, m.title || (m.face || '').slice(0, 36) || 'term');
      } catch (e) {
        bad++;
        console.log('FAIL', f, lang, e.message);
      }
      idx = b + 3;
    }
  }
}
console.log(JSON.stringify({ bad }));
