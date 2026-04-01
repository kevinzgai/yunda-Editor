/**
 * 光影卡列表组件元信息配置
 */
export default {
  componentName: "LightCardListWidget",
  title: "光影卡列表",
  icon: "📋",
  category: "business",
  description: "垂直排列光影卡列表",

  defaultProps: {
    cardHeight: "90px",
    cards: [
      {
        cardId: "",
        backgroundImage: "",
        iconImage: "",
        title: "光影卡",
        description: "开通即享更多权益",
        price: "99",
        priceUnit: "",
        buttonText: "立即开通",
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
        description: "尊享更多特权",
        price: "199",
        priceUnit: "",
        buttonText: "立即开通",
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
      name: "cardHeight",
      label: "卡片高度",
      type: "text",
      placeholder: "如: 90px",
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
