<template>
  <div class="w-full" :style="mergedStyles">
    <!-- 标题栏 -->
    <div class="flex items-center justify-between px-12px py-10px">
      <div class="flex items-center">
        <span class="text-16px font-bold text-gray-800">{{ title }}</span>
      </div>
      <component
        v-if="showMore"
        :is="moreLink ? 'a' : 'div'"
        class="flex items-center text-12px text-gray-500"
        :href="moreLink || undefined"
      >
        <span>查看更多</span>
        <span class="text-10px ml-1">›</span>
      </component>
    </div>

    <!-- 横向滚动电影列表 -->
    <div class="overflow-x-auto">
      <div class="flex gap-10px px-12px pb-12px" style="width: max-content;">
        <div
          v-for="movie in displayMovies"
          :key="movie.id"
          class="shrink-0"
          :style="{ width: '100px' }"
        >
          <component
            :is="movie.link ? 'a' : 'div'"
            class="block cursor-pointer"
            :href="movie.link || undefined"
          >
            <!-- 海报 -->
            <div class="relative w-full" :style="{ height: '133px' }">
              <img
                :src="movie.poster"
                :alt="movie.name"
                class="w-full h-full object-cover rounded-lg"
              />
              <!-- 评分 -->
              <div
                v-if="movie.rating"
                class="absolute top-6px right-6px bg-black/60 text-white text-10px px-6px py-2px rounded"
              >
                {{ movie.rating }}
              </div>
            </div>
            <!-- 电影名称 -->
            <div class="mt-6px text-12px text-gray-800 text-center truncate">
              {{ movie.name }}
            </div>
            <!-- 想看人数 -->
            <div
              v-if="movie.wantSeeUsers"
              class="text-10px text-gray-400 text-center"
            >
              {{ movie.wantSeeUsers }}想看
            </div>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "热映电影",
  },
  showMore: {
    type: Boolean,
    default: true,
  },
  moreLink: {
    type: String,
    default: "",
  },
  movies: {
    type: Array,
    default: () => [
      {
        id: "1",
        name: "电影名称",
        poster: "https://picsum.photos/200/267?random=1",
        rating: "8.5",
        wantSeeUsers: "6.7万",
        releaseDate: "",
        link: "",
      },
      {
        id: "2",
        name: "电影名称2",
        poster: "https://picsum.photos/200/267?random=2",
        rating: "9.0",
        wantSeeUsers: "8.2万",
        releaseDate: "",
        link: "",
      },
    ],
  },
  count: {
    type: Number,
    default: 10,
  },
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
});

const mergedStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
  ...props.styles,
}));

const displayMovies = computed(() => {
  return props.movies.slice(0, props.count);
});
</script>
