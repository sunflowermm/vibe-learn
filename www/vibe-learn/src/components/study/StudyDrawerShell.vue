<script setup>
/**
 * 学习抽屉壳：遮罩 + 面板 + 头栏 + 可选搜索 / 分段 / sticky / 正文
 */
import { nextTick, ref, watch } from 'vue';
import '../../styles/study-drawer.css';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
  eyebrow: { type: String, default: '' },
  titleId: { type: String, required: true },
  closeLabel: { type: String, default: '关闭' },
  lede: { type: String, default: '' },
  searchPlaceholder: { type: String, default: '' },
  showSearch: { type: Boolean, default: undefined },
  query: { type: String, default: '' },
  /**
   * true：全屏遮罩模态（书架）
   * false：浮层词典——无遮罩、可边看课/刷题边查词
   */
  blocking: { type: Boolean, default: true },
});

const emit = defineEmits(['close', 'update:query']);

const panelEl = ref(null);
const searchEl = ref(null);
const bodyEl = ref(null);

const searchEnabled = () =>
  props.showSearch === true ||
  (props.showSearch !== false && Boolean(props.searchPlaceholder));

watch(
  () => props.open,
  async (open) => {
    if (!open) return;
    await nextTick();
    panelEl.value?.focus({ preventScroll: true });
    if (searchEnabled()) searchEl.value?.focus({ preventScroll: true });
  }
);

function onQueryInput(e) {
  emit('update:query', e.target?.value ?? '');
}

function scrollBodyToTop() {
  if (bodyEl.value) bodyEl.value.scrollTop = 0;
}

defineExpose({ bodyEl, scrollBodyToTop, searchEl, panelEl });
</script>

<template>
  <Teleport to="body">
    <div
      class="study-drawer"
      :class="{ 'is-open': open, 'study-drawer--float': !blocking }"
      :aria-hidden="!open"
    >
      <button
        v-if="open && blocking"
        type="button"
        class="study-drawer__mask"
        :aria-label="closeLabel"
        @click="emit('close')"
      />
      <aside
        v-show="open"
        ref="panelEl"
        class="study-drawer__panel"
        role="dialog"
        :aria-modal="blocking ? 'true' : 'false'"
        :aria-labelledby="titleId"
        tabindex="-1"
      >
        <header class="study-drawer__head">
          <div>
            <p v-if="eyebrow" class="study-drawer__eyebrow">{{ eyebrow }}</p>
            <h2 :id="titleId" class="study-drawer__title">{{ title }}</h2>
          </div>
          <button type="button" class="study-drawer__close" :aria-label="closeLabel" @click="emit('close')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <p v-if="lede" class="study-drawer__lede">{{ lede }}</p>

        <div v-if="searchEnabled()" class="study-drawer__search">
          <svg class="study-drawer__search-ico" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.4" />
            <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
          </svg>
          <input
            ref="searchEl"
            type="search"
            class="study-drawer__search-input"
            :placeholder="searchPlaceholder"
            autocomplete="off"
            :value="query"
            @input="onQueryInput"
          />
        </div>

        <div v-if="$slots.filters" class="study-drawer__seg">
          <slot name="filters" />
        </div>

        <div ref="bodyEl" class="study-drawer__body">
          <div v-if="$slots.sticky" class="study-drawer__sticky">
            <slot name="sticky" />
          </div>
          <slot />
        </div>
      </aside>
    </div>
  </Teleport>
</template>
