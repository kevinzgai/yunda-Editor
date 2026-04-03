<template>
  <view class="nav-wrap" :style="mergedStyles">
    <view class="nav-left">
      <text class="city" :style="{ color: textColor }">{{ city || '北京' }}</text>
      <text class="arrow" :style="{ color: textColor }">▼</text>
    </view>
    <view class="search-box">
      <text class="search-icon">🔍</text>
      <text class="search-text">{{ searchPlaceholder || '搜索你感兴趣的内容' }}</text>
    </view>
    <view v-if="showScan !== false" class="scan" :style="{ color: textColor }">⊕</view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  city?: string
  searchPlaceholder?: string
  showScan?: boolean
  backgroundColor?: string
  textColor?: string
  styles?: Record<string, any>
}>()

const mergedStyles = computed(() => ({
  backgroundColor: props.backgroundColor || '#ffffff',
  ...(props.styles || {}),
}))

const textColor = computed(() => props.textColor || '#000000')
</script>

<style scoped>
.nav-wrap { align-items: center; display: flex; height: 44px; padding: 0 12px; }
.nav-left { align-items: center; display: flex; flex-shrink: 0; }
.city { font-size: 14px; font-weight: 600; }
.arrow { font-size: 10px; margin-left: 2px; }
.search-box { align-items: center; background: #f5f5f5; border-radius: 999px; display: flex; flex: 1; height: 32px; margin: 0 12px; padding: 0 10px; }
.search-icon { font-size: 13px; }
.search-text { color: #999; font-size: 12px; margin-left: 6px; }
.scan { font-size: 20px; }
</style>
