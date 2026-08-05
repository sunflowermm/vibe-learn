/**
 * 知识导图2：紧凑布局（枢纽左 · 上前端 · 下六区横排）
 * 交互与导图1共用（蓝条拖章、空白平移、强调/弱化）
 */
import { CARD_W, CARD_H } from '../../utils/layout-from-edges.js';
import { inferHandles, pathKindFor } from '../../utils/edge-routing.js';
import { TONES } from '../tones.js';
import {
  VIBE_HUB_ID,
  VIBEHUB_MACRO_FRAMES,
  VIBEHUB_TERM_CARDS,
  VIBEHUB_BODIES,
} from './graph-pack.js';

export const VIBE_CARD_W = CARD_W;
export const VIBE_CARD_H_MIN = CARD_H;
export const VIBE_COL_GAP = 36;
export const VIBE_ROW_GAP = 40;
export const VIBE_FRAME_PAD_X = 28;
export const VIBE_FRAME_PAD_Y = 20;
export const VIBE_FRAME_HEAD = 72;

const FRAME_GAP_X = 56;
const FRAME_GAP_Y = 64;
const HUB_X = 24;
const HUB_GAP = 72;

const BAND_PRIMARY = ['frontend'];
/** 下带拆成两排，避免六区一字排开过宽 */
const BAND_SECONDARY_ROWS = [
  ['backend', 'technology', 'ai'],
  ['product', 'git', 'design'],
];

const ZONE_TAG = {
  frontend: 'Zone 01',
  backend: 'Zone 02',
  product: 'Zone 03',
  technology: 'Zone 04',
  ai: 'Zone 05',
  git: 'Zone 06',
  design: 'Zone 07',
};

const MACRO_BRIDGES = [
  { from: 'frontend', to: 'backend', label: '请求 / 接口' },
  { from: 'frontend', to: 'technology', label: '框架 / 工具' },
  { from: 'frontend', to: 'design', label: '视觉气质' },
  { from: 'backend', to: 'technology', label: '栈与测试' },
  { from: 'technology', to: 'ai', label: '模型进应用' },
  { from: 'ai', to: 'product', label: '需求与验证' },
  { from: 'git', to: 'technology', label: '协作进栈' },
];

const MACRO_TONE = {
  frontend: TONES.indigo,
  backend: TONES.sky,
  product: TONES.orange,
  technology: TONES.teal,
  ai: TONES.violet,
  git: TONES.slate,
  design: TONES.pink,
};

const ZONE_CARD_FAMILY = {
  frontend: [TONES.indigo, TONES.violet, TONES.sky],
  backend: [TONES.sky, TONES.teal, TONES.slate],
  technology: [TONES.teal, TONES.indigo, TONES.sky],
  ai: [TONES.violet, TONES.indigo, TONES.pink],
  product: [TONES.orange, TONES.rose, TONES.pink],
  git: [TONES.slate, TONES.orange, TONES.teal],
  design: [TONES.pink, TONES.rose, TONES.violet],
};

/**
 * @param {string} slug
 * @param {string} id
 * @param {string} [category]
 */
export function vibeCardTone(slug, id, category = '') {
  const family = ZONE_CARD_FAMILY[slug] || [TONES.slate];
  const key = `${category}|${id}`;
  let h = 0;
  for (let i = 0; i < key.length; i += 1) {
    h = (h + key.charCodeAt(i) * (i + 1)) % family.length;
  }
  return family[h] || TONES.slate;
}

/** 列数封顶，避免单区拉成超宽条带 */
export function colsForHorizontal(n) {
  if (n <= 1) return 1;
  if (n <= 6) return n;
  if (n <= 14) return Math.min(7, Math.ceil(n / 2));
  if (n <= 28) return Math.min(8, Math.ceil(n / 3));
  if (n <= 48) return Math.min(8, Math.ceil(n / 5));
  return Math.min(9, Math.ceil(n / 7));
}

