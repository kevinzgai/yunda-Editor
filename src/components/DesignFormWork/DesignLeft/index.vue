<template>
  <div class="w-60 bg-white border-r border-gray-200 flex flex-col h-full">
    <div class="px-4 py-4 border-b border-gray-200">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        <span class="text-sm font-semibold text-gray-800">可视化编辑器</span>
      </div>
    </div>

    <div class="flex-1 overflow-hidden">
      <el-tabs v-model="activeTab" class="h-full">
        <el-tab-pane label="组件" name="components" class="h-full">
          <div class="filter-tabs flex p-2 gap-2 flex-wrap">
            <span
              v-for="cat in categories"
              :key="cat.value"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-all"
              :class="currentCategory === cat.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              @click="currentCategory = cat.value"
            >
              {{ cat.label }}
            </span>
          </div>

          <div class="widget-list p-3 grid grid-cols-2 gap-2 overflow-auto" style="max-height: calc(100vh - 180px);">
            <div
              v-for="widget in filteredWidgets"
              :key="widget.name"
              class="flex flex-col items-center p-3 bg-gray-50 rounded-lg cursor-grab transition-all hover:bg-gray-100 hover:shadow-md hover:shadow-primary/10"
              draggable="true"
              @dragstart="handleDragStart($event, widget)"
              @dblclick="handleDoubleClick(widget)"
            >
              <span class="text-xl font-bold text-primary mb-1">{{ widget.icon }}</span>
              <span class="text-xs text-gray-600">{{ widget.title }}</span>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="图层" name="layers">
          <div class="p-2">
            <div
              v-for="(widget, index) in widgetList"
              :key="widget.id"
              class="flex items-center p-2 mb-1 rounded cursor-pointer transition-all hover:bg-gray-100"
              :class="{ 'bg-primary/10 border-l-2 border-primary': selectedWidget?.id === widget.id }"
              @click="handleSelectLayer(widget.id)"
            >
              <span class="w-5 text-xs font-bold text-primary">{{ getWidgetIcon(widget.name) }}</span>
              <span class="flex-1 text-xs text-gray-700">{{ widget.title || widget.name }}</span>
              <span 
                class="text-xs text-red-500 opacity-0 hover:opacity-100 transition-opacity cursor-pointer" 
                @click.stop="handleDelete(widget.id)"
              >
                删除
              </span>
            </div>
            <div v-if="widgetList.length === 0" class="text-center text-gray-400 text-xs py-5">
              暂无组件
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useEditorStore } from "../../../store/editor";
import { widgetMetas, createWidget } from "../../../registry";

const editorStore = useEditorStore();
const activeTab = ref("components");
const currentCategory = ref("all");

const categories = [
  { label: "全部", value: "all" },
  { label: "基础", value: "base" },
  { label: "媒体", value: "media" },
  { label: "业务", value: "business" },
];

const filteredWidgets = computed(() => {
  if (currentCategory.value === "all") {
    return widgetMetas;
  }
  return widgetMetas.filter((w) => w.category === currentCategory.value);
});

const widgetList = computed(() => editorStore.widgetList);
const selectedWidget = computed(() => editorStore.selectedWidget);

function getWidgetIcon(name) {
  return widgetMetas.find((w) => w.name === name)?.icon || "?";
}

function handleDragStart(e, widget) {
  const widgetInstance = createWidget(widget.name);
  e.dataTransfer.setData("widget", JSON.stringify(widgetInstance));
  e.dataTransfer.effectAllowed = "copy";
}

function handleDoubleClick(widget) {
  const widgetInstance = createWidget(widget.name);
  editorStore.addWidget(widgetInstance);
}

function handleSelectLayer(id) {
  editorStore.selectWidget(id);
}

function handleDelete(id) {
  editorStore.removeWidget(id);
}
</script>

<style scoped>
:deep(.el-tabs__header) {
  margin: 0;
  padding: 0 0.75rem;
}

:deep(.el-tabs__item) {
  font-size: 13px;
  color: #6b7280;
}

:deep(.el-tabs__item.is-active) {
  color: #6366f1;
}

:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__content) {
  height: calc(100% - 40px);
  overflow: hidden;
}

:deep(.el-tab-pane) {
  height: 100%;
  overflow: auto;
}
</style>
