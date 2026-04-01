/**
 * 热映电影卡片组件元信息配置
 */
export default {
  componentName: "MovieCardWidget",
  title: "热映电影",
  icon: "🎬",
  category: "business",

  defaultProps: {
    title: "热映电影",
    showMore: true,
    moreLink: "",
    movies: [
      {
        id: "1",
        name: "电影名称",
        poster: "https://picsum.photos/200/267?random=1",
        rating: "8.5",
        wantSeeUsers: "6.7万",
        releaseDate: "",
        link: "",
      },
      {
        id: "2",
        name: "电影名称2",
        poster: "https://picsum.photos/200/267?random=2",
        rating: "9.0",
        wantSeeUsers: "8.2万",
        releaseDate: "",
        link: "",
      },
    ],
    count: 10,
  },

  propConfig: [
    { name: "title", label: "列表标题", type: "text" },
    { name: "showMore", label: "显示更多", type: "switch" },
    { name: "moreLink", label: "更多链接", type: "text" },
    {
      name: "movies",
      label: "电影列表",
      type: "movie-list",
      options: { max: 20, min: 1 },
    },
    {
      name: "count",
      label: "显示数量",
      type: "number",
      options: { min: 1, max: 20, step: 1 },
    },
  ],

  styleConfig: [
    { name: "backgroundColor", label: "背景色", type: "color" },
    { name: "marginTop", label: "上间距", type: "text", placeholder: "如: 8px" },
  ],

  advanced: {
    nestable: false,
    copyable: true,
    removable: true,
    sortable: true,
  },
};
