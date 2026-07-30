<script setup>
/**
 * 词典悬浮球：可拖、可点、位置记忆；打开浮层时自动避开遮挡。
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  FAB_DRAG_THRESHOLD,
  clampFabPos,
  defaultFabPos,
  persistFabPos,
  readFabPos,
  snapFabToEdge,
} from '../composables/useGlossaryFabPos.js';

const props = defineProps({
  open: { type: Boolean, default: false },
  termCount: { type: Number, default: 0 },
  /** 词典浮层 panel 选择器，用于避让 */
  avoidSelector: { type: String, default: '.study-drawer--float .study-drawer__panel' },
});

const emit = defineEmits(['toggle']);

const rootEl = ref(null);
const pos = ref({ x: 0, y: 0 });
const dragging = ref(false);
const ready = ref(false);

/** @type {{ pointerId: number, startX: number, startY: number, origX: number, origY: number, moved: boolean } | null} */
let drag = null;
let size = { w: 96, h: 48 };

const style = computed(() => ({
  left: `${pos.value.x}px`,
  top: `${pos.value.y}px`,
  right: 'auto',
  bottom: 'auto',
  visibility: ready.value ? 'visible' : 'hidden',
}));

function measure() {
  const el = rootEl.value;
  if (!el) return size;
  const r = el.getBoundingClientRect();
  size = {
    w: Math.max(48, Math.round(r.width) || size.w),
    h: Math.max(40, Math.round(r.height) || size.h),
  };
  return size;
}

function avoidRect() {
  if (!props.open || typeof document === 'undefined') return null;
  const panel = document.querySelector(props.avoidSelector);
  if (!panel || !(panel instanceof HTMLElement)) return null;
  if (getComputedStyle(panel).display === 'none' || panel.getAttribute('aria-hidden') === 'true') {
    return null;
  }
  const r = panel.getBoundingClientRect();
  if (r.width < 8 || r.height < 8) return null;
  return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
}

function applyClamp(next, { persist = false, snap = false } = {}) {
  const { w, h } = measure();
  let p = clampFabPos(next, w, h, avoidRect());
  if (snap) p = snapFabToEdge(p, w, h);
  p = clampFabPos(p, w, h, avoidRect());
  pos.value = p;
  if (persist) persistFabPos(p);
}

function initPos() {
  const { w, h } = measure();
  const saved = readFabPos();
  applyClamp(saved || defaultFabPos(w, h), { persist: false });
  ready.value = true;
}

function onPointerDown(e) {
  if (e.button != null && e.button !== 0) return;
  const el = rootEl.value;
  if (!el) return;
  measure();
  drag = {
    pointerId: e.pointerId,
    startX: e.clientX,
    startY: e.clientY,
    origX: pos.value.x,
    origY: pos.value.y,
    moved: false,
  };
  dragging.value = false;
  try {
    el.setPointerCapture(e.pointerId);
  } catch {
    /* older WebView */
  }
}

function onPointerMove(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  const dx = e.clientX - drag.startX;
  const dy = e.clientY - drag.startY;
  if (!drag.moved && dx * dx + dy * dy < FAB_DRAG_THRESHOLD * FAB_DRAG_THRESHOLD) return;
  drag.moved = true;
  dragging.value = true;
  e.preventDefault();
  applyClamp({ x: drag.origX + dx, y: drag.origY + dy });
}

function endDrag(e, cancelled = false) {
  if (!drag || (e && e.pointerId !== drag.pointerId)) return;
  const wasDrag = drag.moved;
  const el = rootEl.value;
  try {
    if (el?.hasPointerCapture?.(drag.pointerId)) el.releasePointerCapture(drag.pointerId);
  } catch {
    /* ignore */
  }
  drag = null;
  dragging.value = false;
  if (cancelled) {
    applyClamp(readFabPos() || pos.value, { persist: false });
    return;
  }
  if (wasDrag) {
    applyClamp(pos.value, { persist: true, snap: true });
  }
}

function onPointerUp(e) {
  const wasDrag = drag?.moved;
  endDrag(e, false);
  if (!wasDrag) emit('toggle');
}

function onPointerCancel(e) {
  endDrag(e, true);
}

function onKey(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    emit('toggle');
  }
}

function onResize() {
  applyClamp(pos.value, { persist: true });
}

let resizeTimer = 0;
function onResizeDebounced() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(onResize, 80);
}

watch(
  () => props.open,
  async () => {
    await nextTick();
    applyClamp(pos.value, { persist: false });
    window.setTimeout(() => applyClamp(pos.value, { persist: false }), 300);
  }
);

onMounted(async () => {
  await nextTick();
  initPos();
  window.addEventListener('resize', onResizeDebounced);
  window.addEventListener('orientationchange', onResizeDebounced);
  window.visualViewport?.addEventListener('resize', onResizeDebounced);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResizeDebounced);
  window.removeEventListener('orientationchange', onResizeDebounced);
  window.visualViewport?.removeEventListener('resize', onResizeDebounced);
  window.clearTimeout(resizeTimer);
  drag = null;
});
</script>

<template>
  <button
    ref="rootEl"
    type="button"
    class="glossary-fab"
    :class="{ 'is-open': open, 'is-dragging': dragging }"
    :style="style"
    :aria-pressed="open"
    :aria-label="open ? '收起词典' : '打开词典悬浮窗'"
    :title="open ? '收起词典 · 可拖动位置' : '词典随查 · 拖动可换位'"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @keydown="onKey"
    @click.prevent
  >
    <span class="glossary-fab__grip" aria-hidden="true" />
    <span class="glossary-fab__ico" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 4.5h9.5A2.5 2.5 0 0 1 17 7v12.2a1.3 1.3 0 0 1-1.3 1.3H5V4.5Z"
          stroke="currentColor"
          stroke-width="1.6"
        />
        <path
          d="M8 8.2h6M8 11.2h4.6M8 14.2h3.2"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path d="M19 5.2v14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
    </span>
    <span class="glossary-fab__label">{{ open ? '收起' : '词典' }}</span>
    <span v-if="!open && termCount" class="glossary-fab__badge">{{ termCount }}</span>
  </button>
</template>
