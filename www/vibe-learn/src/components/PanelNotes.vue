<script setup>
/**
 * 讲解面板底部常驻笔记区 — 边读边记，自动落盘本机
 */
import { computed, onUnmounted, ref, watch } from 'vue';
import { useUserLibrary } from '../composables/useUserLibrary.js';

const props = defineProps({
  nodeId: { type: String, default: '' },
});

const library = useUserLibrary();
const draft = ref('');
const saved = ref(true);
const expanded = ref(false);
/** @type {ReturnType<typeof setTimeout> | null} */
let timer = null;

const charCount = computed(() => draft.value.length);
const statusLabel = computed(() => {
  if (!saved.value) return '正在写入本机…';
  if (!draft.value.trim()) return '未写内容 · 不会占用书架';
  return '已同步到本机书架';
});

watch(
  () => props.nodeId,
  (id) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    draft.value = id ? library.noteOf(id) : '';
    saved.value = true;
    expanded.value = Boolean(draft.value.trim());
  },
  { immediate: true }
);

function flush(id, body) {
  return library.saveNote(id, body);
}

function onInput() {
  saved.value = false;
  if (timer) clearTimeout(timer);
  const id = props.nodeId;
  const body = draft.value;
  timer = setTimeout(async () => {
    timer = null;
    if (!id) return;
    await flush(id, body);
    if (props.nodeId === id) saved.value = true;
  }, 420);
}

function onBlur() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (!props.nodeId || saved.value) return;
  flush(props.nodeId, draft.value).then(() => {
    saved.value = true;
  });
}

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <section
    class="note-dock"
    :class="{ 'is-expanded': expanded, 'has-content': Boolean(draft.trim()) }"
    aria-label="我的笔记"
  >
    <div class="note-dock__bar">
      <button
        type="button"
        class="note-dock__toggle"
        :aria-expanded="expanded"
        @click="expanded = !expanded"
      >
        <span class="note-dock__glyph" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 2.5h7.2L13.5 5.3v8.2a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              stroke-width="1.3"
            />
            <path d="M10.5 2.5V5h2.8" stroke="currentColor" stroke-width="1.3" />
            <path d="M5 8.2h6M5 10.8h4.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
          </svg>
        </span>
        <span class="note-dock__title">我的笔记</span>
        <span class="note-dock__hint">本机保存 · rebuild 不丢</span>
        <span class="note-dock__chev" aria-hidden="true">{{ expanded ? '收起' : '展开' }}</span>
      </button>
      <span class="note-dock__status" :data-state="saved ? 'ok' : 'busy'">
        <span class="note-dock__dot" aria-hidden="true" />
        {{ statusLabel }}
      </span>
    </div>

    <div v-show="expanded" class="note-dock__body">
      <textarea
        v-model="draft"
        class="note-dock__input"
        rows="4"
        placeholder="边读边记：要点、疑问、面试答法、对照自己项目的例子…"
        @input="onInput"
        @blur="onBlur"
        @focus="expanded = true"
      />
      <div class="note-dock__meta">
        <span>{{ charCount }} 字</span>
        <span>自动保存到 IndexedDB</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.note-dock {
  flex-shrink: 0;
  border-top: 1px solid var(--line);
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--accent) 6%, var(--panel-bg)) 0%,
      var(--panel-bg) 42%
    );
  box-shadow: 0 -8px 24px rgba(15, 23, 42, 0.04);
}

[data-theme='dark'] .note-dock {
  box-shadow: 0 -8px 28px rgba(0, 0, 0, 0.28);
}

.note-dock__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem 0.3rem;
}

.note-dock__toggle {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
  padding: 0.1rem 0;
  border: 0;
  background: transparent;
  color: var(--node-title);
  cursor: pointer;
  text-align: left;
}

.note-dock__glyph {
  display: grid;
  place-items: center;
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 7px;
  color: var(--signal);
  background: var(--accent-soft);
  flex-shrink: 0;
}

.note-dock.has-content .note-dock__glyph {
  color: #fff;
  background: var(--accent);
}

.note-dock__title {
  font-size: 0.78rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.note-dock__hint {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  color: var(--mist-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-dock__chev {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--accent);
  margin-left: 0.15rem;
}

.note-dock__status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--mist-dim);
}

.note-dock__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mist-dim);
  opacity: 0.55;
}

.note-dock__status[data-state='ok'] .note-dock__dot {
  background: #22c55e;
  opacity: 1;
}

.note-dock__status[data-state='busy'] .note-dock__dot {
  background: var(--amber);
  opacity: 1;
  animation: note-pulse 0.9s ease infinite;
}

@keyframes note-pulse {
  50% {
    transform: scale(0.7);
    opacity: 0.45;
  }
}

.note-dock__body {
  padding: 0 0.85rem 0.65rem;
  animation: note-open 0.2s ease;
}

@keyframes note-open {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.note-dock__input {
  width: 100%;
  resize: vertical;
  min-height: 5.5rem;
  max-height: 32vh;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--line));
  background:
    repeating-linear-gradient(
      transparent,
      transparent 27px,
      color-mix(in srgb, var(--mist) 6%, transparent) 28px
    ),
    var(--ink);
  color: var(--mist);
  font-size: 0.9rem;
  line-height: 1.75;
  font-family: inherit;
  box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 35%, transparent);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

[data-theme='dark'] .note-dock__input {
  background:
    repeating-linear-gradient(
      transparent,
      transparent 27px,
      color-mix(in srgb, #fff 5%, transparent) 28px
    ),
    var(--ink-2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.note-dock__input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow:
    0 0 0 3px var(--accent-soft),
    inset 0 1px 0 color-mix(in srgb, #fff 35%, transparent);
}

.note-dock__input::placeholder {
  color: var(--mist-dim);
  opacity: 0.85;
}

.note-dock__meta {
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
  padding: 0 0.15rem;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--mist-dim);
}

@media (max-width: 520px) {
  .note-dock__hint {
    display: none;
  }

  .note-dock__status {
    max-width: 7.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
