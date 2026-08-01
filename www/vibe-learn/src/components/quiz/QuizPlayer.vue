<script setup>
/**
 * 刷题播放器：选项区可滚、底栏固定；解析槽预留三行防抖动，超出槽内滚
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
  finished.value ? '完成' : total.value ? `${idx.value + 1}/${total.value}` : '无题'
);
const progressPct = computed(() => {
  if (!total.value) return 0;
  if (finished.value) return 100;
  return Math.round((idx.value / total.value) * 100);
});
const currentRelated = computed(() => resolveNodes(current.value?.relatedNodes || []));
const pickedOk = computed(() => {
  if (!locked.value || picked.value < 0) return null;
  return Boolean(current.value?.choices?.[picked.value]?.ok);
});
const attributionLine = computed(() => {
  const q = current.value;
  if (!q || q.origin !== 'adapted') return '';
  return `改编自 ${q.attribution || '公开开源题库'}`;
});
const attributionHref = computed(() => current.value?.attributionUrl || '');
const nextLabel = computed(() =>
  idx.value + 1 >= total.value ? '查看成绩' : '下一题'
);
const verdictText = computed(() => {
  if (pickedOk.value === true) return '答对了';
  if (pickedOk.value === false) return '答错了';
  return '选一项作答';
});

async function pick(i) {
  if (locked.value || finished.value || !current.value) return;
  if (i < 0 || i >= (current.value.choices?.length || 0)) return;
  locked.value = true;
  picked.value = i;
  const ok = Boolean(current.value.choices[i]?.ok);
  if (ok) score.value += 1;
  try {
    await library.recordQuizAnswer(current.value.id, { ok, choiceIndex: i });
  } catch {
    /* ignore */
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
  if (c.ok) return picked.value === i ? 'is-ok is-picked' : 'is-ok';
  if (picked.value === i) return 'is-bad is-picked';
  return '';
}

/** @param {{ reveal?: string, why?: string, ok?: boolean }} c */
function choiceNotes(c) {
  const lines = [];
  const r = String(c?.reveal || '').trim();
  if (r) {
    lines.push((r.length < 48 && !r.includes('。') ? '名词 · ' : '释义 · ') + r);
  }
  lines.push(String(c?.why || '').trim() || (c?.ok ? '正确项。' : '干扰项。'));
  return lines;
}

