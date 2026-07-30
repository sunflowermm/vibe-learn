/**
 * 剪贴板（对齐 xrk web-compat `copyText`：clipboard API + execCommand 降级）
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyText(text) {
  const value = String(text ?? '');
  if (!value) return false;
  try {
    if (typeof globalThis.navigator?.clipboard?.writeText === 'function') {
      await globalThis.navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* NotAllowedError / insecure context */
  }
  if (typeof document === 'undefined' || !document.body) return false;
  try {
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, value.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return Boolean(ok);
  } catch {
    return false;
  }
}

/**
 * @param {HTMLButtonElement | null | undefined} btn
 * @param {boolean} ok
 * @param {{ okText?: string, failText?: string, restoreMs?: number }} [opts]
 */
export function flashCopyButton(btn, ok, opts = {}) {
  if (!btn) return;
  const okText = opts.okText ?? '已复制';
  const failText = opts.failText ?? '复制失败 · 请手动选中';
  const restoreMs = opts.restoreMs ?? 1200;
  const prev = btn.dataset.copyIdle || btn.textContent || '复制';
  btn.dataset.copyIdle = prev;
  btn.textContent = ok ? okText : failText;
  btn.classList.toggle('is-copied', ok);
  btn.classList.toggle('is-copy-fail', !ok);
  window.clearTimeout(Number(btn.dataset.copyTimer || 0));
  const timer = window.setTimeout(() => {
    btn.textContent = prev;
    btn.classList.remove('is-copied', 'is-copy-fail');
  }, restoreMs);
  btn.dataset.copyTimer = String(timer);
}

/**
 * @param {HTMLButtonElement | null | undefined} btn
 * @param {string} text
 * @param {{ okText?: string, failText?: string, restoreMs?: number }} [opts]
 * @returns {Promise<boolean>}
 */
export async function copyWithButtonFeedback(btn, text, opts) {
  const ok = await copyText(text);
  flashCopyButton(btn, ok, opts);
  return ok;
}
