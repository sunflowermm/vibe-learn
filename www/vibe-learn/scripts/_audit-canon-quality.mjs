/**
 * 相对 Canon 的质量审计（不只看有没有标题）
 * node www/vibe-learn/scripts/_audit-canon-quality.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();

const GENERIC_MAP2 = '## 导图2 · 词表对照';
const GENERIC_ACCEPT_MARK = '能用自己的话复述本课要钉死的 1～2 个判断';

/** @type {Map<string, object[]>} */
const byPrefix = new Map();
const chapters = [];

for (const f of files) {
  if (f.startsWith('vh-')) continue;
  const m = await import(pathToFileURL(path.join(dir, f)).href + '?t=' + Date.now());
  const t = String(m.default || '');
  const row = {
    f,
    accept: /学会之后（验收）/.test(t) || (/学会之后/.test(t) && /成功信号/.test(t)),
    acceptGeneric: t.includes(GENERIC_ACCEPT_MARK),
    map2: /## (?:\d+\.\s*)?导图2/.test(t),
    map2Generic: t.includes(GENERIC_MAP2),
    map2Pro:
      /本框专业落点|本仓专业落点|本练习落点|落到本仓时要钉死|Vibe 口语/.test(t) &&
      !t.includes(GENERIC_MAP2),
    lead: /(^|\n)> /.test(t),
    chapter: f.startsWith('chapter-'),
  };
  if (row.chapter) chapters.push(row);
  const p = f.startsWith('chapter-') ? 'chapter' : f.split('-')[0];
  if (!byPrefix.has(p)) byPrefix.set(p, []);
  byPrefix.get(p).push(row);
}

console.log('=== 章概览 × Canon（验收专用表 + 导图2专业三列表）===');
for (const r of chapters) {
  const issues = [];
  if (!r.accept) issues.push('缺验收');
  if (r.acceptGeneric) issues.push('验收=底线模板');
  if (!r.map2) issues.push('缺导图2');
  if (r.map2Generic) issues.push('导图2=泛用词表对照');
  if (!r.map2Pro) issues.push('导图2无「本框/本仓专业落点」列');
  if (!r.lead) issues.push('缺开篇>');
  console.log(`${issues.length ? '△' : '✓'} ${r.f.padEnd(22)} ${issues.length ? issues.join('；') : '符合'}`);
}

console.log('\n=== 分课仍偏「底线模板」===');
const groups = [
  ['序章', ['computer', 'os', 'chip', 'hw']],
  ['第一章', ['terminal', 'linux', 'runtime', 'installers', 'package', 'git', 'workbench']],
  ['01.5', ['code', 'data']],
  ['第二章', ['lang', 'fw']],
  ['第三章', ['net', 'http', 'api', 'dns', 'ip', 'tcp', 'protocol', 'reverse', 'routing', 'network']],
  ['第四章', ['xrk']],
  ['第五章', ['ai']],
  ['番外A', ['adev']],
  ['番外库', ['db']],
  ['番外运维', ['ops', 'panel', 'host', 'clash', 'fs', 'craft']],
  ['其它', ['dsa', 'esp', 'knowledge']],
];

for (const [name, prefixes] of groups) {
  /** @type {object[]} */
  const list = [];
  for (const p of prefixes) list.push(...(byPrefix.get(p) || []));
  if (!list.length) continue;
  const ga = list.filter((r) => r.acceptGeneric);
  const gm = list.filter((r) => r.map2Generic);
  const pro = list.filter((r) => r.map2Pro).length;
  const missA = list.filter((r) => !r.accept).length;
  const missM = list.filter((r) => !r.map2).length;
  console.log(
    `\n[${name}] n=${list.length} 专业导图2=${pro} 泛用验收=${ga.length} 泛用导图2=${gm.length}` +
      (missA ? ` 缺验收=${missA}` : '') +
      (missM ? ` 缺导图2=${missM}` : '')
  );
  if (gm.length && gm.length <= 40) {
    console.log('  泛用导图2:', gm.map((r) => r.f.replace(/\.js$/, '')).join(', '));
  } else if (gm.length) {
    console.log('  泛用导图2 sample:', gm.slice(0, 25).map((r) => r.f.replace(/\.js$/, '')).join(', '), `…+${gm.length - 25}`);
  }
}

const weakCh = chapters.filter((r) => !r.map2Pro || r.map2Generic || r.acceptGeneric);
console.log('\n=== 结论：章概览未达专业对照 ===');
console.log(weakCh.length ? weakCh.map((r) => r.f).join('\n') : '(无 · 17 章概览结构已齐)');

const xrkGeneric = (byPrefix.get('xrk') || []).filter((r) => r.map2Generic || r.acceptGeneric);
console.log('\n=== 第四章分课未达专业对照 ===');
console.log(xrkGeneric.length ? xrkGeneric.map((r) => r.f).join('\n') : '(无 · xrk-* 均已专业落点或非泛用)');
