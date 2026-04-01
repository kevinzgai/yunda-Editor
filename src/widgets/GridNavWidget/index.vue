<template>
  <div class="w-full" :style="mergedStyles">
    <div
      v-if="showTitle && title"
      class="px-12px pt-12px pb-8px text-14px font-medium text-gray-800"
    >
      {{ title }}
    </div>
    <div class="flex flex-wrap w-full" :style="{ padding: '8px' }">
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
          <div
            class="flex justify-center items-center mb-6px rounded-full overflow-hidden"
            :style="iconStyle"
          >
            <img
              v-if="item.icon"
              :src="item.icon"
              :alt="item.name"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex justify-center items-center bg-gradient-to-br from-primary to-purple-400 text-white text-16px font-bold"
            >
              {{ item.name.charAt(0) }}
            </div>
          </div>
          <div class="text-12px text-gray-800 text-center leading-relaxed">
            {{ item.name }}
          </div>
        </component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "热门功能",
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: () => [
      { name: "影讯", icon: "", link: "" },
      { name: "找影院", icon: "", link: "" },
      { name: "演出", icon: "", link: "" },
      { name: "赛事", icon: "", link: "" },
    ],
  },
  columns: { type: Number, default: 4 },
  iconSize: { type: String, default: "44px" },
  backgroundColor: { type: String, default: "#ffffff" },
  styles: { type: Object, default: () => ({}) },
});

const mergedStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
  ...props.styles,
}));

const iconStyle = computed(() => ({
  width: props.iconSize || "44px",
  height: props.iconSize || "44px",
}));
</script>
