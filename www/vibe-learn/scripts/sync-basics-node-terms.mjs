/**
 * 按 glossary.also 把基础全表名词补进 NODE_TERMS（安全：按括号配对，不整段删）
 * node scripts/sync-basics-node-terms.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const termsPath = path.join(root, 'src/data/terms-by-node.js');
const glossPath = path.join(root, 'src/data/glossary.js');

const PREFIX =
  /^(http_\d+|cli_|http_m_|http_hdr_|git_cmd_|docker_cmd_|sql_kw_|shell_op_|pnpm_cmd_|port_|cookie_|cors_|cache_|env_kw_|nginx_dir_|compose_kw_|dsa_lin_|dsa_o_|dsa_hash_|dsa_tree_|dsa_sort_|dsa_graph_|sec_kw_)/;

const { GLOSSARY } = await import(pathToFileURL(glossPath).href + `?t=${Date.now()}`);

/** @type {Record<string, string[]>} */
const byNode = {};
for (const [id, e] of Object.entries(GLOSSARY)) {
  if (!PREFIX.test(id)) continue;
  for (const n of e.also || []) {
    byNode[n] ||= [];
    if (!byNode[n].includes(id)) byNode[n].push(id);
  }
}

let src = fs.readFileSync(termsPath, 'utf8');
// 清历史双逗号
src = src.replace(/,(\s*),/g, ',$1');

/**
 * @param {string} s
 * @param {number} openIdx index of '['
 */
function findMatchingBracket(s, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < s.length; i++) {
    const c = s[i];
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/**
 * @param {string} s
 * @param {string} node
 * @param {string[]} keys
 */
function patchNode(s, node, keys) {
  const patterns = [`'${node}'`, node];
  let keyIdx = -1;
  let used = '';
  for (const p of patterns) {
    // 要求键后紧跟冒号，避免子串误伤
    const re = new RegExp(`(?:^|\\n)\\s*(${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*:`);
    const m = re.exec(s);
    if (m) {
      keyIdx = m.index + m[0].indexOf(m[1]);
      used = m[1];
      break;
    }
  }
  if (keyIdx < 0) {
    // 节点不存在则在 NODE_TERMS 闭合前追加
    console.warn('append new node', node);
    const end = s.lastIndexOf('\n};');
    const body = keys.map((k) => `    '${k}'`).join(',\n');
    return s.slice(0, end) + `\n  '${node}': [\n${body},\n  ],` + s.slice(end);
  }

  const afterKey = s.indexOf(':', keyIdx);
  const openIdx = s.indexOf('[', afterKey);
  const closeIdx = findMatchingBracket(s, openIdx);
  if (openIdx < 0 || closeIdx < 0) {
    console.warn('bad brackets', node);
    return s;
  }

  const inner = s.slice(openIdx + 1, closeIdx);
  const existing = new Set([...inner.matchAll(/'([^']+)'/g)].map((m) => m[1]));
  const add = keys.filter((k) => !existing.has(k));
  if (!add.length) return s;

  const multiline = inner.includes('\n');
  let nextInner;
  if (multiline) {
    let trimmed = inner.replace(/\s*$/, '');
    if (trimmed.trim() && !/,\s*$/.test(trimmed)) trimmed += ',';
    nextInner = `${trimmed}\n    ${add.map((k) => `'${k}'`).join(',\n    ')}\n  `;
  } else {
    let trimmed = inner.replace(/\s*$/, '').trim();
    if (trimmed && !trimmed.endsWith(',')) trimmed += ',';
    nextInner = ` ${trimmed} ${add.map((k) => `'${k}'`).join(', ')} `;
  }

  return s.slice(0, openIdx + 1) + nextInner + s.slice(closeIdx);
}

for (const [node, keys] of Object.entries(byNode)) {
  src = patchNode(src, node, keys);
}

fs.writeFileSync(termsPath, src);

const { NODE_TERMS } = await import(pathToFileURL(termsPath).href + `?t=${Date.now()}`);
const all = new Set(Object.values(NODE_TERMS).flat());
const missing = Object.keys(GLOSSARY).filter((k) => PREFIX.test(k) && !all.has(k));
console.log(
  'synced nodes',
  Object.keys(byNode).length,
  'basics keys',
  Object.keys(GLOSSARY).filter((k) => PREFIX.test(k)).length,
  'still missing',
  missing.length
);
if (missing.length) console.log(missing.join(', '));
console.log('craft-security sample', NODE_TERMS['craft-security']?.slice(-8));
console.log('dsa-linear', NODE_TERMS['dsa-linear']);
