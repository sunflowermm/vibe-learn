/**
 * 词典悬浮球 / 浮层定位：拖动记忆、贴边、按锚点就近展开面板。
 */

const POS_KEY = 'vibe-learn-glossary-fab';
export const FAB_MARGIN = 10;
export const FAB_DRAG_THRESHOLD = 6;
export const PANEL_GAP = 12;
/** 浮层默认设计宽度（实际用 min(PANEL_WIDTH, vw - 边距)） */
export const PANEL_WIDTH = 448;
export const PANEL_HEIGHT = 640;

/**
 * @typedef {{ x: number, y: number }} FabPoint
 * @typedef {{ left: number, top: number, right: number, bottom: number }} FabRect
 * @typedef {{ x: number, y: number, w: number, h: number }} FabBox
 */

/** @type {FabBox | null} */
let lastFabBox = null;
/** @type {Set<(box: FabBox | null) => void>} */
const fabListeners = new Set();

/** @param {FabBox | null} box */
export function publishFabBox(box) {
  lastFabBox = box
    ? { x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.w), h: Math.round(box.h) }
    : null;
  for (const fn of fabListeners) fn(lastFabBox);
}

/** @returns {FabBox | null} */
export function getFabBox() {
  return lastFabBox;
}

/**
 * @param {(box: FabBox | null) => void} fn
 * @returns {() => void}
 */
export function subscribeFabBox(fn) {
  fabListeners.add(fn);
  if (lastFabBox) fn(lastFabBox);
  return () => fabListeners.delete(fn);
}

/**
 * @param {number} w
 * @param {number} h
 * @returns {FabPoint}
 */
export function defaultFabPos(w, h) {
  if (typeof window === 'undefined') return { x: 16, y: 16 };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return {
    x: Math.max(FAB_MARGIN, vw - w - FAB_MARGIN - 6),
    y: Math.max(FAB_MARGIN, vh - h - FAB_MARGIN - 8),
  };
}

/**
 * @param {unknown} raw
 * @returns {FabPoint | null}
 */
