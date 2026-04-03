<template>
  <view class="u-title" :style="mergedStyles">
    {{ text }}
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text?: string
  level?: number
  styles?: Record<string, any>
}>()

const sizeMap: Record<number, string> = {
  1: '28px',
  2: '24px',
  3: '20px',
  4: '18px',
  5: '16px',
  6: '14px',
}

const mergedStyles = computed(() => ({
  fontWeight: props.styles?.fontWeight || '700',
  color: props.styles?.color || '#111827',
  fontSize: sizeMap[props.level || 1] || '20px',
  padding: props.styles?.padding || '0',
  marginTop: props.styles?.marginTop || '0',
  boxSizing: 'border-box',
  ...(props.styles || {}),
}))
</script>
