<script setup>
/**
 * 题库思维导图：共用画布底层 · 选中点亮同章与连线
 */
import { VueFlow, useVueFlow, ConnectionMode } from '@vue-flow/core';
import { computed, nextTick, ref, toRef, watch } from 'vue';
import ChapterFrame from '../ChapterFrame.vue';
import GraphCard from '../GraphCard.vue';
import RelationEdge from '../RelationEdge.vue';
import MindMapLayers from '../MindMapLayers.vue';
import {
  buildQuizFlowEdges,
  buildQuizFlowNodes,
  FRAME_HEAD,
  FRAME_PAD_X,
  FRAME_PAD_Y,
  QUIZ_CARD_H_MIN,
  QUIZ_STACK_GAP,
} from '../../data/quiz/graph.js';
import {
  CHAPTER_DRAG_HANDLE,
  buildChapterIndex,
  composeNodeClass,
  isChapterNode,
  nodePassClass,
  useMindMapChrome,
} from '../../composables/useMindMapChrome.js';
import '../../assets/mind-map-flow.css';

const props = defineProps({
  activeId: { type: String, default: null },
  theme: { type: String, default: 'light' },
  focusNonce: { type: Number, default: 0 },
});

const emit = defineEmits(['select', 'clear']);

const { fitView, onNodesInitialized, updateNodeInternals } = useVueFlow();

const nodes = ref(
  buildQuizFlowNodes().map((n) => {
    const isChapter = isChapterNode(n);
    return {
      ...n,
      selected: n.id === props.activeId,
      class: nodePassClass(n),
      draggable: isChapter,
      dragHandle: isChapter ? CHAPTER_DRAG_HANDLE : undefined,
    };
  })
);
const edges = ref(buildQuizFlowEdges());

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
  onMoveStart,
  onMove,
  onMoveEnd,
  wasDragMoved,
  isPanning,
  flowAttrs,
} = chrome;

const nodeTypes = { knowledge: GraphCard, chapter: ChapterFrame };
const edgeTypes = { relation: RelationEdge };
const viewportReady = ref(false);
let didMeasureReflow = false;

const vueFlowBind = computed(() =>
  flowAttrs({
    connectionMode: ConnectionMode.Loose,
    defaultViewport: { x: 0, y: 0, zoom: 0.18 },
    minZoom: 0.08,
    maxZoom: 1.4,
  })
);

function doFit(duration = 0) {
  nextTick(() => {
    try {
      fitView({ padding: 0.22, duration, maxZoom: 0.55, minZoom: 0.08 });
    } catch {
      /* ignore */
    }
    requestAnimationFrame(() => {
      viewportReady.value = true;
    });
  });
}

/** 用实测高度重排：框内竖叠 + 左枢纽 */
function reflowFromMeasured() {
  const frames = nodes.value.filter((n) => n.type === 'chapter');
  const topics = nodes.value.filter((n) => n.type === 'knowledge');
  if (!frames.length) return;

  const touched = [];

  for (const frame of frames) {
    const kids = topics
      .filter((n) => n.data?.chapterId === frame.id)
      .sort((a, b) => a.position.y - b.position.y || a.id.localeCompare(b.id));
    if (!kids.length) continue;

    const x = frame.position.x + FRAME_PAD_X;
    let y = frame.position.y + FRAME_HEAD + FRAME_PAD_Y;
    for (const kid of kids) {
      const h = Math.max(
        QUIZ_CARD_H_MIN,
        kid.dimensions?.height || QUIZ_CARD_H_MIN
      );
      kid.position = { x, y };
      y += h + QUIZ_STACK_GAP;
      touched.push(kid.id);
    }
    const height = Math.ceil(
      y - QUIZ_STACK_GAP + FRAME_PAD_Y - frame.position.y
    );
    frame.style = {
      ...(frame.style || {}),
      height: `${Math.max(height, FRAME_HEAD + 100)}px`,
      pointerEvents: 'none',
    };
    touched.push(frame.id);
  }

  const hub = topics.find((n) => n.id === 'pool-random');
  const gloss = topics.find((n) => n.id === 'pool-glossary');
  if (hub && gloss && frames.length) {
    const minY = Math.min(...frames.map((f) => f.position.y));
    const maxY = Math.max(
      ...frames.map((f) => {
        const h =
          Number.parseFloat(f.style?.height) || f.dimensions?.height || 0;
        return f.position.y + h;
      })
    );
    const mid = Math.round((minY + maxY) / 2);
    const hubH = Math.max(
      QUIZ_CARD_H_MIN,
      hub.dimensions?.height || QUIZ_CARD_H_MIN
    );
    const glossH = Math.max(
      QUIZ_CARD_H_MIN,
      gloss.dimensions?.height || QUIZ_CARD_H_MIN
    );
    const stackH = hubH + glossH + 40;
    hub.position = { x: hub.position.x, y: mid - stackH / 2 };
    gloss.position = {
      x: gloss.position.x,
      y: mid - stackH / 2 + hubH + 40,
    };
    touched.push(hub.id, gloss.id);
  }

  try {
    updateNodeInternals(touched);
  } catch {
    /* ignore */
  }
}

