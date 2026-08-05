<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import KnowledgeGraph from './components/KnowledgeGraph.vue';
import NodePanel from './components/NodePanel.vue';
import UserLibraryDrawer from './components/UserLibraryDrawer.vue';
import GlossaryDrawer from './components/GlossaryDrawer.vue';
import GlossaryFab from './components/GlossaryFab.vue';
import MapSwitcher from './components/MapSwitcher.vue';
import VibeMindMap from './components/VibeMindMap.vue';
import QuizMindMap from './components/quiz/QuizMindMap.vue';
import QuizDesk from './components/quiz/QuizDesk.vue';
import { useBlobity } from './composables/useBlobity.js';
import {
  clampGraphHeight,
  clampPanelWidth,
  isStackedLayout,
  persistGraphHeight,
  persistPanelWidth,
  readGraphHeight,
  readPanelWidth,
} from './composables/usePanelResize.js';
import { useUserLibrary } from './composables/useUserLibrary.js';
import { getNodeById, countTopics } from './data/nodes.js';
import { glossaryCount } from './data/glossary.js';
import { getLearningMap, normalizeMapId } from './data/maps.js';
import { bridgesForKnowledge, bridgesForMap2 } from './data/map-bridges.js';
import { combineKnowledgeWithMap2 } from './data/map2-combine.js';
import { quizQuestionCount, questionsForNode } from './data/quiz/bank.js';
import { getQuizCardById } from './data/quiz/graph.js';
import { getVibeEntryById } from './data/vibehub/graph-pack.js';
import { countVibeTopics } from './data/vibehub/mind-map.js';

const THEME_KEY = 'vibe-learn-theme';

function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function readMapFromUrl() {
  try {
    const sp = new URLSearchParams(window.location.search);
    const map = sp.get('map');
    if (map) return normalizeMapId(map);
    // 兼容旧 ?mode=quiz
    if (sp.get('mode') === 'quiz') return 'quiz';
    return 'knowledge';
  } catch {
    return 'knowledge';
  }
}

function readNodeFromUrl() {
  try {
    const id = new URLSearchParams(window.location.search).get('node');
    return id && getNodeById(id) ? id : 'knowledge-hub';
  } catch {
    return 'knowledge-hub';
  }
}

function readVibeNodeFromUrl() {
  try {
    const id = new URLSearchParams(window.location.search).get('node');
    return id && getVibeEntryById(id) ? id : 'vh-hub';
  } catch {
    return 'vh-hub';
  }
}

function readQsetFromUrl() {
  try {
    const id = new URLSearchParams(window.location.search).get('qset');
    if (!id) return null;
    if (id === 'pool-random' || id === 'pool-glossary' || id.startsWith('pool-')) return id;
    return getQuizCardById(id) ? id : null;
  } catch {
    return null;
  }
}

function readQnodeFromUrl() {
  try {
    const id = new URLSearchParams(window.location.search).get('qnode');
    return id && getNodeById(id) ? id : null;
  } catch {
    return null;
  }
}

const activeMapId = ref(readMapFromUrl());
const activeId = ref(readNodeFromUrl());
const vibeActiveId = ref(
  activeMapId.value === 'knowledge2' ? readVibeNodeFromUrl() : 'vh-hub'
);
const quizActiveId = ref(readQsetFromUrl());
const quizFocusNodeId = ref(readQnodeFromUrl());
const theme = ref(readTheme());
const focusNonce = ref(0);
const vibeFocusNonce = ref(0);
const quizFocusNonce = ref(0);
const activeMap = computed(() => getLearningMap(activeMapId.value));
const isQuizMap = computed(() => activeMapId.value === 'quiz');
const isKnowledge2Map = computed(() => activeMapId.value === 'knowledge2');
const isKnowledgeMap = computed(() => activeMapId.value === 'knowledge');
const activeNode = computed(() => {
  if (isQuizMap.value) return null;
  if (isKnowledge2Map.value) {
    const e = vibeActiveId.value ? getVibeEntryById(vibeActiveId.value) : null;
    if (!e) return null;
    const links = bridgesForMap2(e.id);
    return links.length ? { ...e, mapLinks: links } : e;
  }
  const n = activeId.value ? getNodeById(activeId.value) : null;
  if (!n) return null;
  /* 导图1：挂 mapLinks，跨导图由面板芯片跳转 */
  return combineKnowledgeWithMap2(n);
});
const libraryOpen = ref(false);
const glossaryOpen = ref(false);
const glossaryFocusId = ref('');
const library = useUserLibrary();
const {
  bookmarkedIds,
  notedIds,
  visitedIds,
  learnedIds,
  bookmarkCount,
  noteCount,
  visitedCount,
  learnedCount,
  wrongOpenCount,
} = library;

