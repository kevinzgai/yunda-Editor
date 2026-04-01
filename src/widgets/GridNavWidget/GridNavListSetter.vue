<template>
  <div class="py-2">
    <div class="mb-3">
      <div
        v-for="(item, index) in modelValue"
        :key="index"
        class="flex gap-2 p-2 bg-gray-100 rounded-lg mb-2"
      >
        <div class="flex-1 flex flex-col gap-1">
          <div class="w-8 h-8 shrink-0 rounded-full overflow-hidden">
            <img v-if="item.icon" :src="item.icon" alt="" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex justify-center items-center bg-gradient-to-br from-primary to-purple-400 text-white text-xs font-bold">{{ item.name?.charAt(0) || '?' }}</div>
          </div>
          <el-input
            v-model="item.name"
            placeholder="名称"
            @change="handleChange"
            size="small"
          />
          <el-input
            v-model="item.icon"
            placeholder="图标地址(可选)"
            @change="handleChange"
            size="small"
          />
          <el-input
            v-model="item.link"
            placeholder="跳转链接(可选)"
            @change="handleChange"
            size="small"
          />
        </div>
        <div class="flex flex-col gap-1">
          <button class="w-6 h-6 border-0 rounded cursor-pointer text-xs bg-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed" @click="moveUp(index)" :disabled="index === 0">↑</button>
          <button class="w-6 h-6 border-0 rounded cursor-pointer text-xs bg-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed" @click="moveDown(index)" :disabled="index === modelValue.length - 1">↓</button>
          <button class="w-6 h-6 border-0 rounded cursor-pointer text-xs bg-red-500 text-white" @click="remove(index)">×</button>
        </div>
      </div>
    </div>
    <button class="w-full py-2 border border-dashed border-gray-300 bg-white rounded cursor-pointer text-gray-600 text-xs hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed" @click="add" :disabled="!canAdd">
      + 添加导航项
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
    default: 12,
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
  const newList = [...props.modelValue, { name: "新功能", icon: "", link: "" }];
  emit("update:modelValue", newList);
}

function remove(index) {
  if (props.modelValue.length <= props.min) {
    alert(`至少需要保留 ${props.min} 个导航项`);
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
