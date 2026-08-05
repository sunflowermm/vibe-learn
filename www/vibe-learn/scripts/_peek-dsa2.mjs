import fs from 'node:fs';
const n = fs.readFileSync('src/data/nodes.js', 'utf8');
let i = 0;
const hits = [];
while ((i = n.indexOf('dsa', i)) !== -1) {
  hits.push(i);
  i += 1;
  if (hits.length > 30) break;
}
const a = n.indexOf('import dsaComplexity');
console.log('import block:\n', n.slice(a >= 0 ? a : n.indexOf('dsaComplexity'), a + 500));
const ch = n.indexOf("label: '番外 · 数据结构");
console.log('chapter:\n', n.slice(ch - 120, ch + 450));
