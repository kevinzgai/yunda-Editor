<template>
  <component
    :is="link ? 'a' : 'div'"
    class="overflow-hidden block"
    :style="mergedStyles"
    :href="link || undefined"
  >
    <video
      v-if="src"
      :src="src"
      :poster="poster || undefined"
      class="w-full h-full block"
      :controls="controls"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      playsinline
      webkit-playsinline
    />
    <div v-else class="w-full h-full min-h-150px bg-gray-200 flex justify-center items-center text-gray-400 text-12px">
      视频
    </div>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: { type: String, default: "" },
  poster: { type: String, default: "" },
  link: { type: String, default: "" },
  autoplay: { type: Boolean, default: false },
  controls: { type: Boolean, default: true },
  loop: { type: Boolean, default: false },
  muted: { type: Boolean, default: false },
  styles: { type: Object, default: () => ({}) },
});

const mergedStyles = computed(() => ({
  width: props.styles.width || "100%",
  height: props.styles.height || "210px",
  cursor: props.link ? "pointer" : "default",
  ...props.styles,
}));
</script>
