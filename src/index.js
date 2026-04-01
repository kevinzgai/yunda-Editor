/**
 * 轻量级可视化拖拽编辑器
 */

export { default as VisualEditor } from "./components/DesignFormWork/index.vue";
export { useEditorStore } from "./store/editor";
export { default as TextWidget } from "./widgets/TextWidget/index.vue";
export { default as ImageWidget } from "./widgets/ImageWidget/index.vue";
export { default as ButtonWidget } from "./widgets/ButtonWidget/index.vue";
export { default as TitleWidget } from "./widgets/TitleWidget/index.vue";

export const widgetRegistry = [
  { name: "TextWidget", title: "文本", icon: "T" },
  { name: "ImageWidget", title: "图片", icon: "I" },
  { name: "ButtonWidget", title: "按钮", icon: "B" },
  { name: "TitleWidget", title: "标题", icon: "H" },
];
