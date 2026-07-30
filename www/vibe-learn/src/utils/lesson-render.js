/**
 * 课文渲染：Markdown + HTML5/SVG 片段 + Mermaid + 交互围栏
 * （term / compare / shell / env / quiz / reveal / check / decide /
 *  match / flip / steps / ports / sort）
 * 普通代码围栏带复制条；`prompt`/`agent` 或含「目标：…验收：」的无语言块标为 Agent 提问。
 * Mermaid 随 Vite/pnpm 打包，不依赖外网 CDN。
 */
import { marked } from 'marked';
import purify from 'dompurify';
import { normalizeMermaidSource } from './normalize-mermaid.js';
import { WIDGET_LANGS } from './lesson-widgets.js';
import { wrapCodeBlockHtml } from './code-copy.js';

const DOMPurify = purify?.sanitize ? purify : purify?.default ?? purify;

const RAW_LANGS = new Set(['html', 'html5', 'svg', 'raw']);

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * CommonMark：若加粗以标点（如 ）或 )）结尾，且后面紧跟非空白/非标点（如汉字），
 * 结束的 ** 不算 right-flanking，会原样露出。把「括号注释」挪到加粗外即可。
 * 例：**DBMS（数据库管理系统）**是 → **DBMS**（数据库管理系统）是
 */
export function normalizeEmphasisParens(markdown) {
  return String(markdown)
    .replace(/\*\*((?:(?!\*\*)[^*])+?)（([^）]*)）\*\*/g, '**$1**（$2）')
    .replace(/\*\*((?:(?!\*\*)[^*])+?)\(([^)]*)\)\*\*/g, '**$1**($2)');
}

const renderer = new marked.Renderer();

renderer.code = function code(token) {
  const lang = (token.lang || '').trim().toLowerCase().split(/\s+/)[0] || '';
  const text = token.text ?? '';

  if (lang === 'mermaid') {
    /* 规范化后整体转义；浏览器 textContent 还原 <br/> 给 Mermaid */
    return `<pre class="mermaid">${escapeHtml(normalizeMermaidSource(text))}</pre>`;
  }
  if (WIDGET_LANGS.has(lang)) {
    const isShell =
      lang === 'shell' || lang === 'vibe-shell' || lang === 'term' || lang === 'vibe-term';
    const skel = isShell
      ? `<div class="vibe-shell-skel" aria-hidden="true"><div class="vibe-shell-skel__head"></div><div class="vibe-shell-skel__hints"></div><div class="vibe-shell-skel__body"></div></div>`
      : '';
    return `<div class="vibe-widget" data-vibe="${escapeHtml(lang)}" data-hydrated="0">${skel}<pre class="vibe-widget__src">${escapeHtml(text)}</pre></div>`;
  }
  if (RAW_LANGS.has(lang)) {
    return `<div class="lesson-embed" data-embed="${lang}">${text}</div>`;
  }
  return wrapCodeBlockHtml(lang, escapeHtml(text), text);
};

marked.setOptions({
  gfm: true,
  breaks: false,
  renderer,
});

const PURIFY = {
  USE_PROFILES: { html: true, svg: true, svgFilters: true },
  ADD_TAGS: [
    'figure',
    'figcaption',
    'details',
    'summary',
    'mark',
    'time',
    'progress',
    'meter',
    'picture',
    'source',
    'video',
    'audio',
    'track',
    'section',
    'article',
    'aside',
    'header',
    'footer',
    'nav',
    'main',
    'button',
  ],
  ADD_ATTR: [
    'open',
    'controls',
    'loop',
    'muted',
    'playsinline',
    'poster',
    'preload',
    'type',
    'src',
    'srcset',
    'sizes',
    'media',
    'datetime',
    'value',
    'max',
    'min',
    'low',
    'high',
    'optimum',
    'role',
    'aria-label',
    'aria-hidden',
    'aria-live',
    'aria-pressed',
    'data-embed',
    'data-vibe',
    'data-hydrated',
    'data-copy-kind',
    'data-code-copy',
    'class',
    'hidden',
    'viewBox',
    'xmlns',
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
    'd',
    'cx',
    'cy',
    'r',
    'rx',
    'ry',
    'x',
    'y',
    'x1',
    'y1',
    'x2',
    'y2',
    'width',
    'height',
    'transform',
    'points',
    'preserveAspectRatio',
    'gradientUnits',
    'offset',
    'stop-color',
    'stop-opacity',
    'opacity',
    'clip-path',
    'marker-end',
    'marker-start',
  ],
};

/**
 * @param {string} markdown
 * @returns {string} 消毒后的 HTML（含未渲染的 pre.mermaid / vibe-widget）
 */
export function renderLesson(markdown) {
  if (!markdown) return '';
  const raw = marked.parse(normalizeEmphasisParens(markdown), { async: false });
  const clean = DOMPurify.sanitize(raw, PURIFY);
  return clean.replace(/<table[\s\S]*?<\/table>/gi, (table) => {
    return `<div class="md-table-wrap">${table}</div>`;
  });
}
