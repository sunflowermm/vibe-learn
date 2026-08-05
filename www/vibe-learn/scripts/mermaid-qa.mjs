/**
 * Mermaid 课文闸门：规范化后用 mermaid.parse 验语法
 * 用法：node scripts/mermaid-qa.mjs
 */
import { JSDOM } from 'jsdom';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { readdir } from 'node:fs/promises';
import {
  normalizeMermaidSource,
  needsMermaidQuotes,
} from '../src/utils/normalize-mermaid.js';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://127.0.0.1/',
  pretendToBeVisual: true,
});
const { window } = dom;
globalThis.window = window;
globalThis.document = window.document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.SVGElement = window.SVGElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.DocumentFragment = window.DocumentFragment;
globalThis.DOMParser = window.DOMParser;
globalThis.XMLSerializer = window.XMLSerializer;
globalThis.getComputedStyle = window.getComputedStyle.bind(window);
globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
globalThis.CSSStyleSheet = class CSSStyleSheet {
  constructor() {
    this.cssRules = [];
  }
  replaceSync() {}
  insertRule() {
    return 0;
  }
  deleteRule() {}
};

/* dompurify 在 Node 下是工厂；先实例化挂到 window，再让 mermaid 用到可用 sanitize */
const createDOMPurify = (await import('dompurify')).default;
const purify = createDOMPurify(window);
window.DOMPurify = purify;

const mermaid = (await import('mermaid')).default;
mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'neutral',
  flowchart: { htmlLabels: true },
});

/** 规范化后仍有「未加引号的非 ASCII participant」则记问题 */
function findUnquotedParticipants(src) {
  const bad = [];
  for (const line of src.split('\n')) {
    const m = line.match(/^\s*participant\s+\w+\s+as\s+(.+)$/i);
    if (!m) continue;
    const alias = m[1].trim();
    if (
      !(
        (alias.startsWith('"') && alias.endsWith('"')) ||
        (alias.startsWith("'") && alias.endsWith("'"))
      ) &&
      needsMermaidQuotes(alias)
    ) {
      bad.push(alias);
    }
  }
  return bad;
}

const dir = path.resolve('src/data/lessons');
const files = (await readdir(dir)).filter((f) => f.endsWith('.js'));
const fails = [];
let total = 0;

for (const f of files) {
  const mod = await import(pathToFileURL(path.join(dir, f)).href);
  const text = typeof mod.default === 'string' ? mod.default : '';
  const re = /```mermaid\n([\s\S]*?)\n```/g;
  let m;
  let i = 0;
  while ((m = re.exec(text))) {
    i++;
    total++;
    const src = normalizeMermaidSource(m[1]);
    const unquoted = findUnquotedParticipants(src);
    if (unquoted.length) {
      fails.push({ file: f, i, stage: 'quote', err: `未加引号: ${unquoted.join(' | ')}`, src });
      continue;
    }
    try {
      await mermaid.parse(src);
    } catch (e) {
      fails.push({
        file: f,
        i,
        stage: 'parse',
        err: e?.str || e?.message || String(e),
        src: src.slice(0, 400),
      });
    }
  }
}

const sample = normalizeMermaidSource(`sequenceDiagram
  participant U as 用户
  participant M as 主服 Node
  U->>M: 消息 / HTTP`);
console.log('sample normalize:\n' + sample);
console.log(JSON.stringify({ total, failCount: fails.length, fails: fails.slice(0, 40) }, null, 2));
if (fails.length) process.exitCode = 1;
