/**
 * 惰性加载 Mermaid（随 Vite 打包）。主题跟随 document.documentElement[data-theme]。
 * 逐节点 parse → render，避免 suppressErrors 留下炸弹 SVG 且难排查。
 */
import { enhanceMermaidFrames } from '../utils/mermaid-zoom.js';
import { normalizeMermaidSource } from '../utils/normalize-mermaid.js';

let mermaidPromise = null;
let lastTheme = null;

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((m) => m.default ?? m);
  }
  return mermaidPromise;
}

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function ensureInit(mermaid) {
  const theme = isDarkTheme() ? 'dark' : 'neutral';
  if (theme === lastTheme) return;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme,
    fontFamily: 'inherit',
    flowchart: { htmlLabels: true, curve: 'basis' },
    sequence: { useMaxWidth: true, diagramMarginX: 12, diagramMarginY: 12 },
  });
  lastTheme = theme;
}

/**
 * @param {HTMLElement} el
 * @param {string} src
 * @param {string} message
 */
function markMermaidError(el, src, message) {
  el.setAttribute('data-processed', 'true');
  el.setAttribute('data-mermaid-source', src);
  el.classList.add('mermaid--error');
  el.textContent = '';
  const box = document.createElement('div');
  box.className = 'mermaid-error';
  box.setAttribute('role', 'alert');
  const title = document.createElement('strong');
  title.textContent = '示意图暂不可用';
  const detail = document.createElement('p');
  detail.textContent = message || '语法需修订';
  const code = document.createElement('pre');
  code.className = 'mermaid-error__src';
  code.textContent = src;
  box.append(title, detail, code);
  el.append(box);
}

/**
 * @param {ParentNode | null | undefined} root
 */
export async function renderMermaidIn(root) {
  if (!root) return;

  const nodes = [...root.querySelectorAll('pre.mermaid')].filter(
    (el) => !el.getAttribute('data-processed') && !el.classList.contains('mermaid--error')
  );

  if (!nodes.length) {
    enhanceMermaidFrames(root);
    return;
  }

  for (const el of nodes) {
    const src = normalizeMermaidSource(el.textContent);
    el.textContent = src;
    el.setAttribute('data-mermaid-source', src);
  }

  const mermaid = await loadMermaid();
  ensureInit(mermaid);

  for (let i = 0; i < nodes.length; i++) {
    const el = nodes[i];
    const src = el.getAttribute('data-mermaid-source') || normalizeMermaidSource(el.textContent);
    const id = `vl-mm-${Date.now().toString(36)}-${i}`;
    try {
      await mermaid.parse(src);
      const { svg } = await mermaid.render(id, src);
      if (/Syntax error/i.test(svg)) {
        markMermaidError(el, src, 'Mermaid 返回语法错误');
        continue;
      }
      el.setAttribute('data-processed', 'true');
      el.innerHTML = svg;
    } catch (err) {
      const msg = err?.str || err?.message || String(err);
      console.warn('[vibe-learn] Mermaid 渲染失败', msg, src.slice(0, 120));
      markMermaidError(el, src, msg);
    }
  }

  enhanceMermaidFrames(root);
}