export function estimateVibeCardHeight(label = '', subtitle = '') {
  const padY = 14 + 16;
  const tagBlock = 11 + 6;
  const titleLines = Math.min(
    2,
    Math.max(1, Math.ceil([...String(label)].length / 11))
  );
  const subChars = [...String(subtitle || '')].length;
  const subLines = subChars
    ? Math.min(2, Math.max(1, Math.ceil(subChars / 16)))
    : 0;
  return Math.max(
    VIBE_CARD_H_MIN,
    Math.ceil(
      padY +
        tagBlock +
        titleLines * 17 * 1.15 +
        (subLines ? 6 + subLines * 12 * 1.4 : 0)
    )
  );
}

/**
 * @param {object[]} children
 * @param {{ x: number, y: number }} origin
 * @param {number} cols
 */
export function layoutKidsRowMajor(children, origin, cols) {
  const c = Math.max(1, cols);
  const rows = Math.ceil(children.length / c) || 1;
  /** @type {number[]} */
  const rowH = Array.from({ length: rows }, () => VIBE_CARD_H_MIN);

  children.forEach((kid, i) => {
    const r = Math.floor(i / c);
    const h = kid.height || estimateVibeCardHeight(kid.label, kid.subtitle);
    rowH[r] = Math.max(rowH[r], h);
  });

  /** @type {{ id: string, x: number, y: number, row: number, col: number }[]} */
  const positions = [];
  let y = origin.y + VIBE_FRAME_HEAD + VIBE_FRAME_PAD_Y;
  for (let r = 0; r < rows; r += 1) {
    const x0 = origin.x + VIBE_FRAME_PAD_X;
    for (let col = 0; col < c; col += 1) {
      const i = r * c + col;
      if (i >= children.length) break;
      positions.push({
        id: children[i].id,
        x: x0 + col * (VIBE_CARD_W + VIBE_COL_GAP),
        y,
        row: r,
        col,
      });
    }
    y += rowH[r] + (r < rows - 1 ? VIBE_ROW_GAP : 0);
  }

  const width =
    VIBE_FRAME_PAD_X * 2 +
    c * VIBE_CARD_W +
    Math.max(0, c - 1) * VIBE_COL_GAP;
  const height = Math.ceil(y + VIBE_FRAME_PAD_Y - origin.y);
  return { positions, width, height, cols: c, rows };
}

function frameMetrics(children, cols) {
  return layoutKidsRowMajor(children, { x: 0, y: 0 }, cols);
}

function targetHandle(h) {
  const raw = String(h || 'left').replace(/-t$/, '');
  if (raw === 'left') return 'left-t';
  if (raw === 'right') return 'right-t';
  if (raw === 'top') return 'top-t';
  if (raw === 'bottom') return 'bottom-t';
  return 'left-t';
}

function pushCategoryChainEdges(slug, positions, kids, edges) {
  /** @type {Map<string, string[]>} */
  const byCat = new Map();
  kids.forEach((k) => {
    const cat = k.subtitle || '未分类';
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat).push(k.id);
  });

  const posById = new Map(positions.map((p) => [p.id, p]));
  let ei = 0;
  for (const [, ids] of byCat) {
    for (let i = 0; i < ids.length - 1; i += 1) {
      const a = posById.get(ids[i]);
      const b = posById.get(ids[i + 1]);
      if (!a || !b) continue;
      const handles = inferHandles({ x: a.x, y: a.y }, { x: b.x, y: b.y });
      const kid = kids.find((k) => k.id === ids[i]);
      const linkTone = vibeCardTone(slug, ids[i], kid?.subtitle);
      edges.push({
        id: `ve-chain-${slug}-${ei}`,
        source: ids[i],
        target: ids[i + 1],
        sourceHandle: handles.sourceHandle,
        targetHandle: targetHandle(handles.targetHandle),
        label: i === 0 ? kid?.subtitle || '' : '',
        color: linkTone.edge || linkTone.bg,
        pathKind: pathKindFor('c0', true, 0),
        routeOffset: a.row === b.row ? (i % 2) * 4 : 8,
        chapterLit: false,
      });
      ei += 1;
    }
  }
}

