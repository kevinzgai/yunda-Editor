<template>
  <Modal :visible="visible" title="页面预览" @close="close">
    <div class="preview-wrapper">
      <div class="preview-phone">
        <div class="preview-head">
          <span class="text-xs text-gray-500">预览效果</span>
          <span class="text-xs text-gray-400">375 × 1000</span>
        </div>
        <div class="preview-canvas" :style="canvasStyle">
          <template v-if="widgetList.length > 0">
            <div v-for="widget in widgetList" :key="widget.id" class="preview-widget">
              <component
                :is="getWidgetComponent(widget.name)"
                v-bind="widget.props"
                :styles="widget.styles"
              />
            </div>
          </template>
          <div v-else class="empty-tip">暂无可预览内容</div>
        </div>
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
import { getWidgetComponent } from "../../registry";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  widgetList: {
    type: Array,
    default: () => [],
  },
  pageConfig: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const canvasStyle = computed(() => ({
  backgroundColor: props.pageConfig.backgroundColor || "#fff",
  backgroundImage: props.pageConfig.backgroundImage ? `url(${props.pageConfig.backgroundImage})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: props.pageConfig.padding || "0",
}));

function close() {
  emit("close");
}
</script>

<style scoped>
.preview-wrapper {
  display: flex;
  justify-content: center;
}

.preview-phone {
  width: 375px;
  max-width: 100%;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
  border: 1px solid #e5e7eb;
}

.preview-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.preview-canvas {
  min-height: 500px;
}

.preview-widget {
  border-radius: 6px;
}

.empty-tip {
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9ca3af;
  font-size: 13px;
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

.btn-outline {
  background: transparent;
  border: 1px solid #e5e7eb;
  color: #6b7280;
}

.btn-outline:hover {
  background: #f3f4f6;
}
</style>