export function parseFabPos(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const x = Number(/** @type {{ x?: unknown }} */ (raw).x);
  const y = Number(/** @type {{ y?: unknown }} */ (raw).y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return { x, y };
}

/** @returns {FabPoint | null} */
export function readFabPos() {
  try {
    return parseFabPos(JSON.parse(localStorage.getItem(POS_KEY) || 'null'));
  } catch {
    return null;
  }
}

/** @param {FabPoint} pos */
export function persistFabPos(pos) {
  try {
    localStorage.setItem(POS_KEY, JSON.stringify({ x: Math.round(pos.x), y: Math.round(pos.y) }));
  } catch {
    /* quota / private mode */
  }
}

/**
 * @param {number} w
 * @param {number} h
 */
function viewportBounds(w, h) {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const minX = FAB_MARGIN;
  const minY = FAB_MARGIN;
  const maxX = Math.max(minX, vw - w - FAB_MARGIN);
  const maxY = Math.max(minY, vh - h - FAB_MARGIN);
  return { vw, vh, minX, minY, maxX, maxY };
}

/**
 * @param {FabPoint} pos
 * @param {number} w
 * @param {number} h
 * @returns {FabPoint}
 */
export function clampPoint(pos, w, h) {
  const { minX, minY, maxX, maxY } = viewportBounds(w, h);
  return {
    x: Math.round(Math.min(maxX, Math.max(minX, Number.isFinite(pos.x) ? pos.x : maxX))),
    y: Math.round(Math.min(maxY, Math.max(minY, Number.isFinite(pos.y) ? pos.y : maxY))),
  };
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {FabRect} r
 */
function rectsOverlap(x, y, w, h, r) {
  return !(x + w <= r.left || x >= r.right || y + h <= r.top || y >= r.bottom);
}

/**
 * 夹到可视区；可选避开矩形（一般不再需要：浮层已跟球走）。
 * @param {FabPoint} pos
 * @param {number} w
 * @param {number} h
 * @param {FabRect | null} [avoid]
 * @returns {FabPoint}
 */
export function clampFabPos(pos, w, h, avoid = null) {
  if (typeof window === 'undefined') return { x: pos.x, y: pos.y };
  let { x, y } = clampPoint(pos, w, h);
  if (!avoid || !rectsOverlap(x, y, w, h, avoid)) return { x, y };

  const { minX, minY, maxX, maxY } = viewportBounds(w, h);
  const gap = PANEL_GAP;
  const candidates = [
    { x, y: avoid.bottom + gap },
    { x, y: avoid.top - h - gap },
    { x: avoid.left - w - gap, y },
    { x: avoid.right + gap, y },
    { x: avoid.left - w - gap, y: avoid.bottom + gap },
    defaultFabPos(w, h),
    { x: minX, y: minY },
  ];
  for (const c of candidates) {
    const p = clampPoint(c, w, h);
    if (!rectsOverlap(p.x, p.y, w, h, avoid)) return p;
  }
  return clampPoint({ x: maxX, y: maxY }, w, h);
}

/**
 * @param {FabPoint} pos
 * @param {number} w
 * @param {number} h
 * @param {number} [snapPx]
 * @returns {FabPoint}
 */
export function snapFabToEdge(pos, w, h, snapPx = 28) {
  if (typeof window === 'undefined') return pos;
  const { minX, minY, maxX, maxY } = viewportBounds(w, h);
  let { x, y } = pos;
  if (x - minX < snapPx) x = minX;
  else if (maxX - x < snapPx) x = maxX;
  if (y - minY < snapPx) y = minY;
  else if (maxY - y < snapPx) y = maxY;
  return { x: Math.round(x), y: Math.round(y) };
}

/**
 * 浮层尺寸：宽更大，并随视口收缩。
 * @returns {{ w: number, h: number }}
 */
export function measurePanelSize() {
  if (typeof window === 'undefined') return { w: PANEL_WIDTH, h: PANEL_HEIGHT };
  const w = Math.min(PANEL_WIDTH, Math.max(280, window.innerWidth - FAB_MARGIN * 2));
  const h = Math.min(PANEL_HEIGHT, Math.max(320, Math.round(window.innerHeight * 0.78)));
  return { w: Math.round(w), h: Math.round(h) };
}

/**
 * 在悬浮球附近展开词典浮层：优先上方 → 左侧 → 右侧 → 下方，再夹入视口。
 * @param {FabBox | null} anchor
 * @param {number} [panelW]
 * @param {number} [panelH]
 * @returns {FabPoint}
 */
export function placePanelNearAnchor(anchor, panelW, panelH) {
  const size = measurePanelSize();
  const pw = panelW ?? size.w;
  const ph = panelH ?? size.h;
  const { vw, vh, minX, minY, maxX, maxY } = viewportBounds(pw, ph);
  const gap = PANEL_GAP;

  const fab =
    anchor && Number.isFinite(anchor.x)
      ? anchor
      : {
          x: vw - 120,
          y: vh - 64,
          w: 100,
          h: 48,
        };

  const cx = fab.x + fab.w / 2;
  const cy = fab.y + fab.h / 2;

  /** @type {FabPoint[]} */
  const candidates = [
    // 球上方，水平居中对齐球
    { x: cx - pw / 2, y: fab.y - gap - ph },
    // 球上方，右缘对齐球右缘（右下角球时更自然）
    { x: fab.x + fab.w - pw, y: fab.y - gap - ph },
    // 球左侧
    { x: fab.x - gap - pw, y: cy - ph / 2 },
    // 球右侧
    { x: fab.x + fab.w + gap, y: cy - ph / 2 },
    // 球下方
    { x: cx - pw / 2, y: fab.y + fab.h + gap },
    // 球左上角对齐
    { x: fab.x - pw, y: fab.y - ph },
  ];

  let best = clampPoint(candidates[0], pw, ph);
  let bestScore = -1;

  for (const raw of candidates) {
    const p = clampPoint(raw, pw, ph);
    // 理想位置被夹后的偏移越小越好；且尽量靠近球
    const drift =
      Math.abs(p.x - raw.x) +
      Math.abs(p.y - raw.y) +
      Math.abs(p.x + pw / 2 - cx) * 0.15 +
      Math.abs(p.y + ph / 2 - cy) * 0.15;
    const score = 10000 - drift;
    // 惩罚与球重叠
    const overlap = rectsOverlap(p.x, p.y, pw, ph, {
      left: fab.x,
      top: fab.y,
      right: fab.x + fab.w,
      bottom: fab.y + fab.h,
    });
    const final = overlap ? score - 5000 : score;
    if (final > bestScore) {
      bestScore = final;
      best = p;
    }
  }

  // 仍可能与球重叠（极小屏）：强制挪到球上方或下方空隙更大的一侧
  if (
    rectsOverlap(best.x, best.y, pw, ph, {
      left: fab.x,
      top: fab.y,
      right: fab.x + fab.w,
      bottom: fab.y + fab.h,
    })
  ) {
    const above = fab.y - minY;
    const below = maxY + ph - (fab.y + fab.h);
    best = clampPoint(
      {
        x: cx - pw / 2,
        y: above >= below ? fab.y - gap - ph : fab.y + fab.h + gap,
      },
      pw,
      ph
    );
  }

  return best;
}
