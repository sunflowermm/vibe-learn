/**
 * 为已渲染的 Mermaid 图包裹缩放/平移壳
 * 控件通过事件委托绑定（见 LessonBody）
 */
import { copyWithButtonFeedback } from './copy-text.js';

const MIN = 0.5;
const MAX = 3;
const STEP = 0.15;

/**
 * @param {HTMLElement} frame
 * @param {number} scale
 * @param {number} [tx]
 * @param {number} [ty]
 */
export function applyMermaidTransform(frame, scale, tx = 0, ty = 0) {
  const stage = frame.querySelector('.mermaid-frame__stage');
  const pct = frame.querySelector('.mermaid-frame__pct');
  if (!stage) return;
  const s = Math.min(MAX, Math.max(MIN, scale));
  frame.dataset.scale = String(s);
  frame.dataset.tx = String(tx);
  frame.dataset.ty = String(ty);
  stage.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
  if (pct) pct.textContent = `${Math.round(s * 100)}%`;
}

function clearTextSelection() {
  try {
    const sel = window.getSelection?.();
    sel?.removeAllRanges?.();
  } catch {
    /* ignore */
  }
}

/**
 * @param {HTMLElement} frame
 */
async function copyMermaidFromFrame(frame) {
  const btn = frame.querySelector('[data-mz="copy"]');
  const source =
    frame.dataset.source ||
    frame.querySelector('[data-mermaid-source]')?.getAttribute('data-mermaid-source') ||
    '';
  const svg = frame.querySelector('.mermaid svg, pre.mermaid svg');
  const text = source.trim() || (svg ? svg.outerHTML : '');
  if (!text) return;
  await copyWithButtonFeedback(
    btn instanceof HTMLButtonElement ? btn : null,
    text,
    { okText: '已复制' }
  );
}

/**
 * @param {ParentNode | null | undefined} root
 */
export function enhanceMermaidFrames(root) {
  if (!root) return;

  const diagrams = [...root.querySelectorAll('pre.mermaid')].filter(
    (el) =>
      el.classList.contains('mermaid--error') ||
      el.getAttribute('data-processed') === 'true' ||
      el.querySelector('svg') ||
      /Syntax error/i.test(el.textContent || '')
  );

  for (const el of diagrams) {
    if (el.closest('.mermaid-frame')) continue;

    const broken =
      el.classList.contains('mermaid--error') ||
      /Syntax error/i.test(el.textContent || '') ||
      Boolean(el.querySelector('.mermaid-error'));
    const source =
      el.getAttribute('data-mermaid-source') ||
      el.dataset.mermaidSource ||
      '';

    const frame = document.createElement('div');
    frame.className = broken ? 'mermaid-frame mermaid-frame--broken' : 'mermaid-frame';
    frame.dataset.scale = '1';
    frame.dataset.tx = '0';
    frame.dataset.ty = '0';
    if (source) frame.dataset.source = source;

    const bar = document.createElement('div');
    bar.className = 'mermaid-frame__bar';
    bar.innerHTML = `
      <span class="mermaid-frame__label">${broken ? '示意图（语法待修）' : '示意图'}</span>
      <div class="mermaid-frame__ops">
        <button type="button" class="mermaid-frame__btn" data-mz="out" data-no-blobity aria-label="缩小" title="缩小">−</button>
        <span class="mermaid-frame__pct" aria-live="polite">100%</span>
        <button type="button" class="mermaid-frame__btn" data-mz="in" data-no-blobity aria-label="放大" title="放大">+</button>
        <button type="button" class="mermaid-frame__btn" data-mz="reset" data-no-blobity aria-label="复位" title="复位">复位</button>
        <button type="button" class="mermaid-frame__btn mermaid-frame__btn--copy" data-mz="copy" data-no-blobity aria-label="复制源码" title="复制 Mermaid 源码">复制</button>
      </div>
    `;

    const view = document.createElement('div');
    view.className = 'mermaid-frame__view';
    view.tabIndex = 0;
    view.setAttribute('role', 'img');
    view.setAttribute(
      'aria-label',
      '可缩放流程图：滚轮缩放，拖拽平移；图内文字不可选中'
    );

    const stage = document.createElement('div');
    stage.className = 'mermaid-frame__stage';

    el.parentNode.insertBefore(frame, el);
    stage.appendChild(el);
    view.appendChild(stage);
    frame.appendChild(bar);
    frame.appendChild(view);
  }
}

/**
 * @param {HTMLElement} frame
 * @param {'in' | 'out' | 'reset'} action
 */
export function mermaidZoomAction(frame, action) {
  const scale = Number(frame.dataset.scale) || 1;
  const tx = Number(frame.dataset.tx) || 0;
  const ty = Number(frame.dataset.ty) || 0;
  if (action === 'in') applyMermaidTransform(frame, scale + STEP, tx, ty);
  else if (action === 'out') applyMermaidTransform(frame, scale - STEP, tx, ty);
  else applyMermaidTransform(frame, 1, 0, 0);
}

