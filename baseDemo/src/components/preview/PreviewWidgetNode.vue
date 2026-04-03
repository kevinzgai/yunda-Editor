<template>
  <component
    :is="currentComp"
    v-if="currentComp"
    v-bind="widget.props"
    :styles="widget.styles"
  />
  <view v-else class="unsupported">
    暂不支持组件：{{ widget.name }}
  </view>
</template>

<script setup lang="ts">
import type { PreviewWidget } from '@/mock/page-data'
import { computed } from 'vue'
import UAgentWidget from './widgets/UAgentWidget.vue'
import UButtonWidget from './widgets/UButtonWidget.vue'
import UExhibitionWidget from './widgets/UExhibitionWidget.vue'
import UHotspotWidget from './widgets/UHotspotWidget.vue'
import UImageWidget from './widgets/UImageWidget.vue'
import ULightCardListWidget from './widgets/ULightCardListWidget.vue'
import ULightCardWidget from './widgets/ULightCardWidget.vue'
import UNavbarWidget from './widgets/UNavbarWidget.vue'
import UNoticeBar from './widgets/UNoticeBar.vue'
import UTextWidget from './widgets/UTextWidget.vue'
import UTitleWidget from './widgets/UTitleWidget.vue'
import UVideoWidget from './widgets/UVideoWidget.vue'

const props = defineProps<{
  widget: PreviewWidget
}>()

const compMap = {
  TextWidget: UTextWidget,
  ImageWidget: UImageWidget,
  HotspotWidget: UHotspotWidget,
  TitleWidget: UTitleWidget,
  ButtonWidget: UButtonWidget,
  AgentWidget: UAgentWidget,
  NavbarWidget: UNavbarWidget,
  NoticeBar: UNoticeBar,
  LightCardWidget: ULightCardWidget,
  LightCardListWidget: ULightCardListWidget,
  ExhibitionWidget: UExhibitionWidget,
  VideoWidget: UVideoWidget,
}

const currentComp = computed(() => compMap[props.widget.name as keyof typeof compMap])
</script>

<style scoped>
.unsupported {
  color: #ef4444;
  font-size: 12px;
  background: #fff1f2;
  border: 1px dashed #fda4af;
  border-radius: 8px;
  padding: 10px;
}
</style>
