<script setup>
/**
 * 知识点 / 番外 stub 共用色卡（字色统一白，避免按 tone.fg 分叉）
 */
import { Handle, Position } from '@vue-flow/core';
import { computed } from 'vue';

const props = defineProps({
  data: { type: Object, required: true },
  selected: { type: Boolean, default: false },
});

const isStub = computed(() => props.data.kind === 'stub');
const toneStyle = computed(() => ({
  '--card-bg': props.data.tone?.bg || (isStub.value ? '#ea580c' : '#4f46e5'),
}));
</script>

<template>
  <div
    class="card"
    :class="{ selected, stub: isStub }"
    :style="toneStyle"
    data-blobity
  >
    <Handle id="left" type="source" :position="Position.Left" class="card__handle" :connectable="false" />
    <Handle id="right" type="source" :position="Position.Right" class="card__handle" :connectable="false" />
    <Handle id="top" type="source" :position="Position.Top" class="card__handle" :connectable="false" />
    <Handle id="bottom" type="source" :position="Position.Bottom" class="card__handle" :connectable="false" />
    <!-- 目标侧同名锚点：Loose 模式下仍可靠；id 与 source 区分避免冲突 -->
    <Handle id="left-t" type="target" :position="Position.Left" class="card__handle card__handle--t" :connectable="false" />
    <Handle id="right-t" type="target" :position="Position.Right" class="card__handle card__handle--t" :connectable="false" />
    <Handle id="top-t" type="target" :position="Position.Top" class="card__handle card__handle--t" :connectable="false" />
    <Handle id="bottom-t" type="target" :position="Position.Bottom" class="card__handle card__handle--t" :connectable="false" />

    <div class="card__tag">
      <span>{{ data.tag }}</span>
      <span v-if="data.bookmarked || data.hasNote" class="card__marks" aria-hidden="true">
        <svg
          v-if="data.bookmarked"
          class="card__mark card__mark--bm"
          width="12"
          height="12"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 1.8l1.7 3.5 3.8.55-2.75 2.7.65 3.8L8 10.6l-3.4 1.75.65-3.8L2.5 5.85l3.8-.55L8 1.8z"
            fill="currentColor"
          />
        </svg>
        <svg
          v-if="data.hasNote"
          class="card__mark card__mark--note"
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3.5 2.5h7.2L13.5 5.3v8.2a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            stroke-width="1.4"
          />
          <path d="M5.2 8.2h5.5M5.2 10.6h3.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </span>
    </div>
    <div class="card__title">{{ data.label }}</div>
    <div class="card__sub">{{ data.subtitle }}</div>
  </div>
</template>

<style scoped>
.card {
  width: 250px;
  padding: 16px 18px 18px;
  border-radius: var(--radius);
  background: var(--card-bg);
  color: #fff;
  border: none;
  box-shadow: var(--shadow-node);
  cursor: pointer;
  transform: translateZ(0);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    filter 0.3s ease;
}

.card.stub {
  width: 240px;
  padding: 15px 17px;
}

.card:hover {
  transform: scale(1.02) translateY(-2px);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.35),
    0 16px 40px rgba(0, 0, 0, 0.35);
}

@media (max-width: 960px) {
  .card:hover {
    transform: none;
    box-shadow: var(--shadow-node);
  }
}

.card.selected {
  filter: brightness(1.06);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.55),
    0 0 28px color-mix(in srgb, #fff 28%, transparent),
    var(--shadow-node);
  animation: card-select-pulse 1.1s ease-out 1;
}

@keyframes card-select-pulse {
  0% {
    transform: scale(1);
    box-shadow:
      0 0 0 0 rgba(255, 255, 255, 0.55),
      var(--shadow-node);
  }
  45% {
    transform: scale(1.035) translateY(-2px);
    box-shadow:
      0 0 0 4px rgba(255, 255, 255, 0.35),
      0 18px 44px rgba(0, 0, 0, 0.38);
  }
  100% {
    transform: scale(1);
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0.55),
      0 0 28px color-mix(in srgb, #fff 28%, transparent),
      var(--shadow-node);
  }
}

.card__tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.82);
}

.card__marks {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  letter-spacing: 0;
  text-transform: none;
}

.card__mark {
  display: block;
  opacity: 0.95;
}

.card__mark--bm {
  color: #fde68a;
}

.card__mark--note {
  color: #bae6fd;
}

.card.stub .card__tag {
  font-size: 10px;
  margin-bottom: 0;
}

.card__title {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.card.stub .card__title {
  margin-top: 7px;
  font-size: 15px;
}

.card__sub {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.82);
}

.card.stub .card__sub {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.4;
}

.card__handle {
  width: 18px !important;
  height: 4px !important;
  border-radius: 2px !important;
  background: rgba(255, 255, 255, 0.45) !important;
  border: none !important;
  pointer-events: none !important;
}

.card__handle--t {
  opacity: 0 !important;
  width: 10px !important;
  height: 10px !important;
}
</style>
