export interface PreviewWidget {
  id: string
  name: string
  title?: string
  props?: Record<string, any>
  styles?: Record<string, any>
}

export interface PreviewPageConfig {
  backgroundColor?: string
  backgroundImage?: string
  padding?: string
}

export interface PreviewPageData {
  version?: string
  pageConfig?: PreviewPageConfig
  widgetList: PreviewWidget[]
}

export const demoPageData: PreviewPageData = {
  "version": "1.0.0",
  "pageConfig": {
    "backgroundColor": "#f5f5f5",
    "backgroundImage": "",
    "padding": "10px"
  },
  "widgetList": [
    {
      "id": "widget_1775137373139_rogx9dr0h",
      "name": "HotspotWidget",
      "title": "图片热区",
      "props": {
        "backgroundImage": "https://random-api.czl.net/pic/all",
        "aspectRatio": "16:9",
        "editMode": true,
        "hotspots": [
          {
            "x": 10.845070422535212,
            "y": 18.012519561815335,
            "width": 24.225352112676056,
            "height": 31.035993740219094,
            "text": "热区1",
            "link": ""
          },
          {
            "x": 50,
            "y": 50,
            "width": 20,
            "height": 8,
            "text": "热区2",
            "link": ""
          }
        ]
      },
      "styles": {
        "marginTop": "100px"
      }
    },
    {
      "id": "widget_1775137375197_cen9h6pck",
      "name": "LightCardListWidget",
      "title": "光影卡列表",
      "props": {
        "cardHeight": "90px",
        "cards": [
          {
            "cardId": "111",
            "backgroundImage": "https://file.8kraw.com/doc/8d21100e17f84490adea034514cd8378",
            "iconImage": "",
            "title": "2121会员卡",
            "description": "尊享更多特权",
            "price": "199",
            "priceUnit": "",
            "buttonText": "立即开通",
            "showPrice": true,
            "showTag": true,
            "tagText": "SVIP",
            "tagBgColor": "#ff6b6b",
            "btnBgColor": "#ffffff",
            "btnTextColor": "#667eea"
          }
        ]
      },
      "styles": {}
    },
    {
      "id": "widget_1775137845819_obd5oeb6k",
      "name": "SwiperWidget",
      "title": "幻灯片",
      "props": {
        "images": [
          {
            "src": "https://picsum.photos/375/200?random=1",
            "alt": "图片1",
            "title": "",
            "link": ""
          },
          {
            "src": "https://picsum.photos/375/200?random=2",
            "alt": "图片2",
            "title": "",
            "link": ""
          },
          {
            "src": "https://picsum.photos/375/200?random=3",
            "alt": "图片3",
            "title": "",
            "link": ""
          },
          {
            "src": "https://random-api.czl.net/pic/truegirl",
            "alt": "",
            "title": "",
            "link": ""
          }
        ],
        "height": "200px",
        "showIndicator": true,
        "showArrow": true,
        "autoplay": true,
        "interval": 3000,
        "radius": "0"
      },
      "styles": {}
    }
  ]
}