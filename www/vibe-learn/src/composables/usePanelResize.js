/**
 * 右侧讲解面板宽度拖拽（左右）
 * 窄屏改为上下拖拽调整图谱区高度
 */

const WIDTH_KEY = 'vibe-learn-panel-w';
const HEIGHT_KEY = 'vibe-learn-graph-h';
const MQ = '(max-width: 960px)';

export const PANEL_MIN = 280;
export const PANEL_MAX_RATIO = 0.72;
export const GRAPH_MIN = 160;
export const GRAPH_MAX_RATIO = 0.75;

export function defaultPanelWidth() {
  if (typeof window === 'undefined') return 420;
  return Math.round(Math.min(480, Math.max(PANEL_MIN, window.innerWidth * 0.36)));
}

export function defaultGraphHeight() {
  if (typeof window === 'undefined') return 280;
  return Math.round(window.innerHeight * 0.38);
}

export function readPanelWidth() {
  try {
    const n = Number(localStorage.getItem(WIDTH_KEY));
    if (Number.isFinite(n) && n >= PANEL_MIN) return Math.round(n);
  } catch {
    /* ignore */
  }
  return defaultPanelWidth();
}

export function readGraphHeight() {
  try {
    const n = Number(localStorage.getItem(HEIGHT_KEY));
    if (Number.isFinite(n) && n >= GRAPH_MIN) return Math.round(n);
  } catch {
    /* ignore */
  }
  return defaultGraphHeight();
}

export function clampPanelWidth(w) {
  const max = Math.round(window.innerWidth * PANEL_MAX_RATIO);
  return Math.round(Math.min(max, Math.max(PANEL_MIN, w)));
}

export function clampGraphHeight(h) {
  const max = Math.round(window.innerHeight * GRAPH_MAX_RATIO);
  return Math.round(Math.min(max, Math.max(GRAPH_MIN, h)));
}

export function isStackedLayout() {
  try {
    return window.matchMedia(MQ).matches;
  } catch {
    return false;
  }
}

export function persistPanelWidth(w) {
  try {
    localStorage.setItem(WIDTH_KEY, String(w));
  } catch {
    /* ignore */
  }
}

export function persistGraphHeight(h) {
  try {
    localStorage.setItem(HEIGHT_KEY, String(h));
  } catch {
    /* ignore */
  }
}
