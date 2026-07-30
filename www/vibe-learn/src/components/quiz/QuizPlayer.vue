<script setup>
/**
 * 刷题播放器：四选一；进度条；1–4 / A–D；记入错题本
 */
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useUserLibrary } from '../../composables/useUserLibrary.js';
import { resolveNodes } from '../../data/nodes.js';

const props = defineProps({
  title: { type: String, default: '刷题' },
  caption: { type: String, default: '' },
  /** @type {import('vue').PropType<import('../../data/quiz/schema.js').QuizQuestion[]>} */
  questions: { type: Array, default: () => [] },
});

const emit = defineEmits(['retake', 'done', 'goto-learn']);

const library = useUserLibrary();
const idx = ref(0);
const score = ref(0);
const locked = ref(false);
const picked = ref(-1);
const finished = ref(false);

const total = computed(() => props.questions.length);
const current = computed(() => props.questions[idx.value] || null);
const progressText = computed(() =>
  finished.value ? '完成' : total.value ? `第 ${idx.value + 1} / ${total.value} 题` : '无题'
);
const progressPct = computed(() => {
  if (!total.value) return 0;
  if (finished.value) return 100;
  return Math.round(((idx.value + (locked.value ? 1 : 0)) / total.value) * 100);
});
const currentRelated = computed(() => resolveNodes(current.value?.relatedNodes || []));
const feedbackText = computed(() => {
  if (!locked.value || picked.value < 0 || !current.value) return '';
  const c = current.value.choices[picked.value];
  if (c?.why) return c.why;
  if (c?.ok) return '正确。';
  const right = current.value.choices.find((x) => x.ok);
  if (right?.reveal) return `正确答案对应：「${right.reveal}」`;
  return right ? `再对照正确项：${right.t}` : '再对照解析。';
});
const correctChoice = computed(() =>
  locked.value && picked.value >= 0 && !current.value?.choices?.[picked.value]?.ok
    ? current.value?.choices?.find((c) => c.ok) || null
    : null
);
const correctBanner = computed(() => {
  const c = correctChoice.value;
  if (!c) return '';
  if (c.reveal && c.reveal !== c.t) {
    // 名词→释义题：reveal 是名词；释义→名词题：reveal 是释义
    const looksLikeTerm = c.reveal.length < 48 && !c.reveal.includes('。');
    return looksLikeTerm
      ? `正确答案对应名词：「${c.reveal}」`
      : `正确答案：「${c.t}」`;
  }
  return `正确答案：${c.t}`;
});
const hasRevealMeta = computed(() =>
  Boolean(current.value?.choices?.some((c) => c.reveal))
);
const attributionLine = computed(() => {
  const q = current.value;
  if (!q || q.origin !== 'adapted') return '';
  const who = q.attribution || '公开开源题库';
  return `系统非原创 · 改编自 ${who}`;
});
const attributionHref = computed(() => current.value?.attributionUrl || '');

async function pick(i) {
  if (locked.value || finished.value || !current.value) return;
  if (i < 0 || i >= (current.value.choices?.length || 0)) return;
  locked.value = true;
  picked.value = i;
  const c = current.value.choices[i];
  const ok = Boolean(c?.ok);
  if (ok) score.value += 1;
  try {
    await library.recordQuizAnswer(current.value.id, { ok, choiceIndex: i });
  } catch {
    /* ignore persistence errors */
  }
}

function next() {
  if (!locked.value) return;
  if (idx.value + 1 >= total.value) {
    finished.value = true;
    emit('done', { score: score.value, total: total.value });
    return;
  }
  idx.value += 1;
  locked.value = false;
  picked.value = -1;
}

function retake() {
  idx.value = 0;
  score.value = 0;
  locked.value = false;
  picked.value = -1;
  finished.value = false;
  emit('retake');
}

function choiceClass(i, c) {
  if (!locked.value) return '';
  if (c.ok) return 'is-ok';
  if (picked.value === i) return 'is-bad';
  return '';
}

/** 揭晓行前缀：短 reveal 当名词，长 reveal 当释义 */
function revealPrefix(c) {
  const r = String(c?.reveal || '');
  if (!r) return '';
  if (r.length < 48 && !r.includes('。')) return '名词 · ';
  return '释义 · ';
}

function onKey(e) {
  if (finished.value || !total.value) return;
  const tag = e.target?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (!locked.value && !finished.value) {
    const map = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key in map) {
      e.preventDefault();
      pick(map[key]);
      return;
    }
  }
  if (locked.value && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    next();
  }
}

onMounted(() => {
  library.init();
  window.addEventListener('keydown', onKey);
});
onUnmounted(() => {
  window.removeEventListener('keydown', onKey);
});
</script>

