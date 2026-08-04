/**
 * 三张思维导图共用：窄屏锁拖、章框蓝条拖+连带词条、焦点强调、画布铬、题数角标
 */
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { listQuestions } from '../data/quiz/bank.js';
import { isStackedLayout } from './usePanelResize.js';

/** 章框仅标题条可拖；空白穿透以便平移画布 */
export const CHAPTER_DRAG_HANDLE = '.chapter__drag';
export const MM_NO_PAN = 'mm-nopan';
export const MM_CHAPTER_PASS = 'mm-chapter-pass';

/** @param {object} n */
export function isChapterNode(n) {
  return n?.type === 'chapter' || n?.data?.kind === 'chapter';
}

/** @param {object} n */
export function nodePassClass(n) {
  return isChapterNode(n) ? MM_CHAPTER_PASS : MM_NO_PAN;
}

/**
 * @param {object} n
 * @param {string} [focusClass]
 */
export function composeNodeClass(n, focusClass = '') {
  return [nodePassClass(n), focusClass].filter(Boolean).join(' ');
}

/** 节点 id → 关联练习题数量（导图1/2 卡片角标） */
export function buildQuizCountMap() {
  /** @type {Map<string, number>} */
  const m = new Map();
  try {
    for (const q of listQuestions()) {
      for (const id of q.relatedNodes || []) {
        m.set(id, (m.get(id) || 0) + 1);
      }
    }
  } catch {
    /* ignore */
  }
  return m;
}

/**
 * VueFlow 三图共用属性（可覆盖 zoom / viewport 等）
 * @param {Record<string, unknown>} [overrides]
 */
export function mindMapVueFlowAttrs(overrides = {}) {
  return {
    nodesConnectable: false,
    edgesUpdatable: false,
    elementsSelectable: true,
    elevateEdgesOnSelect: false,
    selectNodesOnDrag: false,
    multiSelectionKeyCode: null,
    panOnDrag: true,
    zoomOnScroll: true,
    zoomOnPinch: true,
    zoomOnDoubleClick: false,
    preventScrolling: true,
    noPanClassName: MM_NO_PAN,
    fitViewOnInit: true,
    ...overrides,
  };
}

/**
 * @param {import('vue').Ref<object[]>} nodes
 * @param {import('vue').Ref<boolean>} nodesDraggable
 */
export function applyNodeDragLock(nodes, nodesDraggable) {
  const ok = nodesDraggable.value;
  for (const n of nodes.value) {
    if (n.draggable !== ok) n.draggable = ok;
    if (isChapterNode(n)) {
      const handle = ok ? CHAPTER_DRAG_HANDLE : undefined;
      if (n.dragHandle !== handle) n.dragHandle = handle;
    }
  }
}

/**
 * @param {import('vue').Ref<object[]>} nodes
 * @param {string | null | undefined} nodeId
 */
export function chapterIdOf(nodes, nodeId) {
  if (!nodeId) return null;
  const n = nodes.value.find((x) => x.id === nodeId);
  if (!n) return null;
  if (isChapterNode(n)) return n.id;
  return n.data?.chapterId || null;
}

/**
 * @param {import('vue').Ref<object[]>} nodes
 * @param {string | null | undefined} chapterId
 */
export function chapterMemberIds(nodes, chapterId) {
  const set = new Set();
  if (!chapterId) return set;
  for (const n of nodes.value) {
    if (n.data?.kind === 'topic' && n.data.chapterId === chapterId) {
      set.add(n.id);
    }
  }
  return set;
}

/**
 * @param {import('vue').Ref<object[]>} edges
 * @param {string | null | undefined} id
 */
export function neighborIds(edges, id) {
  if (!id) return new Set();
  const set = new Set([id]);
  for (const e of edges.value) {
    if (e.source === id) set.add(e.target);
    if (e.target === id) set.add(e.source);
  }
  return set;
}

/**
 * 焦点强调 / 非焦点弱化：同章 peer、跨章邻接、其余压暗
 * （保留 mm-nopan / mm-chapter-pass，避免盖掉画布穿透类）
 * @param {{
 *   nodes: import('vue').Ref<object[]>,
 *   edges: import('vue').Ref<object[]>,
 *   activeId: string | null | undefined,
 *   hoverId?: string | null,
 * }} opts
 */
export function syncFocusHighlight(opts) {
  const { nodes, edges, activeId, hoverId = null } = opts;
  const focusId = activeId || hoverId;
  const chapterId = chapterIdOf(nodes, focusId);
  const chapterMembers = chapterId ? chapterMemberIds(nodes, chapterId) : new Set();
  const adjacent = neighborIds(edges, focusId);
  const hasFocus = Boolean(focusId);

  for (const e of edges.value) {
    const onActive = Boolean(
      activeId && (e.source === activeId || e.target === activeId)
    );
    const onHover = Boolean(
      hoverId && (e.source === hoverId || e.target === hoverId)
    );
    if (e.selected !== onActive) e.selected = onActive;
    const preview = onHover && !onActive;
    const chapterLit = Boolean(
      chapterId &&
        (chapterIdOf(nodes, e.source) === chapterId ||
          chapterIdOf(nodes, e.target) === chapterId)
    );
    e.data = {
      ...(e.data || {}),
      preview,
      chapterLit: chapterLit && !onActive && !preview,
    };
    const wantAnimated = onActive || preview;
    if (e.animated !== wantAnimated) e.animated = wantAnimated;
    const nextClass = preview ? 'is-preview' : '';
    if (e.class !== nextClass) e.class = nextClass;
  }

  for (const n of nodes.value) {
    if (isChapterNode(n)) {
      if (n.selected) n.selected = false;
      const lit = Boolean(chapterId && n.id === chapterId);
      const focus = lit ? 'is-chapter-frame' : hasFocus ? 'is-chapter-dim' : '';
      const next = composeNodeClass(n, focus);
      if (n.class !== next) n.class = next;
      if (n.data?.lit !== lit) n.data = { ...n.data, lit };
      continue;
    }
    const on = n.id === activeId;
    if (n.selected !== on) n.selected = on;
    let focus = '';
    if (hasFocus) {
      if (n.id === focusId) focus = '';
      else if (adjacent.has(n.id)) {
        focus = chapterMembers.has(n.id) ? 'is-chapter-peer' : 'is-bridge-peer';
      } else if (chapterMembers.has(n.id)) {
        focus = 'is-chapter-peer';
      } else {
        focus = 'is-dimmed';
      }
    }
    const next = composeNodeClass(n, focus);
    if (n.class !== next) n.class = next;
  }
}