onNodesInitialized(() => {
  if (didMeasureReflow) return;
  didMeasureReflow = true;
  nextTick(() => {
    reflowFromMeasured();
    doFit(0);
  });
});

function applySelection() {
  const active = props.activeId;
  const { chapterOf } = buildChapterIndex(nodes);
  const ch = active ? chapterOf.get(active) || null : null;
  const hubLit = active === 'pool-random';
  const glossLit = active === 'pool-glossary';
  const hasFocus = Boolean(active);

  for (const n of nodes.value) {
    if (isChapterNode(n)) {
      if (n.selected) n.selected = false;
      const lit = Boolean(ch && n.id === ch);
      const focus = lit ? 'is-chapter-frame' : hasFocus ? 'is-chapter-dim' : '';
      const next = composeNodeClass(n, focus);
      if (n.class !== next) n.class = next;
      if (n.data?.lit !== lit) n.data = { ...n.data, lit };
      continue;
    }
    const on = n.id === active;
    if (n.selected !== on) n.selected = on;
    const focus = hasFocus && !on ? 'is-dimmed' : '';
    const next = composeNodeClass(n, focus);
    if (n.class !== next) n.class = next;
  }

  for (const e of edges.value) {
    const srcCh = chapterOf.get(e.source);
    const tgtCh = chapterOf.get(e.target);
    const fromHub = e.source === 'pool-random';
    const toGloss = e.target === 'pool-glossary';
    const onActive = Boolean(
      active && (e.source === active || e.target === active)
    );
    if (e.selected !== onActive) e.selected = onActive;
    const chapterLit = Boolean(
      (ch && (srcCh === ch || tgtCh === ch || (fromHub && tgtCh === ch))) ||
        (hubLit && fromHub && !toGloss) ||
        (glossLit && toGloss)
    );
    const prev = e.data || {};
    if (prev.preview !== onActive || prev.chapterLit !== chapterLit) {
      e.data = { ...prev, preview: onActive, chapterLit };
    }
    if (e.animated) e.animated = false;
    const nextClass = onActive ? 'is-preview' : '';
    if (e.class !== nextClass) e.class = nextClass;
  }
}

watch(() => props.activeId, applySelection, { immediate: true });

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
  if (isChapterNode(node)) return;
  emit('select', node.id);
}
</script>

<template>
  <div
    class="mm-wrap mm-flow"
    :class="{
      'has-focus': Boolean(activeId),
      'is-mobile-graph': isMobileGraph,
      'is-viewport-ready': viewportReady,
      'is-panning': isPanning,
    }"
  >
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      v-bind="vueFlowBind"
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
      @node-click="onNodeClick"
      @node-drag-start="onNodeDragStart"
      @node-drag="onNodeDrag"
      @node-drag-stop="onNodeDragStop"
      @move-start="onMoveStart"
      @move="onMove"
      @move-end="onMoveEnd"
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
        空白拖动画布 · 点选练习组 · 蓝条拖整章
      </template>
      <template v-else>
        点选 · 拖动画布 · 双指缩放
      </template>
    </p>
  </div>
</template>
