/**
 * IWF 尖峰 + 课文短题干清单
 * node scripts/_audit-iwf-lesson.mjs
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { knowledgeNodes } from '../src/data/nodes.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { listQuestions } = await import(
  pathToFileURL(path.join(root, 'src/data/quiz/bank.js')).href
);

const all = listQuestions();
const product = all.filter(
  (q) =>
    q.source !== 'adapted' &&
    !String(q.setId || '').startsWith('vibehub') &&
    !String(q.id || '').startsWith('g:')
);

const iwf = [];
for (const q of product) {
  const oks = (q.choices || []).filter((c) => c.ok);
  const wrongs = (q.choices || []).filter((c) => !c.ok);
  if (oks.length !== 1 || wrongs.length !== 3) continue;
  const okLen = [...String(oks[0].t || '')].length;
  const maxOther = Math.max(...wrongs.map((c) => [...String(c.t || '')].length), 0);
  const diff = okLen - maxOther;
  if (diff >= 12 && okLen >= 28) {
    iwf.push({
      id: q.id,
      setId: q.setId,
      source: q.source,
      okLen,
      maxOther,
      diff,
      ok: oks[0].t,
      wrongs: wrongs.map((c) => c.t),
    });
  }
}
iwf.sort((a, b) => b.diff - a.diff);

const QUIZ_RE = /```quiz\s*\n([\s\S]*?)```/gi;
const shortStems = [];
for (const node of knowledgeNodes) {
  const md = String(node.markdown || '');
  if (!md.includes('```quiz')) continue;
  QUIZ_RE.lastIndex = 0;
  let m;
  let bi = 0;
  while ((m = QUIZ_RE.exec(md))) {
    bi += 1;
    let parsed;
    try {
      parsed = JSON.parse(m[1].trim());
    } catch {
      continue;
    }
    for (const [qi, q] of (parsed.questions || []).entries()) {
      const stem = String(q?.q || '').trim();
      if (stem.length <= 18 && /[？?]$/.test(stem)) {
        shortStems.push({
          nodeId: node.id,
          qi: qi + 1,
          stem,
          len: [...stem].length,
        });
      }
    }
  }
}

console.log('IWF severe', iwf.length);
console.log('lesson short stems', shortStems.length);
console.log('\n=== IWF TOP 25 ===');
for (const x of iwf.slice(0, 25)) {
  console.log(
    `\n${x.id} diff=${x.diff} ok=${x.okLen} maxW=${x.maxOther}\n  OK: ${x.ok}\n  W: ${x.wrongs.join(' | ')}`
  );
}
console.log('\n=== SHORT STEMS ===');
for (const s of shortStems) console.log(JSON.stringify(s));

fs.writeFileSync(
  path.join(root, 'scripts/_iwf-lesson.json'),
  JSON.stringify({ iwf: iwf.slice(0, 40), shortStems }, null, 2),
  'utf8'
);
