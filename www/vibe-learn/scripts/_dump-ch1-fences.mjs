import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = [
  'installers-path.js',
  'package-managers.js',
  'runtime-nodejs.js',
  'linux-cli.js',
  'linux-distros.js',
  'xrk-first-run.js',
  'data-env.js',
  'clash-setup.js',
  'chapter-env.js',
];

for (const f of files) {
  const t = String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default || '');
  console.log('\n========', f);
  for (const k of ['bash', 'powershell', 'cmd', 'shell', 'env']) {
    let idx = 0;
    while (true) {
      const i = t.indexOf('```' + k, idx);
      if (i < 0) break;
      const head = t.slice(Math.max(0, i - 80), i).split('\n').pop();
      const end = t.indexOf('```', i + 3 + k.length);
      const body = t.slice(i, Math.min(i + 280, end > 0 ? end + 3 : i + 280));
      console.log('---', k, 'near:', head?.trim());
      console.log(body.replace(/\n/g, '\n').slice(0, 220));
      idx = i + 4;
    }
  }
}
