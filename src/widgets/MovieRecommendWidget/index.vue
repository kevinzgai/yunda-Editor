<template>
  <div :style="containerStyle">
    <div v-if="showTitle && title" class="text-sm font-semibold text-gray-800 mb-3 px-1">
      {{ title }}
    </div>
    
    <!-- Tab 切换 -->
    <div v-if="showTabs && visibleTags.length > 0" class="flex gap-2 mb-3">
      <button
        v-for="tag in visibleTags"
        :key="tag.id"
        class="px-3 py-1 text-xs rounded-full transition-colors"
        :class="activeTag === tag.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'"
        @click="activeTag = tag.id"
      >
        {{ tag.label }}
      </button>
    </div>

    <!-- 影片列表占位 -->
    <div class="overflow-x-auto">
      <div class="flex pb-2" :style="listStyle">
        <div
          v-for="i in 4"
          :key="i"
          class="flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-sm"
          :style="cardStyle"
        >
          <div class="w-full aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
          <div class="p-2">
            <div class="text-sm font-medium text-gray-800 mb-1 truncate max-w-24">影片名称</div>
            <div class="text-xs text-gray-500 line-clamp-2 max-w-24">影片描述信息</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  title: { type: String, default: "影片推荐" },
  showTitle: { type: Boolean, default: true },
  showTabs: { type: Boolean, default: true },
  activeTag: { type: String, default: "hot" },
  tags: {
    type: Array,
    default: () => [],
  },
  cardWidth: { type: String, default: "100px" },
  gap: { type: String, default: "12px" },
  styles: { type: Object, default: () => ({}) },
});

const currentTag = ref(props.activeTag);

watch(() => props.activeTag, (val) => {
  currentTag.value = val;
});

const visibleTags = computed(() => {
  return props.tags.filter(tag => tag.show !== false);
});

const containerStyle = computed(() => ({
  backgroundColor: props.styles.backgroundColor || "#f5f5f5",
  padding: props.styles.padding || "8px",
  marginTop: props.styles.marginTop || "0",
}));

const listStyle = computed(() => ({
  gap: props.gap,
}));

const cardStyle = computed(() => ({
  width: props.cardWidth,
  borderRadius: props.styles.cardRadius || "8px",
}));
</script>
