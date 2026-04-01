<template>
  <div class="flex flex-wrap w-full" :style="mergedStyles">
    <div
      v-for="(item, index) in items"
      :key="`${item.name}-${index}`"
      class="flex justify-center p-8px box-border"
      :style="{ width: `${100 / columns}%` }"
    >
      <component
        :is="item.link ? 'a' : 'div'"
        class="flex flex-col items-center cursor-pointer"
        :href="item.link || undefined"
      >
        <div class="flex justify-center items-center mb-6px rounded-full overflow-hidden" :style="iconStyle">
          <img v-if="item.icon" :src="item.icon" :alt="item.name" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex justify-center items-center bg-gradient-to-br from-primary to-purple-400 text-white text-16px font-bold">
            {{ item.name.charAt(0) }}
          </div>
        </div>
        <div class="text-12px text-gray-800 text-center leading-relaxed">{{ item.name }}</div>
      </component>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { name: "功能1", icon: "", link: "" },
      { name: "功能2", icon: "", link: "" },
      { name: "功能3", icon: "", link: "" },
      { name: "功能4", icon: "", link: "" },
    ],
  },
  columns: { type: Number, default: 4 },
  styles: { type: Object, default: () => ({}) },
});

const mergedStyles = computed(() => ({
  backgroundColor: props.styles.backgroundColor || "#ffffff",
  padding: props.styles.padding || "16px 8px",
  ...props.styles,
}));

const iconStyle = computed(() => ({
  width: props.styles.iconSize || "40px",
  height: props.styles.iconSize || "40px",
}));
</script>