/**
 * 在 LessonBody 根上绑定一次：按钮 / 滚轮 / 拖拽
 * @param {HTMLElement} root
 * @returns {() => void} dispose
 */
export function bindMermaidZoomInteractions(root) {
  if (!root || root.dataset.mzBound === '1') return () => {};
  root.dataset.mzBound = '1';

  /** @type {{ frame: HTMLElement, x: number, y: number, tx: number, ty: number, moved: boolean } | null} */
  let drag = null;

  function onClick(e) {
    const btn = e.target.closest?.('[data-mz]');
    if (!btn || !root.contains(btn)) return;
    const frame = btn.closest('.mermaid-frame');
    if (!frame) return;
    e.preventDefault();
    const action = btn.getAttribute('data-mz');
    if (action === 'copy') {
      copyMermaidFromFrame(frame);
      return;
    }
    mermaidZoomAction(frame, action);
  }

  function onWheel(e) {
    const view = e.target.closest?.('.mermaid-frame__view');
    if (!view || !root.contains(view)) return;
    const frame = view.closest('.mermaid-frame');
    if (!frame) return;
    e.preventDefault();
    const scale = Number(frame.dataset.scale) || 1;
    const tx = Number(frame.dataset.tx) || 0;
    const ty = Number(frame.dataset.ty) || 0;
    const delta = e.deltaY > 0 ? -STEP : STEP;
    applyMermaidTransform(frame, scale + delta, tx, ty);
  }

  function onPointerDown(e) {
    if (e.button !== 0) return;
    if (e.target.closest?.('.mermaid-frame__bar')) return;
    const view = e.target.closest?.('.mermaid-frame__view');
    if (!view || !root.contains(view)) return;
    const frame = view.closest('.mermaid-frame');
    if (!frame) return;

    /* 拖拽开始就清选区，避免把 SVG 文字拖成全选 */
    clearTextSelection();
    e.preventDefault();

    drag = {
      frame,
      x: e.clientX,
      y: e.clientY,
      tx: Number(frame.dataset.tx) || 0,
      ty: Number(frame.dataset.ty) || 0,
      moved: false,
    };
    view.classList.add('is-panning');
    frame.classList.add('is-panning');
    view.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.moved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
      drag.moved = true;
      clearTextSelection();
    }
    if (drag.moved) clearTextSelection();
    const scale = Number(drag.frame.dataset.scale) || 1;
    applyMermaidTransform(drag.frame, scale, drag.tx + dx, drag.ty + dy);
  }

  function onPointerUp(e) {
    if (!drag) return;
    const view = drag.frame.querySelector('.mermaid-frame__view');
    view?.classList.remove('is-panning');
    drag.frame.classList.remove('is-panning');
    view?.releasePointerCapture?.(e.pointerId);
    clearTextSelection();
    drag = null;
  }

  function onDblClick(e) {
    const view = e.target.closest?.('.mermaid-frame__view');
    if (!view || !root.contains(view)) return;
    const frame = view.closest('.mermaid-frame');
    if (frame) mermaidZoomAction(frame, 'reset');
  }

  /** 拖选时系统仍可能冒出 selectstart */
  function onSelectStart(e) {
    if (e.target.closest?.('.mermaid-frame__view')) {
      e.preventDefault();
    }
  }

  function onKeydown(e) {
    if (e.key !== 'Escape') return;
    const view = e.target.closest?.('.mermaid-frame__view');
    if (!view || !root.contains(view)) return;
    e.preventDefault();
    e.stopPropagation();
    clearTextSelection();
    view.blur();
  }

  root.addEventListener('click', onClick);
  root.addEventListener('wheel', onWheel, { passive: false });
  root.addEventListener('pointerdown', onPointerDown);
  root.addEventListener('pointermove', onPointerMove);
  root.addEventListener('pointerup', onPointerUp);
  root.addEventListener('pointercancel', onPointerUp);
  root.addEventListener('dblclick', onDblClick);
  root.addEventListener('selectstart', onSelectStart);
  root.addEventListener('keydown', onKeydown);

  return () => {
    root.removeEventListener('click', onClick);
    root.removeEventListener('wheel', onWheel);
    root.removeEventListener('pointerdown', onPointerDown);
    root.removeEventListener('pointermove', onPointerMove);
    root.removeEventListener('pointerup', onPointerUp);
    root.removeEventListener('pointercancel', onPointerUp);
    root.removeEventListener('dblclick', onDblClick);
    root.removeEventListener('selectstart', onSelectStart);
    root.removeEventListener('keydown', onKeydown);
    delete root.dataset.mzBound;
  };
}
