/**
 * 内容质检：损坏 / 重复 / 泛用残留 / 结构缺口
 * node www/vibe-learn/scripts/_qa-lessons.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js') && !f.startsWith('vh-')).sort();

const issues = [];
const stats = {
  n: 0,
  importOk: 0,
  accept: 0,
  map2: 0,
  map2Pro: 0,
  genericMap2: 0,
  genericAccept: 0,
  softVibe: 0,
  multiMap2: 0,
  noNextChapter: 0,
};

for (const f of files) {
  stats.n++;
  let t = '';
  try {
    const m = await import(pathToFileURL(path.join(dir, f)).href + '?t=' + Date.now());
    t = String(m.default || '');
    stats.importOk++;
  } catch (e) {
    issues.push({ f, sev: 'error', msg: `import失败: ${e.message.split('\n')[0].slice(0, 80)}` });
    continue;
  }

  const map2Heads = [...t.matchAll(/^## .*(?:导图2|知識導圖2|知识导图2).*$/gm)].map((m) => m[0]);
  const h2Map2 = [...t.matchAll(/^## 导图2.*$/gm)].map((m) => m[0]);

  if (/学会之后（验收）/.test(t) || (/学会之后/.test(t) && /成功信号/.test(t))) stats.accept++;
  else issues.push({ f, sev: 'warn', msg: '缺「学会之后（验收）」表' });

  if (h2Map2.length) stats.map2++;
  else issues.push({ f, sev: 'warn', msg: '缺 ## 导图2' });

  if (t.includes('## 导图2 · 词表对照')) {
    stats.genericMap2++;
    issues.push({ f, sev: 'error', msg: '仍有泛用「词表对照」' });
  }
  if (t.includes('能用自己的话复述本课要钉死')) {
    stats.genericAccept++;
    issues.push({ f, sev: 'warn', msg: '验收仍是底线模板' });
  }
  if (/本课专业落点|本框专业落点|本仓专业落点|本练习落点/.test(t)) stats.map2Pro++;
  else if (h2Map2.length) issues.push({ f, sev: 'warn', msg: '有导图2但无「专业落点」列（可能用了别的表头）' });

  if (h2Map2.length > 1) {
    stats.multiMap2++;
    issues.push({ f, sev: 'warn', msg: `多个 ## 导图2（${h2Map2.length}）: ${h2Map2.join(' | ')}` });
  }

  // soft leftover that may duplicate professional map2
  if (/## 与 Vibe Coding\b|## 和 Vibe Coding|## 结合知识导图2|## 与知识导图2/.test(t)) {
    stats.softVibe++;
    issues.push({ f, sev: 'info', msg: '仍有旧式「与 Vibe/导图2」软段（可能与文末专业表重复）' });
  }

  // 截断：末行以 | 开头却未闭合，或停在表头「专业落点 |」而无数据行
  {
    const lines = t.trim().split('\n');
    const last = lines[lines.length - 1] || '';
    const prev = lines[lines.length - 2] || '';
    const unclosed = /^\|[^|\n]*$/.test(last);
    const headerOnly =
      /专业落点\s*\|\s*$/.test(last) ||
      (/^\|[-:| ]+\|\s*$/.test(last) && /专业落点/.test(prev));
    if (unclosed || headerOnly) {
      issues.push({ f, sev: 'error', msg: '疑似表格被截断' });
    }
  }

  // unescaped fence risk already caught by import

  if (f.startsWith('chapter-') && !/## 学会之后（验收）/.test(t)) {
    issues.push({ f, sev: 'warn', msg: '章概览缺标准验收标题' });
  }
}

console.log('=== 统计 ===');
console.log(JSON.stringify(stats, null, 2));

const bySev = { error: [], warn: [], info: [] };
for (const i of issues) bySev[i.sev]?.push(i);

for (const sev of ['error', 'warn', 'info']) {
  const list = bySev[sev];
  console.log(`\n=== ${sev} (${list.length}) ===`);
  for (const i of list.slice(0, 60)) console.log(`${i.f}\t${i.msg}`);
  if (list.length > 60) console.log(`… +${list.length - 60}`);
}
