<template>
  <div class="py-2">
    <div class="mb-3">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-gray-500">标签列表</span>
        <button
          class="px-2 py-1 text-xs text-primary border border-primary rounded hover:bg-primary/10"
          @click="addTag"
        >
          + 添加标签
        </button>
      </div>
      
      <div class="space-y-2">
        <div
          v-for="(tag, tagIndex) in localTags"
          :key="tag.id"
          class="p-2 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center gap-2">
            <el-input
              v-model="tag.label"
              placeholder="标签名称"
              @input="emitChange"
              size="small"
              class="flex-1"
            />
            <div class="text-xs text-gray-400 w-16">ID: {{ tag.id }}</div>
            <el-switch
              v-model="tag.show"
              @change="emitChange"
              size="small"
              inline-prompt
              active-text="显"
              inactive-text="隐"
            />
            <button
              class="w-6 h-6 border-0 rounded cursor-pointer text-xs bg-red-500 text-white"
              @click="removeTag(tagIndex)"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="p-2 bg-blue-50 rounded text-xs text-blue-600">
      影片数据由后端根据标签ID获取，前端仅做展示
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { ElInput, ElSwitch } from "element-plus";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const localTags = ref([...props.modelValue]);

watch(() => props.modelValue, (newVal) => {
  localTags.value = JSON.parse(JSON.stringify(newVal));
}, { deep: true, immediate: true });

function emitChange() {
  emit("update:modelValue", JSON.parse(JSON.stringify(localTags.value)));
}

function addTag() {
  const newId = `tag_${Date.now()}`;
  localTags.value.push({
    id: newId,
    label: "新标签",
    show: true,
  });
  emitChange();
}

function removeTag(tagIndex) {
  if (localTags.value.length <= 1) {
    alert("至少需要保留1个标签");
    return;
  }
  localTags.value.splice(tagIndex, 1);
  emitChange();
}
</script>
