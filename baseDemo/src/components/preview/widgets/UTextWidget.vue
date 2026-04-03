<template>
  <text class="u-text" :style="mergedStyles">
    {{ text }}
  </text>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text?: string
  styles?: Record<string, any>
}>()

const mergedStyles = computed(() => ({
  fontSize: props.styles?.fontSize || '14px',
  color: props.styles?.color || '#333333',
  padding: props.styles?.padding || '0',
  marginTop: props.styles?.marginTop || '0',
  display: 'block',
  boxSizing: 'border-box',
  ...(props.styles || {}),
}))
</script>
