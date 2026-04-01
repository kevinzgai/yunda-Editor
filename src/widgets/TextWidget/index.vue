<template>
  <component
    :is="link ? 'a' : 'div'"
    class="break-words"
    :style="mergedStyles"
    :href="link || undefined"
  >
    {{ text }}
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: { type: String, default: "文本" },
  link: { type: String, default: "" },
  styles: { type: Object, default: () => ({}) },
});

const mergedStyles = computed(() => ({
  fontSize: props.styles.fontSize || "14px",
  color: props.styles.color || "#333",
  padding: props.styles.padding || "8px",
  textDecoration: props.link ? "underline" : "none",
  cursor: props.link ? "pointer" : "default",
  ...props.styles,
}));
</script>
