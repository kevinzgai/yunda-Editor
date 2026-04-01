/**
 * 幻灯片组件元信息配置
 *
 * 这个文件定义了组件在可视化编辑器中的：
 * 1. 组件基本信息（名称、图标、描述）
 * 2. 可配置属性列表
 * 3. 属性对应的配置器类型
 */
export default {
  // ============ 基础信息 ============
  componentName: "SwiperWidget",      // 组件名称（必须与文件名一致）
  title: "幻灯片",                      // 在编辑器中显示的名称
  icon: "S",                           // 左侧面板的图标
  category: "media",                   // 组件分类: base(基础) | media(媒体) | business(业务)

  // ============ 默认属性值 ============
  defaultProps: {
    // 图片列表
    images: [
      { src: "https://picsum.photos/375/200?random=1", alt: "图片1", title: "", link: "" },
      { src: "https://picsum.photos/375/200?random=2", alt: "图片2", title: "", link: "" },
      { src: "https://picsum.photos/375/200?random=3", alt: "图片3", title: "", link: "" },
    ],
    height: "200px",                  // 高度
    showIndicator: true,               // 显示指示器
    showArrow: true,                   // 显示箭头
    autoplay: true,                    // 自动播放
    interval: 3000,                    // 播放间隔(ms)
    radius: "0",                       // 圆角
  },

  // ============ 属性配置面板 ============
  // 每个属性对应一个配置器，决定右侧面板如何编辑这个属性
  propConfig: [
    {
      name: "images",
      label: "图片列表",
      type: "image-list",             // 图片列表配置器
      options: {
        max: 10,                       // 最多10张
        min: 1,                        // 最少1张
      },
    },
    {
      name: "height",
      label: "高度",
      type: "text",                   // 文本输入
      placeholder: "如: 200px",
    },
    {
      name: "showIndicator",
      label: "显示指示器",
      type: "switch",                 // 开关
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
      type: "number",                 // 数字输入
      options: {
        min: 1000,
        max: 10000,
        step: 500,
        unit: "ms",
      },
      show: (props) => props.autoplay, // 依赖条件：只有开启自动播放才显示
    },
    {
      name: "radius",
      label: "圆角",
      type: "text",
      placeholder: "如: 8px",
    },
  ],

  // ============ 样式配置面板 ============
  styleConfig: [
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
    { name: "padding", label: "内边距", type: "text", placeholder: "如: 8px" },
    { name: "backgroundColor", label: "背景色", type: "color" },
  ],

  // ============ 事件配置 ============
  events: [
    { name: "onClick", label: "点击" },
    { name: "onChange", label: "切换时" },
  ],

  // ============ 高级配置 ============
  advanced: {
    // 组件是否支持嵌套
    nestable: false,
    // 是否可复制
    copyable: true,
    // 是否可删除
    removable: true,
    // 是否可拖拽排序
    sortable: true,
  },
};
