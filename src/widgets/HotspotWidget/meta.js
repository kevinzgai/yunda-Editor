/**
 * 热区组件元信息配置
 */
export default {
  componentName: "HotspotWidget",
  title: "图片热区",
  icon: "🎯",
  category: "media",
  description: "在图片上添加可点击的热区",

  defaultProps: {
    backgroundImage: "",
    aspectRatio: "16:9",
    editMode: true,
    hotspots: [
      { x: 10, y: 10, width: 20, height: 8, text: "热区1", link: "" },
      { x: 50, y: 50, width: 20, height: 8, text: "热区2", link: "" },
    ],
  },

  propConfig: [
    {
      name: "backgroundImage",
      label: "背景图片",
      type: "text",
      placeholder: "输入图片URL",
    },
    {
      name: "hotspots",
      label: "热区列表",
      type: "hotspot-list",
    },
  ],

  styleConfig: [
    {
      name: "borderRadius",
      label: "圆角",
      type: "text",
      placeholder: "如: 8px",
    },
    {
      name: "marginTop",
      label: "上间距",
      type: "text",
      placeholder: "如: 8px",
    },
  ],

  advanced: {
    nestable: false,
    copyable: true,
    removable: true,
    sortable: true,
  },
};
