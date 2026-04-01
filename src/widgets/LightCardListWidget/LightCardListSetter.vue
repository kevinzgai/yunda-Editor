<template>
  <div class="light-card-setter">
    <div v-if="!modelValue || modelValue.length === 0" class="text-center py-4">
      <p class="text-xs text-gray-400 mb-2">暂未添加卡片</p>
      <button
        class="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90"
        @click="addCard"
      >
        添加卡片
      </button>
    </div>

    <div v-else>
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs text-gray-500">卡片列表 ({{ modelValue.length }})</span>
        <button
          class="px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90"
          @click="addCard"
        >
          + 添加
        </button>
      </div>

      <div class="space-y-3 max-h-80 overflow-y-auto">
        <div
          v-for="(card, index) in modelValue"
          :key="index"
          class="p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div class="flex justify-between items-center mb-3">
            <span class="text-xs font-medium text-gray-700">卡片 {{ index + 1 }}</span>
            <div class="flex gap-2">
              <button
                class="text-xs text-gray-500 hover:text-gray-700"
                @click="moveUp(index)"
                :disabled="index === 0"
              >
                ↑
              </button>
              <button
                class="text-xs text-gray-500 hover:text-gray-700"
                @click="moveDown(index)"
                :disabled="index === modelValue.length - 1"
              >
                ↓
              </button>
              <button
                class="text-xs text-red-500 hover:text-red-700"
                @click="removeCard(index)"
              >
                删除
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">卡片ID</label>
              <el-input
                :model-value="card.cardId"
                placeholder="卡片ID"
                size="small"
                @update:model-value="(val) => updateCard(index, 'cardId', val)"
              />
            </div>

            <div>
              <label class="block text-xs text-gray-500 mb-1">标题</label>
              <el-input
                :model-value="card.title"
                placeholder="如：光影卡"
                size="small"
                @update:model-value="(val) => updateCard(index, 'title', val)"
              />
            </div>

            <div>
              <label class="block text-xs text-gray-500 mb-1">描述</label>
              <el-input
                :model-value="card.description"
                placeholder="如：开通即享更多权益"
                size="small"
                @update:model-value="(val) => updateCard(index, 'description', val)"
              />
            </div>

            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">价格</label>
                <el-input
                  :model-value="card.price"
                  placeholder="99"
                  size="small"
                  @update:model-value="(val) => updateCard(index, 'price', val)"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">单位</label>
                <el-input
                  :model-value="card.priceUnit"
                  placeholder="/月"
                  size="small"
                  @update:model-value="(val) => updateCard(index, 'priceUnit', val)"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">按钮文案</label>
                <el-input
                  :model-value="card.buttonText"
                  placeholder="立即开通"
                  size="small"
                  @update:model-value="(val) => updateCard(index, 'buttonText', val)"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">背景图URL</label>
                <el-input
                  :model-value="card.backgroundImage"
                  placeholder="背景图"
                  size="small"
                  @update:model-value="(val) => updateCard(index, 'backgroundImage', val)"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">图标URL</label>
                <el-input
                  :model-value="card.iconImage"
                  placeholder="图标图"
                  size="small"
                  @update:model-value="(val) => updateCard(index, 'iconImage', val)"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div class="flex items-center gap-2">
                <el-switch
                  :model-value="card.showTag"
                  size="small"
                  @update:model-value="(val) => updateCard(index, 'showTag', val)"
                />
                <span class="text-xs text-gray-500">显示角标</span>
              </div>
              <div v-if="card.showTag">
                <el-input
                  :model-value="card.tagText"
                  placeholder="VIP"
                  size="small"
                  @update:model-value="(val) => updateCard(index, 'tagText', val)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElInput, ElSwitch } from "element-plus";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

function addCard() {
  const newList = [
    ...props.modelValue,
    {
      cardId: "",
      backgroundImage: "",
      iconImage: "",
      title: "光影卡",
      description: "开通即享更多权益",
      price: "99",
      priceUnit: "",
      buttonText: "立即开通",
      showPrice: true,
      showTag: true,
      tagText: "VIP",
      tagBgColor: "#ffd700",
      btnBgColor: "#ffffff",
      btnTextColor: "#667eea",
    },
  ];
  emit("update:modelValue", newList);
}

function removeCard(index) {
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
  if (index === props.modelValue.length - 1) return;
  const newList = [...props.modelValue];
  [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
  emit("update:modelValue", newList);
}

function updateCard(index, key, value) {
  const newList = props.modelValue.map((card, i) => {
    if (i === index) {
      return { ...card, [key]: value };
    }
    return card;
  });
  emit("update:modelValue", newList);
}
</script>

<style scoped>
.light-card-setter {
  padding: 4px 0;
}
</style>
