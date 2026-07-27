<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue';
import { createShellSession } from '../labs/shell-engine.js';

const props = defineProps({
  /** @type {import('vue').PropType<import('../labs/shell-engine.js').ShellConfig>} */
  config: {
    type: Object,
    default: () => ({}),
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const inputId = useId();
const session = ref(createShellSession(props.config));
/** @type {import('vue').Ref<Array<{ kind: 'in'|'out'|'sys'|'err', text: string }>>} */
const lines = ref([]);
const input = ref('');
const history = ref([]);
const histIdx = ref(-1);
const screenEl = ref(null);
const inputEl = ref(null);
const busy = ref(false);
const autoLabel = ref('');
let gen = 0;

const prompt = computed(() => session.value.prompt);
const title = computed(() => session.value.title);
const badge = computed(() => session.value.badge || '模拟 · 不上网');
const environment = computed(() => session.value.environment || '');
const hints = computed(() => session.value.hintCommands || []);

watch(
  () => props.config,
  (cfg) => {
    session.value = createShellSession(cfg || {});
    boot();
  },
  { deep: true }
);

function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function resetWelcome() {
  lines.value = (session.value.welcome || []).map((text) => ({
    kind: 'sys',
    text,
  }));
  input.value = '';
  history.value = [];
  histIdx.value = -1;
  autoLabel.value = '';
}

async function scrollBottom() {
  await nextTick();
  if (screenEl.value) screenEl.value.scrollTop = screenEl.value.scrollHeight;
}

function focusInput() {
  if (!busy.value) inputEl.value?.focus();
}

function classifyOut(text) {
  if (/^fatal:|error:|ERR!/i.test(text) || text.includes("Couldn't connect")) {
    return 'err';
  }
  return 'out';
}

function applyResult(result) {
  if (result.clear) {
    lines.value = [];
    return;
  }
  for (const out of result.lines) {
    lines.value.push({ kind: classifyOut(out), text: out });
  }
}

function runLine(raw, { recordHistory = true } = {}) {
  const text = String(raw ?? '').trimEnd();
  if (!text.trim()) return;
  lines.value.push({ kind: 'in', text: `${session.value.prompt}${text}` });
  if (recordHistory) {
    history.value.push(text);
    histIdx.value = history.value.length;
  }
  const result = session.value.exec(text);
  applyResult(result);
  input.value = '';
  scrollBottom();
}

function sleep(ms, g) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      if (g === gen) resolve();
    }, ms);
  });
}

/** 自动演示节奏：偏快，仍保留「在打字」的感觉 */
const TYPE_MS = 7;
const TYPE_SPACE_EXTRA = 4;
const TYPE_COMMIT_MS = 70;
const AUTO_GAP_DEFAULT = 160;

async function typeAndRun(cmd, g) {
  const reduced = prefersReducedMotion();
  input.value = '';
  autoLabel.value = '自动输入中…';
  if (reduced) {
    input.value = cmd;
    await sleep(40, g);
  } else {
    // 打字时不 scroll：内容还没变，逐字 nextTick 会拖慢整窗
    for (let i = 0; i < cmd.length; i++) {
      if (g !== gen) return;
      input.value = cmd.slice(0, i + 1);
      await sleep(TYPE_MS + (cmd[i] === ' ' ? TYPE_SPACE_EXTRA : 0), g);
    }
    await sleep(TYPE_COMMIT_MS, g);
  }
  if (g !== gen) return;
  runLine(cmd);
  autoLabel.value = '';
}

async function playAuto(list) {
  const cmds = (list || []).map(String).filter(Boolean);
  if (!cmds.length) return;
  const g = ++gen;
  busy.value = true;
  const gap = session.value.autoPlayDelay || AUTO_GAP_DEFAULT;
  for (const cmd of cmds) {
    if (g !== gen) return;
    await typeAndRun(cmd, g);
    await sleep(gap, g);
  }
  if (g === gen) {
    busy.value = false;
    autoLabel.value = '自动演示结束 · 可继续手打';
    focusInput();
  }
}

async function boot() {
  gen += 1;
  busy.value = false;
  resetWelcome();
  await scrollBottom();
  const list = session.value.autoPlay || [];
  if (list.length) {
    await nextTick();
    playAuto(list);
  } else {
    focusInput();
  }
}

function onSubmit(e) {
  e?.preventDefault?.();
  if (busy.value) return;
  runLine(input.value);
}

