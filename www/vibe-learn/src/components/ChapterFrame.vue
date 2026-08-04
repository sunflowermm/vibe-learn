<script setup>
import { Handle, Position } from '@vue-flow/core';
import { computed } from 'vue';

const props = defineProps({
  data: { type: Object, required: true },
  selected: { type: Boolean, default: false },
});

/** 视觉高亮来自 data.lit（勿用 selected，避免多选拖拽） */
const lit = computed(() => Boolean(props.data?.lit) || props.selected);

/** 章框主色：导图2 各大区不同；导图1 回落全局 accent */
const toneStyle = computed(() => {
  const bg = props.data?.tone?.bg;
  return bg ? { '--chapter-accent': bg } : undefined;
});
</script>

<template>
  <div class="chapter" :class="{ selected: lit }" :style="toneStyle">
    <Handle id="left" type="source" :position="Position.Left" class="chapter__handle" :connectable="false" />
    <Handle id="right" type="source" :position="Position.Right" class="chapter__handle" :connectable="false" />
    <Handle id="top" type="source" :position="Position.Top" class="chapter__handle" :connectable="false" />
    <Handle id="bottom" type="source" :position="Position.Bottom" class="chapter__handle" :connectable="false" />
    <Handle id="left-t" type="target" :position="Position.Left" class="chapter__handle" :connectable="false" />
    <Handle id="right-t" type="target" :position="Position.Right" class="chapter__handle" :connectable="false" />
    <Handle id="top-t" type="target" :position="Position.Top" class="chapter__handle" :connectable="false" />
    <Handle id="bottom-t" type="target" :position="Position.Bottom" class="chapter__handle" :connectable="false" />

    <!-- 仅蓝标题可拖整章；框内空白穿透，用于平移画布 -->
    <header
      class="chapter__head chapter__drag mm-nopan"
      title="点开章概览 · 拖此蓝条移动整章（框内空白拖动画布）"
      data-blobity
    >
      <span class="chapter__tag">{{ data.tag }}</span>
      <div class="chapter__text">
        <h3 class="chapter__title">{{ data.label }}</h3>
        <p class="chapter__sub">{{ data.subtitle }}</p>
      </div>
      <span class="chapter__drag-tip">点开 · 拖蓝条</span>
    </header>
  </div>
</template>

<style scoped>
.chapter {
  --chapter-accent: var(--accent);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 18px;
  border: 2px dashed color-mix(in srgb, var(--chapter-accent) 55%, var(--chapter-border, #94a3b8));
  background: transparent;
  pointer-events: none;
}

.chapter__handle {
  width: 6px !important;
  height: 6px !important;
  min-width: 0 !important;
  min-height: 0 !important;
  border: none !important;
  background: transparent !important;
  opacity: 0;
  pointer-events: none;
}

.chapter.selected {
  border-color: var(--chapter-accent);
  border-style: solid;
  animation: chapter-lit-pulse 1.4s ease-out 1;
}

@keyframes chapter-lit-pulse {
  0% {
    border-color: color-mix(in srgb, var(--chapter-accent) 35%, transparent);
  }
  40% {
    border-color: var(--chapter-accent);
    filter: drop-shadow(
      0 0 10px color-mix(in srgb, var(--chapter-accent) 35%, transparent)
    );
  }
  100% {
    border-color: var(--chapter-accent);
    filter: none;
  }
}

.chapter.selected .chapter__head {
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.28),
    var(--shadow-node);
}

.chapter__head {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 12px;
  z-index: 2;
  max-width: none;
  width: auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--chapter-accent);
  color: #fff;
  box-shadow: var(--shadow-node);
  pointer-events: all;
  cursor: grab;
  transform: translateZ(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chapter__head:hover {
  transform: scale(1.02);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.35),
    var(--shadow-node);
}

.chapter__head:active {
  cursor: grabbing;
}

.chapter__tag {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.18);
  padding: 3px 7px;
  border-radius: 6px;
  font-weight: 600;
}

.chapter__text {
  min-width: 0;
  flex: 1;
}

.chapter__title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chapter__sub {
  margin: 3px 0 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chapter__drag-tip {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 960px) {
  .chapter__drag-tip {
    display: none;
  }

  .chapter__head {
    cursor: pointer;
  }

  .chapter__head:hover {
    transform: none;
  }
}
</style>
