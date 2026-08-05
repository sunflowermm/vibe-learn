<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import NetworkLab from './NetworkLab.vue';
import LessonShell from './LessonShell.vue';
import LessonBody from './LessonBody.vue';
import PanelNotes from './PanelNotes.vue';
import TermsBlock from './TermsBlock.vue';
import { useUserLibrary } from '../composables/useUserLibrary.js';
import { resolveNodes } from '../data/nodes.js';
import { questionsForNode, isGlossaryQuestion } from '../data/quiz/bank.js';
import { SHELL_PRESETS } from '../labs/shell-presets.js';

const props = defineProps({
  node: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'navigate', 'quiz', 'open-glossary']);

const library = useUserLibrary();
const scrollEl = ref(null);
const titleEl = ref(null);

const showLab = computed(() => props.node?.lab === 'osi');
const shellLabConfig = computed(() => {
  const lab = props.node?.lab;
  if (lab === 'linux-shell') return SHELL_PRESETS['linux-cli'];
  if (lab === 'env-proxy-shell') return SHELL_PRESETS['env-proxy'];
  if (lab === 'path-shell') return SHELL_PRESETS['path-check'];
  if (lab === 'pnpm-shell') return SHELL_PRESETS['pnpm-demo'];
  if (lab === 'docker-shell') return SHELL_PRESETS['docker-basics'];
  if (lab === 'redis-shell') return SHELL_PRESETS['redis-ping'];
  if (lab === 'dotfiles-shell') return SHELL_PRESETS['dotfiles'];
  return null;
});
const prereqNodes = computed(() => resolveNodes(props.node?.prereqs));
const nextNodes = computed(() => resolveNodes(props.node?.next));
const extendNodes = computed(() =>
  resolveNodes([...(props.node?.chapterOut || []), ...(props.node?.sideOut || [])])
);
const mapLinks = computed(() =>
  Array.isArray(props.node?.mapLinks) ? props.node.mapLinks : []
);
const bookmarked = computed(() =>
  props.node?.id ? library.isBookmarked(props.node.id) : false
);
const hasNote = computed(() =>
  props.node?.id ? Boolean(library.noteOf(props.node.id).trim()) : false
);
const learned = computed(() =>
  props.node?.id ? library.isLearned(props.node.id) : false
);
const primaryNext = computed(() => nextNodes.value[0] || null);
const relatedQs = computed(() =>
  props.node?.id ? questionsForNode(props.node.id) : []
);
const relatedQuizCount = computed(() => relatedQs.value.length);
/** 词典落盘题（g:…），一词可有 term/def 多道，≠ 专有名词条数 */
const relatedGlossaryCount = computed(() =>
  relatedQs.value.filter((q) => isGlossaryQuestion(q)).length
);
const relatedAdaptedCount = computed(() =>
  relatedQs.value.filter((q) => q.origin === 'adapted').length
);

function chipLearned(id) {
  return library.isLearned(id);
}

watch(
  () => props.node?.id,
  async () => {
    await nextTick();
    if (scrollEl.value) scrollEl.value.scrollTop = 0;
    titleEl.value?.focus({ preventScroll: true });
  }
);

function onToggleBookmark() {
  if (props.node?.id) library.toggleBookmark(props.node.id);
}

function onToggleLearned() {
  if (props.node?.id) library.toggleLearned(props.node.id);
}

function openRelatedQuiz() {
  if (props.node?.id && relatedQuizCount.value) emit('quiz', props.node.id);
}
</script>

