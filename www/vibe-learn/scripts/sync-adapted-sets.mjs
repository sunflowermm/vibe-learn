/**
 * 从 bank/adapted-*.js 同步生成 sets/interview-adapted-*.js
 * pnpm run quiz:sync-sets
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bankDir = path.join(root, 'src/data/quiz/bank');
const setsDir = path.join(root, 'src/data/quiz/sets');

function esc(s) {
  return JSON.stringify(s);
}

function emitSet(meta, questions) {
  const lines = [];
  lines.push(`import { defineQuizSet } from '../schema.js';`);
  lines.push('');
  lines.push(`/**`);
  lines.push(` * 系统非原创 · AI 全栈向 · 中文改编`);
  lines.push(` * 来源：${meta.attribution}`);
  lines.push(` * ${meta.attributionUrl}`);
  lines.push(` */`);
  lines.push(`export default defineQuizSet({`);
  lines.push(`  id: ${esc(meta.id)},`);
  lines.push(`  title: ${esc(meta.title)},`);
  lines.push(`  kind: ${esc(meta.kind)},`);
  lines.push(`  domain: ${esc(meta.domain)},`);
  lines.push(`  tags: ${esc(meta.tags)},`);
  lines.push(`  relatedNodes: ${esc(meta.relatedNodes)},`);
  lines.push(`  caption: ${esc(meta.caption)},`);
  lines.push(`  origin: 'adapted',`);
  lines.push(`  attribution: ${esc(meta.attribution)},`);
  lines.push(`  attributionUrl: ${esc(meta.attributionUrl)},`);
  lines.push(`  questions: [`);
  for (const q of questions) {
    lines.push(`    {`);
    lines.push(`      id: ${esc(q.id)},`);
    lines.push(`      q: ${esc(q.q)},`);
    lines.push(`      choices: [`);
    for (const c of q.choices) {
      lines.push(
        `        { t: ${esc(c.t)}, ok: ${Boolean(c.ok)}, why: ${esc(c.why || '')} },`
      );
    }
    lines.push(`      ],`);
    lines.push(`      relatedNodes: ${esc(q.relatedNodes || [])},`);
    lines.push(`      origin: 'adapted',`);
    lines.push(`      attribution: ${esc(meta.attribution)},`);
    lines.push(`      attributionUrl: ${esc(meta.attributionUrl)},`);
    lines.push(`    },`);
  }
  lines.push(`  ],`);
  lines.push(`});`);
  lines.push('');
  return lines.join('\n');
}

const TITLE = {
  'interview-adapted-landed-security': '开源改编 · RAG 安全与多租户',
  'interview-adapted-landed-retrieval': '开源改编 · RAG 检索架构',
  'interview-adapted-landed-embeddings': '开源改编 · Embedding 实务',
  'interview-adapted-landed-chunking': '开源改编 · 分块策略',
  'interview-adapted-landed-reranking': '开源改编 · 重排序',
  'interview-adapted-landed-evaluation': '开源改编 · RAG 评测',
  'interview-adapted-landed-production': '开源改编 · RAG 生产化',
};

/** 选项里塞了 Markdown 表格/代码块/框线的 guo 包，默认不同步；强制：`pnpm quiz:sync-sets guo-rag` */
const SKIP_BANK = new Set([
  'adapted-guo-rag.js',
  'adapted-guo-agent.js',
  'adapted-guo-prompt.js',
  'adapted-guo-mcp.js',
  'adapted-guo-multi-agent.js',
  'adapted-guo-prod.js',
  'adapted-guo-rag-adv.js',
  'adapted-guo-sys.js',
]);

async function main() {
  const only = process.argv.slice(2);
  const files = fs
    .readdirSync(bankDir)
    .filter((n) => n.startsWith('adapted-') && n.endsWith('.js'))
    .filter((n) => !only.length || only.some((x) => n.includes(x)))
    .filter((n) => only.length || !SKIP_BANK.has(n));

  for (const name of files) {
    const mod = await import(pathToFileURL(path.join(bankDir, name)).href + `?t=${Date.now()}`);
    const qs = mod.QUESTIONS || [];
    if (!qs.length) continue;
    const setId = qs[0].setId;
    const related = [...new Set(qs.flatMap((q) => q.relatedNodes || []))].slice(0, 3);
    const meta = {
      id: setId,
      title: TITLE[setId] || `开源改编 · ${setId.replace(/^interview-adapted-/, '')}`,
      kind: qs[0].kind || 'interview',
      domain: qs[0].domain || 'ai',
      tags: [...new Set(qs.flatMap((q) => q.tags || []))].slice(0, 8),
      relatedNodes: related,
      caption: `系统非原创 · AI 全栈向 · 中文 · ${qs[0].attribution || ''}`,
      attribution: qs[0].attribution || '',
      attributionUrl: qs[0].attributionUrl || '',
    };
    fs.writeFileSync(path.join(setsDir, `${setId}.js`), emitSet(meta, qs), 'utf8');
    console.log('synced', setId, qs.length);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
