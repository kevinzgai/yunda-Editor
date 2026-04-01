/**
 * 金刚区组件元信息配置
 */
export default {
  componentName: "GridNavWidget",
  title: "金刚区",
  icon: "G",
  category: "business",

  defaultProps: {
    title: "热门功能",
    showTitle: true,
    items: [
      { name: "影讯", icon: "", link: "" },
      { name: "找影院", icon: "", link: "" },
      { name: "演出", icon: "", link: "" },
      { name: "赛事", icon: "", link: "" },
    ],
    columns: 4,
    iconSize: "44px",
    backgroundColor: "#ffffff",
  },

  propConfig: [
    { name: "title", label: "标题", type: "text" },
    { name: "showTitle", label: "显示标题", type: "switch" },
    {
      name: "items",
      label: "导航项",
      type: "grid-nav-list",
      options: { max: 12, min: 1 },
    },
    {
      name: "columns",
      label: "每行数量",
      type: "number",
      options: { min: 2, max: 6, step: 1 },
    },
    { name: "iconSize", label: "图标大小", type: "text", placeholder: "如: 44px" },
  ],

  styleConfig: [
    { name: "backgroundColor", label: "背景色", type: "color" },
    { name: "padding", label: "内边距", type: "text", placeholder: "如: 16px 8px" },
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
  ],

  advanced: {
    nestable: false,
    copyable: true,
    removable: true,
    sortable: true,
  },
};