/**
 * @param {string[]} slugs
 * @param {number} originX
 * @param {number} originY
 * @param {Map<string, object>} packBySlug
 * @param {object[]} frames
 * @param {object[]} cards
 * @param {object[]} edges
 */
function placeBand(slugs, originX, originY, packBySlug, frames, cards, edges) {
  let x = originX;
  let bandBottom = originY;
  let bandIdx = 0;

  for (const slug of slugs) {
    const frame = packBySlug.get(slug);
    if (!frame) continue;
    const kids = VIBEHUB_TERM_CARDS.filter((c) => c.macroSlug === slug)
      .map((c) => ({
        id: c.id,
        label: c.label,
        subtitle: c.subtitle,
        tag: c.tag,
        role: c.role,
        height: estimateVibeCardHeight(c.label, c.subtitle),
        glossaryIds: c.glossaryIds,
        markdown: VIBEHUB_BODIES[c.id],
      }))
      .sort((a, b) => {
        const ca = String(a.subtitle || '');
        const cb = String(b.subtitle || '');
        if (ca !== cb) return ca.localeCompare(cb, 'zh');
        return String(a.label || '').localeCompare(String(b.label || ''), 'zh');
      });

    const cols = colsForHorizontal(kids.length);
    const metrics = frameMetrics(kids, cols);
    const zoneTone = MACRO_TONE[slug] || TONES.slate;
    const origin = { x, y: originY };
    const laid = layoutKidsRowMajor(kids, origin, cols);

    frames.push({
      id: frame.id,
      kind: 'chapter',
      label: frame.label,
      subtitle: frame.subtitle,
      tag: ZONE_TAG[slug] || frame.tag || 'Zone',
      position: { ...origin },
      size: { width: metrics.width, height: metrics.height },
      cols: laid.cols,
      rows: laid.rows,
      markdown: VIBEHUB_BODIES[frame.id],
      slug,
      tone: zoneTone,
    });

    const posById = new Map(laid.positions.map((p) => [p.id, p]));
    kids.forEach((c) => {
      const p = posById.get(c.id);
      cards.push({
        ...c,
        kind: 'topic',
        parentId: frame.id,
        position: { x: p.x, y: p.y },
        tone: vibeCardTone(slug, c.id, c.subtitle),
        row: p.row,
        col: p.col,
      });
    });

    pushCategoryChainEdges(slug, laid.positions, kids, edges);

    edges.push({
      id: `ve-hub-${slug}`,
      source: VIBE_HUB_ID,
      target: frame.id,
      sourceHandle: 'right',
      targetHandle: 'left-t',
      label: `${frame.label} · ${frame.termCount}`,
      color: zoneTone.edge || zoneTone.bg,
      pathKind: 'bezier',
      routeOffset: bandIdx * 6,
    });

    x += metrics.width + FRAME_GAP_X;
    bandBottom = Math.max(bandBottom, originY + metrics.height);
    bandIdx += 1;
  }

  return bandBottom;
}

/** @type {ReturnType<typeof buildVibeGraphModelUncached> | null} */
let cached = null;

