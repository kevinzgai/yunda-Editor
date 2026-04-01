<template>
  <component
    :is="link ? 'a' : 'button'"
    class="border-none cursor-pointer text-14px inline-block"
    :class="type === 'primary' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'"
    :style="mergedStyles"
    :href="link || undefined"
  >
    {{ text }}
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: { type: String, default: "按钮" },
  type: { type: String, default: "primary" },
  link: { type: String, default: "" },
  styles: { type: Object, default: () => ({}) },
});

const mergedStyles = computed(() => ({
  padding: props.styles.padding || "10px 20px",
  borderRadius: props.styles.borderRadius || "4px",
  textDecoration: "none",
  ...props.styles,
}));
</script>