function onKey(e) {
  if (finished.value || !total.value) return;
  const tag = e.target?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (!locked.value) {
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
      <div class="qplay__head-main">
        <div class="qplay__titles">
          <h3 class="qplay__title">{{ title }}</h3>
          <p v-if="caption" class="qplay__caption">{{ caption }}</p>
        </div>
        <p class="qplay__progress">
          <strong>{{ progressText }}</strong>
          <span v-if="!finished && total" class="qplay__keys">1–4 · Enter</span>
        </p>
      </div>
      <div class="qplay__meter" aria-hidden="true">
        <div class="qplay__meter-fill" :style="{ width: `${progressPct}%` }" />
      </div>
    </header>

    <div v-if="!total" class="qplay__empty">
      <p>本题池暂无题目。</p>
    </div>

    <div v-else-if="finished" class="qplay__done">
      <p class="qplay__score">答对 {{ score }} / {{ total }}</p>
      <p class="qplay__hint">错题已记入错题本（连续答对两次可标掌握）。</p>
      <button type="button" class="qplay__btn qplay__btn--solid" @click="retake">
        再测一次
      </button>
    </div>

    <div
      v-else-if="current"
      class="qplay__stage"
      :class="{ 'is-locked': locked }"
    >
      <div class="qplay__scroll">
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
            <span class="qplay__letter">{{ String.fromCharCode(65 + i) }}</span>
            <span class="qplay__choice-body">
              <span class="qplay__choice-text">{{ c.t }}</span>
              <span
                class="qplay__note"
                :class="{ 'is-on': locked }"
                :title="locked ? choiceNotes(c).join('\n') : undefined"
                aria-live="polite"
              >
                <span
                  v-for="(line, j) in locked ? choiceNotes(c) : []"
                  :key="`${current.id}-n-${i}-${j}`"
                  class="qplay__note-line"
                >{{ line }}</span>
              </span>
            </span>
          </button>
        </div>
      </div>

      <footer class="qplay__foot">
        <div class="qplay__foot-row">
          <p
            class="qplay__verdict"
            :class="{
              'is-ok': pickedOk === true,
              'is-bad': pickedOk === false,
              'is-idle': pickedOk == null,
            }"
          >
            {{ verdictText }}
          </p>
          <button
            type="button"
            class="qplay__btn qplay__btn--solid"
            :disabled="!locked"
            @click="next"
          >
            {{ nextLabel }}
          </button>
        </div>
        <div class="qplay__related" :class="{ 'is-on': locked && currentRelated.length }">
          <template v-if="currentRelated.length">
            <span class="qplay__related-label">回课</span>
            <button
              v-for="n in currentRelated"
              :key="n.id"
              type="button"
              class="qplay__related-chip"
              :tabindex="locked ? 0 : -1"
              @click="emit('goto-learn', n.id)"
            >
              {{ n.label }}
            </button>
          </template>
        </div>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.qplay {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-height: 0;
  /* dvh：移动端地址栏伸缩时更稳；上限略抬高以容纳完整解析 */
  max-height: min(86dvh, 52rem);
  padding: 0.8rem 0.9rem 0.85rem;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--ink-3) 92%, transparent);
}

.qplay__head {
  flex-shrink: 0;
}

.qplay__head-main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.65rem;
}

.qplay__titles {
  min-width: 0;
}

.qplay__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1.3;
  color: var(--node-title);
}

.qplay__caption,
.qplay__hint,
.qplay__empty {
  margin: 0.2rem 0 0;
  font-size: 0.76rem;
  line-height: 1.4;
  color: var(--mist-dim);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.qplay__progress {
  margin: 0;
  flex-shrink: 0;
  font-size: 0.8rem;
  line-height: 1.3;
  color: var(--mist-dim);
  white-space: nowrap;
}

.qplay__progress strong {
  color: var(--node-title);
  font-variant-numeric: tabular-nums;
}

.qplay__meter {
  margin-top: 0.35rem;
  height: 3px;
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
  margin-left: 0.3rem;
  opacity: 0.8;
  font-size: 0.66rem;
}

.qplay__stage {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.qplay__scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding-bottom: 0.35rem;
  scrollbar-width: thin;
}

.qplay__q {
  margin: 0;
  flex: 0 0 auto;
  font-size: 0.98rem;
  line-height: 1.5;
  color: var(--mist);
  font-weight: 600;
  white-space: pre-wrap;
}

.qplay__attr {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  font-size: 0.68rem;
  color: #a16207;
}

.qplay__attr-link {
  color: inherit;
  font-weight: 650;
}

.qplay__choices {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 0.35rem;
}

.qplay__choice {
  display: grid;
  grid-template-columns: 1.15rem minmax(0, 1fr);
  gap: 0.35rem 0.4rem;
  width: 100%;
  flex: 0 0 auto;
  align-content: start;
  text-align: left;
  padding: 0.42rem 0.55rem;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--panel-bg);
  color: var(--mist);
  cursor: pointer;
  font: inherit;
  line-height: 1.35;
  transition:
    border-color 0.12s ease,
    background 0.12s ease;
}

.qplay__choice:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
}

.qplay__choice:disabled {
  cursor: default;
}

