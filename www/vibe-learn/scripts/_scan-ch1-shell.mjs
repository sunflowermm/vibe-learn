import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = [
  'chapter-env.js',
  'terminal-worlds.js',
  'installers-path.js',
  'package-managers.js',
  'runtime-nodejs.js',
  'linux-cli.js',
  'linux-distros.js',
  'workbench-editor.js',
  'workbench-troubleshoot.js',
  'git-workspace.js',
  'git-forges.js',
  'data-env.js',
  'xrk-first-run.js',
  'clash.js',
  'clash-setup.js',
  'clash-port.js',
];

const fence = (t, k) => (t.split('```' + k).length - 1);

for (const f of files) {
  const p = path.join(dir, f);
  if (!fs.existsSync(p)) {
    console.log('missing', f);
    continue;
  }
  const t = String((await import(pathToFileURL(p).href + `?t=${Date.now()}`)).default || '');
  console.log(
    f.padEnd(28),
    JSON.stringify({
      shell: fence(t, 'shell'),
      env: fence(t, 'env'),
      term: fence(t, 'term'),
      bash: fence(t, 'bash'),
      powershell: fence(t, 'powershell'),
      cmd: fence(t, 'cmd'),
    })
  );
}

const presets = fs.readFileSync('www/vibe-learn/src/labs/shell-presets.js', 'utf8');
console.log(
  'presets',
  [...presets.matchAll(/^\s*'([^']+)':\s*\{/gm)].map((m) => m[1])
);
