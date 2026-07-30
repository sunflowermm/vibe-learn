<script setup>
import { VueFlow, useVueFlow, ConnectionMode } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import ChapterFrame from './ChapterFrame.vue';
import GraphCard from './GraphCard.vue';
import RelationEdge from './RelationEdge.vue';
import {
  buildFlowEdges,
  buildFlowNodes,
  getOriginPositions,
} from '../data/nodes.js';
import { listQuestions } from '../data/quiz/bank.js';
import { isStackedLayout } from '../composables/usePanelResize.js';

const props = defineProps({
  activeId: { type: String, default: null },
  theme: { type: String, default: 'light' },
  /** 面板导航时递增，触发聚焦选中节点 */
  focusNonce: { type: Number, default: 0 },
  /** 本机书签节点 id */
  bookmarkedIds: { type: Array, default: () => [] },
  /** 有笔记的节点 id */
  notedIds: { type: Array, default: () => [] },
  /** 已访问过的节点 id（足迹） */
  visitedIds: { type: Array, default: () => [] },
  /** 用户自标已学的节点 id */
  learnedIds: { type: Array, default: () => [] },
});

const emit = defineEmits(['select', 'clear']);

const { fitView } = useVueFlow();

/** 窄屏 / 手机：禁止拖方块，只允许点选 + 画布平移缩放 */
const nodesDraggable = ref(typeof window === 'undefined' ? true : !isStackedLayout());

function syncNodesDraggableFlag() {
  nodesDraggable.value = !isStackedLayout();
}

function applyNodeDragLock() {
  const ok = nodesDraggable.value;
  for (const n of nodes.value) {
    if (n.draggable !== ok) n.draggable = ok;
    if (n.type === 'chapter' || n.data?.kind === 'chapter') {
      const handle = ok ? '.chapter__drag' : undefined;
      if (n.dragHandle !== handle) n.dragHandle = handle;
    }
  }
}

const isMobileGraph = computed(() => !nodesDraggable.value);

const miniWidth = computed(() => (isMobileGraph.value ? 128 : 172));
const miniHeight = computed(() => (isMobileGraph.value ? 88 : 120));

function quizCountMap() {
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

const nodes = ref(
  (() => {
    const counts = quizCountMap();
    return buildFlowNodes().map((n) => {
      const isChapter = n.type === 'chapter' || n.data?.kind === 'chapter';
      const quizCount = counts.get(n.id) || 0;
      return {
        ...n,
        selected: n.id === props.activeId,
        class: '',
        draggable: nodesDraggable.value,
        dragHandle: isChapter && nodesDraggable.value ? '.chapter__drag' : undefined,
        data: n.data ? { ...n.data, quizCount } : n.data,
      };
    });
  })()
);
const edges = ref(buildFlowEdges());

watch(nodesDraggable, applyNodeDragLock);

let mobileMq = null;
function onMobileMqChange() {
  syncNodesDraggableFlag();
}

onMounted(() => {
  try {
    mobileMq = window.matchMedia('(max-width: 960px)');
    mobileMq.addEventListener('change', onMobileMqChange);
  } catch {
    /* ignore */
  }
  syncNodesDraggableFlag();
  applyNodeDragLock();
});

onUnmounted(() => {
  try {
    mobileMq?.removeEventListener('change', onMobileMqChange);
  } catch {
    /* ignore */
  }
});

const nodeTypes = {
  knowledge: GraphCard,
  chapter: ChapterFrame,
};
const edgeTypes = { relation: RelationEdge };

const isLight = computed(() => props.theme === 'light');
const bgColor = computed(() =>
  isLight.value ? '#e2e8f0' : 'rgba(161, 161, 170, 0.18)'
);
/** 视口外遮罩：淡一点，别糊成灰板 */
const miniMask = computed(() =>
  isLight.value ? 'rgba(15, 23, 42, 0.07)' : 'rgba(0, 0, 0, 0.48)'
);
const miniMaskStroke = computed(() =>
  isLight.value ? 'rgba(14, 165, 233, 0.72)' : 'rgba(56, 189, 248, 0.75)'
);

/** 章框只画淡轮廓，避免缩略图被大方块占满 */
function miniNodeColor(n) {
  if (n.type === 'chapter' || n.data?.kind === 'chapter') {
    return isLight.value
      ? 'rgba(148, 163, 184, 0.12)'
      : 'rgba(113, 113, 122, 0.16)';
  }
  return n.data?.tone?.bg || (isLight.value ? '#64748b' : '#a1a1aa');
}

function miniNodeStroke(n) {
  if (n.type === 'chapter' || n.data?.kind === 'chapter') {
    return isLight.value
      ? 'rgba(100, 116, 139, 0.5)'
      : 'rgba(161, 161, 170, 0.45)';
  }
  return isLight.value ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.22)';
}

