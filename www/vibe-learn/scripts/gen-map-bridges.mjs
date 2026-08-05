/**
 * 生成导图1 ↔ 导图2 全量桥接：node scripts/gen-map-bridges.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { knowledgeNodes, graphFrames } from '../src/data/nodes.js';
import { VIBEHUB_TERM_CARDS, VIBEHUB_MACRO_FRAMES } from '../src/data/vibehub/graph-pack.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/（[^）]*）|\([^)]*\)/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '')
    .trim();

const termById = new Map(VIBEHUB_TERM_CARDS.map((t) => [t.id, t]));
const index = new Map();
for (const t of VIBEHUB_TERM_CARDS) {
  for (const k of [norm(t.lessonId), norm(t.label), norm(String(t.label).split('（')[0])]) {
    if (k && !index.has(k)) index.set(k, t);
  }
}

/** 手工高优：导图1 id → 导图2 ids；空数组 = 明确不挂 */
const NO_BRIDGE = new Set([
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

const MANUAL = {
  'knowledge-hub': ['vh-hub', 'vh-vibe-coding', 'vh-frame-ai'],
  'os-essence': ['vh-terminal', 'vh-env-var'],
  'terminal-worlds': ['vh-terminal'],
  'linux-distros': ['vh-terminal', 'vh-env-var'],
  'linux-cli': ['vh-terminal', 'vh-env-var'],
  'runtime-nodejs': ['vh-javascript', 'vh-npm', 'vh-env-var'],
  'installers-path': ['vh-env-var', 'vh-terminal', 'vh-npm'],
  'package-managers': ['vh-npm', 'vh-build', 'vh-ci'],
  'git-workspace': ['vh-git', 'vh-clone', 'vh-frame-git'],
  'git-forges': ['vh-pull-request', 'vh-git', 'vh-push'],
  'git-advanced': ['vh-branch', 'vh-merge', 'vh-pull-request', 'vh-stash', 'vh-worktree'],
  'workbench-editor': ['vh-terminal', 'vh-diff', 'vh-git'],
  'workbench-troubleshoot': ['vh-terminal', 'vh-server-log', 'vh-monitoring'],
  'xrk-first-run': ['vh-npm', 'vh-terminal', 'vh-env-var'],
  'lang-what-is-language': ['vh-javascript', 'vh-typescript', 'vh-python'],
  'lang-library-framework': ['vh-vue', 'vh-react', 'vh-tech-stack', 'vh-backend-framework'],
  'lang-tech-stack': ['vh-tech-stack', 'vh-frontend', 'vh-backend'],
  'lang-tech-selection': ['vh-tech-stack', 'vh-mvp', 'vh-prd'],
  'lang-compiled-runtime': ['vh-javascript', 'vh-typescript', 'vh-build'],
  'lang-landscape': ['vh-javascript', 'vh-python', 'vh-typescript', 'vh-tech-stack'],
  'lang-javascript': ['vh-javascript', 'vh-html'],
  'lang-nodejs': ['vh-javascript', 'vh-npm', 'vh-backend'],
  'lang-typescript': ['vh-typescript', 'vh-javascript'],
  'lang-python': ['vh-python'],
  'lang-html-css': ['vh-html', 'vh-frontend', 'vh-typography'],
  'lang-shell': ['vh-terminal'],
  'lang-powershell': ['vh-terminal'],
  'lang-go': ['vh-backend', 'vh-tech-stack'],
  'lang-rust': ['vh-tech-stack', 'vh-backend'],
  'lang-java': ['vh-backend', 'vh-backend-framework'],
  'lang-csharp': ['vh-backend', 'vh-backend-framework'],
  'lang-php': ['vh-backend'],
  'lang-c': ['vh-tech-stack'],
  'lang-to-runtime': ['vh-javascript', 'vh-backend', 'vh-tech-stack'],
  'fw-vue': ['vh-vue', 'vh-javascript', 'vh-frontend'],
  'fw-react': ['vh-react', 'vh-javascript', 'vh-frontend'],
  'fw-angular': ['vh-frontend', 'vh-javascript', 'vh-typescript'],
  'fw-nextjs': ['vh-nextjs', 'vh-react'],
  'fw-spring': ['vh-backend-framework', 'vh-backend'],
  'fw-express-nest': ['vh-backend-framework', 'vh-javascript', 'vh-route'],
  'fw-django-fastapi': ['vh-backend-framework', 'vh-python'],
  'fw-gin': ['vh-backend-framework', 'vh-backend'],
  'fw-aspnet': ['vh-backend-framework', 'vh-backend'],
  'fw-laravel': ['vh-backend-framework', 'vh-backend'],
  'api-frontend': ['vh-http', 'vh-json', 'vh-cors', 'vh-route', 'vh-frontend'],
  'network-basics': ['vh-http', 'vh-dns', 'vh-url'],
  'protocol-stack': ['vh-http', 'vh-https', 'vh-dns'],
  'ip-addressing': ['vh-dns', 'vh-domain', 'vh-port'],
  'tcp-udp': ['vh-http', 'vh-port'],
  'routing-nat': ['vh-dns'],
  'http-web': ['vh-http', 'vh-https', 'vh-url', 'vh-redirect'],
  'dns-https': ['vh-dns', 'vh-https', 'vh-domain'],
  'reverse-proxy': ['vh-cdn', 'vh-redirect', 'vh-https'],
  'net-nginx': ['vh-cdn', 'vh-https', 'vh-redirect', 'vh-deployment'],
  'net-edge-practice': ['vh-cdn', 'vh-dns', 'vh-domain'],
  'xrk-overview': ['vh-tech-stack', 'vh-mvp'],
  'xrk-biz-map': ['vh-user-flow', 'vh-prd'],
  'xrk-runtime': ['vh-javascript', 'vh-backend'],
  'xrk-core-layout': ['vh-component', 'vh-tech-stack'],
  'xrk-plugin-arch': ['vh-component', 'vh-backend'],
  'xrk-language-stack': ['vh-tech-stack', 'vh-javascript', 'vh-python'],
  'xrk-http-www': ['vh-http', 'vh-frontend', 'vh-route'],
  'xrk-subserver': ['vh-backend', 'vh-route'],
  'xrk-stream': ['vh-streaming-response', 'vh-http'],
  'xrk-deploy-env': ['vh-deployment', 'vh-env-var', 'vh-ci', 'vh-cd'],
  'xrk-min-path': ['vh-mvp', 'vh-git', 'vh-pull-request'],
  'xrk-chat-pipeline': ['vh-chat-ui', 'vh-streaming-response', 'vh-ai-agent'],
  'xrk-agent-workspace': ['vh-ai-agent', 'vh-context-engineering', 'vh-skill'],
  'ai-what': ['vh-ai-basics', 'vh-hub'],
  'ai-token-context': ['vh-token', 'vh-context-window'],
  'ai-attention': ['vh-ai-basics', 'vh-token'],
  'ai-transformer': ['vh-ai-basics', 'vh-multimodal'],
  'ai-llm-era': ['vh-ai-basics', 'vh-token'],
  'ai-chat-era': ['vh-conversation-history', 'vh-chat-ui'],
  'ai-tool-calling': ['vh-tool-calling', 'vh-mcp'],
  'ai-mcp': ['vh-mcp', 'vh-tool-calling'],
  'ai-agent-birth': ['vh-ai-agent', 'vh-agent-loop'],
  'ai-agent-memory': ['vh-context-engineering', 'vh-conversation-history'],
  'ai-agent-planning': ['vh-react-pattern', 'vh-agent-loop'],
  'ai-agent-graph': ['vh-ai-agent', 'vh-sub-agent'],
  'ai-agents-md': ['vh-skill', 'vh-system-prompt'],
  'ai-skills': ['vh-skill', 'vh-system-prompt'],
  'ai-rules': ['vh-system-prompt', 'vh-skill'],
  'ai-subagent': ['vh-sub-agent', 'vh-ai-agent'],
  'ai-cli': ['vh-terminal', 'vh-vibe-coding', 'vh-ai-agent'],
  'ai-rag': ['vh-context-engineering', 'vh-ai-basics'],
  'ai-embedding': ['vh-ai-basics', 'vh-multimodal'],
  'ai-vector-store': ['vh-database', 'vh-ai-basics'],
  'ai-chunking': ['vh-context-engineering', 'vh-token'],
  'ai-hybrid-search': ['vh-ai-basics'],
  'ai-rerank': ['vh-ai-basics'],
  'ai-rag-eval': ['vh-ai-basics', 'vh-test-case'],
  'ai-rag-shift': ['vh-context-engineering'],
  'ai-agentic-rag': ['vh-ai-agent', 'vh-tool-calling'],
  'ai-finetune': ['vh-ai-basics'],
  'ai-model-types': ['vh-ai-basics', 'vh-multimodal'],
  'ai-openai-protocol': ['vh-structured-output', 'vh-stateless-request'],
  'ai-protocol-forks': ['vh-structured-output'],
  'ai-prompt-security': ['vh-system-prompt', 'vh-ai-hallucination'],
  'ai-adaptation': ['vh-ai-basics'],
  'ai-arch-beyond': ['vh-ai-agent', 'vh-harness-engineering'],
  'ai-pi-agent': ['vh-ai-agent', 'vh-agent-loop'],
  'adev-vibe-coding': ['vh-vibe-coding', 'vh-ai-agent', 'vh-ai-basics', 'vh-hub'],
  'adev-compare': ['vh-hub', 'vh-ai-agent', 'vh-harness-engineering'],
  'adev-project-memory': ['vh-skill', 'vh-system-prompt', 'vh-context-engineering'],
  'craft-debug': ['vh-server-log', 'vh-monitoring'],
  'craft-security': ['vh-authentication', 'vh-authorization', 'vh-env-var'],
  'craft-ci': ['vh-ci', 'vh-cd', 'vh-lint', 'vh-test-case'],
  'ops-container': ['vh-deployment', 'vh-staging', 'vh-rollback'],
  'ops-compose': ['vh-deployment', 'vh-env-var'],
  'db-overview': ['vh-database', 'vh-sql'],
  'db-redis': ['vh-database'],
  'db-sqlite': ['vh-database', 'vh-sql'],
  'db-postgres': ['vh-database', 'vh-sql'],
  clash: ['vh-http', 'vh-port', 'vh-url'],
  'clash-port': ['vh-port', 'vh-http'],
  'fs-layout': ['vh-env-var', 'vh-terminal'],
  'fs-dotfiles': ['vh-env-var', 'vh-gitignore'],
  'panel-baota': ['vh-deployment', 'vh-domain'],
  'panel-1panel': ['vh-deployment', 'vh-domain'],
  'panel-compare': ['vh-deployment'],
  'panel-run-node': ['vh-javascript', 'vh-deployment', 'vh-env-var'],
  'host-systemd': ['vh-deployment', 'vh-monitoring'],
  'host-tls': ['vh-https', 'vh-domain'],
  'host-backup': ['vh-deployment', 'vh-rollback'],
  'code-first-program': ['vh-javascript', 'vh-terminal'],
  'code-checkpoint': ['vh-test-case', 'vh-javascript'],
};

const FRAME_MANUAL = {
  'chapter-env': ['vh-frame-technology', 'vh-frame-git', 'vh-terminal'],
  'chapter-code': ['vh-javascript', 'vh-terminal', 'vh-frame-technology'],
  'chapter-languages': ['vh-frame-technology', 'vh-frame-frontend', 'vh-tech-stack'],
  'chapter-computer-network': ['vh-http', 'vh-https', 'vh-dns', 'vh-cdn', 'vh-frame-backend'],
  'chapter-xrk-agt': ['vh-tech-stack', 'vh-deployment', 'vh-javascript', 'vh-mvp'],
  'chapter-ai': ['vh-frame-ai', 'vh-ai-basics', 'vh-ai-agent', 'vh-hub'],
  'chapter-clash': ['vh-http', 'vh-port', 'vh-url'],
  'chapter-database': ['vh-database', 'vh-sql', 'vh-frame-backend'],
  'chapter-ops': ['vh-deployment', 'vh-ci', 'vh-cd', 'vh-staging'],
  'chapter-fs': ['vh-env-var', 'vh-terminal', 'vh-gitignore'],
  'chapter-craft': ['vh-ci', 'vh-lint', 'vh-authentication'],
  'chapter-panel': ['vh-deployment', 'vh-domain'],
  'chapter-host': ['vh-deployment', 'vh-https', 'vh-monitoring'],
  'chapter-adev': ['vh-vibe-coding', 'vh-frame-ai', 'vh-hub'],
};

const CHAPTER_FALLBACK = {
  'chapter-env': ['vh-terminal', 'vh-npm', 'vh-git'],
  'chapter-code': ['vh-javascript', 'vh-terminal'],
  'chapter-languages': ['vh-tech-stack', 'vh-javascript', 'vh-frontend'],
  'chapter-computer-network': ['vh-http', 'vh-dns', 'vh-https'],
  'chapter-xrk-agt': ['vh-tech-stack', 'vh-deployment', 'vh-javascript'],
  'chapter-ai': ['vh-ai-basics', 'vh-ai-agent', 'vh-frame-ai'],
  'chapter-clash': ['vh-http', 'vh-port'],
  'chapter-database': ['vh-database', 'vh-sql'],
  'chapter-ops': ['vh-deployment', 'vh-ci'],
  'chapter-fs': ['vh-env-var', 'vh-terminal'],
  'chapter-craft': ['vh-ci', 'vh-lint'],
  'chapter-panel': ['vh-deployment'],
  'chapter-host': ['vh-deployment', 'vh-https'],
  'chapter-adev': ['vh-vibe-coding', 'vh-ai-agent'],
};

function labelOf(id) {
  if (id === 'vh-hub') return '导图2 · 枢纽';
  const f = VIBEHUB_MACRO_FRAMES.find((x) => x.id === id);
  if (f) return `导图2 · ${f.label}`;
  const t = termById.get(id);
  if (t) return String(t.label).replace(/（[^）]*）/g, '').trim() || t.label;
  return id;
}

function exists(id) {
  if (id === 'vh-hub') return true;
  if (termById.has(id)) return true;
  return VIBEHUB_MACRO_FRAMES.some((f) => f.id === id);
}

function uniq(ids) {
  const seen = new Set();
  const out = [];
  for (const id of ids) {
    if (!id || seen.has(id) || !exists(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out.slice(0, 6);
}

/** @type {Record<string, {id:string,label:string}[]>} */
const K2M = {};
/** @type {Record<string, {id:string,label:string}[]>} */
const M2K = {};

function addBridge(kid, vids) {
  const links = uniq(vids).map((id) => ({ id, label: labelOf(id) }));
  if (!links.length) return;
  K2M[kid] = links;
  for (const l of links) {
    if (!M2K[l.id]) M2K[l.id] = [];
    if (!M2K[l.id].some((x) => x.id === kid)) {
      const node =
        knowledgeNodes.find((n) => n.id === kid) || graphFrames.find((f) => f.id === kid);
      M2K[l.id].push({ id: kid, label: node?.label || kid });
    }
  }
}

for (const [kid, vids] of Object.entries(MANUAL)) addBridge(kid, vids);
for (const [kid, vids] of Object.entries(FRAME_MANUAL)) addBridge(kid, vids);

let auto = 0;
for (const n of knowledgeNodes) {
  if (NO_BRIDGE.has(n.id)) continue;
  if (K2M[n.id]) continue;
  const hits = [];
  for (const k of [norm(n.id), norm(n.label), norm(String(n.label).split('·')[0]), norm(n.subtitle)]) {
    const t = index.get(k);
    if (t) hits.push(t.id);
  }
  if (n.id.startsWith('ai-')) hits.push('vh-ai-basics', 'vh-frame-ai');
  if (n.id.startsWith('fw-')) hits.push('vh-frontend', 'vh-backend-framework');
  if (n.id.startsWith('lang-')) hits.push('vh-tech-stack');
  if (n.id.startsWith('db-')) hits.push('vh-database', 'vh-sql');
  if (n.id.startsWith('xrk-')) hits.push('vh-tech-stack', 'vh-javascript');
  if (n.id.startsWith('net-') || n.id.includes('http') || n.id.includes('dns')) {
    hits.push('vh-http', 'vh-dns');
  }
  if (n.id.startsWith('git-')) hits.push('vh-git');
  if (n.id.startsWith('ops-')) hits.push('vh-deployment');
  if (n.id.startsWith('craft-')) hits.push('vh-ci');
  if (n.id.startsWith('code-')) hits.push('vh-javascript');
  if (n.id.startsWith('panel-') || n.id.startsWith('host-')) hits.push('vh-deployment');
  if (n.id.startsWith('fs-')) hits.push('vh-env-var');
  /* esp / dsa：不挂宽词条兜底 */
  if (n.id.startsWith('esp-') || n.id.startsWith('dsa-')) continue;
  hits.push(...(CHAPTER_FALLBACK[n.parentId] || []));
  if (!hits.length) continue;
  addBridge(n.id, hits);
  auto += 1;
}

for (const f of graphFrames) {
  if (NO_BRIDGE.has(f.id)) continue;
  if (!K2M[f.id]) {
    const vids = FRAME_MANUAL[f.id];
    if (vids?.length) addBridge(f.id, vids);
  }
}

for (const id of Object.keys(M2K)) {
  M2K[id] = M2K[id].slice(0, 8);
}

const covered = knowledgeNodes.filter((n) => K2M[n.id]?.length).length;
const outPath = path.join(root, 'src/data/map-bridges.js');
const out = `/**
 * 知识导图 ↔ 知识导图2 全量桥接
 * 生成：node scripts/gen-map-bridges.mjs
 * 覆盖课卡 ${covered}/${knowledgeNodes.length} · 章框 ${graphFrames.length} · 自动补全 ${auto}
 * 手工校正见 map-bridges-overrides.js（gen 不覆盖）
 */

import { KNOWLEDGE_MAP2_OVERRIDES } from './map-bridges-overrides.js';

/** @typedef {{ id: string, label: string }} MapBridgeLink */

/** @type {Record<string, MapBridgeLink[]>} */
export const KNOWLEDGE_TO_MAP2 = ${JSON.stringify(K2M, null, 2)};

/** @type {Record<string, MapBridgeLink[]>} */
export const MAP2_TO_KNOWLEDGE = ${JSON.stringify(M2K, null, 2)};

/**
 * @param {string} nodeId
 * @returns {MapBridgeLink[]}
 */
export function bridgesForKnowledge(nodeId) {
  if (Object.prototype.hasOwnProperty.call(KNOWLEDGE_MAP2_OVERRIDES, nodeId)) {
    return KNOWLEDGE_MAP2_OVERRIDES[nodeId];
  }
  return KNOWLEDGE_TO_MAP2[nodeId] || [];
}

/**
 * @param {string} nodeId
 * @returns {MapBridgeLink[]}
 */
export function bridgesForMap2(nodeId) {
  const base = MAP2_TO_KNOWLEDGE[nodeId] || [];
  /** @type {MapBridgeLink[]} */
  const extra = [];
  for (const [kid, links] of Object.entries(KNOWLEDGE_MAP2_OVERRIDES)) {
    if (
      links.some((l) => l.id === nodeId) &&
      !base.some((b) => b.id === kid) &&
      !extra.some((b) => b.id === kid)
    ) {
      extra.push({ id: kid, label: kid });
    }
  }
  return extra.length ? [...base, ...extra] : base;
}
`;

fs.writeFileSync(outPath, out, 'utf8');
console.log('wrote', outPath);
console.log({ covered, total: knowledgeNodes.length, frames: graphFrames.length, auto, reverse: Object.keys(M2K).length });
