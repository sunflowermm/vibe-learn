/**
 * 删掉弱关联课文末「## 导图2」短表（一次性）
 * node scripts/strip-weak-map2-tails.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src/data/lessons');

/** 与 map-bridges NO_BRIDGE / 弱挂接一致 */
const STRIP = new Set([
  'computer-system',
  'hw-sw-link',
  'chip-units',
  'chapter-machine',
  'chapter-esp',
  'chapter-dsa',
  'esp-mcu',
  'esp-esp32',
  'esp-toolchain',
  'esp-link',
  'dsa-complexity',
  'dsa-linear',
  'dsa-hash',
  'dsa-tree',
  'dsa-graph',
  'dsa-sort',
  'dsa-dp',
  'dsa-hot',
]);

const RE = /\n## 导图2[\s\S]*$/;

let n = 0;
for (const id of STRIP) {
  const fp = path.join(dir, `${id}.js`);
  if (!fs.existsSync(fp)) {
    console.warn('missing', id);
    continue;
  }
  const raw = fs.readFileSync(fp, 'utf8');
  if (!RE.test(raw)) {
    console.warn('no tail', id);
    continue;
  }
  let next = raw.replace(RE, '\n');
  if (!/`;\s*$/.test(next)) {
    next = next.replace(/\s*$/, '\n`;\n');
  }
  fs.writeFileSync(fp, next, 'utf8');
  n += 1;
  console.log('stripped', id);
}
console.log('done', n);
