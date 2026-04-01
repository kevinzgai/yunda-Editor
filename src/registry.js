/**
 * 组件注册表
 *
 * 统一管理所有可用组件
 */
import TextWidget from "./widgets/TextWidget/index.vue";
import ImageWidget from "./widgets/ImageWidget/index.vue";
import ButtonWidget from "./widgets/ButtonWidget/index.vue";
import TitleWidget from "./widgets/TitleWidget/index.vue";
import SwiperWidget from "./widgets/SwiperWidget/index.vue";
import GridNavWidget from "./widgets/GridNavWidget/index.vue";
import LargeSwiperWidget from "./widgets/LargeSwiperWidget/index.vue";
import AgentWidget from "./widgets/AgentWidget/index.vue";
import ProductListWidget from "./widgets/ProductListWidget/index.vue";
import AgentGroupWidget from "./widgets/AgentGroupWidget/index.vue";
import MovieRecommendWidget from "./widgets/MovieRecommendWidget/index.vue";

import TextWidgetMeta from "./widgets/TextWidget/meta";
import ImageWidgetMeta from "./widgets/ImageWidget/meta";
import SwiperWidgetMeta from "./widgets/SwiperWidget/meta";
import GridNavWidgetMeta from "./widgets/GridNavWidget/meta";
import LargeSwiperWidgetMeta from "./widgets/LargeSwiperWidget/meta";
import AgentWidgetMeta from "./widgets/AgentWidget/meta";
import ProductListWidgetMeta from "./widgets/ProductListWidget/meta";
import AgentGroupWidgetMeta from "./widgets/AgentGroupWidget/meta";
import MovieRecommendWidgetMeta from "./widgets/MovieRecommendWidget/meta";

// ============ 组件映射（用于渲染） ============
export const widgetComponents = {
  TextWidget,
  ImageWidget,
  ButtonWidget,
  TitleWidget,
  SwiperWidget,
  GridNavWidget,
  LargeSwiperWidget,
  AgentWidget,
  ProductListWidget,
  AgentGroupWidget,
  MovieRecommendWidget,
};

// ============ 组件元信息（用于编辑器面板） ============
const widgetMetaMap = {
  TextWidget: TextWidgetMeta,
  ImageWidget: ImageWidgetMeta,
  ButtonWidget: {
    componentName: "ButtonWidget",
    title: "按钮",
    icon: "B",
    category: "base",
    defaultProps: {
      text: "按钮",
      type: "primary",
      link: "",
      styles: { padding: "10px 20px", borderRadius: "4px", marginTop: "0" },
    },
    propConfig: [
      { name: "text", label: "按钮文案", type: "text" },
      { name: "type", label: "按钮类型", type: "text", placeholder: "primary / default" },
      { name: "link", label: "链接地址", type: "text", placeholder: "请输入跳转链接" },
    ],
    styleConfig: [
      { name: "padding", label: "内边距", type: "text" },
      { name: "borderRadius", label: "圆角", type: "text" },
      { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
    ],
  },
  TitleWidget: {
    componentName: "TitleWidget",
    title: "标题",
    icon: "H",
    category: "base",
    defaultProps: {
      text: "标题",
      level: 1,
      link: "",
      styles: { fontWeight: "bold", color: "#333", padding: "8px 0", marginTop: "0" },
    },
    propConfig: [
      { name: "text", label: "标题内容", type: "text" },
      { name: "level", label: "标题级别", type: "number", options: { min: 1, max: 6, step: 1 } },
      { name: "link", label: "链接地址", type: "text", placeholder: "请输入跳转链接" },
    ],
    styleConfig: [
      { name: "color", label: "文字颜色", type: "color" },
      { name: "padding", label: "内边距", type: "text" },
      { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
    ],
  },
  SwiperWidget: SwiperWidgetMeta,
  GridNavWidget: GridNavWidgetMeta,
  LargeSwiperWidget: LargeSwiperWidgetMeta,
  AgentWidget: AgentWidgetMeta,
  ProductListWidget: ProductListWidgetMeta,
  AgentGroupWidget: AgentGroupWidgetMeta,
  MovieRecommendWidget: MovieRecommendWidgetMeta,
};

export const widgetMetas = Object.values(widgetMetaMap).map((meta) => ({
  name: meta.componentName,
  title: meta.title,
  icon: meta.icon,
  category: meta.category,
  description: meta.description || "",
}));

// ============ 组件默认值配置 ============
export const widgetDefaults = Object.entries(widgetMetaMap).reduce((acc, [name, meta]) => {
  acc[name] = { ...(meta.defaultProps || {}) };
  return acc;
}, {});

// ============ 创建组件实例 ============
export function createWidget(name) {
  const defaults = widgetDefaults[name] || {};
  const { styles = {}, ...props } = defaults;

  return {
    id: `widget_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
    name,
    title: widgetMetas.find((m) => m.name === name)?.title || name,
    props: { ...props },
    styles: { ...styles },
  };
}

// ============ 获取组件渲染器 ============
export function getWidgetComponent(name) {
  return widgetComponents[name];
}

// ============ 获取组件元配置 ============
export function getWidgetMeta(name) {
  return widgetMetaMap[name];
}
