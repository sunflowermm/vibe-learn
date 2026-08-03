/**
 * 按审计规则清洗 bank/{domain}.js：删除 fail 级题目后重写。
 * node scripts/clean-quiz-bank.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { choiceLooksLikeFiller } from '../src/data/quiz/schema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const bankDir = path.join(root, 'src/data/quiz/bank');

const BAD_Q_PATTERNS = [
  /定位副标题是/,
  /最贴合「.+」的定义/,
  /^识别术语：/,
];

function esc(s) {
  return JSON.stringify(s);
}

function renderQuestion(q) {
  const lines = ['  {'];
  lines.push(`    id: ${esc(q.id)},`);
  lines.push(`    q: ${esc(q.q)},`);
  lines.push('    choices: [');
  for (const c of q.choices) {
    const why = c.why ? `, why: ${esc(c.why)}` : '';
    lines.push(`      { t: ${esc(c.t)}, ok: ${c.ok ? 'true' : 'false'}${why} },`);
  }
  lines.push('    ],');
  lines.push(`    kind: ${esc(q.kind)},`);
  lines.push(`    domain: ${esc(q.domain)},`);
  if (q.tags?.length) lines.push(`    tags: ${esc(q.tags)},`);
  if (q.relatedNodes?.length) {
    lines.push(`    relatedNodes: ${esc(q.relatedNodes.slice(0, 3))},`);
  }
  lines.push(`    source: 'static',`);
  if (q.setId) lines.push(`    setId: ${esc(q.setId)},`);
  lines.push('  }');
  return lines.join('\n');
}

function renderFile(domain, questions) {
  const body = questions.map(renderQuestion).join(',\n');
  return `/**
 * 静态题库 · ${domain}
 * 人工可审；勿在运行时再 derive。改题直接改本文件。
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
${body}
];
`;
}

function isFail(q, getNodeById) {
  if (!q.q || q.q.length < 8) return true;
  if (BAD_Q_PATTERNS.some((re) => re.test(q.q))) return true;
  if (!q.choices || q.choices.length !== 4) return true;
  if (q.choices.filter((c) => c.ok).length !== 1) return true;
  if (q.choices.some((c) => choiceLooksLikeFiller(c.t))) return true;
  for (const id of q.relatedNodes || []) {
    if (!getNodeById(id)) return true;
  }
  // 「相关课」纯标签识别题也弱
  if (/最相关的课程更接近/.test(q.q)) return true;
  return false;
}

async function main() {
  const { getNodeById } = await import(
    pathToFileURL(path.join(root, 'src/data/nodes.js')).href
  );

  const domains = ['dsa', 'net', 'os-db', 'lang', 'craft', 'xrk', 'ai', 'ops'];
  let kept = 0;
  let dropped = 0;

  for (const d of domains) {
    const mod = await import(pathToFileURL(path.join(bankDir, `${d}.js`)).href + `?t=${Date.now()}`);
    const before = mod.QUESTIONS || [];
    const after = before.filter((q) => {
      if (isFail(q, getNodeById)) {
        dropped += 1;
        return false;
      }
      // 收紧 relatedNodes
      q.relatedNodes = (q.relatedNodes || []).slice(0, 3);
      return true;
    });
    kept += after.length;
    after.sort((a, b) => String(a.id).localeCompare(String(b.id)));
    fs.writeFileSync(path.join(bankDir, `${d}.js`), renderFile(d, after), 'utf8');
    console.log(`${d}: ${before.length} → ${after.length}`);
  }

  console.log(`kept ${kept}, dropped ${dropped}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
