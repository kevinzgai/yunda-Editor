<template>
  <view class="list" :style="styles || {}">
    <view v-for="(card, idx) in cards" :key="idx" class="item" :style="{ height: cardHeight || '90px' }">
      <image v-if="card.backgroundImage" :src="card.backgroundImage" class="bg" mode="aspectFill" />
      <view v-else class="bg fallback" />
      <view class="content">
        <view>
          <text class="title">{{ card.title || '会员卡' }}</text>
          <text class="desc">{{ card.description || '' }}</text>
        </view>
        <view class="right">
          <text class="price" v-if="card.showPrice !== false">¥{{ card.price || '' }}</text>
          <view class="btn" :style="{ backgroundColor: card.btnBgColor || '#fff', color: card.btnTextColor || '#667eea' }">{{ card.buttonText || '立即开通' }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  cards?: Array<Record<string, any>>
  cardHeight?: string
  styles?: Record<string, any>
}>()
</script>

<style scoped>
.list { display: flex; flex-direction: column; gap: 10px; }
.item { border-radius: 10px; overflow: hidden; position: relative; }
.bg { height: 100%; left: 0; position: absolute; top: 0; width: 100%; }
.fallback { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.content { align-items: center; color: #fff; display: flex; height: 100%; justify-content: space-between; padding: 0 12px; position: relative; }
.title { font-size: 14px; font-weight: 600; }
.desc { display: block; font-size: 11px; margin-top: 2px; opacity: .9; }
.right { align-items: flex-end; display: flex; flex-direction: column; gap: 6px; }
.price { font-size: 16px; font-weight: 700; }
.btn { border-radius: 14px; font-size: 11px; padding: 5px 10px; }
</style>
