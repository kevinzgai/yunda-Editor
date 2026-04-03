<script lang="ts" setup>
import PreviewRenderer from '@/components/preview/PreviewRenderer.vue'
import { demoPageData } from '@/mock/page-data'

defineOptions({
  name: 'Home',
})
definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

const pageData = demoPageData
</script>

<template>
  <view class="min-h-screen bg-[#eef2ff] pt-safe">
    <PreviewRenderer :widget-list="pageData.widgetList" :page-config="pageData.pageConfig" />
  </view>
</template>
