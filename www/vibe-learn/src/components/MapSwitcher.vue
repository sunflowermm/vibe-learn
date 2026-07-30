<script setup>
/**
 * 左上角思维导图切换：项目可挂多张导图，题库是其中一张
 */
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { LEARNING_MAPS, getLearningMap } from '../data/maps.js';

const props = defineProps({
  modelValue: { type: String, default: 'knowledge' },
  /** 可选：id → 角标数字 */
  badges: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['update:modelValue']);

const open = ref(false);
const rootEl = ref(null);

const current = computed(() => getLearningMap(props.modelValue));
const maps = LEARNING_MAPS;

function select(id) {
  if (id === props.modelValue) {
    open.value = false;
    return;
  }
  emit('update:modelValue', id);
  open.value = false;
}

function toggle() {
  open.value = !open.value;
}

function onDocPointer(e) {
  if (!open.value) return;
  if (rootEl.value?.contains(e.target)) return;
  open.value = false;
}

function onKey(e) {
  if (e.key === 'Escape' && open.value) {
    open.value = false;
    e.stopPropagation();
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointer);
  window.addEventListener('keydown', onKey, true);
});
onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocPointer);
  window.removeEventListener('keydown', onKey, true);
});
</script>

<template>
  <div ref="rootEl" class="map-switch" :class="{ 'is-open': open }">
    <button
      type="button"
      class="map-switch__trigger"
      data-blobity
      :aria-expanded="open"
      aria-haspopup="listbox"
      aria-controls="map-switch-list"
      :aria-label="`当前思维导图：${current.label}，点击切换`"
      @click="toggle"
    >
      <span class="map-switch__brand">Vibe <em>Learn</em></span>
      <span class="map-switch__current">
        <span class="map-switch__label">{{ current.label }}</span>
        <span v-if="badges[current.id] != null" class="map-switch__badge">{{ badges[current.id] }}</span>
        <svg class="map-switch__caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 4.5L6 7.5L9 4.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </span>
    </button>

    <ul
      v-show="open"
      id="map-switch-list"
      class="map-switch__list"
      role="listbox"
      :aria-label="`选择思维导图`"
    >
      <li v-for="m in maps" :key="m.id" role="presentation">
        <button
          type="button"
          role="option"
          class="map-switch__option"
          :class="{ active: m.id === modelValue }"
          :aria-selected="m.id === modelValue"
          @click="select(m.id)"
        >
          <span class="map-switch__option-main">
            <span class="map-switch__option-label">{{ m.label }}</span>
            <span v-if="badges[m.id] != null" class="map-switch__badge">{{ badges[m.id] }}</span>
          </span>
          <span class="map-switch__option-blurb">{{ m.blurb }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.map-switch {
  position: relative;
  z-index: 5;
  min-width: 0;
}

.map-switch__trigger {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.15rem 0.35rem 0.15rem 0;
  border-radius: 10px;
  text-align: left;
  max-width: min(16rem, 48vw);
}

.map-switch__trigger:hover .map-switch__current,
.map-switch.is-open .map-switch__current {
  color: var(--accent);
}

.map-switch__brand {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 750;
  letter-spacing: -0.03em;
  color: var(--node-title);
  line-height: 1.15;
}

.map-switch__brand em {
  font-style: normal;
  color: var(--accent);
}

.map-switch__current {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  color: var(--mist-dim);
  line-height: 1.2;
}

.map-switch__label {
  font-weight: 600;
}

.map-switch__caret {
  opacity: 0.75;
  transition: transform 0.18s ease;
}

.map-switch.is-open .map-switch__caret {
  transform: rotate(180deg);
}

.map-switch__list {
  position: absolute;
  top: calc(100% + 0.45rem);
  left: 0;
  margin: 0;
  padding: 0.35rem;
  list-style: none;
  min-width: min(17rem, 86vw);
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--panel-bg);
  box-shadow: var(--shadow);
  animation: map-switch-in 0.18s ease-out;
}

@keyframes map-switch-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .map-switch__list {
    animation: none;
  }
}

.map-switch__option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  width: 100%;
  padding: 0.55rem 0.65rem;
  border-radius: 9px;
  text-align: left;
}

.map-switch__option:hover,
.map-switch__option.active {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.map-switch__option-main {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.map-switch__option-label {
  font-size: 0.88rem;
  font-weight: 650;
  color: var(--node-title);
}

.map-switch__option-blurb {
  font-size: 0.72rem;
  color: var(--mist-dim);
  line-height: 1.35;
}

.map-switch__badge {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  padding: 0.05rem 0.35rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--signal);
}
</style>
