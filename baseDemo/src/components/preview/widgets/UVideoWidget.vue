<template>
  <view class="u-video-wrap" :style="mergedStyles">
    <video
      v-if="src"
      class="u-video"
      :src="src"
      :poster="poster"
      :controls="controls !== false"
      :autoplay="autoplay === true"
      :loop="loop === true"
      :muted="muted === true"
      object-fit="cover"
    />
    <view v-else class="u-placeholder">视频</view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src?: string
  poster?: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  styles?: Record<string, any>
}>()

const mergedStyles = computed(() => ({
  width: props.styles?.width || '100%',
  height: props.styles?.height || '210px',
  borderRadius: props.styles?.borderRadius || '0',
  marginTop: props.styles?.marginTop || '0',
  overflow: 'hidden',
  boxSizing: 'border-box',
  ...(props.styles || {}),
}))
</script>

<style scoped>
.u-video-wrap { position: relative; }
.u-video { height: 100%; width: 100%; }
.u-placeholder { align-items: center; background: #e5e7eb; color: #9ca3af; display: flex; font-size: 12px; height: 100%; justify-content: center; min-height: 150px; width: 100%; }
</style>
