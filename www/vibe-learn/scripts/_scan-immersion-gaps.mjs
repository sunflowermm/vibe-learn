import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { SHELL_PRESETS } from '../src/labs/shell-presets.js';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js') && !f.startsWith('vh-'));
const used = new Set();
const immersiveKinds = ['shell', 'term', 'env', 'reveal', 'check', 'decide', 'compare', 'ports', 'sort'];
const thin = [];

for (const f of files) {
  const t = String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default || '');
  for (const m of t.matchAll(/"preset"\s*:\s*"([^"]+)"/g)) used.add(m[1]);
  const count = Object.fromEntries(immersiveKinds.map((k) => [k, t.split('```' + k).length - 1]));
  const immersive = immersiveKinds.reduce((s, k) => s + count[k], 0);
  // priority: env/ops/net/code hands-on chapters
  if (
    immersive <= 1 &&
    /^(terminal|installers|package|runtime|linux|workbench|git-|data-|xrk-first|clash|http-|net-|dns-|tcp-|protocol|reverse|routing|ip-|ops-|host-|panel-|code-|fs-|craft-|adev-)/.test(
      f
    )
  ) {
    thin.push({ f, immersive, count });
  }
}

console.log('presets unused', Object.keys(SHELL_PRESETS).filter((k) => !used.has(k)));
console.log('presets used', [...used].sort());
console.log('thin', JSON.stringify(thin, null, 2));
