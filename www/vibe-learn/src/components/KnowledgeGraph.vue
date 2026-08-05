<script setup>
/**
 * 知识导图1
 */
import { VueFlow, useVueFlow, ConnectionMode } from '@vue-flow/core';
import { computed, nextTick, ref, toRef, watch } from 'vue';
import ChapterFrame from './ChapterFrame.vue';
import GraphCard from './GraphCard.vue';
import RelationEdge from './RelationEdge.vue';
import MindMapLayers from './MindMapLayers.vue';
import {
  buildFlowEdges,
  buildFlowNodes,
  getOriginPositions,
} from '../data/nodes.js';
import {
  CHAPTER_DRAG_HANDLE,
  buildQuizCountMap,
  chapterIdOf,
  chapterMemberIds,
  isChapterNode,
  neighborIds,
  nodePassClass,
  syncFocusHighlight,
  useMindMapChrome,
} from '../composables/useMindMapChrome.js';
import '../assets/mind-map-flow.css';

const props = defineProps({
  activeId: { type: String, default: null },
  theme: { type: String, default: 'light' },
  focusNonce: { type: Number, default: 0 },
  bookmarkedIds: { type: Array, default: () => [] },
  notedIds: { type: Array, default: () => [] },
  visitedIds: { type: Array, default: () => [] },
  learnedIds: { type: Array, default: () => [] },
});

const emit = defineEmits(['select', 'clear']);

const { fitView } = useVueFlow();

const nodes = ref(
  (() => {
    const counts = buildQuizCountMap();
    return buildFlowNodes().map((n) => {
      const isChapter = isChapterNode(n);
      const quizCount = counts.get(n.id) || 0;
      return {
        ...n,
        selected: n.id === props.activeId,
        class: nodePassClass(n),
        draggable: true,
        dragHandle: isChapter ? CHAPTER_DRAG_HANDLE : undefined,
        data: n.data ? { ...n.data, quizCount } : n.data,
      };
    });
  })()
);
const edges = ref(buildFlowEdges());

const chrome = useMindMapChrome({
  nodes,
  theme: toRef(props, 'theme'),
});

const {
  nodesDraggable,
  isMobileGraph,
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
  flowAttrs,
} = chrome;

const nodeTypes = { knowledge: GraphCard, chapter: ChapterFrame };
const edgeTypes = { relation: RelationEdge };
const hoverId = ref(null);

const vueFlowBind = computed(() =>
  flowAttrs({
    connectionMode: ConnectionMode.Loose,
    defaultViewport: { zoom: 0.52 },
    /* 整图很大：min 过紧会感觉「缩不到更小」；max 过低会感觉「放不大」 */
    minZoom: 0.04,
    maxZoom: 2.8,
  })
);

watch(
  () => [props.activeId, hoverId.value],
  ([active, hover]) => {
    syncFocusHighlight({
      nodes,
      edges,
      activeId: active,
      hoverId: hover,
    });
  },
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
    const ch = chapterIdOf(nodes, props.activeId);
    const ids = ch
      ? [...chapterMemberIds(nodes, ch)]
      : [...neighborIds(edges, props.activeId)];
    fitView({
      nodes: ids,
      padding: 0.28,
      duration: 420,
      maxZoom: 1.05,
    });
  }
);

function onNodeClick({ node }) {
  if (wasDragMoved()) return;
  emit('select', node.id);
}

function onPaneClick() {
  if (wasDragMoved()) return;
  hoverId.value = null;
  emit('clear');
}

function onEdgeClick({ edge }) {
  if (wasDragMoved()) return;
  const a = props.activeId;
  if (a === edge.source) emit('select', edge.target);
  else if (a === edge.target) emit('select', edge.source);
  else emit('select', edge.target);
}

function onNodeMouseEnter({ node }) {
  if (isChapterNode(node)) return;
  hoverId.value = node.id;
}

function onNodeMouseLeave({ node }) {
  if (hoverId.value === node.id) hoverId.value = null;
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

function fitNeighborhood() {
  const id = props.activeId || hoverId.value;
  if (!id) {
    doFit(400);
    return;
  }
  const ch = chapterIdOf(nodes, id);
  const members = ch ? chapterMemberIds(nodes, ch) : new Set([id]);
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
    class="mm-wrap mm-flow"
    :class="{
      'has-focus': Boolean(activeId || hoverId),
      'is-mobile-graph': isMobileGraph,
    }"
  >
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      v-bind="vueFlowBind"
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
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
      <MindMapLayers
        :bg-color="bgColor"
        :mini-width="miniWidth"
        :mini-height="miniHeight"
        :mini-mask="miniMask"
        :mini-mask-stroke="miniMaskStroke"
        :mini-node-color="miniNodeColor"
        :mini-node-stroke="miniNodeStroke"
        :mini-node-class="miniNodeClass"
      />
    </VueFlow>
    <div class="mm-tools">
      <button
        type="button"
        class="mm-tool"
        title="框选当前节点所属章节"
        aria-label="聚焦本章"
        @click="fitNeighborhood"
      >
        本章
      </button>
      <button
        type="button"
        class="mm-tool"
        title="恢复默认布局（双击空白亦可）"
        aria-label="复位布局"
        @click="resetLayout"
      >
        复位
      </button>
    </div>
    <p class="mm-hint" aria-hidden="true">
      <template v-if="nodesDraggable">
        空白拖动画布 · 蓝条拖整章 · 点选强调同章
      </template>
      <template v-else>
        点选 · 拖动画布 · 双指缩放
      </template>
    </p>
  </div>
</template>