function onKeydown(e) {
  if (busy.value) {
    e.preventDefault();
    return;
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (!history.value.length) return;
    histIdx.value = Math.max(0, histIdx.value - 1);
    input.value = history.value[histIdx.value] || '';
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!history.value.length) return;
    histIdx.value = Math.min(history.value.length, histIdx.value + 1);
    input.value =
      histIdx.value >= history.value.length ? '' : history.value[histIdx.value] || '';
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const cur = input.value.trim();
    const hit = hints.value.find((h) => h.startsWith(cur) && h !== cur);
    if (hit) input.value = hit;
  } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    lines.value = [];
  }
}

async function useHint(cmd) {
  if (busy.value) return;
  const g = ++gen;
  busy.value = true;
  await typeAndRun(cmd, g);
  if (g === gen) {
    busy.value = false;
    focusInput();
  }
}

function replayAuto() {
  boot();
}

function stopAuto() {
  gen += 1;
  busy.value = false;
  autoLabel.value = '已停止自动输入';
  focusInput();
}

onMounted(() => {
  boot();
});

onUnmounted(() => {
  gen += 1;
});
</script>

<template>
  <section
    class="lesson-shell"
    :class="{
      'lesson-shell--compact': compact,
      'lesson-shell--busy': busy,
    }"
    role="region"
    :aria-label="title"
    @click="focusInput"
  >
    <header class="lesson-shell__head">
      <span class="lesson-shell__dots" aria-hidden="true">
        <i class="lesson-shell__dot lesson-shell__dot--r" />
        <i class="lesson-shell__dot lesson-shell__dot--y" />
        <i class="lesson-shell__dot lesson-shell__dot--g" />
      </span>
      <span class="lesson-shell__title">{{ title }}</span>
      <span
        v-if="environment"
        class="lesson-shell__env"
        :title="'模拟环境方言：' + environment"
      >{{ environment }}</span>
      <span class="lesson-shell__badge" title="不会访问真实网络或磁盘">{{ badge }}</span>
      <button
        v-if="busy"
        type="button"
        class="lesson-shell__btn"
        @click.stop="stopAuto"
      >
        跳过
      </button>
      <button type="button" class="lesson-shell__btn" @click.stop="replayAuto">
        重播
      </button>
    </header>

    <div v-if="hints.length" class="lesson-shell__hints" @click.stop>
      <button
        v-for="h in hints"
        :key="h"
        type="button"
        class="lesson-shell__chip"
        :disabled="busy"
        @click="useHint(h)"
      >
        {{ h }}
      </button>
    </div>

    <p v-if="autoLabel" class="lesson-shell__status">{{ autoLabel }}</p>

    <div ref="screenEl" class="lesson-shell__screen" aria-live="polite">
      <div
        v-for="(line, i) in lines"
        :key="i"
        class="lesson-shell__line"
        :class="`lesson-shell__line--${line.kind}`"
      >
        {{ line.text }}
      </div>
      <form class="lesson-shell__form" @submit="onSubmit">
        <label class="lesson-shell__prompt" :for="inputId">{{ prompt }}</label>
        <input
          :id="inputId"
          ref="inputEl"
          v-model="input"
          class="lesson-shell__input"
          type="text"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          :readonly="busy"
          aria-label="输入命令（模拟）"
          @keydown="onKeydown"
        />
        <span v-if="busy" class="lesson-shell__caret" aria-hidden="true" />
      </form>
    </div>

    <p class="lesson-shell__foot">
      假终端 · 点芯片自动打字执行 · ↑↓ 历史 · Tab 补全 · Ctrl+L 清屏 ·
      <strong>真实 clone 请用本机终端</strong>
    </p>
  </section>
</template>

