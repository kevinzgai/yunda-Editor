<template>
  <view class="u-btn-wrap" :style="outerStyle">
    <button class="u-btn" :style="btnStyle" @click="handleClick">
      {{ text || '按钮' }}
    </button>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text?: string
  link?: string
  styles?: Record<string, any>
}>()

const outerStyle = computed(() => ({
  marginTop: props.styles?.marginTop || '0',
}))

const btnStyle = computed(() => ({
  backgroundColor: '#6366f1',
  color: '#ffffff',
  fontSize: '14px',
  borderRadius: props.styles?.borderRadius || '8px',
  padding: props.styles?.padding || '10px 16px',
  lineHeight: '1.2',
}))

function handleClick() {
  if (!props.link)
    return
  // #ifdef H5
  window.location.href = props.link
  // #endif
}
</script>

<style scoped>
.u-btn-wrap {
  width: 100%;
}

.u-btn {
  border: none;
}

.u-btn::after {
  border: none;
}
</style>
