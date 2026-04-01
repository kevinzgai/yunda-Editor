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

    <!-- 展览列表单行横向滚动 -->
    <div class="overflow-x-auto">
      <div class="flex gap-3 pb-2">
        <div
          v-for="i in 4"
          :key="i"
          class="flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-sm"
          :style="cardStyle"
        >
          <img
            :src="`https://picsum.photos/seed/exhibition${i}/150/100`"
            alt="展览图片"
            class="w-full aspect-[3/2] object-cover"
          />
          <div class="p-2">
            <div class="text-sm font-medium text-gray-800 mb-1 truncate">展览名称</div>
            <div class="text-xs text-gray-500 line-clamp-2">展览描述信息</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  title: { type: String, default: "展览推荐" },
  showTitle: { type: Boolean, default: true },
  showTabs: { type: Boolean, default: true },
  activeTag: { type: String, default: "hot" },
  tags: {
    type: Array,
    default: () => [],
  },
  cardWidth: { type: String, default: "120px" },
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

const cardStyle = computed(() => ({
  width: props.cardWidth,
  borderRadius: props.styles.cardRadius || "8px",
}));
</script>
