<template>
  <Modal :visible="visible" title="导出 JSON 数据" @close="close">
    <div class="json-export-content">
      <div class="json-preview">
        <pre class="json-code">{{ formattedJson }}</pre>
      </div>
      <div class="export-actions">
        <button class="btn btn-primary" @click="copyToClipboard">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          复制到剪贴板
        </button>
        <button class="btn btn-secondary" @click="downloadJson">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          下载文件
        </button>
      </div>
    </div>
    <template #footer>
      <button class="btn btn-outline" @click="close">关闭</button>
    </template>
  </Modal>
</template>

<script setup>
import { computed } from "vue";
import Modal from "../Modal/index.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const formattedJson = computed(() => JSON.stringify(props.data, null, 2));

function close() {
  emit("close");
}

function copyToClipboard() {
  navigator.clipboard.writeText(formattedJson.value).then(() => {
    alert("已复制到剪贴板！");
  }).catch(() => {
    alert("复制失败，请手动复制");
  });
}

function downloadJson() {
  const blob = new Blob([formattedJson.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `page-config-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<style scoped>
.json-export-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.json-preview {
  background: #1e1b4b;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow: auto;
  max-height: 20rem;
}

.json-code {
  margin: 0;
  font-family: "Fira Code", monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: #e0e7ff;
  white-space: pre-wrap;
  word-break: break-all;
}

.export-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #6366f1;
  color: #fff;
}

.btn-primary:hover {
  background: #4f46e5;
}

.btn-secondary {
  background: #f5f3ff;
  color: #6366f1;
}

.btn-secondary:hover {
  background: #ede9fe;
}

.btn-outline {
  background: transparent;
  border: 1px solid #e5e7eb;
  color: #6b7280;
}

.btn-outline:hover {
  background: #f3f4f6;
}
</style>
