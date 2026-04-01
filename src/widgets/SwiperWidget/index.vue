<template>
  <div class="w-full" :style="mergedStyles">
    <div
      class="relative w-full h-full overflow-hidden"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div
        class="flex w-full h-full transition-transform duration-300"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex-none w-full h-full relative"
        >
          <component
            :is="image.link ? 'a' : 'div'"
            class="block w-full h-full"
            :href="image.link || undefined"
          >
            <img :src="image.src" :alt="image.alt || `幻灯片${index + 1}`" class="w-full h-full object-cover block" />
            <div v-if="image.title" class="absolute bottom-0 left-0 right-0 p-10px bg-gradient-to-t from-black/60 text-white text-14px text-center">
              {{ image.title }}
            </div>
          </component>
        </div>
      </div>

      <div v-if="showIndicator" class="absolute bottom-10px left-1/2 -translate-x-1/2 flex gap-6px">
        <span
          v-for="(_, index) in images"
          :key="index"
          class="w-8px h-8px rounded-full bg-white/50 transition-all"
          :class="{ 'w-16px rounded-4px bg-white': index === currentIndex }"
        ></span>
      </div>

      <template v-if="showArrow">
        <span class="absolute top-1/2 -translate-y-1/2 w-32px h-32px leading-32px text-center bg-black/30 text-white rounded-full text-20px cursor-pointer select-none hover:bg-black/50 left-10px" @click="prev">‹</span>
        <span class="absolute top-1/2 -translate-y-1/2 w-32px h-32px leading-32px text-center bg-black/30 text-white rounded-full text-20px cursor-pointer select-none hover:bg-black/50 right-10px" @click="next">›</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  images: {
    type: Array,
    default: () => [
      { src: "https://picsum.photos/375/200?random=1", alt: "图片1", link: "" },
      { src: "https://picsum.photos/375/200?random=2", alt: "图片2", link: "" },
      { src: "https://picsum.photos/375/200?random=3", alt: "图片3", link: "" },
    ],
  },
  height: { type: String, default: "200px" },
  showIndicator: { type: Boolean, default: true },
  showArrow: { type: Boolean, default: true },
  autoplay: { type: Boolean, default: true },
  interval: { type: Number, default: 3000 },
  radius: { type: String, default: "0" },
  styles: { type: Object, default: () => ({}) },
});

const currentIndex = ref(0);
let timer = null;
let startX = 0;
let isDragging = false;

const mergedStyles = computed(() => ({
  height: props.height,
  borderRadius: props.radius,
  overflow: "hidden",
  ...props.styles,
}));

function startAutoplay() {
  if (props.autoplay && props.images.length > 1) {
    timer = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % props.images.length;
    }, props.interval);
  }
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function prev() {
  stopAutoplay();
  currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1;
  startAutoplay();
}

function next() {
  stopAutoplay();
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
  startAutoplay();
}

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  isDragging = true;
  stopAutoplay();
}

function handleTouchMove(e) {
  if (!isDragging) return;
}

function handleTouchEnd(e) {
  if (!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) next();
    else prev();
  } else {
    startAutoplay();
  }
  isDragging = false;
}

onMounted(() => startAutoplay());
onUnmounted(() => stopAutoplay());
</script>