function miniNodeClass(n) {
  return n.type === 'chapter' || n.data?.kind === 'chapter'
    ? 'mm-chapter'
    : 'mm-topic';
}

/** 悬停节点：预览相邻关系（未点选时也出标签） */
const hoverId = ref(null);

/** 区分点击与拖拽，避免拖完误选/误清 */
let dragMoved = false;
/** 拖章标题时，同步平移同章 topic */
let chapterDragOrigin = null;

function neighborIds(id) {
  if (!id) return new Set();
  const set = new Set([id]);
  for (const e of edges.value) {
    if (e.source === id) set.add(e.target);
    if (e.target === id) set.add(e.source);
  }
  return set;
}

function chapterIdOf(nodeId) {
  if (!nodeId) return null;
  const n = nodes.value.find((x) => x.id === nodeId);
  return n?.data?.chapterId || null;
}

/** 同章全部 topic 节点 */
function chapterMemberIds(chapterId) {
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
 * 点选 / 悬停：
 * - 边与关系字：只亮触达当前卡片的边（避免整章标签爆炸）
 * - 节点：同章 peer 可微亮，章外压暗；所属章框点亮
 */
function syncHighlight(activeId, hoveredId) {
  const focusId = activeId || hoveredId;
  const chapterId = chapterIdOf(focusId);
  const chapterMembers = chapterId ? chapterMemberIds(chapterId) : new Set();
  const adjacent = neighborIds(focusId);
  const hasFocus = Boolean(focusId);

  for (const e of edges.value) {
    const onActive = Boolean(
      activeId && (e.source === activeId || e.target === activeId)
    );
    const onHover = Boolean(
      hoveredId && (e.source === hoveredId || e.target === hoveredId)
    );
    if (e.selected !== onActive) e.selected = onActive;
    const preview = onHover && !onActive;
    if (e.data?.preview !== preview || e.data?.chapterLit) {
      e.data = { ...(e.data || {}), preview, chapterLit: false };
    }
    const wantAnimated = onActive || preview;
    if (e.animated !== wantAnimated) e.animated = wantAnimated;
    const nextClass = preview ? 'is-preview' : '';
    if (e.class !== nextClass) e.class = nextClass;
  }

  for (const n of nodes.value) {
    if (n.data?.kind === 'chapter' || n.type === 'chapter') {
      /**
       * 章框高亮只用 class，切勿写 selected。
       * Vue Flow 拖拽会带动所有 selected 节点；点选卡片时若章框也被 selected，
       * 拖一张卡就会整章（框+同章其它卡）一起跑。
       */
      if (n.selected) n.selected = false;
      const lit = Boolean(chapterId && n.id === chapterId);
      n.class = lit ? 'is-chapter-frame' : '';
      if (n.data?.lit !== lit) n.data = { ...n.data, lit };
      continue;
    }
    const on = n.id === activeId;
    if (n.selected !== on) n.selected = on;
    let nextClass = '';
    if (hasFocus) {
      if (n.id === focusId) nextClass = '';
      else if (adjacent.has(n.id)) {
        nextClass = chapterMembers.has(n.id) ? 'is-chapter-peer' : 'is-bridge-peer';
      } else if (chapterMembers.has(n.id)) {
        nextClass = 'is-chapter-peer';
      } else {
        nextClass = 'is-dimmed';
      }
    }
    if (n.class !== nextClass) n.class = nextClass;
  }
}

watch(
  () => [props.activeId, hoverId.value],
  ([active, hover]) => syncHighlight(active, hover),
  { immediate: true }
);

watch(
  () => [props.bookmarkedIds, props.notedIds, props.visitedIds, props.learnedIds],
  () => {
    const bm = new Set(props.bookmarkedIds || []);
    const nt = new Set(props.notedIds || []);
    const vs = new Set(props.visitedIds || []);
    const ln = new Set(props.learnedIds || []);
    for (const n of nodes.value) {
      if (n.data?.kind !== 'topic') continue;
      const bookmarked = bm.has(n.id);
      const hasNote = nt.has(n.id);
      const visited = vs.has(n.id);
      const learned = ln.has(n.id);
      if (
        n.data.bookmarked !== bookmarked ||
        n.data.hasNote !== hasNote ||
        n.data.visited !== visited ||
        n.data.learned !== learned
      ) {
        n.data = { ...n.data, bookmarked, hasNote, visited, learned };
      }
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => props.focusNonce,
  async (nonce) => {
    if (!nonce || !props.activeId) return;
    await nextTick();
    const ch = chapterIdOf(props.activeId);
    const ids = ch
      ? [...chapterMemberIds(ch)]
      : [...neighborIds(props.activeId)];
    fitView({
      nodes: ids,
      padding: 0.28,
      duration: 420,
      maxZoom: 1.05,
    });
  }
);

function onNodeClick({ node }) {
  if (dragMoved) return;
  if (node.type === 'chapter') return;
  emit('select', node.id);
}

function onPaneClick() {
  if (dragMoved) return;
  hoverId.value = null;
  emit('clear');
}

/** 点连线：沿关系跳到另一端（已选一端则去对端，否则去 target） */
function onEdgeClick({ edge }) {
  if (dragMoved) return;
  const a = props.activeId;
  if (a === edge.source) emit('select', edge.target);
  else if (a === edge.target) emit('select', edge.source);
  else emit('select', edge.target);
}

function onNodeMouseEnter({ node }) {
  if (node.type === 'chapter' || node.data?.kind === 'chapter') return;
  hoverId.value = node.id;
}

function onNodeMouseLeave({ node }) {
  if (hoverId.value === node.id) hoverId.value = null;
}

function onNodeDragStart({ node }) {
  if (!nodesDraggable.value) return;
  dragMoved = false;
  chapterDragOrigin =
    node.type === 'chapter' ? { x: node.position.x, y: node.position.y } : null;
}

function onNodeDrag({ node }) {
  if (!nodesDraggable.value) return;
  dragMoved = true;
  if (node.type !== 'chapter' || !chapterDragOrigin) return;
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

function doFit(duration = 450) {
  nextTick(() => fitView({ padding: 0.16, duration }));
}

function resetLayout() {
  const origin = getOriginPositions();
  for (const n of nodes.value) {
    const p = origin.get(n.id);
    if (p) {
      n.position.x = p.x;
      n.position.y = p.y;
    }
  }
  hoverId.value = null;
  doFit(450);
}

/** 框选：本章 + 与本章有连线的外部节点 */
function fitNeighborhood() {
  const id = props.activeId || hoverId.value;
  if (!id) {
    doFit(400);
    return;
  }
  const ch = chapterIdOf(id);
  const members = ch ? chapterMemberIds(ch) : new Set([id]);
  const ids = new Set(members);
  for (const e of edges.value) {
    if (members.has(e.source) || members.has(e.target)) {
      ids.add(e.source);
      ids.add(e.target);
    }
  }
  fitView({
    nodes: [...ids],
    padding: 0.28,
    duration: 400,
    maxZoom: 1.05,
  });
}
</script>

<template>
  <div
    class="graph-wrap"
    :class="{
      'has-focus': Boolean(activeId || hoverId),
      'is-mobile-graph': isMobileGraph,
    }"
  >
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
      :default-viewport="{ zoom: 0.52 }"
      :min-zoom="0.12"
      :max-zoom="1.9"
      :nodes-draggable="nodesDraggable"
      :node-drag-threshold="nodesDraggable ? 1 : 64"
      :nodes-connectable="false"
      :edges-updatable="false"
      :connection-mode="ConnectionMode.Loose"
      :elements-selectable="true"
      :elevate-edges-on-select="false"
      :select-nodes-on-drag="false"
      :multi-selection-key-code="null"
      :pan-on-drag="true"
      :zoom-on-scroll="true"
      :zoom-on-pinch="true"
      :zoom-on-double-click="false"
      :prevent-scrolling="true"
      fit-view-on-init
      @node-click="onNodeClick"
      @edge-click="onEdgeClick"
      @pane-click="onPaneClick"
      @node-mouse-enter="onNodeMouseEnter"
      @node-mouse-leave="onNodeMouseLeave"
      @node-drag-start="onNodeDragStart"
      @node-drag="onNodeDrag"
      @node-drag-stop="onNodeDragStop"
      @pane-ready="() => doFit(600)"
      @pane-double-click="resetLayout"
    >
      <Background variant="lines" :gap="24" :size="1" :pattern-color="bgColor" />
      <Controls position="bottom-left" aria-label="画布缩放控制" />
      <MiniMap
        class="graph-minimap"
        position="bottom-right"
        pannable
        zoomable
        :width="miniWidth"
        :height="miniHeight"
        :node-border-radius="6"
        :node-stroke-width="1.2"
        :node-color="miniNodeColor"
        :node-stroke-color="miniNodeStroke"
        :node-class-name="miniNodeClass"
        :mask-color="miniMask"
        :mask-stroke-color="miniMaskStroke"
        :mask-stroke-width="1.6"
        :mask-border-radius="8"
        :offset-scale="1.2"
        aria-label="图谱概览"
      />
    </VueFlow>
    <div class="graph-tools">
      <button
        type="button"
        class="graph-tool"
        title="框选当前节点所属章节"
        aria-label="聚焦本章"
        @click="fitNeighborhood"
      >
        本章
      </button>
      <button
        type="button"
        class="graph-tool"
        title="恢复默认布局（双击空白亦可）"
        aria-label="复位布局"
        @click="resetLayout"
      >
        复位
      </button>
    </div>
    <p class="graph-hint" aria-hidden="true">
      <template v-if="nodesDraggable">
        点选点亮整章及跨章关联 · 悬停预览关系 · 点连线跳转
      </template>
      <template v-else>
        点选 · 拖动画布 · 双指缩放
      </template>
    </p>
  </div>
</template>

<style scoped>
.graph-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--canvas);
}

/* 手机：方块不进拖拽态，触摸在节点上也能平移画布 */
.graph-wrap.is-mobile-graph :deep(.vue-flow__node) {
  cursor: pointer;
}

.graph-wrap.is-mobile-graph :deep(.vue-flow__node.dragging) {
  cursor: pointer;
}

.graph-wrap.is-mobile-graph :deep(.vue-flow__node-chapter .chapter__drag) {
  cursor: pointer;
}

.graph-wrap.is-mobile-graph :deep(.vue-flow__node-chapter .chapter__drag-tip) {
  display: none;
}

.graph-wrap.is-mobile-graph :deep(.vue-flow__controls) {
  margin: 10px;
  border-radius: 14px;
}

.graph-wrap.is-mobile-graph :deep(.vue-flow__controls-button) {
  width: 36px;
  height: 36px;
}

.graph-wrap.is-mobile-graph :deep(.vue-flow__minimap) {
  width: 128px !important;
  height: 88px !important;
  margin: 10px;
  border-radius: 12px;
}

.graph-wrap.is-mobile-graph :deep(.vue-flow__minimap::after) {
  display: none;
}

.graph-wrap.is-mobile-graph .graph-tools {
  top: max(8px, env(safe-area-inset-top));
  right: max(8px, env(safe-area-inset-right));
  gap: 6px;
}

.graph-wrap.is-mobile-graph .graph-tool {
  min-height: 36px;
  padding: 8px 12px;
  border-radius: 10px;
  touch-action: manipulation;
}

.graph-wrap.is-mobile-graph .graph-hint {
  /* 避开底部 controls / minimap */
  bottom: calc(100px + env(safe-area-inset-bottom, 0px));
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  width: max-content;
  max-width: calc(100% - 24px);
  font-size: 10px;
  padding: 4px 10px;
}

.graph-wrap.is-mobile-graph :deep(.vue-flow__node .card:hover) {
  transform: none;
}

.graph-wrap.is-mobile-graph :deep(.vue-flow__node-chapter .chapter__head:hover) {
  transform: none;
}

.graph-wrap :deep(.vue-flow__edges) {
  z-index: 1 !important;
}

/* 标签仅少量出现时可压在节点之上，保证可读 */
.graph-wrap :deep(.vue-flow__edge-labels) {
  z-index: 6 !important;
  pointer-events: none !important;
}

.graph-wrap :deep(.vue-flow__nodes) {
  z-index: 5 !important;
}

.graph-wrap :deep(.vue-flow__node) {
  cursor: pointer;
  transition:
    opacity 0.22s ease,
    filter 0.22s ease;
}

.graph-wrap :deep(.vue-flow__node.is-dimmed) {
  opacity: 0.52;
  filter: grayscale(0.18);
}

.graph-wrap :deep(.vue-flow__node.is-dimmed:hover) {
  opacity: 0.92;
  filter: none;
}

.graph-wrap :deep(.vue-flow__node.is-chapter-peer .card) {
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.32),
    var(--shadow-node);
  filter: brightness(1.03);
}

