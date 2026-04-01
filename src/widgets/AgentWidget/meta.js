export default {
  componentName: "AgentWidget",
  title: "智能体",
  icon: "🤖",
  category: "business",
  description: "展示智能体信息卡片",

  defaultProps: {
    agentId: "",
    title: "智能体标题",
    description: "智能体说明信息",
    image: "",
    link: "",
    styles: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      titleColor: "#333333",
      marginTop: "5px",
      marginBottom: "5px",
    },
  },

  propConfig: [
    {
      name: "agentId",
      label: "智能体ID",
      type: "text",
      placeholder: "请输入智能体ID",
    },
    {
      name: "title",
      label: "标题",
      type: "text",
      placeholder: "请输入智能体标题",
    },
    {
      name: "description",
      label: "说明",
      type: "text",
      placeholder: "请输入智能体说明信息",
    },
    {
      name: "image",
      label: "图像地址",
      type: "text",
      placeholder: "请输入图片URL",
    },
    {
      name: "link",
      label: "跳转链接",
      type: "text",
      placeholder: "请输入跳转链接",
    },
  ],

  styleConfig: [
    { name: "backgroundColor", label: "背景色", type: "color" },
    { name: "borderRadius", label: "圆角", type: "text", placeholder: "如：8px" },
    { name: "titleColor", label: "标题颜色", type: "color" },
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如：8px" },
    { name: "marginBottom", label: "下间距", type: "text", placeholder: "如：8px" },
  ],
};
