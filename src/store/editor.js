/**
 * 可视化拖拽编辑器 - 核心 Store
 */
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useEditorStore = defineStore("editor", () => {
  // ==================== 状态 ====================
  const widgetList = ref([]);
  const selectedWidget = ref(null);
  const isDragging = ref(false);
  const pageConfig = ref({
    backgroundColor: "#f5f5f5",
    backgroundImage: "",
    padding: "0",
  });

  // ==================== Getters ====================
  const hasSelected = computed(() => selectedWidget.value !== null);
  const widgetCount = computed(() => widgetList.value.length);

  // ==================== Actions ====================

  // 添加组件
  function addWidget(widget) {
    const newWidget = {
      id: generateId(),
      ...widget,
      props: widget.props || {},
      styles: widget.styles || {},
    };
    widgetList.value.push(newWidget);
    selectWidget(newWidget.id);
    return newWidget;
  }

  // 删除组件
  function removeWidget(id) {
    const index = widgetList.value.findIndex((w) => w.id === id);
    if (index > -1) {
      widgetList.value.splice(index, 1);
      if (selectedWidget.value?.id === id) {
        selectedWidget.value = null;
      }
    }
  }

  // 选中组件
  function selectWidget(id) {
    selectedWidget.value = id
      ? widgetList.value.find((w) => w.id === id) || null
      : null;
  }

  // 更新属性
  function updateWidgetProps(id, props) {
    const widget = widgetList.value.find((w) => w.id === id);
    if (widget) {
      widget.props = { ...widget.props, ...props };
    }
  }

  // 更新样式
  function updateWidgetStyles(id, styles) {
    const widget = widgetList.value.find((w) => w.id === id);
    if (widget) {
      widget.styles = { ...widget.styles, ...styles };
    }
  }

  // 更新组件
  function updateWidget(id, data) {
    const widget = widgetList.value.find((w) => w.id === id);
    if (widget) {
      Object.assign(widget, data);
    }
  }

  // 重新排序组件
  function reorderWidgets(newList) {
    widgetList.value = [...newList];
    if (selectedWidget.value) {
      selectedWidget.value =
        widgetList.value.find((w) => w.id === selectedWidget.value.id) || null;
    }
  }

  // 清空画布
  function clearCanvas() {
    widgetList.value = [];
    selectedWidget.value = null;
  }

  // 初始化
  function init(data) {
    widgetList.value = data?.widgetList || [];
    selectedWidget.value = null;
  }

  // 导出数据
  function exportData() {
    return {
      version: "1.0.0",
      pageConfig: pageConfig.value,
      widgetList: widgetList.value,
    };
  }

  // 更新页面配置
  function updatePageConfig(config) {
    pageConfig.value = { ...pageConfig.value, ...config };
  }

  return {
    widgetList,
    selectedWidget,
    isDragging,
    hasSelected,
    widgetCount,
    pageConfig,
    addWidget,
    removeWidget,
    selectWidget,
    updateWidgetProps,
    updateWidgetStyles,
    updateWidget,
    reorderWidgets,
    clearCanvas,
    init,
    exportData,
    updatePageConfig,
  };
});

function generateId() {
  return "widget_" + Date.now() + "_" + Math.random().toString(36).slice(2, 11);
}