<template>
  <div v-if="node" class="panel" role="article" :aria-labelledby="`panel-title-${node.id}`">
    <header class="panel__head">
      <div class="panel__head-text">
        <div class="panel__meta-row">
          <p class="panel__tag">{{ node.tag }}</p>
          <span v-if="hasNote" class="panel__chip-soft">有笔记</span>
          <span v-if="learned" class="panel__chip-soft panel__chip-soft--learned">已学</span>
        </div>
        <h2
          :id="`panel-title-${node.id}`"
          ref="titleEl"
          class="panel__title"
          tabindex="-1"
        >
          {{ node.label }}
        </h2>
        <p class="panel__sub">{{ node.subtitle }}</p>
      </div>
      <div class="panel__head-actions">
        <button
          type="button"
          class="panel__icon-btn"
          :class="{ active: learned }"
          :aria-pressed="learned"
          :aria-label="learned ? '取消已学标记' : '标记为已学'"
          :title="learned ? '取消已学' : '自己标记已学（足迹不算）'"
          @click="onToggleLearned"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.25" />
            <path
              d="M4.9 8.1l2.1 2.1 4.2-4.3"
              stroke="currentColor"
              stroke-width="1.35"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          class="panel__icon-btn"
          :class="{ active: bookmarked }"
          :aria-pressed="bookmarked"
          :aria-label="bookmarked ? '取消收藏' : '收藏到书架'"
          :title="bookmarked ? '取消收藏' : '收藏到本机书架'"
          @click="onToggleBookmark"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M8 1.8l1.7 3.5 3.8.55-2.75 2.7.65 3.8L8 10.6l-3.4 1.75.65-3.8L2.5 5.85l3.8-.55L8 1.8z"
              :fill="bookmarked ? 'currentColor' : 'none'"
              stroke="currentColor"
              stroke-width="1.25"
            />
          </svg>
        </button>
        <button
          class="panel__icon-btn panel__icon-btn--ghost"
          type="button"
          aria-label="关闭讲解面板"
          title="Esc"
          @click="emit('close')"
        >
          <span class="panel__esc">Esc</span>
        </button>
      </div>
    </header>

    <div ref="scrollEl" class="panel__scroll">
      <p v-if="node.role" class="panel__role">{{ node.role }}</p>

      <nav
        v-if="prereqNodes.length || nextNodes.length || extendNodes.length || mapLinks.length"
        class="panel__nav"
        aria-label="相关节点"
      >
        <div v-if="prereqNodes.length" class="panel__nav-row">
          <span class="panel__nav-label">建议先学</span>
          <button
            v-for="n in prereqNodes"
            :key="n.id"
            type="button"
            class="panel__chip"
            :class="{ 'is-learned': chipLearned(n.id) }"
            @click="emit('navigate', n.id)"
          >
            {{ n.label }}
          </button>
        </div>
        <div v-if="nextNodes.length" class="panel__nav-row">
          <span class="panel__nav-label">接下来</span>
          <button
            v-for="n in nextNodes"
            :key="n.id"
            type="button"
            class="panel__chip next"
            :class="{ 'is-learned': chipLearned(n.id) }"
            @click="emit('navigate', n.id)"
          >
            {{ n.label }}
          </button>
        </div>
        <div v-if="extendNodes.length" class="panel__nav-row">
          <span class="panel__nav-label">延伸</span>
          <button
            v-for="n in extendNodes"
            :key="n.id"
            type="button"
            class="panel__chip extend"
            :class="{ 'is-learned': chipLearned(n.id) }"
            @click="emit('navigate', n.id)"
          >
            {{ n.label }}
          </button>
        </div>
        <div v-if="mapLinks.length" class="panel__nav-row">
          <span class="panel__nav-label">跨导图</span>
          <button
            v-for="n in mapLinks"
            :key="`map-${n.id}`"
            type="button"
            class="panel__chip bridge"
            @click="emit('navigate', n.id)"
          >
            {{ n.label }}
          </button>
        </div>
      </nav>

      <TermsBlock
        :node-id="node.id"
        @navigate="emit('navigate', $event)"
        @open-glossary="emit('open-glossary', $event)"
      />

      <div v-if="relatedQuizCount" class="panel__quiz-launch">
        <button type="button" class="panel__quiz-btn" @click="openRelatedQuiz">
          刷本课相关题
          <span class="panel__quiz-count">{{ relatedQuizCount }}</span>
        </button>
        <p class="panel__quiz-hint">
          相关 {{ relatedQuizCount }} 题
          <template v-if="relatedGlossaryCount">
            · 其中词典题 {{ relatedGlossaryCount }}（一词可多道）
          </template>
          <template v-if="relatedAdaptedCount">
            · 改编 {{ relatedAdaptedCount }}
          </template>
        </p>
      </div>

      <LessonBody v-if="node.markdown" :markdown="node.markdown" />
      <NetworkLab v-if="showLab" />
      <div v-else-if="shellLabConfig" class="panel__shell-lab">
        <p class="panel__shell-lab-label">动手沙箱</p>
        <LessonShell :config="shellLabConfig" />
      </div>

      <section
        v-if="mapLinks.length"
        class="panel__map2-foot"
        aria-label="跨导图对照"
      >
        <h3 class="panel__map2-foot-title">跨导图 · 对照入口</h3>
        <p class="panel__map2-foot-hint">
          点芯片跳到另一张导图的对应节点；面板上方「跨导图」同样可点。
        </p>
        <div class="panel__map2-foot-chips">
          <button
            v-for="n in mapLinks"
            :key="`map-foot-${n.id}`"
            type="button"
            class="panel__chip bridge"
            @click="emit('navigate', n.id)"
          >
            {{ n.label }}
          </button>
        </div>
      </section>
    </div>

    <footer class="panel__foot">
      <button
        type="button"
        class="panel__learn-cta"
        :class="{ 'is-on': learned }"
        :aria-pressed="learned"
        @click="onToggleLearned"
      >
        {{ learned ? '已学' : '标记已学' }}
      </button>
      <button
        v-if="primaryNext"
        type="button"
        class="panel__next-cta"
        @click="emit('navigate', primaryNext.id)"
      >
        <span class="panel__next-cta-kicker">下一课</span>
        <span class="panel__next-cta-label">{{ primaryNext.label }}</span>
      </button>
    </footer>

    <PanelNotes :node-id="node.id" />
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.panel__head {
  display: flex;
  justify-content: space-between;
  gap: 0.65rem;
  padding: 0.7rem 0.85rem 0.6rem;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--panel-bg) 88%, transparent);
}

