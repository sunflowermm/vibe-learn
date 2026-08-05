import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
for (const f of ['linux-cli.js', 'xrk-first-run.js', 'clash-port.js']) {
  const t = String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default || '');
  const fence = '```env';
  let i = 0;
  let n = 0;
  while (true) {
    const a = t.indexOf(fence, i);
    if (a < 0) break;
    const b = t.indexOf('```', a + fence.length);
    const raw = t.slice(a + fence.length, b).trim();
    n++;
    try {
      JSON.parse(raw);
      console.log(f, n, 'OK', raw.slice(0, 60));
    } catch (e) {
      console.log(f, n, 'FAIL', e.message);
      console.log(raw.slice(0, 400));
      console.log('---');
    }
    i = b + 3;
  }
}
