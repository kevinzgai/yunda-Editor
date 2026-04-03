<template>
  <view class="agent-card" :style="mergedStyles">
    <image v-if="image" :src="image" class="agent-avatar" mode="aspectFill" />
    <view v-else class="agent-avatar agent-avatar-fallback">
      <text class="fallback-text">{{ (title || 'A').slice(0, 1) }}</text>
    </view>

    <view class="agent-content">
      <text class="agent-title" :style="{ color: titleColor }">{{ title || '智能体标题' }}</text>
      <text class="agent-desc">{{ description || '智能体说明信息' }}</text>
      <text v-if="agentId" class="agent-id">ID: {{ agentId }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  agentId?: string
  title?: string
  description?: string
  image?: string
  styles?: Record<string, any>
}>()

const mergedStyles = computed(() => ({
  backgroundColor: props.styles?.backgroundColor || '#ffffff',
  borderRadius: props.styles?.borderRadius || '8px',
  marginTop: props.styles?.marginTop || '0',
  marginBottom: props.styles?.marginBottom || '0',
  boxSizing: 'border-box',
  ...(props.styles || {}),
}))

const titleColor = computed(() => props.styles?.titleColor || '#333333')
</script>

<style scoped>
.agent-card { display: flex; align-items: center; gap: 10px; padding: 12px; }
.agent-avatar { width: 64px; height: 64px; border-radius: 8px; }
.agent-avatar-fallback { align-items: center; background: #6366f1; display: flex; justify-content: center; }
.fallback-text { color: #fff; font-size: 22px; font-weight: 700; }
.agent-content { display: flex; flex: 1; flex-direction: column; min-width: 0; }
.agent-title { font-size: 14px; font-weight: 600; }
.agent-desc { color: #6b7280; font-size: 12px; margin-top: 2px; }
.agent-id { color: #9ca3af; font-size: 11px; margin-top: 4px; }
</style>
