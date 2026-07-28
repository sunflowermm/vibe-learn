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
let disposeReveal = () => {};
/** @type {MutationObserver | null} */
let themeMo = null;

function revealLessonBlocks() {
  const root = bodyEl.value;
  if (!root) return () => {};
  const reduced =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = [...root.querySelectorAll('h2, h3, table, .vibe-widget, pre.mermaid, .mermaid')];
  if (!targets.length) return () => {};
  if (reduced) {
    for (const t of targets) t.classList.add('lesson-reveal');
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('lesson-reveal');
        io.unobserve(e.target);
      }
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  for (const t of targets) {
    t.classList.add('lesson-reveal-wait');
    io.observe(t);
  }
  return () => io.disconnect();
}

async function paintDiagrams() {
  disposeWidgets();
  disposeWidgets = () => {};
  disposeReveal();
  disposeReveal = () => {};
  if (!bodyEl.value) return;
  disposeWidgets = hydrateLessonWidgets(bodyEl.value);
  await renderMermaidIn(bodyEl.value);
  disposeReveal = revealLessonBlocks();
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
  disposeReveal();
});
</script>

<template>
  <div ref="hostEl" class="lesson-host">
    <article :key="bodyKey" ref="bodyEl" class="md lesson-body" v-html="html" />
  </div>
</template>
