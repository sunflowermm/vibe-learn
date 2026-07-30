<script setup>
/**
 * 题库思维导图：选中时点亮同章框与相关连线
 */
import { VueFlow, useVueFlow, ConnectionMode } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import ChapterFrame from '../ChapterFrame.vue';
import GraphCard from '../GraphCard.vue';
import RelationEdge from '../RelationEdge.vue';
import {
  buildQuizFlowEdges,
  buildQuizFlowNodes,
  FRAME_HEAD,
  FRAME_PAD_X,
  FRAME_PAD_Y,
  QUIZ_CARD_H_MIN,
  QUIZ_STACK_GAP,
} from '../../data/quiz/graph.js';
import { isStackedLayout } from '../../composables/usePanelResize.js';

const props = defineProps({
  activeId: { type: String, default: null },
  theme: { type: String, default: 'light' },
  focusNonce: { type: Number, default: 0 },
});

const emit = defineEmits(['select', 'clear']);

const { fitView, onNodesInitialized, updateNodeInternals } = useVueFlow();
const nodesDraggable = ref(typeof window === 'undefined' ? true : !isStackedLayout());
const isMobileGraph = computed(() => !nodesDraggable.value);
const miniWidth = computed(() => (isMobileGraph.value ? 120 : 160));
const miniHeight = computed(() => (isMobileGraph.value ? 80 : 108));
let didMeasureReflow = false;

function doFit(duration = 0) {
  nextTick(() => {
    try {
      fitView({ padding: 0.22, duration, maxZoom: 0.55, minZoom: 0.08 });
    } catch {
      /* ignore */
    }
  });
}

/**
 * 用 Vue Flow 实测高度重排：框内竖叠 + 左枢纽，避免固定 CARD_H 算偏
 */
function reflowFromMeasured() {
  const frames = nodes.value.filter((n) => n.type === 'chapter');
  const topics = nodes.value.filter((n) => n.type === 'knowledge');
  if (!frames.length) return;

  for (const frame of frames) {
    const kids = topics
      .filter((n) => n.data?.chapterId === frame.id)
      .sort((a, b) => a.position.y - b.position.y || a.id.localeCompare(b.id));
    if (!kids.length) continue;

    const x = frame.position.x + FRAME_PAD_X;
    let y = frame.position.y + FRAME_HEAD + FRAME_PAD_Y;
    for (const kid of kids) {
      const h = Math.max(QUIZ_CARD_H_MIN, kid.dimensions?.height || QUIZ_CARD_H_MIN);
      kid.position = { x, y };
      y += h + QUIZ_STACK_GAP;
    }
    const height = Math.ceil(y - QUIZ_STACK_GAP + FRAME_PAD_Y - frame.position.y);
    frame.style = {
      ...(frame.style || {}),
      height: `${Math.max(height, FRAME_HEAD + 100)}px`,
    };
  }

  const hub = topics.find((n) => n.id === 'pool-random');
  const gloss = topics.find((n) => n.id === 'pool-glossary');
  if (hub && gloss && frames.length) {
    const minY = Math.min(...frames.map((f) => f.position.y));
    const maxY = Math.max(
      ...frames.map((f) => {
        const h = Number.parseFloat(f.style?.height) || f.dimensions?.height || 0;
        return f.position.y + h;
      })
    );
    const mid = Math.round((minY + maxY) / 2);
    const hubH = Math.max(QUIZ_CARD_H_MIN, hub.dimensions?.height || QUIZ_CARD_H_MIN);
    const glossH = Math.max(QUIZ_CARD_H_MIN, gloss.dimensions?.height || QUIZ_CARD_H_MIN);
    const stackH = hubH + glossH + 40;
    hub.position = { x: hub.position.x, y: mid - stackH / 2 };
    gloss.position = { x: gloss.position.x, y: mid - stackH / 2 + hubH + 40 };
  }

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

const nodes = ref(
  buildQuizFlowNodes().map((n) => ({
    ...n,
    selected: n.id === props.activeId,
    draggable: nodesDraggable.value,
    dragHandle:
      (n.type === 'chapter' || n.data?.kind === 'chapter') && nodesDraggable.value
        ? '.chapter__drag'
        : undefined,
  }))
);
const edges = ref(buildQuizFlowEdges());

const nodeTypes = { knowledge: GraphCard, chapter: ChapterFrame };
const edgeTypes = { relation: RelationEdge };

const isLight = computed(() => props.theme === 'light');
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
let mobileMq = null;

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

function chapterOf(nodeId) {
  if (!nodeId) return null;
  return nodes.value.find((n) => n.id === nodeId)?.data?.chapterId || null;
}

function applySelection() {
  const ch = chapterOf(props.activeId);
  const active = props.activeId;
  const hubLit = active === 'pool-random';
  const glossLit = active === 'pool-glossary';
  for (const n of nodes.value) {
    n.selected = n.id === active;
    if (n.type === 'chapter' || n.data?.kind === 'chapter') {
      if (n.data) n.data.lit = Boolean(ch && n.id === ch);
    }
  }
  for (const e of edges.value) {
    if (!e.data) e.data = {};
    const srcCh = chapterOf(e.source);
    const tgtCh = chapterOf(e.target);
    const fromHub = e.source === 'pool-random';
    const toGloss = e.target === 'pool-glossary';
    e.data.preview = Boolean(
      active && (e.source === active || e.target === active)
    );
    e.data.chapterLit = Boolean(
      (ch && (srcCh === ch || tgtCh === ch || (fromHub && tgtCh === ch))) ||
        (hubLit && fromHub && !toGloss) ||
        (glossLit && toGloss)
    );
  }
}

watch(() => props.activeId, applySelection);

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
  if (dragMoved) return;
  if (node.type === 'chapter' || node.data?.kind === 'chapter') return;
  emit('select', node.id);
}

