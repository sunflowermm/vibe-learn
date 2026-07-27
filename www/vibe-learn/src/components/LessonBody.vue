<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { renderLesson } from '../utils/lesson-render.js';
import { hydrateLessonWidgets } from '../utils/lesson-widgets.js';
import { renderMermaidIn } from '../composables/useMermaid.js';
import { bindMermaidZoomInteractions } from '../utils/mermaid-zoom.js';
import '../styles/lesson-md.css';
import '../styles/lesson-widgets.css';

const props = defineProps({
  markdown: {
    type: String,
    default: '',
  },
});

const hostEl = ref(null);
const bodyEl = ref(null);
/** 主题切换时递增，强制重建 DOM 以便 Mermaid / widgets 重绘 */
const themeTick = ref(0);
const html = computed(() => renderLesson(props.markdown));
const bodyKey = computed(() => `${themeTick.value}:${props.markdown.length}`);

let unbindZoom = () => {};
let disposeWidgets = () => {};
/** @type {MutationObserver | null} */
let themeMo = null;

async function paintDiagrams() {
  disposeWidgets();
  disposeWidgets = () => {};
  await nextTick();
  await renderMermaidIn(bodyEl.value);
  disposeWidgets = hydrateLessonWidgets(bodyEl.value);
}

watch([() => props.markdown, themeTick], paintDiagrams, { flush: 'post' });

onMounted(() => {
  paintDiagrams();
  if (hostEl.value) unbindZoom = bindMermaidZoomInteractions(hostEl.value);

  themeMo = new MutationObserver(() => {
    themeTick.value += 1;
  });
  themeMo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
});

onUnmounted(() => {
  themeMo?.disconnect();
  unbindZoom();
  disposeWidgets();
});
</script>

<template>
  <div ref="hostEl" class="lesson-host">
    <article :key="bodyKey" ref="bodyEl" class="md lesson-body" v-html="html" />
  </div>
</template>
