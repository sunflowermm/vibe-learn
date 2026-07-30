/**
 * 词典悬浮球位置：可视区内自由拖动、持久化、resize / 浮层避让时再夹紧。
 */

const POS_KEY = 'vibe-learn-glossary-fab';
const MARGIN = 10;
/** 拖过此像素才算拖动，避免误触取消点击 */
export const FAB_DRAG_THRESHOLD = 6;

/**
 * @typedef {{ x: number, y: number }} FabPoint
 * @typedef {{ left: number, top: number, right: number, bottom: number }} FabRect
 */

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
    x: Math.max(MARGIN, vw - w - MARGIN - 6),
    y: Math.max(MARGIN, vh - h - MARGIN - 8),
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
 * 夹到可视区；可选避开词典浮层矩形。
 * @param {FabPoint} pos
 * @param {number} w
 * @param {number} h
 * @param {FabRect | null} [avoid]
 * @returns {FabPoint}
 */
export function clampFabPos(pos, w, h, avoid = null) {
  if (typeof window === 'undefined') return { x: pos.x, y: pos.y };
  const minX = MARGIN;
  const minY = MARGIN;
  const maxX = Math.max(minX, window.innerWidth - w - MARGIN);
  const maxY = Math.max(minY, window.innerHeight - h - MARGIN);

  let x = Math.min(maxX, Math.max(minX, Number.isFinite(pos.x) ? pos.x : maxX));
  let y = Math.min(maxY, Math.max(minY, Number.isFinite(pos.y) ? pos.y : maxY));

  if (avoid && rectsOverlap(x, y, w, h, avoid)) {
    const gap = 10;
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
      const nx = Math.min(maxX, Math.max(minX, c.x));
      const ny = Math.min(maxY, Math.max(minY, c.y));
      if (!rectsOverlap(nx, ny, w, h, avoid)) {
        x = nx;
        y = ny;
        break;
      }
    }
  }

  return { x: Math.round(x), y: Math.round(y) };
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
 * 松手轻吸边。
 * @param {FabPoint} pos
 * @param {number} w
 * @param {number} h
 * @param {number} [snapPx]
 * @returns {FabPoint}
 */
export function snapFabToEdge(pos, w, h, snapPx = 28) {
  if (typeof window === 'undefined') return pos;
  const minX = MARGIN;
  const minY = MARGIN;
  const maxX = Math.max(minX, window.innerWidth - w - MARGIN);
  const maxY = Math.max(minY, window.innerHeight - h - MARGIN);
  let { x, y } = pos;
  if (x - minX < snapPx) x = minX;
  else if (maxX - x < snapPx) x = maxX;
  if (y - minY < snapPx) y = minY;
  else if (maxY - y < snapPx) y = maxY;
  return { x: Math.round(x), y: Math.round(y) };
}