/**
 * @param {{
 *   nodes: import('vue').Ref<object[]>,
 *   theme?: { value: string },
 * }} opts
 */
export function useMindMapChrome(opts) {
  const { nodes, theme } = opts;
  const nodesDraggable = ref(
    typeof window === 'undefined' ? true : !isStackedLayout()
  );
  const isMobileGraph = computed(() => !nodesDraggable.value);
  const isLight = computed(() => (theme?.value ?? 'light') === 'light');

  const miniWidth = computed(() => (isMobileGraph.value ? 128 : 172));
  const miniHeight = computed(() => (isMobileGraph.value ? 88 : 120));

  const bgColor = computed(() =>
    isLight.value ? '#e2e8f0' : 'rgba(161, 161, 170, 0.18)'
  );
  const miniMask = computed(() =>
    isLight.value ? 'rgba(15, 23, 42, 0.07)' : 'rgba(0, 0, 0, 0.48)'
  );
  const miniMaskStroke = computed(() =>
    isLight.value ? 'rgba(14, 165, 233, 0.72)' : 'rgba(56, 189, 248, 0.75)'
  );

  let dragMoved = false;
  let chapterDragOrigin = null;
  let mobileMq = null;

  function syncDraggableFlag() {
    nodesDraggable.value = !isStackedLayout();
    applyNodeDragLock(nodes, nodesDraggable);
  }

  function onNodeDragStart({ node }) {
    if (!nodesDraggable.value) return;
    dragMoved = false;
    chapterDragOrigin = isChapterNode(node)
      ? { x: node.position.x, y: node.position.y }
      : null;
  }

  function onNodeDrag({ node }) {
    if (!nodesDraggable.value) return;
    dragMoved = true;
    if (!isChapterNode(node) || !chapterDragOrigin) return;
    const dx = node.position.x - chapterDragOrigin.x;
    const dy = node.position.y - chapterDragOrigin.y;
    if (dx === 0 && dy === 0) return;
    chapterDragOrigin = { x: node.position.x, y: node.position.y };
    const chapterId = node.id;
    for (const n of nodes.value) {
      if (n.data?.kind === 'topic' && n.data.chapterId === chapterId) {
        n.position.x += dx;
        n.position.y += dy;
      }
    }
  }

  function onNodeDragStop() {
    chapterDragOrigin = null;
    requestAnimationFrame(() => {
      dragMoved = false;
    });
  }

  function wasDragMoved() {
    return dragMoved;
  }

  function miniNodeColor(n) {
    if (isChapterNode(n)) {
      const bg = n.data?.tone?.bg;
      if (bg) return isLight.value ? `${bg}28` : `${bg}40`;
      return isLight.value
        ? 'rgba(148, 163, 184, 0.12)'
        : 'rgba(113, 113, 122, 0.16)';
    }
    return n.data?.tone?.bg || (isLight.value ? '#64748b' : '#a1a1aa');
  }

  function miniNodeStroke(n) {
    if (isChapterNode(n)) {
      return (
        n.data?.tone?.bg ||
        (isLight.value
          ? 'rgba(100, 116, 139, 0.5)'
          : 'rgba(161, 161, 170, 0.45)')
      );
    }
    return isLight.value ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.22)';
  }

  function miniNodeClass(n) {
    return isChapterNode(n) ? 'mm-chapter' : 'mm-topic';
  }

  /**
   * @param {Record<string, unknown>} [overrides]
   */
  function flowAttrs(overrides = {}) {
    return mindMapVueFlowAttrs({
      nodesDraggable: nodesDraggable.value,
      nodeDragThreshold: nodesDraggable.value ? 1 : 64,
      ...overrides,
    });
  }

  onMounted(() => {
    try {
      mobileMq = window.matchMedia('(max-width: 960px)');
      mobileMq.addEventListener('change', syncDraggableFlag);
    } catch {
      /* ignore */
    }
    syncDraggableFlag();
  });

  onUnmounted(() => {
    try {
      mobileMq?.removeEventListener('change', syncDraggableFlag);
    } catch {
      /* ignore */
    }
  });

  return {
    nodesDraggable,
    isMobileGraph,
    isLight,
    miniWidth,
    miniHeight,
    bgColor,
    miniMask,
    miniMaskStroke,
    miniNodeColor,
    miniNodeStroke,
    miniNodeClass,
    onNodeDragStart,
    onNodeDrag,
    onNodeDragStop,
    wasDragMoved,
    syncDraggableFlag,
    flowAttrs,
    applyNodeDragLock: () => applyNodeDragLock(nodes, nodesDraggable),
  };
}