.panel__head-text {
  min-width: 0;
}

.panel__meta-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.panel__tag {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--signal);
}

.panel__chip-soft {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  padding: 0.08rem 0.38rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--signal);
}

.panel__chip-soft--learned {
  background: color-mix(in srgb, #34d399 18%, transparent);
  color: color-mix(in srgb, #059669 80%, var(--mist));
}

.panel__title {
  margin: 0.15rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.28rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--node-title);
  text-wrap: balance;
  scroll-margin-top: 0.5rem;
}

.panel__title:focus {
  outline: none;
}

.panel__sub {
  margin: 0.2rem 0 0;
  color: var(--mist-dim);
  font-size: 0.78rem;
  line-height: 1.35;
}

.panel__head-actions {
  display: flex;
  align-items: flex-start;
  gap: 0.28rem;
  flex-shrink: 0;
}

.panel__icon-btn {
  display: inline-grid;
  place-items: center;
  min-width: 1.9rem;
  height: 1.9rem;
  padding: 0 0.35rem;
  border-radius: 9px;
  border: 1px solid var(--line);
  background: var(--ink-3);
  color: var(--mist-dim);
  cursor: pointer;
  transition:
    color 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    transform 0.18s ease;
}

.panel__icon-btn:hover {
  color: var(--amber);
  border-color: color-mix(in srgb, var(--amber) 40%, var(--line));
}

.panel__icon-btn.active {
  color: var(--amber);
  border-color: color-mix(in srgb, var(--amber) 45%, transparent);
  background: color-mix(in srgb, var(--amber) 14%, transparent);
}

.panel__icon-btn:active {
  transform: scale(0.96);
}

.panel__icon-btn--ghost {
  min-width: auto;
  padding: 0 0.55rem;
}

.panel__icon-btn--ghost:hover {
  color: var(--mist);
  border-color: var(--accent);
}

.panel__esc {
  font-family: var(--font-mono);
  font-size: 0.68rem;
}

.panel__scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0.75rem 0.9rem 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-soft) transparent;
  overscroll-behavior: contain;
}

.panel__role {
  margin: 0 0 0.7rem;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--mist);
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--mist) 14%, transparent);
  animation: panel-role-in 0.4s ease both;
}

@keyframes panel-role-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.panel__nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid color-mix(in srgb, var(--mist) 12%, transparent);
}

.panel__nav-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.panel__nav-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--mist-dim);
  margin-right: 0.25rem;
  min-width: 3.5rem;
}

.panel__quiz-launch {
  padding: 0 0 0.55rem;
}

.panel__quiz-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.35rem 0.7rem;
  border-radius: 9px;
  border: 1px solid color-mix(in srgb, var(--amber) 40%, var(--line));
  background: color-mix(in srgb, var(--amber) 12%, transparent);
  color: var(--amber);
  cursor: pointer;
}

.panel__quiz-btn:hover {
  background: color-mix(in srgb, var(--amber) 20%, transparent);
}

.panel__quiz-count {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  opacity: 0.9;
}