function buildVibeGraphModelUncached() {
  const hubH = estimateVibeCardHeight('知识导图2', '七大区 · 紧凑词表');
  /** @type {object[]} */
  const frames = [];
  /** @type {object[]} */
  const cards = [];
  /** @type {object[]} */
  const edges = [];

  const packBySlug = new Map(VIBEHUB_MACRO_FRAMES.map((f) => [f.slug, f]));

  const hubCard = {
    id: VIBE_HUB_ID,
    kind: 'topic',
    label: '知识导图2',
    subtitle: `${VIBEHUB_TERM_CARDS.length} 词条 · 紧凑展开`,
    tag: '入口',
    role: '蓝条拖整章 · 空白拖动画布 · 点选强调同区',
    position: { x: HUB_X, y: 120 },
    height: hubH,
    tone: TONES.violet,
    markdown: VIBEHUB_BODIES[VIBE_HUB_ID],
  };
  cards.push(hubCard);

  const contentX = HUB_X + VIBE_CARD_W + HUB_GAP;
  const topY = 40;
  const afterPrimary = placeBand(
    BAND_PRIMARY,
    contentX,
    topY,
    packBySlug,
    frames,
    cards,
    edges
  );
  let y = afterPrimary + FRAME_GAP_Y;
  for (const row of BAND_SECONDARY_ROWS) {
    y = placeBand(row, contentX, y, packBySlug, frames, cards, edges) + FRAME_GAP_Y;
  }

  const framePos = new Map(frames.map((f) => [f.slug, f]));
  MACRO_BRIDGES.forEach((b, i) => {
    const a = framePos.get(b.from);
    const c = framePos.get(b.to);
    if (!a || !c) return;
    const ac = {
      x: a.position.x + a.size.width / 2 - VIBE_CARD_W / 2,
      y: a.position.y + a.size.height / 2 - VIBE_CARD_H_MIN / 2,
    };
    const cc = {
      x: c.position.x + c.size.width / 2 - VIBE_CARD_W / 2,
      y: c.position.y + c.size.height / 2 - VIBE_CARD_H_MIN / 2,
    };
    const handles = inferHandles(ac, cc);
    const dist = Math.hypot(cc.x - ac.x, cc.y - ac.y);
    edges.push({
      id: `ve-bridge-${b.from}-${b.to}`,
      source: a.id,
      target: c.id,
      sourceHandle: handles.sourceHandle,
      targetHandle: targetHandle(handles.targetHandle),
      label: b.label,
      color: TONES.slate.edge,
      pathKind: pathKindFor('bridge', false, dist),
      routeOffset: (i % 3) * 10,
    });
  });

  for (const e of edges) {
    e.targetHandle = targetHandle(e.targetHandle);
  }

  if (frames.length) {
    const minY = Math.min(...frames.map((f) => f.position.y));
    const maxY = Math.max(
      ...frames.map((f) => f.position.y + f.size.height)
    );
    hubCard.position = {
      x: HUB_X,
      y: Math.round((minY + maxY) / 2 - hubH / 2),
    };
  }

  return { frames, cards, edges };
}

export function buildVibeGraphModel() {
  if (!cached) cached = buildVibeGraphModelUncached();
  return cached;
}

export function resetVibeGraphCache() {
  cached = null;
}

export function buildVibeFlowNodes() {
  const { frames, cards } = buildVibeGraphModel();
  return [
    ...frames.map((f) => ({
      id: f.id,
      type: 'chapter',
      position: { ...f.position },
      draggable: true,
      selectable: true,
      zIndex: 0,
      /* 整框不截获指针：空白处事件落到画布，才能平移 */
      style: {
        width: `${f.size.width}px`,
        height: `${f.size.height}px`,
        pointerEvents: 'none',
      },
      class: 'mm-chapter-pass',
      data: {
        kind: 'chapter',
        label: f.label,
        subtitle: f.subtitle,
        tag: f.tag,
        lit: false,
        cols: f.cols || 1,
        rows: f.rows || 1,
        slug: f.slug,
        tone: f.tone || MACRO_TONE[f.slug] || TONES.slate,
      },
    })),
    ...cards.map((c) => ({
      id: c.id,
      type: 'knowledge',
      position: { ...c.position },
      draggable: false,
      zIndex: 2,
      style: { width: `${VIBE_CARD_W}px` },
      data: {
        kind: 'topic',
        label: c.label,
        subtitle: c.subtitle,
        tag: c.tag,
        tone: c.tone,
        chapterId: c.parentId,
        role: c.role,
        row: c.row,
        col: c.col,
      },
    })),
  ];
}