const termCount = glossaryCount();
const bankQuestionCount = quizQuestionCount();
const vibeTopicCount = countVibeTopics();
const mapBadges = computed(() => ({
  knowledge: countTopics(),
  knowledge2: vibeTopicCount,
  quiz: bankQuestionCount,
}));

const panelWidth = ref(readPanelWidth());
const graphHeight = ref(readGraphHeight());
const stacked = ref(isStackedLayout());
const resizing = ref(false);

const workspaceStyle = computed(() => {
  if (stacked.value) {
    return {
      gridTemplateColumns: '1fr',
      gridTemplateRows: `${graphHeight.value}px minmax(0, 1fr)`,
    };
  }
  return {
    gridTemplateColumns: `minmax(0, 1fr) ${panelWidth.value}px`,
    gridTemplateRows: 'minmax(0, 1fr)',
  };
});

useBlobity(theme);

function writeUrlState() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('mode');
    if (activeMapId.value === 'quiz') {
      url.searchParams.set('map', 'quiz');
      if (quizActiveId.value) url.searchParams.set('qset', quizActiveId.value);
      else url.searchParams.delete('qset');
      if (quizFocusNodeId.value) url.searchParams.set('qnode', quizFocusNodeId.value);
      else url.searchParams.delete('qnode');
      url.searchParams.delete('node');
    } else if (activeMapId.value === 'knowledge2') {
      url.searchParams.set('map', 'knowledge2');
      url.searchParams.delete('qset');
      url.searchParams.delete('qnode');
      if (vibeActiveId.value) url.searchParams.set('node', vibeActiveId.value);
      else url.searchParams.delete('node');
    } else {
      url.searchParams.delete('map');
      url.searchParams.delete('qset');
      url.searchParams.delete('qnode');
      if (activeId.value) url.searchParams.set('node', activeId.value);
      else url.searchParams.delete('node');
    }
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  } catch {
    /* ignore */
  }
}

watch(
  theme,
  (t) => {
    document.documentElement.setAttribute('data-theme', t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {
      /* ignore */
    }
  },
  { immediate: true }
);

watch(
  activeId,
  (id) => {
    if (!isKnowledgeMap.value) return;
    writeUrlState();
    if (id) library.markVisited(id);
  },
  { immediate: true }
);

watch(
  vibeActiveId,
  (id) => {
    if (!isKnowledge2Map.value) return;
    writeUrlState();
    if (id) library.markVisited(id);
  },
  { immediate: true }
);

watch([activeMapId, quizActiveId, quizFocusNodeId], () => {
  writeUrlState();
});

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

function onMapChange(id) {
  activeMapId.value = normalizeMapId(id);
  if (activeMapId.value === 'quiz') {
    libraryOpen.value = false;
  } else {
    quizFocusNodeId.value = null;
  }
}

function selectNode(id) {
  activeId.value = id;
}

function selectVibeNode(id) {
  vibeActiveId.value = id;
}

function navigateNode(id) {
  if (getVibeEntryById(id)) {
    activeMapId.value = 'knowledge2';
    vibeActiveId.value = id;
    vibeFocusNonce.value += 1;
    return;
  }
  activeMapId.value = 'knowledge';
  activeId.value = id;
  focusNonce.value += 1;
}

function clearSelection() {
  if (isKnowledge2Map.value) {
    vibeActiveId.value = null;
    return;
  }
  activeId.value = null;
}

function selectQuizSet(id) {
  quizActiveId.value = id;
  quizFocusNodeId.value = null;
}

function clearQuizSelection() {
  quizActiveId.value = null;
}

function gotoLearnFromQuiz(nodeId) {
  activeMapId.value = 'knowledge';
  quizFocusNodeId.value = null;
  activeId.value = nodeId;
  focusNonce.value += 1;
}

function openQuizForNode(nodeId) {
  if (!nodeId || !questionsForNode(nodeId).length) return;
  libraryOpen.value = false;
  activeMapId.value = 'quiz';
  quizFocusNodeId.value = nodeId;
  quizActiveId.value = null;
  quizFocusNonce.value += 1;
}

function onKey(e) {
  if (e.key !== 'Escape') return;
  if (glossaryOpen.value) {
    closeGlossary();
    return;
  }
  if (libraryOpen.value) {
    libraryOpen.value = false;
    return;
  }
  if (isQuizMap.value) {
    if (quizFocusNodeId.value) {
      quizFocusNodeId.value = null;
      return;
    }
    if (quizActiveId.value) {
      quizActiveId.value = null;
      return;
    }
    return;
  }
  clearSelection();
}

function closeGlossary() {
  glossaryOpen.value = false;
  glossaryFocusId.value = '';
}

function openLibrary() {
  closeGlossary();
  libraryOpen.value = true;
}

function toggleLibrary() {
  if (libraryOpen.value) {
    libraryOpen.value = false;
    return;
  }
  openLibrary();
}

/** 打开词典；已开且同词条 / 无指定词条时再点则收起 */
function openGlossary(termId = '') {
  const id = String(termId || '').trim();
  libraryOpen.value = false;
  if (glossaryOpen.value && (!id || id === glossaryFocusId.value)) {
    closeGlossary();
    return;
  }
  glossaryFocusId.value = id;
  glossaryOpen.value = true;
}

function toggleGlossary() {
  if (glossaryOpen.value) closeGlossary();
  else openGlossary();
}

function syncLayoutMode() {
  stacked.value = isStackedLayout();
  panelWidth.value = clampPanelWidth(panelWidth.value);
  graphHeight.value = clampGraphHeight(graphHeight.value);
}

/**
 * @param {PointerEvent} e
 */
function startResize(e) {
  if (e.button !== 0) return;
  e.preventDefault();
  const startX = e.clientX;
  const startY = e.clientY;
  const startW = panelWidth.value;
  const startH = graphHeight.value;
  const mode = stacked.value ? 'row' : 'col';
  resizing.value = true;
  document.body.classList.add(mode === 'col' ? 'is-resizing-col' : 'is-resizing-row');

  const target = e.currentTarget;
  target.setPointerCapture?.(e.pointerId);

  function onMove(ev) {
    if (mode === 'col') {
      panelWidth.value = clampPanelWidth(startW + (startX - ev.clientX));
    } else {
      graphHeight.value = clampGraphHeight(startH + (ev.clientY - startY));
    }
  }

  function onUp(ev) {
    resizing.value = false;
    document.body.classList.remove('is-resizing-col', 'is-resizing-row');
    target.releasePointerCapture?.(ev.pointerId);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    if (mode === 'col') persistPanelWidth(panelWidth.value);
    else persistGraphHeight(graphHeight.value);
  }

  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
}

function nudgePanel(delta) {
  if (stacked.value) {
    graphHeight.value = clampGraphHeight(graphHeight.value + delta);
    persistGraphHeight(graphHeight.value);
  } else {
    panelWidth.value = clampPanelWidth(panelWidth.value + delta);
    persistPanelWidth(panelWidth.value);
  }
}

function onSplitKey(e) {
  const step = e.shiftKey ? 48 : 24;
  if (stacked.value) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      nudgePanel(-step);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      nudgePanel(step);
    }
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    nudgePanel(step);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    nudgePanel(-step);
  }
}

