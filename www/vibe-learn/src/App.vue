<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import KnowledgeGraph from './components/KnowledgeGraph.vue';
import NodePanel from './components/NodePanel.vue';
import UserLibraryDrawer from './components/UserLibraryDrawer.vue';
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

const THEME_KEY = 'vibe-learn-theme';

function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function readNodeFromUrl() {
  try {
    const id = new URLSearchParams(window.location.search).get('node');
    return id && getNodeById(id) ? id : 'computer-system';
  } catch {
    return 'computer-system';
  }
}

function writeNodeToUrl(id) {
  try {
    const url = new URL(window.location.href);
    if (id) url.searchParams.set('node', id);
    else url.searchParams.delete('node');
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  } catch {
    /* ignore */
  }
}

const activeId = ref(readNodeFromUrl());
const theme = ref(readTheme());
/** 面板 chip 跳转时递增，驱动图谱聚焦该节点 */
const focusNonce = ref(0);
const activeNode = computed(() => (activeId.value ? getNodeById(activeId.value) : null));
const libraryOpen = ref(false);
const library = useUserLibrary();
const {
  bookmarkedIds,
  notedIds,
  bookmarkCount,
  noteCount,
} = library;

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

watch(activeId, (id) => {
  writeNodeToUrl(id);
  if (id) library.markVisited(id);
}, { immediate: true });

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

function selectNode(id) {
  activeId.value = id;
}

function navigateNode(id) {
  activeId.value = id;
  focusNonce.value += 1;
}

function clearSelection() {
  activeId.value = null;
}

function onKey(e) {
  if (e.key === 'Escape') {
    if (libraryOpen.value) {
      libraryOpen.value = false;
      return;
    }
    clearSelection();
  }
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
      const next = clampPanelWidth(startW + (startX - ev.clientX));
      panelWidth.value = next;
    } else {
      const next = clampGraphHeight(startH + (ev.clientY - startY));
      graphHeight.value = next;
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
      <div class="brand" data-blobity translate="no">
        <div class="brand-mark">Vibe <span>Learn</span></div>
        <div class="brand-sub">知识图谱</div>
      </div>
      <div class="topbar-actions">
        <button
          type="button"
          class="theme-toggle shelf-launch"
          data-blobity
          :aria-pressed="libraryOpen"
          aria-label="打开我的书架"
          title="书签、笔记与备份"
          @click="libraryOpen = true"
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
        <div class="topbar-meta">图谱 <strong>{{ countTopics() }}</strong> 个主题</div>
      </div>
    </header>

    <div class="workspace" :class="{ 'is-resizing': resizing }" :style="workspaceStyle">
      <section class="graph-pane" aria-label="知识图谱画布">
        <KnowledgeGraph
          :active-id="activeId"
          :theme="theme"
          :focus-nonce="focusNonce"
          :bookmarked-ids="bookmarkedIds"
          :noted-ids="notedIds"
          @select="selectNode"
          @clear="clearSelection"
        />
      </section>

      <aside id="learn-panel" class="panel-pane" aria-label="节点讲解">
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
          <NodePanel
            v-if="activeNode"
            :key="activeNode.id"
            :node="activeNode"
            @close="clearSelection"
            @navigate="navigateNode"
          />
          <div v-else key="empty" class="empty-hint">
            <h2>选择一个节点</h2>
            <p>点选卡片会点亮所属整章；悬停可预览相邻关系说明；点连线跳到另一端。Esc 取消选中。</p>
          </div>
        </Transition>
      </aside>
    </div>

    <UserLibraryDrawer
      :open="libraryOpen"
      @close="libraryOpen = false"
      @navigate="navigateNode"
    />
  </div>
</template>
