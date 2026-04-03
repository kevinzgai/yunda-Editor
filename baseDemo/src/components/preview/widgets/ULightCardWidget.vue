<template>
  <scroll-view class="card-scroll" scroll-x>
    <view class="row">
      <view
        v-for="(card, idx) in cards"
        :key="idx"
        class="card"
        :style="{ width: cardWidth || '140px', height: cardHeight || '160px' }"
      >
        <image v-if="card.backgroundImage" :src="card.backgroundImage" class="bg" mode="aspectFill" />
        <view v-else class="bg fallback" />
        <view class="body">
          <text class="title">{{ card.title || '光影卡' }}</text>
          <text class="desc">{{ card.description || '' }}</text>
          <view class="bottom">
            <text v-if="card.showPrice !== false" class="price">¥{{ card.price || '' }}</text>
            <view class="btn" :style="{ backgroundColor: card.btnBgColor || '#fff', color: card.btnTextColor || '#667eea' }">
              {{ card.buttonText || '开通' }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
defineProps<{
  cards?: Array<Record<string, any>>
  cardWidth?: string
  cardHeight?: string
  styles?: Record<string, any>
}>()
</script>

<style scoped>
.card-scroll { width: 100%; }
.row { display: flex; gap: 10px; padding: 4px 0; }
.card { border-radius: 10px; overflow: hidden; position: relative; }
.bg { height: 100%; left: 0; position: absolute; top: 0; width: 100%; }
.fallback { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.body { color: #fff; display: flex; flex-direction: column; height: 100%; justify-content: space-between; padding: 10px; position: relative; }
.title { font-size: 13px; font-weight: 600; }
.desc { font-size: 11px; opacity: .9; }
.bottom { align-items: center; display: flex; justify-content: space-between; }
.price { font-size: 14px; font-weight: 700; }
.btn { border-radius: 12px; font-size: 10px; padding: 4px 8px; }
</style>
