<template>
  <component 
    :is="link ? 'a' : tag" 
    class="m-0" 
    :style="mergedStyles" 
    :href="link || undefined"
  >
    {{ text }}
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: { type: String, default: "标题" },
  level: { type: [Number, String], default: 1 },
  link: { type: String, default: "" },
  styles: { type: Object, default: () => ({}) },
});

const tag = computed(() => `h${props.level}`);

const mergedStyles = computed(() => ({
  fontWeight: props.styles.fontWeight || "bold",
  color: props.styles.color || "#333",
  padding: props.styles.padding || "8px 0",
  textDecoration: props.link ? "underline" : "none",
  cursor: props.link ? "pointer" : "default",
  ...props.styles,
}));
</script>