onMounted(() => {
  library.init();
  window.addEventListener('keydown', onKey);
  window.addEventListener('resize', syncLayoutMode);
  syncLayoutMode();
});
onUnmounted(() => {
  window.removeEventListener('keydown', onKey);
  window.removeEventListener('resize', syncLayoutMode);
  document.body.classList.remove('is-resizing-col', 'is-resizing-row');
});
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#learn-panel">跳到讲解面板</a>

    <header class="topbar">
      <MapSwitcher
        :model-value="activeMapId"
        :badges="mapBadges"
        @update:model-value="onMapChange"
      />
      <div class="topbar-actions">
        <button
          type="button"
          class="theme-toggle shelf-launch"
          data-blobity
          :aria-pressed="glossaryOpen"
          :aria-label="glossaryOpen ? '收起词典' : '打开词典'"
          :title="glossaryOpen ? '再点收起' : '搜索术语与缩写'"
          @click="toggleGlossary"
        >
          词典
          <span class="topbar-badge">{{ termCount }}</span>
        </button>
        <button
          type="button"
          class="theme-toggle shelf-launch"
          data-blobity
          :aria-pressed="libraryOpen"
          :aria-label="libraryOpen ? '收起书架' : '打开我的书架'"
          :title="libraryOpen ? '再点收起' : '书签、笔记与备份'"
          @click="toggleLibrary"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3.2 2.5h3.8c.55 0 1.05.25 1.4.7L9 4a.8.8 0 0 0 .6.3h3.2A1.2 1.2 0 0 1 14 5.5V13a1.2 1.2 0 0 1-1.2 1.2H3.2A1.2 1.2 0 0 1 2 13V3.7A1.2 1.2 0 0 1 3.2 2.5Z"
              stroke="currentColor"
              stroke-width="1.3"
            />
            <path d="M5 8h6M5 10.5h3.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
          </svg>
          书架
          <span v-if="bookmarkCount || noteCount" class="topbar-badge">
            {{ bookmarkCount + noteCount }}
          </span>
        </button>
        <button
          type="button"
          class="theme-toggle"
          data-blobity
          :aria-pressed="theme === 'dark'"
          :aria-label="theme === 'dark' ? '当前深色，点击切换到浅色' : '当前浅色，点击切换到深色'"
          :title="theme === 'dark' ? '切换到浅色' : '切换到深色'"
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? '深色' : '浅色' }}
        </button>
        <div class="topbar-meta">
          <template v-if="isQuizMap">
            {{ activeMap.short }} <strong>{{ bankQuestionCount }}</strong>
            <template v-if="wrongOpenCount">
              · 错题 <strong>{{ wrongOpenCount }}</strong>
            </template>
          </template>
          <template v-else-if="isKnowledge2Map">
            {{ activeMap.short }} <strong>{{ vibeTopicCount }}</strong> · 足迹
            <strong>{{ visitedCount }}</strong> · 已学 <strong>{{ learnedCount }}</strong>
          </template>
          <template v-else>
            {{ activeMap.short }} <strong>{{ countTopics() }}</strong> · 足迹
            <strong>{{ visitedCount }}</strong> · 已学 <strong>{{ learnedCount }}</strong>
          </template>
        </div>
      </div>
    </header>

    <div class="workspace" :class="{ 'is-resizing': resizing }" :style="workspaceStyle">
      <section
        class="graph-pane"
        :aria-label="
          isQuizMap ? '题库思维导图' : isKnowledge2Map ? '知识导图2' : '知识导图画布'
        "
      >
        <KnowledgeGraph
          v-if="isKnowledgeMap"
          :active-id="activeId"
          :theme="theme"
          :focus-nonce="focusNonce"
          :bookmarked-ids="bookmarkedIds"
          :noted-ids="notedIds"
          :visited-ids="visitedIds"
          :learned-ids="learnedIds"
          @select="selectNode"
          @clear="clearSelection"
        />
        <VibeMindMap
          v-else-if="isKnowledge2Map"
          :active-id="vibeActiveId"
          :theme="theme"
          :focus-nonce="vibeFocusNonce"
          :bookmarked-ids="bookmarkedIds"
          :noted-ids="notedIds"
          :visited-ids="visitedIds"
          :learned-ids="learnedIds"
          @select="selectVibeNode"
          @clear="clearSelection"
        />
        <QuizMindMap
          v-else
          :active-id="quizActiveId"
          :theme="theme"
          :focus-nonce="quizFocusNonce"
          @select="selectQuizSet"
          @clear="clearQuizSelection"
        />
      </section>

      <aside
        id="learn-panel"
        class="panel-pane"
        :aria-label="isQuizMap ? '刷题台' : '节点讲解'"
      >
        <div
          class="split-handle"
          :class="stacked ? 'split-handle--row' : 'split-handle--col'"
          role="separator"
          :aria-orientation="stacked ? 'horizontal' : 'vertical'"
          :aria-label="stacked ? '拖动调整图谱高度' : '拖动调整讲解区宽度'"
          :aria-valuenow="stacked ? graphHeight : panelWidth"
          :title="stacked ? '上下拖动调整高度' : '左右拖动调整宽度'"
          tabindex="0"
          @pointerdown="startResize"
          @keydown="onSplitKey"
        />
        <Transition name="panel-swap" mode="out-in">
          <QuizDesk
            v-if="isQuizMap"
            :key="`quiz-${quizActiveId || 'none'}-${quizFocusNodeId || ''}`"
            :active-set-id="quizActiveId"
            :focus-node-id="quizFocusNodeId"
            @select-set="selectQuizSet"
            @goto-learn="gotoLearnFromQuiz"
            @close-focus="quizFocusNodeId = null"
          />
          <NodePanel
            v-else-if="activeNode"
            :key="activeNode.id"
            :node="activeNode"
            @close="clearSelection"
            @navigate="navigateNode"
            @quiz="openQuizForNode"
            @open-glossary="openGlossary"
          />
          <div v-else key="empty" class="empty-hint">
            <h2>选择一个节点</h2>
            <p>
              切换知识导图 / 知识导图2 / 题库，点卡片看讲解。词典用顶栏或悬浮球；Esc 收起。
            </p>
          </div>
        </Transition>
      </aside>
    </div>

    <UserLibraryDrawer
      :open="libraryOpen"
      @close="libraryOpen = false"
      @navigate="navigateNode"
    />
    <GlossaryDrawer
      :open="glossaryOpen"
      :focus-id="glossaryFocusId"
      @close="closeGlossary"
      @navigate="navigateNode"
    />
    <GlossaryFab
      :open="glossaryOpen"
      :term-count="termCount"
      @toggle="toggleGlossary"
    />
  </div>
</template>
