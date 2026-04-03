<template>
  <view class="box" :style="boxStyle">
    <text v-if="showTitle !== false" class="title">{{ title || '展览推荐' }}</text>
    <view v-if="showTabs !== false" class="tabs">
      <view v-for="tag in visibleTags" :key="tag.id" class="tab">{{ tag.label }}</view>
    </view>
    <scroll-view scroll-x>
      <view class="cards">
        <view v-for="i in 4" :key="i" class="card" :style="{ width: cardWidth || '120px', borderRadius: styles?.cardRadius || '8px' }">
          <image :src="`https://picsum.photos/seed/exhibition${i}/240/160`" class="img" mode="aspectFill" />
          <view class="meta">
            <text class="name">展览名称</text>
            <text class="desc">展览描述信息</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  showTitle?: boolean
  showTabs?: boolean
  tags?: Array<{ id: string, label: string, show?: boolean }>
  cardWidth?: string
  styles?: Record<string, any>
}>()

const visibleTags = computed(() => (props.tags || []).filter(tag => tag.show !== false))

const boxStyle = computed(() => ({
  backgroundColor: props.styles?.backgroundColor || '#f5f5f5',
  padding: props.styles?.padding || '8px',
  marginTop: props.styles?.marginTop || '0',
}))
</script>

<style scoped>
.title { color: #1f2937; display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; }
.tabs { display: flex; gap: 8px; margin-bottom: 8px; }
.tab { background: #e5e7eb; border-radius: 12px; color: #4b5563; font-size: 11px; padding: 4px 10px; }
.cards { display: flex; gap: 10px; padding-bottom: 4px; }
.card { background: #fff; overflow: hidden; }
.img { height: 80px; width: 100%; }
.meta { padding: 6px; }
.name { color: #1f2937; display: block; font-size: 12px; }
.desc { color: #6b7280; display: block; font-size: 10px; margin-top: 2px; }
</style>
