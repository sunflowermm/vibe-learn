<script setup>
/**
 * 三张思维导图共用：网格背景 · 缩放控件 · 小地图
 */
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';

defineProps({
  bgColor: { type: String, required: true },
  miniWidth: { type: Number, required: true },
  miniHeight: { type: Number, required: true },
  miniMask: { type: String, required: true },
  miniMaskStroke: { type: String, required: true },
  miniNodeColor: { type: Function, required: true },
  miniNodeStroke: { type: Function, required: true },
  miniNodeClass: { type: Function, required: true },
});
</script>

<template>
  <Background variant="lines" :gap="24" :size="1" :pattern-color="bgColor" />
  <Controls position="bottom-left" aria-label="画布缩放控制" />
  <MiniMap
    class="mm-minimap"
    position="bottom-right"
    :width="miniWidth"
    :height="miniHeight"
    :node-border-radius="6"
    :node-stroke-width="1.2"
    :node-color="miniNodeColor"
    :node-stroke-color="miniNodeStroke"
    :node-class-name="miniNodeClass"
    :mask-color="miniMask"
    :mask-stroke-color="miniMaskStroke"
    :mask-stroke-width="1.6"
    :mask-border-radius="8"
    :offset-scale="1.2"
    aria-label="图谱概览"
  />
</template>
