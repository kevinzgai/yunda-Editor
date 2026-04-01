<template>
  <component
    :is="link ? 'a' : 'div'"
    class="overflow-hidden block"
    :style="mergedStyles"
    :href="link || undefined"
  >
    <img v-if="src" :src="src" :alt="alt" class="w-full h-full object-cover block" />
    <div v-else class="w-full h-150px bg-gray-200 flex justify-center items-center text-gray-400 text-12px">
      图片
    </div>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: { type: String, default: "" },
  alt: { type: String, default: "图片" },
  link: { type: String, default: "" },
  styles: { type: Object, default: () => ({}) },
});

const mergedStyles = computed(() => ({
  width: props.styles.width || "100%",
  height: props.styles.height || "auto",
  cursor: props.link ? "pointer" : "default",
  ...props.styles,
}));
</script>
