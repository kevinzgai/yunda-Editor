<template>
  <div class="app">
    <VisualEditor />
    
    <div class="toolbar">
      <button class="toolbar-btn export" @click="showExportModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-18px h-18px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        导出 JSON
      </button>
      <button class="toolbar-btn clear" @click="handleClear">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-18px h-18px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        清空画布
      </button>
    </div>

    <ExportModal 
      :visible="showExportModal" 
      :data="exportData" 
      @close="showExportModal = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { VisualEditor, useEditorStore } from "./index.js";
import ExportModal from "./components/ExportModal/index.vue";

const editorStore = useEditorStore();
const showExportModal = ref(false);

const exportData = computed(() => editorStore.exportData());

function handleClear() {
  if (confirm("确定要清空画布吗？")) {
    editorStore.clearCanvas();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Fira+Sans:wght@300;400;500;600;700&display=swap');

* { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
}

body {
  font-family: 'Fira Sans', sans-serif;
  background: #f5f3ff;
}

.app { 
  width: 100vw; 
  height: 100vh; 
  overflow: hidden; 
}

.toolbar {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 12px;
  z-index: 1000;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toolbar-btn.export {
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
  color: #fff;
}

.toolbar-btn.export:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.toolbar-btn.clear {
  background: #fff;
  color: #1e1b4b;
  border: 1px solid #e5e7eb;
}

.toolbar-btn.clear:hover {
  background: #f9fafb;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
</style>
