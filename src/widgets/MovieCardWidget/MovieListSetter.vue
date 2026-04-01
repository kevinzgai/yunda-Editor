<template>
  <div class="py-2">
    <div class="mb-3">
      <div
        v-for="(movie, index) in modelValue"
        :key="index"
        class="flex gap-2 p-2 bg-gray-100 rounded-lg mb-2"
      >
        <div class="shrink-0 w-16 h-20 rounded overflow-hidden bg-gray-200">
          <img
            v-if="movie.poster"
            :src="movie.poster"
            :alt="movie.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex justify-center items-center text-gray-400 text-xs">
            暂无图片
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <el-input
            v-model="movie.name"
            placeholder="电影名称"
            @change="handleChange"
            size="small"
          />
          <el-input
            v-model="movie.poster"
            placeholder="海报地址"
            @change="handleChange"
            size="small"
          />
          <div class="flex gap-1">
            <el-input
              v-model="movie.rating"
              placeholder="评分"
              @change="handleChange"
              size="small"
              style="width: 60px;"
            />
            <el-input
              v-model="movie.wantSeeUsers"
              placeholder="想看人数"
              @change="handleChange"
              size="small"
              style="flex: 1;"
            />
          </div>
          <el-input
            v-model="movie.link"
            placeholder="跳转链接(可选)"
            @change="handleChange"
            size="small"
          />
        </div>
        <div class="flex flex-col gap-1">
          <button
            class="w-6 h-6 border-0 rounded cursor-pointer text-xs bg-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            @click="moveUp(index)"
            :disabled="index === 0"
          >↑</button>
          <button
            class="w-6 h-6 border-0 rounded cursor-pointer text-xs bg-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            @click="moveDown(index)"
            :disabled="index === modelValue.length - 1"
          >↓</button>
          <button
            class="w-6 h-6 border-0 rounded cursor-pointer text-xs bg-red-500 text-white"
            @click="remove(index)"
          >×</button>
        </div>
      </div>
    </div>
    <button
      class="w-full py-2 border border-dashed border-gray-300 bg-white rounded cursor-pointer text-gray-600 text-xs hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
      @click="add"
      :disabled="!canAdd"
    >
      + 添加电影
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ElInput } from "element-plus";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  max: {
    type: Number,
    default: 20,
  },
  min: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:modelValue"]);

const canAdd = computed(() => props.modelValue.length < props.max);

function handleChange() {
  emit("update:modelValue", [...props.modelValue]);
}

function add() {
  const newList = [
    ...props.modelValue,
    {
      id: `movie_${Date.now()}`,
      name: "新电影",
      poster: "",
      rating: "",
      wantSeeUsers: "",
      releaseDate: "",
      link: "",
    },
  ];
  emit("update:modelValue", newList);
}

function remove(index) {
  if (props.modelValue.length <= props.min) {
    alert(`至少需要保留 ${props.min} 个电影`);
    return;
  }
  const newList = props.modelValue.filter((_, i) => i !== index);
  emit("update:modelValue", newList);
}

function moveUp(index) {
  if (index === 0) return;
  const newList = [...props.modelValue];
  [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
  emit("update:modelValue", newList);
}

function moveDown(index) {
  if (props.modelValue.length - 1 === index) return;
  const newList = [...props.modelValue];
  [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
  emit("update:modelValue", newList);
}
</script>
