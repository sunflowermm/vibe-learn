/**
 * Audit lesson structure: 验收 / 导图2 / 下一步
 * node www/vibe-learn/scripts/_audit-lesson-structure.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();

const rows = [];
for (const f of files) {
  const m = await import(pathToFileURL(path.join(dir, f)).href + '?t=' + Date.now());
  const t = String(m.default || '');
  const title = (t.match(/^#\s+(.+)$/m) || [, f])[1];
  rows.push({
    f,
    title: title.slice(0, 36),
    accept: /学会之后/.test(t) && (/验收/.test(t) || /成功信号/.test(t)),
    map2: t.includes('## 导图2'),
    next: /## (下一步|跨章下一步)/.test(t),
    chapter: f.startsWith('chapter-'),
    prefix: f.split('-')[0],
  });
}

const skipAuto = (f) => f.startsWith('vh-') || f.includes('vibehub');

console.log('TOTAL', rows.length);
console.log('\n=== chapters ===');
for (const r of rows.filter((x) => x.chapter)) {
  console.log(`${r.f}\taccept=${r.accept}\tmap2=${r.map2}\tnext=${r.next}`);
}

const groups = ['chapter', 'xrk', 'net', 'lang', 'http', 'env', 'os', 'code', 'ai', 'adev', 'extra', 'db', 'docker', 'panel', 'host'];
for (const g of groups) {
  const list = rows.filter((r) => r.f.startsWith(g + '-') || (g === 'chapter' && r.chapter));
  if (!list.length) continue;
  const noA = list.filter((r) => !r.accept).map((r) => r.f);
  const noM = list.filter((r) => !r.map2).map((r) => r.f);
  console.log(`\n=== ${g} (${list.length}) miss验收=${noA.length} miss导图2=${noM.length} ===`);
  if (noA.length) console.log('  无验收:', noA.join(', '));
  if (noM.length && noM.length <= 30) console.log('  无导图2:', noM.join(', '));
  else if (noM.length) console.log('  无导图2 sample:', noM.slice(0, 20).join(', '), `…+${noM.length - 20}`);
}

const noAccept = rows.filter((r) => !r.accept && !skipAuto(r.f));
console.log('\n=== ALL miss 验收 (non-vh)', noAccept.length, '===');
console.log(noAccept.map((r) => r.f).join('\n'));
