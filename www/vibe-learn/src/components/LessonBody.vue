<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
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
  // flush:'post' 时 DOM 已带 v-html；不再多等一拍 nextTick，减少「MD 先出、终端后出」
  if (!bodyEl.value) return;
  disposeWidgets = hydrateLessonWidgets(bodyEl.value);
  // Mermaid 后台画，不挡终端
  void renderMermaidIn(bodyEl.value);
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
