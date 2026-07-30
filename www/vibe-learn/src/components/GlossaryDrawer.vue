<script setup>
/**
 * 全局词典：浮层跟随悬浮球就近展开；点选后释义钉在列表上方
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { GLOSSARY, glossaryCount, searchGlossary } from '../data/glossary.js';
import { getNodeById, resolveNodes } from '../data/nodes.js';
import {
  getFabBox,
  measurePanelSize,
  placePanelNearAnchor,
  subscribeFabBox,
} from '../composables/useGlossaryFabPos.js';
import { copyWithButtonFeedback } from '../utils/copy-text.js';
import StudyDrawerShell from './study/StudyDrawerShell.vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  /** 打开时聚焦并展示该词条 id */
  focusId: { type: String, default: '' },
});

const emit = defineEmits(['close', 'navigate']);

const query = ref('');
const activeId = ref(null);
const shell = ref(null);
const panelStyle = ref(null);

const rows = computed(() => searchGlossary(query.value, { limit: 120 }));
const active = computed(() => {
  if (!activeId.value) return null;
  const hit = rows.value.find((r) => r.id === activeId.value);
  if (hit) return hit;
  const e = GLOSSARY[activeId.value];
  return e ? { id: activeId.value, ...e } : null;
});
const alsoNodes = computed(() => resolveNodes(active.value?.also || []));
const lede = computed(() => {
  const n = rows.value.length;
  const total = glossaryCount();
  if (!query.value.trim()) {
    return `${total} 条。跟悬浮球就近展开。↑↓ 切换，Esc 收起。`;
  }
  return `匹配 ${n} / ${total}`;
});

function layoutPanel() {
  if (!props.open) {
    panelStyle.value = null;
    return;
  }
  const { w, h } = measurePanelSize();
  const p = placePanelNearAnchor(getFabBox(), w, h);
  panelStyle.value = {
    left: `${p.x}px`,
    top: `${p.y}px`,
    right: 'auto',
    bottom: 'auto',
    width: `${w}px`,
    height: `${h}px`,
  };
}

let unsubFab = () => {};
let resizeTimer = 0;

function onResize() {
  if (props.open) layoutPanel();
}

function onResizeDebounced() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(onResize, 80);
}

watch(
  () => [props.open, props.focusId],
  async ([open, focusId]) => {
    if (!open) {
      activeId.value = null;
      panelStyle.value = null;
      window.removeEventListener('keydown', onDrawerKey);
      return;
    }
    window.addEventListener('keydown', onDrawerKey);
    layoutPanel();
    await nextTick();
    layoutPanel();
    const id = String(focusId || '').trim();
    if (id && GLOSSARY[id]) {
      query.value = '';
      await selectTerm(id, { toggle: false });
    }
  }
);

onMounted(() => {
  unsubFab = subscribeFabBox(() => {
    if (props.open) layoutPanel();
  });
  window.addEventListener('resize', onResizeDebounced);
  window.addEventListener('orientationchange', onResizeDebounced);
  window.visualViewport?.addEventListener('resize', onResizeDebounced);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onDrawerKey);
  window.removeEventListener('resize', onResizeDebounced);
  window.removeEventListener('orientationchange', onResizeDebounced);
  window.visualViewport?.removeEventListener('resize', onResizeDebounced);
  window.clearTimeout(resizeTimer);
  unsubFab();
});

async function selectTerm(id, { toggle = true } = {}) {
  if (toggle && activeId.value === id) activeId.value = null;
  else activeId.value = id;
  await nextTick();
  if (activeId.value) {
    shell.value?.scrollBodyToTop?.();
    document
      .getElementById(`glossary-row-${id}`)
      ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

async function copyBrief(e) {
  if (!active.value?.brief) return;
  const text = `${active.value.term}\n${active.value.brief}`;
  await copyWithButtonFeedback(e.currentTarget, text, {
    okText: '已复制',
    failText: '失败',
  });
}

function go(nodeId) {
  if (!nodeId || !getNodeById(nodeId)) return;
  emit('navigate', nodeId);
  emit('close');
}

function onDrawerKey(e) {
  if (!props.open) return;
  const tag = e.target?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  }
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  if (!rows.value.length) return;
  e.preventDefault();
  const ids = rows.value.map((r) => r.id);
  const cur = activeId.value ? ids.indexOf(activeId.value) : -1;
  let next = cur;
  if (e.key === 'ArrowDown') next = Math.min(ids.length - 1, Math.max(0, cur) + 1);
  else next = Math.max(0, cur <= 0 ? 0 : cur - 1);
  if (ids[next]) selectTerm(ids[next], { toggle: false });
}
</script>

<template>
  <StudyDrawerShell
    ref="shell"
    :open="open"
    :blocking="false"
    :panel-style="panelStyle"
    title="词典"
    eyebrow="浮层词典"
    title-id="glossary-drawer-title"
    close-label="关闭词典"
    :lede="lede"
    search-placeholder="搜索名词、缩写、定义…"
    :query="query"
    @close="emit('close')"
    @update:query="query = $event"
  >
    <template v-if="active" #sticky>
      <div
        class="study-detail study-detail--pinned"
        role="region"
        :aria-label="`词条 ${active.term}`"
      >
        <div class="study-detail__pin-head">
          <h3 class="study-detail__term">{{ active.term }}</h3>
          <div class="study-detail__actions">
            <button type="button" class="study-detail__copy" @click="copyBrief">
              复制
            </button>
            <button
              type="button"
              class="study-detail__dismiss"
              aria-label="收起释义"
              @click="activeId = null"
            >
              收起
            </button>
          </div>
        </div>
        <p class="study-detail__id">{{ active.id }}</p>
        <p class="study-detail__brief">{{ active.brief }}</p>
        <template v-if="alsoNodes.length">
          <p class="study-detail__label">相关课程</p>
          <div class="study-detail__chips">
            <button
              v-for="n in alsoNodes"
              :key="n.id"
              type="button"
              class="study-detail__chip"
              @click="go(n.id)"
            >
              {{ n.label }}
            </button>
          </div>
        </template>
      </div>
    </template>

    <div v-if="!rows.length" class="study-drawer__empty">
      <h3>没有匹配词条</h3>
      <p>换个关键词，或清空搜索。</p>
    </div>

    <template v-else>
      <p class="study-drawer__count-line">列表 {{ rows.length }} 条</p>
      <button
        v-for="row in rows"
        :id="`glossary-row-${row.id}`"
        :key="row.id"
        type="button"
        class="study-card"
        :class="{ 'is-active': activeId === row.id }"
        :aria-current="activeId === row.id ? 'true' : undefined"
        @click="selectTerm(row.id)"
      >
        <div class="study-card__top">
          <span class="study-card__tag">{{ row.id }}</span>
        </div>
        <h3 class="study-card__title">{{ row.term }}</h3>
        <p class="study-card__brief">{{ row.brief }}</p>
      </button>
    </template>
  </StudyDrawerShell>
</template>
