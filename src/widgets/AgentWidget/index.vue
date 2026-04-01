<template>
  <component
    :is="link ? 'a' : 'div'"
    class="flex gap-3 p-3 bg-white rounded-lg"
    :style="mergedStyles"
    :href="link || undefined"
  >
    <div class="shrink-0">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="w-16 h-16 rounded-lg object-cover"
      />
      <div
        v-else
        class="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white text-2xl font-bold"
      >
        {{ title?.charAt(0) || 'A' }}
      </div>
    </div>
    <div class="flex-1 min-w-0">
      <div class="font-semibold text-sm mb-1 truncate" :style="{ color: titleColor }">
        {{ title }}
      </div>
      <div class="text-xs text-gray-500 line-clamp-2">
        {{ description }}
      </div>
      <div v-if="agentId" class="text-xs text-gray-400 mt-1">
        ID: {{ agentId }}
      </div>
    </div>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  agentId: { type: String, default: "" },
  title: { type: String, default: "智能体标题" },
  description: { type: String, default: "智能体说明信息" },
  image: { type: String, default: "" },
  link: { type: String, default: "" },
  styles: { type: Object, default: () => ({}) },
});

const mergedStyles = computed(() => ({
  backgroundColor: props.styles.backgroundColor || "#ffffff",
  borderRadius: props.styles.borderRadius || "8px",
  boxShadow: props.styles.boxShadow || "0 1px 3px rgba(0,0,0,0.1)",
  cursor: props.link ? "pointer" : "default",
  ...props.styles,
}));

const titleColor = computed(() => props.styles.titleColor || "#333333");
</script>
