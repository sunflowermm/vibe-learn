/**
 * 题库思维导图：左枢纽 → 右领域横向铺开
 *
 * 卡片高度随文案变化：初排用估高；QuizMindMap 挂载后按实测再排一版。
 */

import { CARD_W } from '../../utils/layout-from-edges.js';
import { QUIZ_DOMAINS } from './categories.js';
import {
  listQuizSets,
  domainPoolMeta,
  randomPoolMeta,
  glossaryPoolMeta,
} from './bank.js';

/** 与 GraphCard CSS width 一致 */
export const QUIZ_CARD_W = CARD_W;
/** 估高下限（短文案） */
export const QUIZ_CARD_H_MIN = 112;
const STACK_GAP = 22;
export const FRAME_PAD_X = 44;
export const FRAME_PAD_Y = 28;
/** 给 chapter 顶栏留足高度 */
export const FRAME_HEAD = 78;
const FRAME_GAP_X = 56;
const FRAME_GAP_Y = 64;
const FRAMES_PER_ROW = 8;
const HUB_X = 36;
const HUB_TO_FRAME = 110;

/** 供实测重排：框内竖向间距 */
export const QUIZ_STACK_GAP = STACK_GAP;

export const DOMAIN_TONES = {
  dsa: { bg: '#7c3aed' },
  net: { bg: '#0284c7' },
  'os-db': { bg: '#0f766e' },
  lang: { bg: '#4f46e5' },
  craft: { bg: '#b45309' },
  xrk: { bg: '#be123c' },
  ai: { bg: '#9333ea' },
  ops: { bg: '#334155' },
};

/** @type {ReturnType<typeof buildQuizGraphModelUncached> | null} */
let cachedModel = null;

/**
 * 对齐 GraphCard：title/sub 各最多 2 行；中文约 11 字/行
 * @param {string} [label]
 * @param {string} [subtitle]
 */
export function estimateCardHeight(label = '', subtitle = '') {
  const padY = 16 + 18;
  const tagBlock = 11 + 8;
  const titleChars = [...String(label)].length;
  const subChars = [...String(subtitle || '')].length;
  const titleLines = Math.min(2, Math.max(1, Math.ceil(titleChars / 11)));
  const subLines = subChars
    ? Math.min(2, Math.max(1, Math.ceil(subChars / 16)))
    : 0;
  const titleH = titleLines * 17 * 1.2;
  const subH = subLines ? 8 + subLines * 12.5 * 1.45 : 0;
  return Math.max(QUIZ_CARD_H_MIN, Math.ceil(padY + tagBlock + titleH + subH));
}

/**
 * @param {{ label?: string, subtitle?: string, height?: number }[]} children
 */
function frameMetrics(children) {
  const width = FRAME_PAD_X * 2 + QUIZ_CARD_W;
  let stack = 0;
  children.forEach((c, i) => {
    const h = c.height || estimateCardHeight(c.label, c.subtitle);
    stack += h;
    if (i < children.length - 1) stack += STACK_GAP;
  });
  const height = FRAME_HEAD + FRAME_PAD_Y * 2 + Math.max(stack, QUIZ_CARD_H_MIN);
  return { cols: 1, width, height, stack };
}

