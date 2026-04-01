export default {
  componentName: "LargeSwiperWidget",
  title: "3/4大幻灯片",
  icon: "L",
  category: "media",
  description: "宽高比3:4的竖向幻灯片",

  defaultProps: {
    images: [
      { src: "https://picsum.photos/300/400?random=1", alt: "图片1", title: "", link: "" },
      { src: "https://picsum.photos/300/400?random=2", alt: "图片2", title: "", link: "" },
      { src: "https://picsum.photos/300/400?random=3", alt: "图片3", title: "", link: "" },
    ],
    showIndicator: true,
    showArrow: true,
    autoplay: true,
    interval: 3000,
    radius: "8px",
  },

  propConfig: [
    {
      name: "images",
      label: "图片列表",
      type: "image-list",
      options: {
        max: 10,
        min: 1,
      },
    },
    {
      name: "showIndicator",
      label: "显示指示器",
      type: "switch",
    },
    {
      name: "showArrow",
      label: "显示箭头",
      type: "switch",
    },
    {
      name: "autoplay",
      label: "自动播放",
      type: "switch",
    },
    {
      name: "interval",
      label: "播放间隔",
      type: "number",
      options: {
        min: 1000,
        max: 10000,
        step: 500,
        unit: "ms",
      },
      show: (props) => props.autoplay,
    },
    {
      name: "radius",
      label: "圆角",
      type: "text",
      placeholder: "如: 8px",
    },
  ],

  styleConfig: [
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
    { name: "margin", label: "外边距", type: "text", placeholder: "如: 0 auto" },
  ],
};
