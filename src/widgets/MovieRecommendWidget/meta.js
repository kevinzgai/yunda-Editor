export default {
  componentName: "MovieRecommendWidget",
  title: "影片推荐",
  icon: "🎬",
  category: "business",
  description: "影片推荐展示组件，支持标签切换",

  defaultProps: {
    title: "影片推荐",
    showTitle: true,
    showTabs: true,
    activeTag: "hot",
    tags: [
      {
        id: "hot",
        label: "热门",
        show: true,
      },
      {
        id: "new",
        label: "新片",
        show: true,
      },
    ],
    cardWidth: "100px",
    gap: "12px",
    styles: {
      backgroundColor: "#f5f5f5",
      padding: "8px",
      marginTop: "0",
    },
  },

  propConfig: [
    {
      name: "title",
      label: "标题",
      type: "text",
      placeholder: "请输入标题",
    },
    {
      name: "showTitle",
      label: "显示标题",
      type: "switch",
    },
    {
      name: "showTabs",
      label: "显示Tab",
      type: "switch",
    },
    {
      name: "tags",
      label: "标签列表",
      type: "movie-tag-list",
    },
    {
      name: "cardWidth",
      label: "卡片宽度",
      type: "text",
      placeholder: "如：100px",
    },
    {
      name: "gap",
      label: "间距",
      type: "text",
      placeholder: "如：12px",
    },
  ],

  styleConfig: [
    { name: "backgroundColor", label: "背景色", type: "color" },
    { name: "padding", label: "内边距", type: "text", placeholder: "如：8px" },
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如：8px" },
  ],
};
