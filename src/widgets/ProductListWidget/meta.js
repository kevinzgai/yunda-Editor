export default {
  componentName: "ProductListWidget",
  title: "多产品展示",
  icon: "🛍️",
  category: "business",
  description: "电商多产品展示卡片",

  defaultProps: {
    title: "商品推荐",
    showTitle: true,
    products: [
      {
        title: "商品标题 1",
        description: "商品描述信息",
        price: "99.00",
        sales: 100,
        image: "https://picsum.photos/seed/product1/400/400",
        link: "",
        visible: true,
      },
      {
        title: "商品标题 2",
        description: "商品描述信息",
        price: "199.00",
        sales: 50,
        image: "https://picsum.photos/seed/product2/400/400",
        link: "",
        visible: true,
      },
    ],
    columns: 2,
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
      name: "products",
      label: "产品列表",
      type: "product-list",
      options: {
        max: 20,
        min: 1,
      },
    },
    {
      name: "columns",
      label: "每行数量",
      type: "number",
      options: { min: 1, max: 4, step: 1 },
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
