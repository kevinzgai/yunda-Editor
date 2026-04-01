/**
 * 光影卡商品组件元信息配置
 */
export default {
  componentName: "LightCardWidget",
  title: "光影卡",
  icon: "🎫",
  category: "business",
  description: "横向滚动光影卡列表",

  defaultProps: {
    cardWidth: "140px",
    cardHeight: "160px",
    cards: [
      {
        cardId: "",
        backgroundImage: "",
        iconImage: "",
        title: "光影卡",
        description: "更多权益",
        price: "99",
        priceUnit: "",
        buttonText: "开通",
        showPrice: true,
        showTag: true,
        tagText: "VIP",
        tagBgColor: "#ffd700",
        btnBgColor: "#ffffff",
        btnTextColor: "#667eea",
      },
      {
        cardId: "",
        backgroundImage: "",
        iconImage: "",
        title: "会员卡",
        description: "尊享特权",
        price: "199",
        priceUnit: "",
        buttonText: "开通",
        showPrice: true,
        showTag: true,
        tagText: "SVIP",
        tagBgColor: "#ff6b6b",
        btnBgColor: "#ffffff",
        btnTextColor: "#667eea",
      },
    ],
  },

  propConfig: [
    {
      name: "cardWidth",
      label: "卡片宽度",
      type: "text",
      placeholder: "如: 140px",
    },
    {
      name: "cardHeight",
      label: "卡片高度",
      type: "text",
      placeholder: "如: 160px",
    },
    {
      name: "cards",
      label: "卡片列表",
      type: "light-card-list",
    },
  ],

  styleConfig: [
    {
      name: "marginTop",
      label: "上间距",
      type: "text",
      placeholder: "如: 8px",
    },
  ],

  advanced: {
    nestable: false,
    copyable: true,
    removable: true,
    sortable: true,
  },
};
