/**
 * 文末若停在导图2 表行：补一句边界（避免「删 flip 后硬截断」感）
 * node www/vibe-learn/scripts/_close-map2-tails.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');
const CLOSER =
  '\n短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。\n';

function escTpl(plain) {
  return String(plain).replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${');
}

let n = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js') && !x.startsWith('vh-'))) {
  const body = String(
    (await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}`)).default || ''
  );
  const i = body.search(/^## 导图2/m);
  if (i < 0) continue;
  const tail = body.slice(i).trimEnd();
  if (/跨导图|自动附录|验收与禁区仍以本课为准/.test(tail.slice(-120))) continue;
  // ends with a markdown table row, no flip/check/decide after last table
  if (!/\|[^\n]+\|\s*$/.test(tail)) continue;
  if (/```(?:flip|quiz|check|decide)\n[\s\S]*\|[^\n]+\|\s*$/.test(tail)) {
    // widget after table somehow then table again — skip
  }
  const afterTable = tail.split('\n').reverse();
  let sawTable = false;
  let hasWidgetAfter = false;
  for (const line of afterTable) {
    if (/^\|/.test(line)) {
      sawTable = true;
      continue;
    }
    if (!sawTable && /```/.test(line)) {
      hasWidgetAfter = true;
      break;
    }
    if (sawTable) break;
  }
  if (hasWidgetAfter) continue;
  // only close if last substantive block is the map2 table
  const lastNonEmpty = tail.split('\n').filter((l) => l.trim()).pop() || '';
  if (!/^\|/.test(lastNonEmpty)) continue;
  if (/^\|[-:| ]+\|$/.test(lastNonEmpty)) continue;
  const next = body.replace(/\s*$/, CLOSER);
  fs.writeFileSync(path.join(dir, f), `export default \`${escTpl(next)}\`;\n`);
  n++;
  console.log('close', f);
}
console.log(JSON.stringify({ closed: n }));
