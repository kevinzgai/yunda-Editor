export default {
  componentName: "AgentGroupWidget",
  title: "智能体组",
  icon: "👥",
  category: "business",
  description: "智能体列表展示，支持横向滚动",

  defaultProps: {
    title: "智能体推荐",
    showTitle: true,
    agents: [
      { name: "智能体1", avatar: "", chatCount: 10, link: "", visible: true },
      { name: "智能体2", avatar: "", chatCount: 20, link: "", visible: true },
      { name: "智能体3", avatar: "", chatCount: 30, link: "", visible: true },
    ],
    styles: {
      backgroundColor: "#f5f5f5",
      padding: "12px",
      gap: "12px",
      cardRadius: "8px",
      marginTop: "5px",
      marginBottom: "5px",
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
      name: "agents",
      label: "智能体列表",
      type: "agent-group-list",
      options: {
        max: 20,
        min: 1,
      },
    },
  ],

  styleConfig: [
    { name: "backgroundColor", label: "背景色", type: "color" },
    { name: "padding", label: "内边距", type: "text", placeholder: "如：12px" },
    { name: "gap", label: "卡片间距", type: "text", placeholder: "如：12px" },
    { name: "cardRadius", label: "卡片圆角", type: "text", placeholder: "如：8px" },
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如：5px" },
    { name: "marginBottom", label: "下间距", type: "text", placeholder: "如：5px" },
  ],
};
