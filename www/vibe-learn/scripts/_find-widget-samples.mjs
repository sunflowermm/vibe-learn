import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
  const t = String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default || '');
  for (const k of ['check', 'decide', 'reveal']) {
    const fence = '```' + k;
    const i = t.indexOf(fence);
    if (i >= 0) {
      console.log('====', f, k);
      console.log(t.slice(i, i + 600));
      console.log('');
    }
  }
}
