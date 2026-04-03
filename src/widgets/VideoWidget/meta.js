export default {
  componentName: "VideoWidget",
  title: "视频",
  icon: "V",
  category: "media",

  defaultProps: {
    src: "",
    poster: "",
    link: "",
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    styles: {
      width: "100%",
      height: "210px",
      borderRadius: "0",
      marginTop: "0",
    },
  },

  propConfig: [
    {
      name: "src",
      label: "视频地址",
      type: "text",
      placeholder: "请输入视频 URL",
    },
    {
      name: "poster",
      label: "封面地址",
      type: "text",
      placeholder: "请输入封面 URL",
    },
    {
      name: "link",
      label: "链接地址",
      type: "text",
      placeholder: "请输入跳转链接",
    },
    {
      name: "controls",
      label: "显示控制条",
      type: "switch",
    },
    {
      name: "autoplay",
      label: "自动播放",
      type: "switch",
    },
    {
      name: "loop",
      label: "循环播放",
      type: "switch",
    },
    {
      name: "muted",
      label: "静音",
      type: "switch",
    },
  ],

  styleConfig: [
    { name: "width", label: "宽度", type: "text", placeholder: "如: 100%" },
    { name: "height", label: "高度", type: "text", placeholder: "如: 210px" },
    { name: "borderRadius", label: "圆角", type: "text", placeholder: "如: 8px" },
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
  ],
};
