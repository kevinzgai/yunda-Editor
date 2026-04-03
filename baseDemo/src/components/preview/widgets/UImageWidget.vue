<template>
  <view class="u-image-wrap" :style="mergedStyles">
    <image v-if="src" class="u-image" :src="src" mode="aspectFill" />
    <view v-else class="u-placeholder">
      图片
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src?: string
  styles?: Record<string, any>
}>()

const mergedStyles = computed(() => ({
  width: props.styles?.width || '100%',
  height: props.styles?.height || '150px',
  borderRadius: props.styles?.borderRadius || '0',
  marginTop: props.styles?.marginTop || '0',
  overflow: 'hidden',
  boxSizing: 'border-box',
  ...(props.styles || {}),
}))
</script>

<style scoped>
.u-image-wrap {
  position: relative;
}

.u-image {
  width: 100%;
  height: 100%;
}

.u-placeholder {
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5e7eb;
  color: #9ca3af;
  font-size: 12px;
}
</style>
