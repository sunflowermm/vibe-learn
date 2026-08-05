/**
 * glossary / terms-by-node / 课内 ```term 一致性审计
 * node scripts/_glossary-terms-audit.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { knowledgeNodes } from '../src/data/nodes.js';
import {
  GLOSSARY,
  resolveGlossary,
  VIBEHUB_GLOSSARY_MERGE,
} from '../src/data/glossary.js';
import { NODE_TERMS } from '../src/data/terms-by-node.js';

void VIBEHUB_GLOSSARY_MERGE;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lessonsDir = path.join(root, 'src/data/lessons');

const glossaryKeys = new Set(Object.keys(GLOSSARY));
const missingInGlossary = [];
const orphanTermsByNode = [];
const nodesMissingTerms = [];
const termFenceUnknown = [];

for (const [nodeId, ids] of Object.entries(NODE_TERMS || {})) {
  if (!knowledgeNodes.some((n) => n.id === nodeId)) {
    orphanTermsByNode.push(nodeId);
  }
  for (const id of ids || []) {
    const resolved = resolveGlossary([id]);
    if (!resolved?.length) {
      missingInGlossary.push({ nodeId, id });
    }
  }
}

for (const n of knowledgeNodes) {
  if (n.kind === 'chapter') continue;
  const listed = NODE_TERMS[n.id];
  if (!listed || !listed.length) nodesMissingTerms.push(n.id);
}

const termFenceRe = /```term\s*\n([\s\S]*?)```/g;
for (const n of knowledgeNodes) {
  const fp = path.join(lessonsDir, `${n.id}.js`);
  if (!fs.existsSync(fp)) continue;
  const raw = fs.readFileSync(fp, 'utf8');
  let m;
  while ((m = termFenceRe.exec(raw))) {
    try {
      const data = JSON.parse(m[1]);
      const ids = Array.isArray(data)
        ? data.map((x) => x.id || x).filter(Boolean)
        : data.ids || data.terms || [];
      for (const id of ids) {
        if (!glossaryKeys.has(id)) {
          const resolved = resolveGlossary([id]);
          if (!resolved?.length) termFenceUnknown.push({ nodeId: n.id, id });
        }
      }
    } catch {
      /* ignore malformed */
    }
  }
}

const dump = {
  generatedAt: new Date().toISOString(),
  glossaryCount: glossaryKeys.size,
  termsByNodeKeys: Object.keys(NODE_TERMS || {}).length,
  missingInGlossary: missingInGlossary.slice(0, 40),
  missingInGlossaryCount: missingInGlossary.length,
  orphanTermsByNode,
  nodesMissingTerms: nodesMissingTerms.slice(0, 40),
  nodesMissingTermsCount: nodesMissingTerms.length,
  termFenceUnknown: termFenceUnknown.slice(0, 40),
  termFenceUnknownCount: termFenceUnknown.length,
};

fs.writeFileSync(
  path.join(root, 'scripts/_glossary-terms-audit.json'),
  JSON.stringify(dump, null, 2)
);
console.log(JSON.stringify({
  glossaryCount: dump.glossaryCount,
  termsByNodeKeys: dump.termsByNodeKeys,
  missingInGlossaryCount: dump.missingInGlossaryCount,
  orphanTermsByNode: dump.orphanTermsByNode.length,
  nodesMissingTermsCount: dump.nodesMissingTermsCount,
  termFenceUnknownCount: dump.termFenceUnknownCount,
}, null, 2));
if (dump.missingInGlossary.length) console.log('missing sample', dump.missingInGlossary.slice(0, 10));
if (dump.termFenceUnknown.length) console.log('fence unknown', dump.termFenceUnknown.slice(0, 10));
if (dump.nodesMissingTerms.length) console.log('no terms-by-node', dump.nodesMissingTerms.slice(0, 15));
