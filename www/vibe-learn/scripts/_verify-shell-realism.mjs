import { createShellSession } from '../src/labs/shell-engine.js';
import { SHELL_PRESETS } from '../src/labs/shell-presets.js';
import { parseEnvSource } from '../src/utils/lesson-widget-play.js';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const fail = createShellSession(SHELL_PRESETS['clone-fail']);
const ok = createShellSession(SHELL_PRESETS['clone-proxy-ok']);
console.log('clone-fail', fail.exec('git clone https://github.com/sunflowermm/XRK-AGT.git').lines);
console.log('clone-ok', ok.exec('git clone https://github.com/sunflowermm/XRK-AGT.git').lines);

const git = createShellSession(SHELL_PRESETS['git-workflow']);
for (const cmd of ['git status', 'git switch -c feat/lab', 'git add README.md', 'git commit -m docs:note']) {
  console.log('>', cmd, '=>', JSON.stringify(git.exec(cmd).lines));
}

const dir = path.resolve('www/vibe-learn/src/data/lessons');
for (const f of ['linux-cli.js', 'xrk-first-run.js', 'clash-port.js']) {
  const t = String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default || '');
  let i = 0;
  let n = 0;
  while (true) {
    const a = t.indexOf('```env', i);
    if (a < 0) break;
    const b = t.indexOf('```', a + 6);
    const raw = t.slice(a + 6, b).trim();
    n++;
    const m = parseEnvSource(raw);
    console.log(f, n, m.tabs.length ? 'OK ' + m.title : 'BAD');
    i = b + 3;
  }
}