.graph-wrap :deep(.vue-flow__node.is-bridge-peer .card) {
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--accent) 55%, #fff),
    var(--shadow-node);
  filter: brightness(1.02);
}

.graph-wrap :deep(.vue-flow__node-chapter.is-chapter-frame) {
  opacity: 1 !important;
}

.graph-wrap :deep(.vue-flow__node-chapter.is-chapter-frame .chapter) {
  border-color: var(--accent);
  border-style: solid;
}

.graph-wrap :deep(.vue-flow__node.dragging) {
  cursor: grabbing;
}

.graph-wrap :deep(.vue-flow__node-chapter) {
  z-index: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  cursor: default !important;
  pointer-events: none !important;
  opacity: 1 !important;
  filter: none !important;
}

.graph-wrap :deep(.vue-flow__node-chapter .chapter__drag) {
  pointer-events: auto !important;
  cursor: grab;
}

.graph-wrap :deep(.vue-flow__node-chapter .chapter__drag:active) {
  cursor: grabbing;
}

.graph-wrap.has-focus
  :deep(.vue-flow__edge:not(.selected):not(.is-preview) .vue-flow__edge-path) {
  stroke-opacity: 0.14 !important;
}

.graph-wrap :deep(.vue-flow__edge.selected .vue-flow__edge-path),
.graph-wrap :deep(.vue-flow__edge.is-preview .vue-flow__edge-path) {
  stroke-opacity: 1 !important;
}

