<template>
  <view v-if="visible" class="notice" :style="mergedStyles">
    <text v-if="showIcon !== false" class="icon">🔔</text>
    <text class="content">{{ text || '这是一条公告信息，点击查看详情' }}</text>
    <text v-if="showClose" class="close" @click="visible = false">✕</text>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  text?: string
  showIcon?: boolean
  showClose?: boolean
  backgroundColor?: string
  textColor?: string
  styles?: Record<string, any>
}>()

const visible = ref(true)

const mergedStyles = computed(() => ({
  backgroundColor: props.backgroundColor || '#fff7e6',
  color: props.textColor || '#ff6600',
  ...(props.styles || {}),
}))
</script>

<style scoped>
.notice { align-items: center; display: flex; font-size: 12px; gap: 8px; padding: 8px 12px; }
.icon { flex-shrink: 0; }
.content { flex: 1; }
.close { flex-shrink: 0; }
</style>
