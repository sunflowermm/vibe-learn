/**
 * 按导图细节点重绑全部 adapted bank 的 relatedNodes，再 sync sets。
 * pnpm exec node scripts/rebind-adapted-nodes.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { inferRelated } from './lib/infer-related.mjs';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bankDir = path.join(root, 'src/data/quiz/bank');

async function main() {
  const files = fs
    .readdirSync(bankDir)
    .filter((n) => n.startsWith('adapted-') && n.endsWith('.js'));
  let changed = 0;
  for (const name of files) {
    const file = path.join(bankDir, name);
    const mod = await import(pathToFileURL(file).href + `?t=${Date.now()}`);
    const qs = mod.QUESTIONS || [];
    let dirty = false;
    for (const q of qs) {
      const hay = [q.q, ...(q.choices || []).map((c) => `${c.t} ${c.why || ''}`)].join('\n');
      const next = inferRelated(hay);
      const prev = JSON.stringify(q.relatedNodes || []);
      if (JSON.stringify(next) !== prev) {
        q.relatedNodes = next;
        dirty = true;
        changed += 1;
      }
    }
    if (!dirty) continue;
    const body = `/**
 * 改编题库 · ${qs[0]?.setId || name}
 * 系统非原创 · AI 全栈向 · 中文 · ${qs[0]?.attribution || ''}
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = ${JSON.stringify(qs, null, 2)};
`;
    fs.writeFileSync(file, body, 'utf8');
    console.log('rebound', name, qs.length);
  }
  console.log('questions rebound', changed);
  const r = spawnSync(process.execPath, ['scripts/sync-adapted-sets.mjs'], {
    cwd: root,
    stdio: 'inherit',
  });
  if (r.status) process.exit(r.status);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
