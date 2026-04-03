<template>
  <view class="hotspot-wrap" :style="mergedStyles">
    <view class="hotspot-container" :style="containerStyle">
      <image
        v-if="backgroundImage"
        class="hotspot-bg"
        :src="backgroundImage"
        mode="aspectFill"
      />
      <view v-else class="placeholder">
        <text class="placeholder-text">请设置背景图片</text>
      </view>

      <view
        v-for="(spot, index) in hotspots"
        :key="index"
        class="hotspot-item"
        :style="getSpotStyle(spot)"
        @click="handleSpotClick(spot)"
      >
        <text class="hotspot-text">{{ spot.text || `热区${index + 1}` }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface HotspotItem {
  x: number
  y: number
  width: number
  height: number
  text?: string
  link?: string
}

const props = defineProps<{
  backgroundImage?: string
  aspectRatio?: string
  hotspots?: HotspotItem[]
  styles?: Record<string, any>
}>()

const mergedStyles = computed(() => ({
  borderRadius: props.styles?.borderRadius || '0',
  marginTop: props.styles?.marginTop || '0',
  overflow: 'hidden',
  boxSizing: 'border-box',
  ...(props.styles || {}),
}))

const containerStyle = computed(() => {
  const ratio = props.aspectRatio || '16:9'
  const [w, h] = ratio.split(':').map(n => Number(n))
  const valid = w > 0 && h > 0
  const paddingTop = valid ? `${(h / w) * 100}%` : '56.25%'

  return {
    position: 'relative',
    width: '100%',
    paddingTop,
    backgroundColor: '#f3f4f6',
  }
})

function getSpotStyle(spot: HotspotItem) {
  return {
    position: 'absolute',
    left: `${spot.x || 0}%`,
    top: `${spot.y || 0}%`,
    width: `${spot.width || 0}%`,
    height: `${spot.height || 0}%`,
  }
}

function handleSpotClick(spot: HotspotItem) {
  if (!spot.link)
    return

  // #ifdef H5
  window.location.href = spot.link
  // #endif
}
</script>

<style scoped>
.hotspot-wrap { width: 100%; }
.hotspot-container { overflow: hidden; }
.hotspot-bg { height: 100%; left: 0; position: absolute; top: 0; width: 100%; }
.placeholder { align-items: center; display: flex; height: 100%; justify-content: center; left: 0; position: absolute; top: 0; width: 100%; }
.placeholder-text { color: #9ca3af; font-size: 12px; }
.hotspot-item {
  align-items: center;
  background: rgba(99, 102, 241, 0.18);
  border: 1px dashed rgba(99, 102, 241, 0.8);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.hotspot-text { color: #4338ca; font-size: 10px; }
</style>
