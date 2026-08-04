<script setup>
/**
 * 知识导图2：枢纽左 · 上前端 / 下六区横排
 */
import { VueFlow, useVueFlow, ConnectionMode } from '@vue-flow/core';
import { computed, nextTick, ref, toRef, watch } from 'vue';
import ChapterFrame from './ChapterFrame.vue';
import GraphCard from './GraphCard.vue';
import RelationEdge from './RelationEdge.vue';
import MindMapLayers from './MindMapLayers.vue';
import {
  buildVibeFlowEdges,
  buildVibeFlowNodes,
  reflowVibeFrames,
} from '../data/vibehub/mind-map.js';
import {
  CHAPTER_DRAG_HANDLE,
  buildQuizCountMap,
  isChapterNode,
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

const { fitView, onNodesInitialized, updateNodeInternals } = useVueFlow();

const nodes = ref(
  (() => {
    const counts = buildQuizCountMap();
    return buildVibeFlowNodes().map((n) => {
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
const edges = ref(buildVibeFlowEdges());

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
let didMeasureReflow = false;

const hasFocus = computed(() => Boolean(props.activeId || hoverId.value));

const vueFlowBind = computed(() =>
  flowAttrs({
    connectionMode: ConnectionMode.Loose,
    defaultViewport: { zoom: 0.32 },
    minZoom: 0.08,
    maxZoom: 1.4,
  })
);

function doFit(duration = 0) {
  nextTick(() => {
    try {
      fitView({ padding: 0.18, duration, maxZoom: 0.42, minZoom: 0.04 });
    } catch {
      /* ignore */
    }
  });
}

function reflowFromMeasured() {
  const frames = nodes.value.filter((n) => n.type === 'chapter');
  const topics = nodes.value.filter((n) => n.type === 'knowledge');
  if (!frames.length) return;
  reflowVibeFrames(frames, topics);
  try {
    updateNodeInternals(nodes.value.map((n) => n.id));
  } catch {
    /* ignore */
  }
}

function onPaneReady() {
  doFit(0);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => doFit(0));
  });
  setTimeout(() => doFit(0), 160);
}

onNodesInitialized(() => {
  if (didMeasureReflow) return;
  didMeasureReflow = true;
  nextTick(() => {
    reflowFromMeasured();
    doFit(0);
    setTimeout(() => {
      reflowFromMeasured();
      doFit(0);
    }, 80);
  });
});

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
  async () => {
    if (!props.activeId) return;
    await nextTick();
    try {
      fitView({ nodes: [props.activeId], duration: 420, padding: 0.5 });
    } catch {
      /* ignore */
    }
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
</script>

<template>
  <div
    class="mm-wrap mm-flow"
    :class="{
      'has-focus': hasFocus,
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
      @pane-ready="onPaneReady"
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
    <p class="mm-hint" aria-hidden="true">
      <template v-if="nodesDraggable">
        空白拖动画布 · 蓝条拖整章 · 点选强调同区
      </template>
      <template v-else>
        点选 · 拖动画布 · 双指缩放
      </template>
    </p>
  </div>
</template>
