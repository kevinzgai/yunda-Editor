<template>
  <div class="hotspot-setter">
    <div v-if="!modelValue || modelValue.length === 0" class="text-center py-4">
      <p class="text-xs text-gray-400 mb-2">暂未添加热区</p>
      <button
        class="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90"
        @click="addHotspot"
      >
        添加热区
      </button>
    </div>

    <div v-else>
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs text-gray-500">热区列表 ({{ modelValue.length }})</span>
        <button
          class="px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90"
          @click="addHotspot"
        >
          + 添加
        </button>
      </div>

      <div class="space-y-2 max-h-60 overflow-y-auto">
        <div
          v-for="(spot, index) in modelValue"
          :key="index"
          class="p-2 bg-gray-50 rounded border border-gray-200"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-medium text-gray-700">热区 {{ index + 1 }}</span>
            <button
              class="text-xs text-red-500 hover:text-red-700"
              @click="removeHotspot(index)"
            >
              删除
            </button>
          </div>

          <div class="space-y-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">名称</label>
              <el-input
                :model-value="spot.text"
                placeholder="热区名称"
                size="small"
                @update:model-value="(val) => updateSpot(index, 'text', val)"
              />
            </div>

            <div>
              <label class="block text-xs text-gray-500 mb-1">链接</label>
              <el-input
                :model-value="spot.link"
                placeholder="跳转链接"
                size="small"
                @update:model-value="(val) => updateSpot(index, 'link', val)"
              />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">X (%)</label>
                <el-input-number
                  :model-value="spot.x"
                  :min="0"
                  :max="100"
                  size="small"
                  class="w-full"
                  @update:model-value="(val) => updateSpot(index, 'x', val)"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Y (%)</label>
                <el-input-number
                  :model-value="spot.y"
                  :min="0"
                  :max="100"
                  size="small"
                  class="w-full"
                  @update:model-value="(val) => updateSpot(index, 'y', val)"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">宽度 (%)</label>
                <el-input-number
                  :model-value="spot.width"
                  :min="1"
                  :max="100"
                  size="small"
                  class="w-full"
                  @update:model-value="(val) => updateSpot(index, 'width', val)"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">高度 (%)</label>
                <el-input-number
                  :model-value="spot.height"
                  :min="1"
                  :max="100"
                  size="small"
                  class="w-full"
                  @update:model-value="(val) => updateSpot(index, 'height', val)"
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
import { ElInput, ElInputNumber } from "element-plus";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

function addHotspot() {
  const newList = [
    ...props.modelValue,
    { x: 10, y: 10, width: 20, height: 8, text: `热区${props.modelValue.length + 1}`, link: "" },
  ];
  emit("update:modelValue", newList);
}

function removeHotspot(index) {
  const newList = props.modelValue.filter((_, i) => i !== index);
  emit("update:modelValue", newList);
}

function updateSpot(index, key, value) {
  const newList = props.modelValue.map((spot, i) => {
    if (i === index) {
      return { ...spot, [key]: value };
    }
    return spot;
  });
  emit("update:modelValue", newList);
}
</script>

<style scoped>
.hotspot-setter {
  padding: 4px 0;
}
</style>
