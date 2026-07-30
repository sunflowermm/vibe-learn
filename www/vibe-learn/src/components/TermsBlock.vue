<script setup>
import { computed } from 'vue';
import { resolveGlossary } from '../data/glossary.js';
import { NODE_TERMS } from '../data/terms-by-node.js';
import { resolveNodes } from '../data/nodes.js';

const props = defineProps({
  nodeId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['navigate', 'open-glossary']);

const entries = computed(() => resolveGlossary(NODE_TERMS[props.nodeId] || []));

function related(entry) {
  return resolveNodes(entry.also || []).filter((n) => n.id !== props.nodeId);
}
</script>

<template>
  <section v-if="entries.length" class="terms" aria-label="本课专有名词">
    <header class="terms__head">
      <h3 class="terms__title">本课专有名词</h3>
      <p class="terms__hint">点词条打开词典浮层；再点同一词可收起。</p>
    </header>
    <dl class="terms__list">
      <div v-for="e in entries" :key="e.id" class="terms__item">
        <dt class="terms__term">
          <button
            type="button"
            class="terms__term-btn"
            :title="`词典：${e.term}`"
            @click="emit('open-glossary', e.id)"
          >
            {{ e.term }}
          </button>
        </dt>
        <dd class="terms__brief">
          {{ e.brief }}
          <span v-if="related(e).length" class="terms__actions">
            <span class="terms__also-label">相关</span>
            <button
              v-for="n in related(e)"
              :key="n.id"
              type="button"
              class="terms__link"
              @click="emit('navigate', n.id)"
            >
              {{ n.label }}
            </button>
          </span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.terms {
  margin: 0 0 1.35rem;
  padding: 1rem 1.1rem 1.1rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--accent) 28%, color-mix(in srgb, var(--mist) 16%, transparent));
  background: linear-gradient(
    160deg,
    var(--accent-soft),
    color-mix(in srgb, var(--ink-3) 55%, transparent)
  );
}

.terms__head {
  margin-bottom: 0.65rem;
}

.terms__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 650;
  color: var(--node-title);
}

.terms__hint {
  margin: 0.25rem 0 0;
  font-size: 0.78rem;
  color: var(--mist-dim);
  line-height: 1.45;
}

.terms__list {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.terms__item {
  padding-top: 0.55rem;
  border-top: 1px dashed color-mix(in srgb, var(--line) 85%, transparent);
  animation: terms-item-in 0.4s ease both;
}

.terms__item:nth-child(1) { animation-delay: 0.03s; }
.terms__item:nth-child(2) { animation-delay: 0.07s; }
.terms__item:nth-child(3) { animation-delay: 0.11s; }
.terms__item:nth-child(4) { animation-delay: 0.15s; }
.terms__item:nth-child(5) { animation-delay: 0.19s; }
.terms__item:nth-child(6) { animation-delay: 0.23s; }
.terms__item:nth-child(7) { animation-delay: 0.27s; }
.terms__item:nth-child(8) { animation-delay: 0.31s; }

@keyframes terms-item-in {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.terms__item:first-child {
  padding-top: 0;
  border-top: none;
}

.terms__term {
  margin: 0 0 0.2rem;
}

.terms__term-btn {
  padding: 0;
  border: none;
  background: none;
  font-size: 0.86rem;
  font-weight: 650;
  color: var(--accent);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--accent) 35%, transparent);
  text-underline-offset: 0.18em;
  cursor: pointer;
  text-align: left;
}

.terms__term-btn:hover {
  text-decoration-color: var(--accent);
}

.terms__brief {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--mist);
}

.terms__actions {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.35rem;
  width: 100%;
  font-size: 0.72rem;
  color: var(--mist-dim);
}

.terms__also-label {
  margin-left: 0.15rem;
}

.terms__link {
  padding: 0.12rem 0.45rem;
  border-radius: 999px;
  border: 1px dashed color-mix(in srgb, var(--accent) 45%, transparent);
  color: var(--accent);
  font-size: 0.72rem;
  background: color-mix(in srgb, var(--ink) 35%, transparent);
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.terms__link:hover {
  border-style: solid;
  border-color: var(--accent);
  background: var(--accent-soft);
}
</style>