<template>
  <section class="qplay" role="region" :aria-label="title">
    <header class="qplay__head">
      <h3 class="qplay__title">{{ title }}</h3>
      <p v-if="caption" class="qplay__caption">{{ caption }}</p>
      <div class="qplay__meter" aria-hidden="true">
        <div class="qplay__meter-fill" :style="{ width: `${progressPct}%` }" />
      </div>
      <p class="qplay__progress">
        {{ progressText }}
        <span v-if="!finished && total" class="qplay__keys">· 1–4 选题 · Enter 下一题</span>
      </p>
    </header>

    <div v-if="!total" class="qplay__empty">
      <p>本题池暂无题目。</p>
    </div>

    <div v-else-if="finished" class="qplay__done">
      <p class="qplay__score">答对 {{ score }} / {{ total }}</p>
      <p class="qplay__hint">错题已记入错题本（连续答对两次可标掌握）。可再测或换题组。</p>
      <button type="button" class="qplay__btn" @click="retake">再测一次</button>
    </div>

    <div v-else-if="current" class="qplay__stage">
      <p class="qplay__q">{{ current.q }}</p>
      <p v-if="attributionLine" class="qplay__attr">
        <span>{{ attributionLine }}</span>
        <a
          v-if="attributionHref"
          :href="attributionHref"
          target="_blank"
          rel="noopener noreferrer"
          class="qplay__attr-link"
        >来源</a>
      </p>
      <p v-if="!locked && hasRevealMeta" class="qplay__hint-inline">
        先判断再选；提交后会揭晓各选项对应的名词 / 释义。
      </p>
      <div class="qplay__choices" role="group" aria-label="选项">
        <button
          v-for="(c, i) in current.choices"
          :key="`${current.id}-${i}`"
          type="button"
          class="qplay__choice"
          :class="choiceClass(i, c)"
          :disabled="locked"
          :aria-keyshortcuts="`${i + 1} ${String.fromCharCode(65 + i)}`"
          @click="pick(i)"
        >
          <span class="qplay__letter">{{ String.fromCharCode(65 + i) }}.</span>
          <span class="qplay__choice-body">
            <span class="qplay__choice-text">{{ c.t }}</span>
            <span v-if="locked && c.reveal" class="qplay__choice-reveal">
              {{ revealPrefix(c) }}{{ c.reveal }}
            </span>
          </span>
        </button>
      </div>
      <p
        v-if="locked && picked >= 0"
        class="qplay__feedback"
        :class="current.choices[picked]?.ok ? 'is-ok' : 'is-bad'"
      >
        {{ feedbackText }}
      </p>
      <p v-if="correctBanner" class="qplay__reveal">
        {{ correctBanner }}
      </p>
      <div v-if="locked && currentRelated.length" class="qplay__related">
        <span class="qplay__related-label">回课</span>
        <button
          v-for="n in currentRelated"
          :key="n.id"
          type="button"
          class="qplay__related-chip"
          @click="emit('goto-learn', n.id)"
        >
          {{ n.label }}
        </button>
      </div>
      <button v-if="locked" type="button" class="qplay__btn" @click="next">
        {{ idx + 1 >= total ? '查看成绩' : '下一题' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.qplay {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.85rem 0.95rem 1rem;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--ink-3) 92%, transparent);
}

.qplay__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--node-title);
}

.qplay__caption,
.qplay__progress,
.qplay__hint,
.qplay__empty {
  margin: 0.25rem 0 0;
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--mist-dim);
}

.qplay__meter {
  margin-top: 0.55rem;
  height: 4px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--mist) 14%, transparent);
  overflow: hidden;
}

.qplay__meter-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 70%, #38bdf8),
    var(--accent)
  );
  transition: width 0.28s ease;
}

.qplay__keys {
  opacity: 0.85;
  font-size: 0.72rem;
}

.qplay__q {
  margin: 0 0 0.65rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--mist);
  font-weight: 600;
  white-space: pre-wrap;
}

.qplay__attr {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.55rem;
  margin: -0.25rem 0 0.55rem;
  font-size: 0.72rem;
  line-height: 1.4;
  color: #a16207;
}

.qplay__attr-link {
  color: inherit;
  font-weight: 650;
  text-underline-offset: 2px;
}

.qplay__choices {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.qplay__choice {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  width: 100%;
  text-align: left;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--panel-bg);
  color: var(--mist);
  cursor: pointer;
  font: inherit;
  line-height: 1.45;
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    transform 0.15s ease;
}

.qplay__choice:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
  transform: translateY(-1px);
}

.qplay__choice:disabled {
  cursor: default;
  opacity: 0.95;
}

.qplay__choice.is-ok {
  border-color: color-mix(in srgb, #22c55e 55%, var(--line));
  background: color-mix(in srgb, #22c55e 12%, var(--panel-bg));
}

.qplay__choice.is-bad {
  border-color: color-mix(in srgb, #ef4444 55%, var(--line));
  background: color-mix(in srgb, #ef4444 10%, var(--panel-bg));
}

.qplay__letter {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--mist-dim);
}

.qplay__choice-text {
  flex: 1;
  min-width: 0;
  white-space: normal;
  overflow-wrap: anywhere;
}

.qplay__choice-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.qplay__choice-reveal {
  font-size: 0.78rem;
  font-weight: 650;
  line-height: 1.4;
  color: var(--node-title);
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  background: color-mix(in srgb, var(--amber) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--amber) 28%, transparent);
}

.qplay__hint-inline {
  margin: 0 0 0.55rem;
  font-size: 0.74rem;
  color: var(--mist-dim);
  line-height: 1.4;
}

.qplay__feedback {
  margin: 0.55rem 0 0;
  font-size: 0.82rem;
  line-height: 1.45;
}

.qplay__feedback.is-ok {
  color: #16a34a;
}

.qplay__feedback.is-bad {
  color: #dc2626;
}

.qplay__reveal {
  margin: 0.35rem 0 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--node-title);
  font-weight: 600;
}

.qplay__related {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.55rem;
}

.qplay__related-label {
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--mist-dim);
}

.qplay__related-chip {
  font: inherit;
  font-size: 0.74rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--amber) 40%, var(--line));
  background: transparent;
  color: var(--amber);
  cursor: pointer;
}

.qplay__related-chip:hover {
  background: color-mix(in srgb, var(--amber) 12%, transparent);
}

.qplay__score {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--node-title);
}

.qplay__btn {
  margin-top: 0.55rem;
  align-self: flex-start;
  padding: 0.45rem 0.9rem;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--line));
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.qplay__btn:hover {
  background: color-mix(in srgb, var(--accent) 22%, transparent);
}

.qplay__done {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

@media (prefers-reduced-motion: reduce) {
  .qplay__meter-fill,
  .qplay__choice {
    transition: none;
  }
}
</style>
