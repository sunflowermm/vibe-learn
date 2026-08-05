import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseEnvSource } from '../src/utils/lesson-widget-play.js';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = [
  'installers-path.js',
  'package-managers.js',
  'runtime-nodejs.js',
  'linux-cli.js',
  'linux-distros.js',
  'xrk-first-run.js',
  'clash-setup.js',
  'data-env.js',
  'clash-port.js',
  'git-workspace.js',
  'git-forges.js',
];

for (const f of files) {
  const t = String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default || '');
  let i = 0;
  let n = 0;
  const fence = '```env';
  while (true) {
    const a = t.indexOf(fence, i);
    if (a < 0) break;
    const b = t.indexOf('```', a + fence.length);
    const raw = t.slice(a + fence.length, b).trim();
    const m = parseEnvSource(raw);
    n++;
    if (!m.tabs.length) console.log('BAD', f, n, m);
    else console.log('ok', f, n, m.title, m.tabs.map((x) => x.id).join(','));
    i = b + 3;
  }
}