.graph-wrap :deep(.vue-flow__edge-path) {
  stroke-linecap: round;
  pointer-events: none;
  transition:
    stroke-opacity 0.2s ease,
    stroke-width 0.2s ease;
}

.graph-wrap :deep(.vue-flow__edge) {
  pointer-events: stroke;
  cursor: pointer;
}

.graph-wrap :deep(.vue-flow__edge.animated path) {
  stroke-dasharray: 5;
  animation: vf-dash 0.5s linear infinite;
}

.graph-wrap :deep(.vue-flow__controls),
.graph-wrap :deep(.vue-flow__minimap) {
  z-index: 20;
}

.graph-wrap :deep(.vue-flow__controls) {
  box-shadow: var(--shadow-sm);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--line);
  margin: 14px;
  background: var(--glass);
  backdrop-filter: blur(10px);
}

.graph-wrap :deep(.vue-flow__controls-button) {
  background: transparent;
  border-bottom: 1px solid var(--line);
  width: 30px;
  height: 30px;
  fill: var(--mist-dim);
}

.graph-wrap :deep(.vue-flow__controls-button:hover) {
  background: var(--accent-soft);
  fill: var(--accent);
}

.graph-wrap :deep(.vue-flow__controls-button:focus-visible) {
  box-shadow: var(--focus-ring);
}

