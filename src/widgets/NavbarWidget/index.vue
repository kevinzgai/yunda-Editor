<template>
  <div class="w-full" :style="mergedStyles">
    <div class="navbar-container flex items-center h-44px px-12px">
      <!-- 左侧：城市 -->
      <div class="flex items-center shrink-0" :style="{ color: textColor }">
        <span class="text-14px font-medium">{{ city }}</span>
        <span class="text-10px ml-1px">▼</span>
      </div>

      <!-- 中间：搜索框 -->
      <div class="flex-1 mx-12px">
        <div
          class="flex items-center h-32px px-10px rounded-full"
          :style="{ backgroundColor: '#f5f5f5', color: '#999' }"
        >
          <span class="text-14px">🔍</span>
          <span class="text-12px ml-6px">{{ searchPlaceholder }}</span>
        </div>
      </div>

      <!-- 右侧：扫码图标 -->
      <div v-if="showScan" class="shrink-0" :style="{ color: textColor }">
        <div class="text-20px">⊕</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  city: {
    type: String,
    default: "北京",
  },
  searchPlaceholder: {
    type: String,
    default: "搜索你感兴趣的内容",
  },
  showScan: {
    type: Boolean,
    default: true,
  },
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  textColor: {
    type: String,
    default: "#000000",
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
});

const mergedStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
  ...props.styles,
}));
</script>

<style scoped>
.navbar-container {
  min-height: 44px;
}
</style>
