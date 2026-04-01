/**
 * 展览组件元信息配置
 */
export default {
  componentName: "ExhibitionWidget",
  title: "展览推荐",
  icon: "🎨",
  category: "business",
  description: "横向滚动展示展览信息，采用宽图比例",
  defaultProps: {
    title: "展览推荐",
    showTitle: true,
    showTabs: true,
    activeTag: "hot",
    cardWidth: "120px",
    tags: [
      { id: "hot", label: "热门", show: true },
      { id: "new", label: "最新", show: true },
      { id: "free", label: "免费", show: false },
    ],
    styles: {
      backgroundColor: "#f5f5f5",
      padding: "8px",
      cardRadius: "8px",
      marginTop: "0",
    },
  },
  propConfig: [
    {
      name: "title",
      label: "标题",
      type: "text",
    },
    {
      name: "showTitle",
      label: "显示标题",
      type: "switch",
    },
    {
      name: "showTabs",
      label: "显示Tab切换",
      type: "switch",
    },
    {
      name: "cardWidth",
      label: "卡片宽度",
      type: "text",
      placeholder: "如: 120px",
    },
    {
      name: "tags",
      label: "Tab标签",
      type: "movie-tag-list",
    },
  ],
  styleConfig: [
    {
      name: "backgroundColor",
      label: "背景颜色",
      type: "color",
    },
    {
      name: "padding",
      label: "内边距",
      type: "text",
      placeholder: "如: 8px",
    },
    {
      name: "cardRadius",
      label: "卡片圆角",
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
