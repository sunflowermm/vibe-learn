/**
 * 课文代码块：渲染外壳 + 事件委托复制
 */
import { copyWithButtonFeedback } from './copy-text.js';

const PROMPT_LANGS = new Set(['prompt', 'agent', 'copy']);
const CMD_LANGS = new Set([
  'bash',
  'sh',
  'shell',
  'zsh',
  'powershell',
  'ps1',
  'cmd',
  'bat',
  'console',
  'terminal',
  'ini',
  'dotenv',
]);

/**
 * @param {string} lang
 * @param {string} text
 * @returns {'prompt' | 'cmd' | 'code'}
 */
export function classifyCodeFence(lang, text) {
  const l = (lang || '').trim().toLowerCase();
  if (PROMPT_LANGS.has(l)) return 'prompt';
  if (CMD_LANGS.has(l)) return 'cmd';
  if (l) return 'code';
  const t = String(text ?? '');
  if (
    /^(目标|现场|约束|验收)[：:]/m.test(t) ||
    (t.includes('目标：') && (t.includes('验收：') || t.includes('约束：')))
  ) {
    return 'prompt';
  }
  return 'code';
}

/**
 * @param {'prompt' | 'cmd' | 'code'} kind
 */
export function codeCopyMeta(kind) {
  if (kind === 'prompt') {
    return { label: 'Agent 提问', btn: '复制给 Agent' };
  }
  if (kind === 'cmd') {
    return { label: '命令', btn: '复制命令' };
  }
  return { label: '代码', btn: '复制' };
}

/**
 * @param {string} lang raw fence lang (may be empty)
 * @param {string} escapedInner already-escaped HTML for <code> children / pre text
 * @param {string} rawText original source (for classification only)
 */
export function wrapCodeBlockHtml(lang, escapedInner, rawText) {
  const kind = classifyCodeFence(lang, rawText);
  const meta = codeCopyMeta(kind);
  const langShow = (lang || '').trim() || (kind === 'prompt' ? 'prompt' : kind === 'cmd' ? 'shell' : 'text');
  const cls = lang ? `language-${escapeAttr(lang)}` : '';
  return (
    `<div class="md-code md-code--${kind}" data-copy-kind="${kind}">` +
    `<div class="md-code__bar">` +
    `<span class="md-code__lang">${escapeAttr(meta.label)} · ${escapeAttr(langShow)}</span>` +
    `<button type="button" class="md-code__copy" data-code-copy>${escapeAttr(meta.btn)}</button>` +
    `</div>` +
    `<pre><code${cls ? ` class="${cls}"` : ''}>${escapedInner}</code></pre>` +
    `</div>`
  );
}

function escapeAttr(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * @param {ParentNode | null | undefined} root
 * @returns {() => void}
 */
export function bindCodeCopyButtons(root) {
  if (!root || typeof root.addEventListener !== 'function') return () => {};

  const onClick = async (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const btn = t.closest('[data-code-copy]');
    if (!btn || !(btn instanceof HTMLButtonElement) || !root.contains(btn)) return;
    const block = btn.closest('.md-code');
    const pre = block?.querySelector('pre');
    const text = pre?.textContent ?? '';
    if (!text.trim()) return;
    e.preventDefault();
    await copyWithButtonFeedback(btn, text);
  };

  root.addEventListener('click', onClick);
  return () => root.removeEventListener('click', onClick);
}
