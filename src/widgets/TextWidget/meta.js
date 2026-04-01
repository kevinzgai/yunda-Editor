export default {
  componentName: "TextWidget",
  title: "文本",
  icon: "T",
  category: "base",

  defaultProps: {
    text: "请输入文本内容",
    link: "",
    styles: {
      fontSize: "14px",
      color: "#333333",
      padding: "8px",
      marginTop: "0",
    },
  },

  propConfig: [
    {
      name: "text",
      label: "文本内容",
      type: "text",
      placeholder: "请输入文本",
    },
    {
      name: "link",
      label: "链接地址",
      type: "text",
      placeholder: "请输入跳转链接",
    },
  ],

  styleConfig: [
    { name: "fontSize", label: "字号", type: "text", placeholder: "如: 14px" },
    { name: "color", label: "文字颜色", type: "color" },
    { name: "padding", label: "内边距", type: "text", placeholder: "如: 8px" },
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
  ],
};
