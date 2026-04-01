/**
 * 公告栏组件元信息配置
 */
export default {
  componentName: "NoticeBar",
  title: "公告栏",
  icon: "📢",
  category: "base",
  description: "滚动公告信息展示",

  defaultProps: {
    text: "这是一条公告信息，点击查看详情",
    showIcon: true,
    showClose: false,
    scrollable: true,
    backgroundColor: "#fff7e6",
    textColor: "#ff6600",
  },

  propConfig: [
    {
      name: "text",
      label: "公告内容",
      type: "text",
      placeholder: "请输入公告内容",
    },
    {
      name: "showIcon",
      label: "显示图标",
      type: "switch",
    },
    {
      name: "showClose",
      label: "显示关闭按钮",
      type: "switch",
    },
    {
      name: "scrollable",
      label: "滚动播放",
      type: "switch",
    },
  ],

  styleConfig: [
    {
      name: "backgroundColor",
      label: "背景色",
      type: "color",
    },
    {
      name: "textColor",
      label: "文字颜色",
      type: "color",
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