export function buildVibeFlowEdges() {
  const { edges } = buildVibeGraphModel();
  return edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    sourceHandle: e.sourceHandle,
    targetHandle: e.targetHandle,
    label: e.label || '',
    type: 'relation',
    data: {
      label: e.label || '',
      color: e.color,
      pathKind: e.pathKind || 'smoothstep',
      routeOffset: e.routeOffset || 0,
      lit: false,
    },
  }));
}

export function countVibeTopics() {
  return VIBEHUB_TERM_CARDS.length + 1;
}

/**
 * @param {import('@vue-flow/core').Node[]} frames
 * @param {import('@vue-flow/core').Node[]} topics
 */
export function reflowVibeFrames(frames, topics) {
  const hub = topics.find((n) => n.id === VIBE_HUB_ID);
  const bySlug = new Map();
  for (const f of frames) {
    const slug = f.data?.slug;
    if (slug) bySlug.set(slug, f);
  }

  /**
   * @param {string[]} slugs
   * @param {number} originX
   * @param {number} originY
   */
  function reflowBand(slugs, originX, originY) {
    let x = originX;
    let bandBottom = originY;
    for (const slug of slugs) {
      const frame = bySlug.get(slug);
      if (!frame) continue;
      const kids = topics
        .filter((n) => n.data?.chapterId === frame.id)
        .sort((a, b) => {
          const ra = a.data?.row ?? 0;
          const rb = b.data?.row ?? 0;
          if (ra !== rb) return ra - rb;
          return (a.data?.col ?? 0) - (b.data?.col ?? 0);
        });
      if (!kids.length) continue;
      const cols = Math.max(
        1,
        Number(frame.data?.cols) || colsForHorizontal(kids.length)
      );
      const measured = kids.map((k) => ({
        id: k.id,
        label: k.data?.label,
        subtitle: k.data?.subtitle,
        height: Math.max(
          VIBE_CARD_H_MIN,
          k.dimensions?.height || VIBE_CARD_H_MIN
        ),
      }));
      frame.position = { x, y: originY };
      const laid = layoutKidsRowMajor(measured, frame.position, cols);
      const posById = new Map(laid.positions.map((p) => [p.id, p]));
      for (const kid of kids) {
        const p = posById.get(kid.id);
        if (!p) continue;
        kid.position = { x: p.x, y: p.y };
        if (kid.data) {
          kid.data.row = p.row;
          kid.data.col = p.col;
        }
      }
      frame.style = {
        ...(frame.style || {}),
        width: `${laid.width}px`,
        height: `${laid.height}px`,
        pointerEvents: 'none',
      };
      if (frame.data) {
        frame.data.cols = laid.cols;
        frame.data.rows = laid.rows;
      }
      x += laid.width + FRAME_GAP_X;
      bandBottom = Math.max(bandBottom, originY + laid.height);
    }
    return bandBottom;
  }

  const contentX = HUB_X + VIBE_CARD_W + HUB_GAP;
  const topY = 40;
  const after = reflowBand(BAND_PRIMARY, contentX, topY);
  let y = after + FRAME_GAP_Y;
  for (const row of BAND_SECONDARY_ROWS) {
    y = reflowBand(row, contentX, y) + FRAME_GAP_Y;
  }

  if (hub && frames.length) {
    const minY = Math.min(...frames.map((f) => f.position.y));
    const maxY = Math.max(
      ...frames.map((f) => {
        const h =
          Number.parseFloat(f.style?.height) || f.dimensions?.height || 0;
        return f.position.y + h;
      })
    );
    const hubH = Math.max(
      VIBE_CARD_H_MIN,
      hub.dimensions?.height || VIBE_CARD_H_MIN
    );
    hub.position = {
      x: HUB_X,
      y: Math.round((minY + maxY) / 2 - hubH / 2),
    };
  }
}
