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
  /* 章框穿透；词条 mm-nopan 在 GraphCard 上，保证点选不被平移抢走 */
  return isChapterNode(n) ? MM_CHAPTER_PASS : '';
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
    /* 各图在 reflow / pane-ready 后自行 fit，避免与 init 连发抢视口 */
    fitViewOnInit: false,
    /* 仅章框蓝条可拖整章；词条固定，避免「想平移却拖走卡片」 */
    nodesDraggable: true,
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
    if (isChapterNode(n)) {
      /* 章框：窄屏锁拖；桌面仅蓝条可拖 */
      const want = ok;
      if (n.draggable !== want) n.draggable = want;
      const handle = want ? CHAPTER_DRAG_HANDLE : undefined;
      if (n.dragHandle !== handle) n.dragHandle = handle;
    } else {
      /* 词条永不拖，保证在卡片上按下是平移画布 */
      if (n.draggable !== false) n.draggable = false;
      if (n.dragHandle != null) n.dragHandle = undefined;
    }
  }
}

/**
 * 一次 O(N) 建索引，避免边循环里反复 find
 * @param {object[] | import('vue').Ref<object[]>} nodesOrRef
 */
export function buildChapterIndex(nodesOrRef) {
  const list = Array.isArray(nodesOrRef) ? nodesOrRef : nodesOrRef.value;
  /** @type {Map<string, string>} id → chapterId */
  const chapterOf = new Map();
  /** @type {Map<string, object[]>} chapterId → topic nodes */
  const membersOf = new Map();

  for (const n of list) {
    if (isChapterNode(n)) {
      chapterOf.set(n.id, n.id);
      if (!membersOf.has(n.id)) membersOf.set(n.id, []);
      continue;
    }
    const ch = n.data?.chapterId;
    if (!ch) continue;
    chapterOf.set(n.id, ch);
    let bag = membersOf.get(ch);
    if (!bag) {
      bag = [];
      membersOf.set(ch, bag);
    }
    if (n.data?.kind === 'topic') bag.push(n);
  }

  return { chapterOf, membersOf };
}

/**
 * @param {import('vue').Ref<object[]>} nodes
 * @param {string | null | undefined} nodeId
 * @param {Map<string, string>} [index]
 */
export function chapterIdOf(nodes, nodeId, index) {
  if (!nodeId) return null;
  if (index) return index.get(nodeId) || null;
  const n = nodes.value.find((x) => x.id === nodeId);
  if (!n) return null;
  if (isChapterNode(n)) return n.id;
  return n.data?.chapterId || null;
}

/**
 * @param {import('vue').Ref<object[]>} nodes
 * @param {string | null | undefined} chapterId
 * @param {Map<string, object[]>} [membersOf]
 */
