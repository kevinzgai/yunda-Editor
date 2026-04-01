/**
 * 顶部导航栏组件元信息配置
 */
export default {
  componentName: "NavbarWidget",
  title: "导航栏",
  icon: "N",
  category: "base",

  defaultProps: {
    city: "北京",
    searchPlaceholder: "搜索你感兴趣的内容",
    showScan: true,
    backgroundColor: "#ffffff",
    textColor: "#000000",
  },

  propConfig: [
    { name: "city", label: "当前城市", type: "text" },
    { name: "searchPlaceholder", label: "搜索占位符", type: "text" },
    { name: "showScan", label: "显示扫码", type: "switch" },
    { name: "backgroundColor", label: "背景色", type: "color" },
    { name: "textColor", label: "文字颜色", type: "color" },
  ],

  styleConfig: [],

  advanced: {
    nestable: false,
    copyable: true,
    removable: true,
    sortable: true,
  },
};