<style scoped>
.lesson-shell {
  --sh-bg: #071018;
  --sh-fg: #e8eef6;
  --sh-dim: #7f91a8;
  --sh-accent: #3dd68c;
  --sh-prompt: #5eead4;
  --sh-err: #fb7185;
  --sh-warn: #fbbf24;
  margin: 1.15rem 0 1.4rem;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  background:
    radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, #0ea5e9 18%, transparent), transparent 50%),
    radial-gradient(90% 60% at 0% 100%, color-mix(in srgb, #34d399 12%, transparent), transparent 45%),
    var(--sh-bg);
  color: var(--sh-fg);
  font-family: var(--font-mono);
  box-shadow:
    var(--shadow-sm),
    0 0 0 1px color-mix(in srgb, #fff 4%, transparent) inset;
}

.lesson-shell--compact .lesson-shell__screen {
  min-height: 12rem;
  max-height: 18rem;
}

.lesson-shell--busy {
  outline: 1px solid color-mix(in srgb, var(--sh-accent) 35%, transparent);
}

.lesson-shell__head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.58rem 0.8rem;
  background: color-mix(in srgb, #000 42%, transparent);
  border-bottom: 1px solid color-mix(in srgb, #fff 8%, transparent);
  flex-wrap: wrap;
}

.lesson-shell__dots {
  display: inline-flex;
  gap: 0.35rem;
}

.lesson-shell__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  display: inline-block;
}

.lesson-shell__dot--r {
  background: #f87171;
}
.lesson-shell__dot--y {
  background: #fbbf24;
}
.lesson-shell__dot--g {
  background: #34d399;
}

.lesson-shell__title {
  flex: 1;
  min-width: 6rem;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--sh-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-shell__badge {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  color: var(--sh-warn);
  background: color-mix(in srgb, var(--sh-warn) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--sh-warn) 40%, transparent);
  white-space: nowrap;
}

.lesson-shell__env {
  font-size: 0.66rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  color: var(--sh-prompt);
  background: color-mix(in srgb, var(--sh-prompt) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--sh-prompt) 35%, transparent);
  white-space: nowrap;
  max-width: 14rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-shell__btn {
  appearance: none;
  border: 1px solid color-mix(in srgb, #fff 16%, transparent);
  background: color-mix(in srgb, #fff 6%, transparent);
  color: var(--sh-fg);
  font: inherit;
  font-size: 0.72rem;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  cursor: pointer;
}

.lesson-shell__btn:hover {
  background: color-mix(in srgb, var(--sh-accent) 22%, transparent);
}

.lesson-shell__hints {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0.55rem 0.75rem 0.2rem;
  border-bottom: 1px solid color-mix(in srgb, #fff 6%, transparent);
}

.lesson-shell__chip {
  appearance: none;
  border: 1px solid color-mix(in srgb, var(--sh-prompt) 35%, transparent);
  background: color-mix(in srgb, var(--sh-prompt) 12%, transparent);
  color: var(--sh-prompt);
  font: inherit;
  font-size: 0.66rem;
  padding: 0.2rem 0.48rem;
  border-radius: 7px;
  cursor: pointer;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background 0.15s ease, transform 0.15s ease;
}

.lesson-shell__chip:hover:not(:disabled) {
  background: color-mix(in srgb, var(--sh-prompt) 24%, transparent);
  transform: translateY(-1px);
}

.lesson-shell__chip:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.lesson-shell__status {
  margin: 0;
  padding: 0.35rem 0.85rem;
  font-size: 0.7rem;
  color: var(--sh-accent);
  background: color-mix(in srgb, var(--sh-accent) 10%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--sh-accent) 22%, transparent);
}

.lesson-shell__screen {
  min-height: 15rem;
  max-height: 24rem;
  overflow: auto;
  padding: 0.9rem 1rem 0.55rem;
  font-size: 0.78rem;
  line-height: 1.55;
  background-image: linear-gradient(
    to bottom,
    transparent 50%,
    color-mix(in srgb, #000 11%, transparent) 50%
  );
  background-size: 100% 3px;
}

.lesson-shell__line {
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0 0 0.28rem;
}

.lesson-shell__line--sys {
  color: var(--sh-dim);
}

.lesson-shell__line--in {
  color: var(--sh-fg);
}

.lesson-shell__line--out {
  color: #b9c7d8;
}

.lesson-shell__line--err {
  color: var(--sh-err);
}

.lesson-shell__form {
  display: flex;
  align-items: baseline;
  gap: 0;
  margin-top: 0.4rem;
}

.lesson-shell__prompt {
  color: var(--sh-prompt);
  white-space: pre;
  user-select: none;
  flex-shrink: 0;
}

.lesson-shell__input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--sh-fg);
  font: inherit;
  padding: 0;
  caret-color: var(--sh-accent);
}

.lesson-shell__input:read-only {
  caret-color: transparent;
}

.lesson-shell__caret {
  display: inline-block;
  width: 0.55ch;
  height: 1.05em;
  margin-left: 0.05ch;
  background: var(--sh-accent);
  animation: shell-caret 0.9s steps(1) infinite;
}

@keyframes shell-caret {
  50% {
    opacity: 0;
  }
}

.lesson-shell__foot {
  margin: 0;
  padding: 0.5rem 0.9rem 0.6rem;
  font-size: 0.68rem;
  color: var(--sh-dim);
  border-top: 1px solid color-mix(in srgb, #fff 6%, transparent);
  background: color-mix(in srgb, #000 28%, transparent);
  line-height: 1.45;
}

.lesson-shell__foot strong {
  color: var(--sh-warn);
  font-weight: 650;
}

@media (prefers-reduced-motion: reduce) {
  .lesson-shell__screen {
    background-image: none;
  }
  .lesson-shell__caret {
    animation: none;
  }
  .lesson-shell__chip {
    transition: none;
  }
}
</style>