export function chapterMemberIds(nodes, chapterId, membersOf) {
  const set = new Set();
  if (!chapterId) return set;
  if (membersOf) {
    for (const n of membersOf.get(chapterId) || []) set.add(n.id);
    return set;
  }
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
 * —— 只跟 activeId；不跟 hover（平移时卡片滑过指针会狂刷，卡且「全亮」）
 * @param {{
 *   nodes: import('vue').Ref<object[]>,
 *   edges: import('vue').Ref<object[]>,
 *   activeId: string | null | undefined,
 * }} opts
 */
export function syncFocusHighlight(opts) {
  const { nodes, edges, activeId } = opts;
  const { chapterOf, membersOf } = buildChapterIndex(nodes);
  const focusId = activeId || null;
  const chapterId = focusId ? chapterOf.get(focusId) || null : null;
  const chapterMembers = chapterId
    ? chapterMemberIds(nodes, chapterId, membersOf)
    : new Set();
  const adjacent = neighborIds(edges, focusId);
  const hasFocus = Boolean(focusId);

  for (const e of edges.value) {
    const onActive = Boolean(
      activeId && (e.source === activeId || e.target === activeId)
    );
    if (e.selected !== onActive) e.selected = onActive;
    const prev = e.data || {};
    if (prev.preview || prev.chapterLit) {
      e.data = { ...prev, preview: false, chapterLit: false };
    }
    /* 不用 animated dash：持续重绘边会让平移发粘 */
    if (e.animated) e.animated = false;
    if (e.class) e.class = '';
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
      if (n.id === focusId) {
        focus = '';
      } else if (adjacent.has(n.id)) {
        /* 只亮邻接，不整章 peer 全亮（大章几十张一起发光很卡） */
        focus = chapterMembers.has(n.id) ? 'is-chapter-peer' : 'is-bridge-peer';
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
  let viewportMoving = false;
  let chapterDragOrigin = null;
  /** @type {object[] | null} */
  let chapterMemberCache = null;
  let mobileMq = null;
  let clearDragTimer = 0;
  const isPanning = ref(false);

  function syncDraggableFlag() {
    nodesDraggable.value = !isStackedLayout();
    applyNodeDragLock(nodes, nodesDraggable);
  }

  function onNodeDragStart({ node }) {
    if (!nodesDraggable.value) return;
    dragMoved = false;
    if (isChapterNode(node)) {
      chapterDragOrigin = { x: node.position.x, y: node.position.y };
      const { membersOf } = buildChapterIndex(nodes);
      chapterMemberCache = membersOf.get(node.id) || [];
    } else {
      chapterDragOrigin = null;
      chapterMemberCache = null;
    }
  }

  function onNodeDrag({ node }) {
    if (!nodesDraggable.value) return;
    dragMoved = true;
    if (!isChapterNode(node) || !chapterDragOrigin || !chapterMemberCache) return;
    const dx = node.position.x - chapterDragOrigin.x;
    const dy = node.position.y - chapterDragOrigin.y;
    if (dx === 0 && dy === 0) return;
    chapterDragOrigin = { x: node.position.x, y: node.position.y };
    for (const n of chapterMemberCache) {
      n.position.x += dx;
      n.position.y += dy;
    }
  }

  function onNodeDragStop() {
    chapterDragOrigin = null;
    chapterMemberCache = null;
    scheduleClearDragFlag();
  }

  /**
   * 画布平移 / 缩放。
   * fitView 等程序化改视口时 event 常为 null——勿介入点击守卫。
   * move-start  alone 不标 dragMoved：纯点击也会先 start 再 end，否则点卡/点空白全失效。
   * @param {{ event?: Event | null }} [payload]
   */
  function onMoveStart(payload) {
    if (!payload?.event) return;
    viewportMoving = true;
    isPanning.value = true;
  }

  /** 视口真正动了才吞随后的 click */
  function onMove() {
    if (!viewportMoving) return;
    dragMoved = true;
  }

  function onMoveEnd(payload) {
    if (!payload?.event && !viewportMoving) return;
    viewportMoving = false;
    isPanning.value = false;
    scheduleClearDragFlag();
  }

  function scheduleClearDragFlag() {
    if (clearDragTimer) clearTimeout(clearDragTimer);
    clearDragTimer = window.setTimeout(() => {
      if (!viewportMoving) dragMoved = false;
      clearDragTimer = 0;
    }, 50);
  }

  function wasDragMoved() {
    /* 只认真实位移；viewportMoving 在纯点击的 start→end 间也会为 true，不能用来吞点选 */
    return dragMoved;
  }

  function isViewportMoving() {
    return viewportMoving;
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
      /* 章框拖拽阈值；词条本身不可拖 */
      nodeDragThreshold: nodesDraggable.value ? 8 : 64,
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
    if (clearDragTimer) clearTimeout(clearDragTimer);
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
    isPanning,
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
    onMoveStart,
    onMove,
    onMoveEnd,
    wasDragMoved,
    isViewportMoving,
    syncDraggableFlag,
    flowAttrs,
    applyNodeDragLock: () => applyNodeDragLock(nodes, nodesDraggable),
  };
}