.qplay__choice.is-ok {
  border-color: color-mix(in srgb, #22c55e 55%, var(--line));
  background: color-mix(in srgb, #22c55e 12%, var(--panel-bg));
}

.qplay__choice.is-bad {
  border-color: color-mix(in srgb, #ef4444 55%, var(--line));
  background: color-mix(in srgb, #ef4444 10%, var(--panel-bg));
}

.qplay__choice.is-picked {
  box-shadow: inset 2px 0 0 currentColor;
}

.qplay__choice.is-ok.is-picked {
  box-shadow: inset 2px 0 0 #16a34a;
}

.qplay__choice.is-bad.is-picked {
  box-shadow: inset 2px 0 0 #dc2626;
}

.qplay__letter {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--mist-dim);
  line-height: 1.5;
}

.qplay__choice-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.qplay__choice-text {
  font-size: 0.88rem;
  overflow-wrap: anywhere;
}

/* 预留三行；超出槽内滚，防抖动 */
.qplay__note {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin: 0.1rem 0 0;
  min-width: 0;
  height: calc(3 * 1.3em);
  overflow: hidden;
  font-size: 0.7rem;
  line-height: 1.3;
  color: var(--mist-dim);
  opacity: 0;
  pointer-events: none;
}

.qplay__note.is-on {
  opacity: 1;
  pointer-events: auto;
  overflow-y: auto;
  scrollbar-width: thin;
}

.qplay__note-line {
  overflow-wrap: anywhere;
}

.qplay__choice.is-ok .qplay__note.is-on {
  color: color-mix(in srgb, #15803d 78%, var(--mist));
}

.qplay__choice.is-bad .qplay__note.is-on {
  color: color-mix(in srgb, #b91c1c 72%, var(--mist));
}

/* 底栏固定：始终占位，不随作答插入 */
.qplay__foot {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-top: 0.55rem;
  border-top: 1px solid color-mix(in srgb, var(--mist) 12%, transparent);
  background: color-mix(in srgb, var(--ink-3) 96%, transparent);
}

.qplay__foot-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 2.4rem;
}

.qplay__verdict {
  margin: 0;
  min-width: 0;
  font-size: 0.88rem;
  font-weight: 650;
  line-height: 1.35;
}

.qplay__verdict.is-idle {
  color: var(--mist-dim);
  font-weight: 500;
}

.qplay__verdict.is-ok {
  color: #16a34a;
}

.qplay__verdict.is-bad {
  color: #dc2626;
}

/* 底栏回课条始终预留一行，避免作答后脚部上跳 */
.qplay__related {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.35rem;
  height: 1.75rem;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.qplay__related.is-on {
  opacity: 1;
  pointer-events: auto;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
}

.qplay__related-label {
  flex-shrink: 0;
  font-size: 0.66rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--mist-dim);
}

.qplay__related-chip {
  flex: 0 1 auto;
  max-width: min(100%, 14rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: inherit;
  font-size: 0.74rem;
  padding: 0.18rem 0.55rem;
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
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--node-title);
}

.qplay__btn {
  flex-shrink: 0;
  height: 2.4rem;
  padding: 0 1rem;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--mist-dim);
  font: inherit;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
}

.qplay__btn--solid {
  border-color: color-mix(in srgb, var(--accent) 40%, var(--line));
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
}

.qplay__btn--solid:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qplay__btn--solid:hover:not(:disabled) {
  background: color-mix(in srgb, var(--accent) 22%, transparent);
}

.qplay__done {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-top: 0.35rem;
}

@media (prefers-reduced-motion: reduce) {
  .qplay__meter-fill {
    transition: none;
  }
}

@media (max-width: 640px) {
  .qplay {
    max-height: min(92dvh, 100%);
    padding: 0.65rem 0.7rem 0.7rem;
    gap: 0.4rem;
  }

  .qplay__q {
    font-size: 0.92rem;
  }

  .qplay__choice {
    padding: 0.38rem 0.5rem;
  }

  .qplay__choice-text {
    font-size: 0.84rem;
  }

  .qplay__keys {
    display: none;
  }

  .qplay__btn {
    height: 2.2rem;
    padding: 0 0.85rem;
  }
}
</style>
