<template>
  <view class="preview-page" :style="pageStyle">
    <view v-for="widget in widgetList" :key="widget.id" class="widget-wrap">
      <PreviewWidgetNode :widget="widget" />
    </view>

    <view v-if="!widgetList.length" class="empty-tip">
      暂无组件数据
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PreviewWidgetNode from './PreviewWidgetNode.vue'
import type { PreviewPageConfig, PreviewWidget } from '@/mock/page-data'

const props = defineProps<{
  widgetList: PreviewWidget[]
  pageConfig: PreviewPageConfig
}>()

const pageStyle = computed(() => ({
  backgroundColor: props.pageConfig?.backgroundColor || '#ffffff',
  backgroundImage: props.pageConfig?.backgroundImage ? `url(${props.pageConfig.backgroundImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: props.pageConfig?.padding || '0',
  minHeight: '100vh',
  boxSizing: 'border-box',
}))
</script>

<style scoped>
.preview-page {
  width: 100%;
}

.widget-wrap {
  width: 100%;
}

.empty-tip {
  color: #9ca3af;
  font-size: 13px;
  text-align: center;
  padding: 60px 0;
}
</style>
