<template>
  <div class="py-2">
    <div class="mb-3">
      <div
        v-for="(item, index) in modelValue"
        :key="index"
        class="flex gap-2 p-2 bg-gray-100 rounded-lg mb-2"
        :class="{ 'opacity-50': item.visible === false }"
      >
        <div class="w-15 h-15 shrink-0">
          <img
            v-if="item.image"
            :src="item.image"
            alt=""
            class="w-full h-full object-cover rounded"
          />
          <div
            v-else
            class="w-full h-full flex justify-center items-center bg-gray-200 rounded text-xs text-gray-400"
          >
            商品图片
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <el-input
              v-model="item.title"
              placeholder="商品标题"
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
            v-model="item.description"
            placeholder="商品描述"
            @change="handleChange"
            size="small"
          />
          <div class="flex gap-1">
            <el-input
              v-model="item.price"
              placeholder="价格"
              @change="handleChange"
              size="small"
            >
              <template #prepend>¥</template>
            </el-input>
            <el-input-number
              v-model="item.sales"
              placeholder="销量"
              @change="handleChange"
              size="small"
              :min="0"
              class="w-24"
            />
          </div>
          <el-input
            v-model="item.image"
            placeholder="图片地址"
            @change="handleChange"
            size="small"
          />
          <el-input
            v-model="item.link"
            placeholder="跳转链接 (可选)"
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
      + 添加商品
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
    { title: "新商品", description: "商品描述", price: "0", sales: 0, image: "", link: "", visible: true },
  ];
  emit("update:modelValue", newList);
}

function remove(index) {
  if (props.modelValue.length <= props.min) {
    alert(`至少需要保留 ${props.min} 个商品`);
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
