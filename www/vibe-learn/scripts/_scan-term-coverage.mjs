import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js') && !f.startsWith('vh-'));
const need =
  /^(terminal|installers|package|runtime|linux|workbench|git-|data-env|xrk-first|clash|http-hands|net-|dns-|tcp-|ops-|host-|panel-|code-|fs-|craft-ci|docker|reverse|routing|ip-|protocol)/;

const fence = (t, k) => t.split('```' + k).length - 1;
const rows = [];

for (const f of files) {
  if (!need.test(f)) continue;
  const t = String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default || '');
  const shell = fence(t, 'shell');
  const term = fence(t, 'term');
  const env = fence(t, 'env');
  rows.push({
    f,
    shell,
    term,
    env,
    total: shell + term + env,
    bash: fence(t, 'bash'),
    ps: fence(t, 'powershell'),
  });
}

rows.sort((a, b) => a.total - b.total || a.f.localeCompare(b.f));
console.log('ZERO terminal (shell/term/env):');
for (const r of rows.filter((x) => x.total === 0)) {
  console.log(' ', r.f, 'legacy bash/ps', r.bash, r.ps);
}
console.log('\nHAS terminal:');
for (const r of rows.filter((x) => x.total > 0)) {
  console.log(' ', r.f, `shell=${r.shell} term=${r.term} env=${r.env}`);
}
console.log('\nsummary', {
  lessons: rows.length,
  withTerm: rows.filter((x) => x.total > 0).length,
  without: rows.filter((x) => x.total === 0).length,
});