.panel__quiz-hint {
  margin: 0.35rem 0 0;
  font-size: 0.72rem;
  line-height: 1.4;
  color: var(--mist-dim);
}

.panel__chip {
  font-size: 0.72rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  color: var(--mist);
  background: var(--ink-3);
  border: 1px solid var(--line);
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  animation: panel-chip-in 0.35s ease both;
}

.panel__nav-row .panel__chip:nth-child(2) { animation-delay: 0.04s; }
.panel__nav-row .panel__chip:nth-child(3) { animation-delay: 0.08s; }
.panel__nav-row .panel__chip:nth-child(4) { animation-delay: 0.12s; }
.panel__nav-row .panel__chip:nth-child(5) { animation-delay: 0.16s; }
.panel__nav-row .panel__chip:nth-child(6) { animation-delay: 0.2s; }

@keyframes panel-chip-in {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.panel__chip:hover {
  border-color: var(--accent);
  color: var(--node-title);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 18%, transparent);
}

.panel__chip.next {
  border-color: color-mix(in srgb, var(--amber) 40%, transparent);
  color: var(--amber);
}

.panel__chip.next:hover {
  border-color: var(--amber);
  background: color-mix(in srgb, var(--amber) 12%, transparent);
}

.panel__chip.extend {
  border-style: dashed;
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
  color: var(--accent);
}

.panel__chip.extend:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.panel__chip.bridge {
  border-color: color-mix(in srgb, #7c3aed 45%, transparent);
  background: color-mix(in srgb, #7c3aed 10%, transparent);
  color: var(--node-title);
}

.panel__chip.bridge:hover {
  border-color: #7c3aed;
  background: color-mix(in srgb, #7c3aed 16%, transparent);
}

.panel__map2-foot {
  margin: 1.25rem 0 0.5rem;
  padding: 0.85rem 0.9rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, #7c3aed 28%, var(--line));
  background: color-mix(in srgb, #7c3aed 6%, var(--panel-bg));
}

.panel__map2-foot-title {
  margin: 0 0 0.35rem;
  font-size: 0.92rem;
  font-weight: 650;
  color: var(--node-title);
}

.panel__map2-foot-hint {
  margin: 0 0 0.65rem;
  font-size: 0.72rem;
  line-height: 1.45;
  color: var(--mist-dim);
}

.panel__map2-foot-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.panel__chip.is-learned::after {
  content: '✓';
  margin-left: 0.35rem;
  font-size: 0.72em;
  opacity: 0.75;
}

.panel__foot {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-top: 1px solid var(--line);
  background: color-mix(in srgb, var(--panel-bg) 92%, transparent);
}

.panel__learn-cta {
  flex: 0 0 auto;
  width: auto;
  min-width: 5.5rem;
  padding: 0.4rem 0.7rem;
  border-radius: 9px;
  border: 1px solid color-mix(in srgb, #34d399 40%, var(--line));
  background: color-mix(in srgb, #34d399 10%, transparent);
  color: color-mix(in srgb, #059669 75%, var(--mist));
  font: inherit;
  font-size: 0.78rem;
  font-weight: 650;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
}

.panel__learn-cta:hover {
  border-color: #34d399;
}

.panel__learn-cta.is-on {
  background: color-mix(in srgb, #34d399 22%, transparent);
  border-color: #34d399;
}

.panel__learn-cta:only-child {
  flex: 1 1 auto;
  width: 100%;
}

.panel__next-cta {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  flex: 1 1 auto;
  min-width: 0;
  width: auto;
  padding: 0.4rem 0.7rem;
  border-radius: 9px;
  border: 1px solid color-mix(in srgb, var(--amber) 45%, var(--line));
  background: color-mix(in srgb, var(--amber) 12%, var(--ink-3));
  color: var(--node-title);
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.18s ease,
    background 0.18s ease;
}

.panel__next-cta:hover {
  border-color: var(--amber);
  background: color-mix(in srgb, var(--amber) 18%, var(--ink-3));
}

.panel__next-cta:active {
  opacity: 0.92;
}

.panel__next-cta-kicker {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--amber);
}

.panel__next-cta-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.82rem;
  font-weight: 650;
}

.panel__shell-lab {
  margin: 0.5rem 0 1rem;
  padding: 0 0.15rem;
}

.panel__shell-lab-label {
  margin: 0 0 0.45rem;
  font-size: 0.78rem;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--mist-dim);
}
</style>