function buildQuizGraphModelUncached() {
  const domains = QUIZ_DOMAINS.filter((d) => d.id !== 'all');
  const sets = listQuizSets();
  const random = randomPoolMeta();
  const glossary = glossaryPoolMeta();

  /** @type {object[]} */
  const frames = [];
  /** @type {object[]} */
  const cards = [];
  /** @type {object[]} */
  const edges = [];

  const hubId = random.id;
  const hubH = estimateCardHeight(random.title, random.caption);
  const hubCard = {
    id: hubId,
    kind: 'topic',
    parentId: null,
    label: random.title,
    subtitle: random.caption,
    tag: `专题 · ${random.questionCount}`,
    role: 'random',
    domain: 'all',
    setKind: 'pool',
    questionCount: random.questionCount,
    height: hubH,
    position: { x: HUB_X, y: 80 },
    tone: { bg: '#0ea5e9' },
  };
  cards.push(hubCard);

  const glossH = estimateCardHeight(glossary.title, glossary.caption);
  const glossCard = {
    id: glossary.id,
    kind: 'topic',
    parentId: null,
    label: glossary.title,
    subtitle: glossary.caption,
    tag: `名词 · ${glossary.questionCount}`,
    role: 'glossary',
    domain: 'all',
    setKind: 'pool',
    questionCount: glossary.questionCount,
    height: glossH,
    position: { x: HUB_X, y: 80 + hubH + 40 },
    tone: { bg: '#ca8a04' },
  };
  cards.push(glossCard);

  /** @type {{ domain: object, pool: object, children: object[], metrics: ReturnType<typeof frameMetrics>, setCount: number }[]} */
  const packs = domains.map((dom) => {
    const domainSets = sets.filter((s) => s.domain === dom.id);
    const pool = domainPoolMeta(dom.id);
    const children = [
      {
        id: pool.id,
        label: `${dom.label} · 综合池`,
        subtitle: pool.caption,
        tag: `专题 ${pool.topicCount} · 词典 ${pool.glossaryCount}`,
        role: 'pool',
        setKind: 'pool',
        questionCount: pool.questionCount,
        kindFilter: 'concept',
        domain: dom.id,
      },
      ...domainSets.map((s) => ({
        id: s.id,
        label: s.title,
        subtitle: s.caption || (s.kind === 'interview' ? '大厂专题' : '概念专题'),
        tag: `专题 · ${s.kind === 'interview' ? '大厂' : '概念'} · ${s.questions.length}`,
        role: 'set',
        setKind: 'set',
        questionCount: s.questions.length,
        kindFilter: s.kind,
        domain: s.domain,
        relatedNodes: s.relatedNodes || [],
      })),
    ].map((c) => ({
      ...c,
      height: estimateCardHeight(c.label, c.subtitle),
    }));
    return {
      domain: dom,
      pool,
      children,
      metrics: frameMetrics(children),
      setCount: domainSets.length,
    };
  });

  const frameStartX = HUB_X + QUIZ_CARD_W + HUB_TO_FRAME;
  const rowHeights = [];
  for (let i = 0; i < packs.length; i += FRAMES_PER_ROW) {
    const slice = packs.slice(i, i + FRAMES_PER_ROW);
    rowHeights.push(Math.max(...slice.map((p) => p.metrics.height)));
  }

  packs.forEach((pack, di) => {
    const row = Math.floor(di / FRAMES_PER_ROW);
    const col = di % FRAMES_PER_ROW;
    const { domain: dom, pool, children, metrics } = pack;
    const tone = DOMAIN_TONES[dom.id] || { bg: '#4f46e5' };

    let originX = frameStartX;
    for (let c = 0; c < col; c += 1) {
      const prev = packs[row * FRAMES_PER_ROW + c];
      originX += prev.metrics.width + FRAME_GAP_X;
    }
    let originY = 48;
    for (let r = 0; r < row; r += 1) {
      originY += rowHeights[r] + FRAME_GAP_Y;
    }

    const frameId = `qf-${dom.id}`;
    frames.push({
      id: frameId,
      kind: 'chapter',
      label: dom.label,
      subtitle: pool.caption,
      tag: '领域',
      position: { x: originX, y: originY },
      size: { width: metrics.width, height: metrics.height },
      domain: dom.id,
    });

    /** @type {string[]} */
    const placedIds = [];
    let y = originY + FRAME_HEAD + FRAME_PAD_Y;
    const x = originX + FRAME_PAD_X;
    children.forEach((c) => {
      cards.push({
        ...c,
        kind: 'topic',
        parentId: frameId,
        position: { x, y },
        tone,
      });
      placedIds.push(c.id);
      y += c.height + STACK_GAP;
    });

    const fan = di - (packs.length - 1) / 2;
    edges.push({
      id: `qe-hub-${dom.id}`,
      source: hubId,
      target: pool.id,
      sourceHandle: 'right',
      targetHandle: 'left-t',
      label: dom.label,
      color: tone.bg,
      pathKind: 'bezier',
      routeOffset: Math.round(fan * 22),
      branch: false,
    });

    for (let i = 0; i < placedIds.length - 1; i += 1) {
      edges.push({
        id: `qe-chain-${dom.id}-${i}`,
        source: placedIds[i],
        target: placedIds[i + 1],
        sourceHandle: 'bottom',
        targetHandle: 'top-t',
        label: '',
        color: tone.bg,
        pathKind: 'smoothstep',
        branch: 'side',
        routeOffset: (i % 2) * 6,
      });
    }
  });

  if (frames.length) {
    const minY = Math.min(...frames.map((f) => f.position.y));
    const maxY = Math.max(...frames.map((f) => f.position.y + f.size.height));
    const mid = Math.round((minY + maxY) / 2);
    const stackH = hubH + glossH + 40;
    hubCard.position = { x: HUB_X, y: mid - stackH / 2 };
    glossCard.position = {
      x: HUB_X,
      y: mid - stackH / 2 + hubH + 40,
    };
  }

  edges.push({
    id: 'qe-hub-glossary',
    source: hubId,
    target: glossCard.id,
    sourceHandle: 'bottom',
    targetHandle: 'top-t',
    label: '名词另册',
    color: '#ca8a04',
    pathKind: 'smoothstep',
    branch: 'side',
    routeOffset: 0,
  });

  return { frames, cards, edges };
}

/** @returns {{ frames: object[], cards: object[], edges: object[] }} */
export function buildQuizGraphModel() {
  if (!cachedModel) cachedModel = buildQuizGraphModelUncached();
  return cachedModel;
}

export function resetQuizGraphCache() {
  cachedModel = null;
}

export function buildQuizFlowNodes() {
  const { frames, cards } = buildQuizGraphModel();
  return [
    ...frames.map((f) => ({
      id: f.id,
      type: 'chapter',
      position: f.position,
      draggable: true,
      selectable: false,
      zIndex: 0,
      style: {
        width: `${f.size.width}px`,
        height: `${f.size.height}px`,
      },
      data: {
        kind: 'chapter',
        label: f.label,
        subtitle: f.subtitle,
        tag: f.tag,
        domain: f.domain,
        lit: false,
      },
    })),
    ...cards.map((c) => ({
      id: c.id,
      type: 'knowledge',
      position: c.position,
      draggable: true,
      zIndex: 2,
      style: {
        width: `${QUIZ_CARD_W}px`,
      },
      data: {
        kind: 'topic',
        label: c.label,
        subtitle: c.subtitle,
        tag: c.tag,
        tone: c.tone,
        chapterId: c.parentId,
        setKind: c.setKind,
        domain: c.domain,
        kindFilter: c.kindFilter,
        questionCount: c.questionCount,
        relatedNodes: c.relatedNodes || [],
        role: c.role,
      },
    })),
  ];
}

export function buildQuizFlowEdges() {
  const { edges } = buildQuizGraphModel();
  return edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    sourceHandle: e.sourceHandle,
    targetHandle: e.targetHandle,
    type: 'relation',
    data: {
      label: e.label || '',
      color: e.color || undefined,
      pathKind: e.pathKind || 'smoothstep',
      branch: e.branch || false,
      routeOffset: e.routeOffset || 0,
    },
  }));
}

export function getQuizCardById(id) {
  return buildQuizGraphModel().cards.find((c) => c.id === id) || null;
}
