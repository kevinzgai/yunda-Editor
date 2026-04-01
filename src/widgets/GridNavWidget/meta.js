export default {
  componentName: "GridNavWidget",
  title: "金刚区",
  icon: "G",
  category: "business",
  description: "功能入口导航区域",

  defaultProps: {
    items: [
      { name: "功能1", icon: "", link: "" },
      { name: "功能2", icon: "", link: "" },
      { name: "功能3", icon: "", link: "" },
      { name: "功能4", icon: "", link: "" },
    ],
    columns: 4,
    styles: {
      backgroundColor: "#ffffff",
      color: "#333333",
      fontSize: "12px",
      padding: "16px 8px",
      iconSize: "40px",
      marginTop: "0",
    },
  },

  propConfig: [
    {
      name: "items",
      label: "导航项",
      type: "grid-nav-list",
      placeholder: "配置导航项",
    },
    {
      name: "columns",
      label: "每行数量",
      type: "number",
      options: { min: 2, max: 5, step: 1 },
    },
  ],

  styleConfig: [
    { name: "backgroundColor", label: "背景色", type: "color" },
    { name: "color", label: "文字颜色", type: "color" },
    { name: "fontSize", label: "字号", type: "text", placeholder: "如: 12px" },
    { name: "padding", label: "内边距", type: "text", placeholder: "如: 16px 8px" },
    { name: "iconSize", label: "图标大小", type: "text", placeholder: "如: 40px" },
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
  ],
};
