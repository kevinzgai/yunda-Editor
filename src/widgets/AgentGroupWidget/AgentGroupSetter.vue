<template>
  <div class="py-2">
    <div class="mb-3">
      <div
        v-for="(item, index) in modelValue"
        :key="index"
        class="flex gap-2 p-2 bg-gray-100 rounded-lg mb-2"
        :class="{ 'opacity-50': item.visible === false }"
      >
        <div class="w-12 h-12 shrink-0">
          <img
            v-if="item.avatar"
            :src="item.avatar"
            alt=""
            class="w-full h-full object-cover rounded-full"
          />
          <div
            v-else
            class="w-full h-full flex justify-center items-center bg-gradient-to-br from-primary to-purple-400 rounded-full text-white text-sm font-bold"
          >
            {{ item.name?.charAt(0) || '?' }}
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <el-input
              v-model="item.name"
              placeholder="智能体名称"
              @change="handleChange"
              size="small"
              class="flex-1"
            />
            <el-switch
              v-model="item.visible"
              @change="handleChange"
              size="small"
              inline-prompt
              active-text="显"
              inactive-text="隐"
            />
          </div>
          <el-input
            v-model="item.avatar"
            placeholder="头像地址(可选)"
            @change="handleChange"
            size="small"
          />
          <el-input-number
            v-model="item.chatCount"
            placeholder="对话数量"
            @change="handleChange"
            size="small"
            :min="0"
            class="w-full"
          />
          <el-input
            v-model="item.link"
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
          >
            ↑
          </button>
          <button
            class="w-6 h-6 border-0 rounded cursor-pointer text-xs bg-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            @click="moveDown(index)"
            :disabled="index === modelValue.length - 1"
          >
            ↓
          </button>
          <button
            class="w-6 h-6 border-0 rounded cursor-pointer text-xs bg-red-500 text-white"
            @click="remove(index)"
          >
            ×
          </button>
        </div>
      </div>
    </div>
    <button
      class="w-full py-2 border border-dashed border-gray-300 bg-white rounded cursor-pointer text-gray-600 text-xs hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
      @click="add"
      :disabled="!canAdd"
    >
      + 添加智能体
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ElInput, ElInputNumber, ElSwitch } from "element-plus";

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
    { name: "新智能体", avatar: "", chatCount: 0, link: "", visible: true },
  ];
  emit("update:modelValue", newList);
}

function remove(index) {
  if (props.modelValue.length <= props.min) {
    alert(`至少需要保留 ${props.min} 个智能体`);
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