function onPaneClick() {
  if (dragMoved) return;
  emit('clear');
}

function onNodeDragStart() {
  dragMoved = false;
}

function onNodeDrag() {
  dragMoved = true;
}

function onNodeDragStop() {
  setTimeout(() => {
    dragMoved = false;
  }, 0);
}

function syncDrag() {
  nodesDraggable.value = !isStackedLayout();
  for (const n of nodes.value) {
    n.draggable = nodesDraggable.value;
    if (n.type === 'chapter' || n.data?.kind === 'chapter') {
      n.dragHandle = nodesDraggable.value ? '.chapter__drag' : undefined;
    }
  }
}

onMounted(() => {
  try {
    mobileMq = window.matchMedia('(max-width: 960px)');
    mobileMq.addEventListener('change', syncDrag);
  } catch {
    /* ignore */
  }
  syncDrag();
  applySelection();
});

onUnmounted(() => {
  try {
    mobileMq?.removeEventListener('change', syncDrag);
  } catch {
    /* ignore */
  }
});
</script>

<template>
  <VueFlow
    v-model:nodes="nodes"
    v-model:edges="edges"
    :node-types="nodeTypes"
    :edge-types="edgeTypes"
    :connection-mode="ConnectionMode.Loose"
    :default-viewport="{ zoom: 0.38 }"
    :nodes-draggable="nodesDraggable"
    :nodes-connectable="false"
    :elements-selectable="true"
    :pan-on-drag="true"
    :zoom-on-scroll="true"
    :min-zoom="0.08"
    :max-zoom="1.4"
    fit-view-on-init
    class="quiz-flow"
    @node-click="onNodeClick"
    @pane-click="onPaneClick"
    @node-drag-start="onNodeDragStart"
    @node-drag="onNodeDrag"
    @node-drag-stop="onNodeDragStop"
    @pane-ready="onPaneReady"
  >
    <Background :color="bgColor" :gap="22" />
    <Controls position="bottom-left" />
    <MiniMap
      position="bottom-right"
      :width="miniWidth"
      :height="miniHeight"
      :mask-color="miniMask"
      :mask-stroke-color="miniMaskStroke"
      :node-color="miniNodeColor"
      :node-stroke-color="miniNodeStroke"
    />
  </VueFlow>
</template>

<style scoped>
.quiz-flow {
  width: 100%;
  height: 100%;
  background: transparent;
}

.quiz-flow :deep(.vue-flow__node-knowledge) {
  overflow: visible;
}

.quiz-flow :deep(.vue-flow__node-chapter) {
  pointer-events: none;
}

.quiz-flow :deep(.vue-flow__node-chapter .chapter__drag) {
  pointer-events: auto;
}

.quiz-flow :deep(.vue-flow__edge.selected path),
.quiz-flow :deep(.rel-edge.preview path.vue-flow__edge-path),
.quiz-flow :deep(.rel-edge.chapter path.vue-flow__edge-path) {
  transition: stroke-opacity 0.2s ease, stroke-width 0.2s ease;
}
</style>