.graph-wrap :deep(.vue-flow__controls-button:last-child) {
  border-bottom: 0;
}

.graph-wrap :deep(.vue-flow__minimap) {
  width: 172px !important;
  height: 120px !important;
  margin: 14px;
  padding: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--line);
  background:
    radial-gradient(
      120% 80% at 100% 0%,
      color-mix(in srgb, var(--accent) 10%, transparent),
      transparent 55%
    ),
    var(--glass) !important;
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
}

.graph-wrap :deep(.vue-flow__minimap::after) {
  content: '概览';
  position: absolute;
  top: 8px;
  left: 10px;
  z-index: 2;
  pointer-events: none;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mist-dim);
  opacity: 0.78;
}

.graph-wrap :deep(.vue-flow__minimap-mask) {
  fill-opacity: 1;
}

.graph-wrap :deep(.vue-flow__minimap .mm-chapter) {
  stroke-dasharray: 3 2;
}

.graph-wrap :deep(.vue-flow__minimap .mm-topic) {
  filter: saturate(0.92);
}

.graph-tools {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 30;
  display: flex;
  gap: 8px;
}

.graph-tool {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--mist-dim);
  background: var(--glass);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.graph-tool:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.graph-hint {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  z-index: 15;
  margin: 0;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--mist-dim);
  background: var(--glass);
  border: 1px solid var(--line);
  pointer-events: none;
  opacity: 0.85;
  transition: opacity 0.25s ease;
}

.graph-wrap.has-focus .graph-hint {
  opacity: 0;
}

@keyframes vf-dash {
  from {
    stroke-dashoffset: 10;
  }
}

@media (prefers-reduced-motion: reduce) {
  .graph-wrap :deep(.vue-flow__edge.animated path) {
    animation: none;
  }

  .graph-wrap :deep(.vue-flow__node) {
    transition: none;
  }
}
</style>
