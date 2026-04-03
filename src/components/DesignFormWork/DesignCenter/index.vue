<template>
  <div class="flex-1 overflow-auto flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50">
    <!-- 工具栏 -->
    <div class="flex justify-center gap-3 bg-white border-b border-gray-200 px-4 py-2">
      <button class="px-4 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors" @click="handleExport">导出</button>
      <button class="px-4 py-1.5 text-sm bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition-colors" @click="handlePreview">预览</button>
      <button class="px-4 py-1.5 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors" @click="handleClear">清空</button>
    </div>

    <!-- 预览区 -->
    <div class="flex-1 overflow-auto flex justify-center">
      <div class="py-5">
        <div class="w-375px bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden">
          <div class="flex justify-between items-center px-4 py-2 bg-gray-50">
            <span class="text-xs text-gray-500">预览</span>
            <span class="text-xs text-gray-400">375 × 1000</span>
          </div>
          <div
            class="relative min-h-192 p-2"
            :style="canvasStyle"
            @dragover.prevent="handleDragOver"
            @drop="handleDrop"
            @click="handleCanvasClick"
          >
            <div
              v-for="widget in widgetList"
              :key="widget.id"
              class="relative cursor-pointer rounded transition-all"
              :class="{ 'ring-2 ring-primary ring-offset-2': selectedWidget?.id === widget.id }"
              @click.stop="handleWidgetClick(widget.id)"
            >
              <component
                :is="getWidgetComponent(widget.name)"
                v-if="widget.name === 'HotspotWidget'"
                v-bind="widget.props"
                :styles="widget.styles"
                @update:hotspots="(hotspots) => editorStore.updateWidgetProps(widget.id, { hotspots })"
              />
              <component
                :is="getWidgetComponent(widget.name)"
                v-else
                v-bind="widget.props"
                :styles="widget.styles"
              />
              <div v-if="selectedWidget?.id === widget.id" class="absolute -top-7 right-0 flex gap-1 bg-primary rounded-lg p-1">
                <span class="px-2 py-1 text-xs text-white bg-white/20 rounded cursor-pointer hover:bg-white/30 transition-colors" @click="handleMoveUp(widget.id)">↑</span>
                <span class="px-2 py-1 text-xs text-white bg-white/20 rounded cursor-pointer hover:bg-white/30 transition-colors" @click="handleMoveDown(widget.id)">↓</span>
                <span class="px-2 py-1 text-xs text-white bg-red-500 rounded cursor-pointer hover:bg-red-600 transition-colors" @click="handleDelete(widget.id)">×</span>
              </div>
            </div>

            <div v-if="widgetList.length === 0" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p class="text-sm text-gray-400 mb-2">从左侧拖拽组件到这里</p>
              <p class="text-xs text-gray-300">或双击组件直接添加</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 导出弹窗 -->
    <ExportModal
      :visible="showExportModal"
      :data="exportData"
      @close="showExportModal = false"
    />

    <PreviewModal
      :visible="showPreviewModal"
      :widget-list="widgetList"
      :page-config="pageConfig"
      @close="showPreviewModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useEditorStore } from "../../../store/editor";
import { widgetComponents } from "../../../registry";
import ExportModal from "../../ExportModal/index.vue";
import PreviewModal from "../../PreviewModal/index.vue";

const editorStore = useEditorStore();
const showExportModal = ref(false);
const showPreviewModal = ref(false);

const widgetList = computed(() => editorStore.widgetList);
const selectedWidget = computed(() => editorStore.selectedWidget);
const pageConfig = computed(() => editorStore.pageConfig);
const exportData = computed(() => editorStore.exportData());

function getWidgetComponent(name) {
  return widgetComponents[name];
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
}

function handleDrop(e) {
  e.preventDefault();
  const widgetData = e.dataTransfer.getData("widget");
  if (widgetData) {
    const widget = JSON.parse(widgetData);
    editorStore.addWidget(widget);
  }
}

function handleCanvasClick() {
  editorStore.selectWidget(null);
}

function handleWidgetClick(id) {
  editorStore.selectWidget(id);
}

function handleDelete(id) {
  editorStore.removeWidget(id);
}

function handleMoveUp(id) {
  const list = [...widgetList.value];
  const index = list.findIndex((w) => w.id === id);
  if (index > 0) {
    [list[index - 1], list[index]] = [list[index], list[index - 1]];
    editorStore.reorderWidgets(list);
  }
}

function handleMoveDown(id) {
  const list = [...widgetList.value];
  const index = list.findIndex((w) => w.id === id);
  if (index < list.length - 1) {
    [list[index], list[index + 1]] = [list[index + 1], list[index]];
    editorStore.reorderWidgets(list);
  }
}

function handleExport() {
  showExportModal.value = true;
}

function handlePreview() {
  showPreviewModal.value = true;
}

function handleClear() {
  if (confirm("确定要清空画布吗？")) {
    editorStore.clearCanvas();
  }
}

const canvasStyle = computed(() => ({
  backgroundColor: pageConfig.value.backgroundColor || '#fff',
  backgroundImage: pageConfig.value.backgroundImage ? `url(${pageConfig.value.backgroundImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: pageConfig.value.padding || '0',
}));
</script>
