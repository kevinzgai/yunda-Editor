export default {
  componentName: "ImageWidget",
  title: "图片",
  icon: "I",
  category: "media",

  defaultProps: {
    src: "",
    alt: "图片",
    link: "",
    styles: {
      width: "100%",
      height: "150px",
      borderRadius: "0",
      marginTop: "0",
    },
  },

  propConfig: [
    {
      name: "src",
      label: "图片地址",
      type: "text",
      placeholder: "请输入图片 URL",
    },
    {
      name: "alt",
      label: "图片描述",
      type: "text",
      placeholder: "用于无障碍描述",
    },
    {
      name: "link",
      label: "链接地址",
      type: "text",
      placeholder: "请输入跳转链接",
    },
  ],

  styleConfig: [
    { name: "width", label: "宽度", type: "text", placeholder: "如: 100%" },
    { name: "height", label: "高度", type: "text", placeholder: "如: 150px" },
    { name: "borderRadius", label: "圆角", type: "text", placeholder: "如: 8px" },
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
  ],
};
