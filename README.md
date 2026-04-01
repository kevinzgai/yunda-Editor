# 云搭可视化编辑器 (Yunda Visual Editor)

一个轻量级的可视化拖拽页面编辑器，基于 Vue 3 + TypeScript 构建，可快速搭建 H5/小程序页面。

## 特性

- **拖拽式编辑** - 通过拖拽组件即可快速构建页面
- **实时预览** - 手机端预览效果，所见即所得
- **组件化架构** - 轻松扩展新组件
- **JSON 导出** - 页面配置可导出为 JSON，供后端渲染
- **Tailwind CSS** - 支持 UnoCSS/Tailwind 语法

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
pnpm build
```

构建产物在 `dist/` 目录

## 项目结构

```
yunda-editor/
├── src/
│   ├── components/
│   │   └── DesignFormWork/       # 核心编辑器组件
│   │       ├── index.vue        # 编辑器主入口
│   │       ├── DesignLeft/      # 左侧面板（组件列表、图层）
│   │       ├── DesignCenter/    # 中间画布（手机预览）
│   │       └── DesignRight/     # 右侧面板（属性配置）
│   │
│   ├── store/
│   │   └── editor.js            # 核心状态管理（Pinia）
│   │
│   ├── widgets/                 # 预设组件库
│   │   ├── TextWidget.vue       # 文本组件
│   │   ├── ImageWidget.vue      # 图片组件
│   │   ├── ButtonWidget.vue      # 按钮组件
│   │   ├── TitleWidget.vue       # 标题组件
│   │   ├── SwiperWidget.vue      # 幻灯片组件
│   │   └── SwiperWidget.meta.js  # 组件元信息配置
│   │
│   ├── setters/                 # 属性配置器
│   │   └── ImageListSetter.vue  # 图片列表配置器
│   │
│   ├── registry.js              # 组件注册表（核心）
│   │
│   ├── App.vue                  # 应用入口
│   └── main.js                  # Vue 挂载
│
├── uno.config.js                # UnoCSS 配置
├── vite.config.js               # Vite 配置
└── package.json
```

## 核心概念

### 1. 组件 (Widget)

组件是页面的基本构建单元。

```
widgets/
├── MyWidget.vue          # 组件视图
└── MyWidget.meta.js      # 组件元信息（可选）
```

**组件文件结构：**

```vue
<!-- widgets/MyWidget.vue -->
<template>
  <div class="my-widget" :style="mergedStyles">
    <!-- 组件内容 -->
    <slot />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // 组件属性
  title: { type: String, default: "" },
  data: { type: Array, default: () => [] },
  // 样式配置（固定）
  styles: { type: Object, default: () => ({}) },
});

// 合并样式
const mergedStyles = computed(() => ({
  padding: props.styles.padding || "10px",
  backgroundColor: props.styles.backgroundColor || "#fff",
  ...props.styles,
}));
</script>

<style scoped>
.my-widget {
  /* 组件样式 */
}
</style>
```

### 2. 组件元信息 (meta.js)

定义组件在编辑器中的配置：

```javascript
// widgets/MyWidget.meta.js
export default {
  componentName: "MyWidget",     // 组件名称（与文件名一致）
  title: "我的组件",              // 显示名称
  icon: "M",                     // 图标
  category: "business",          // 分类: base | media | business

  // 默认属性值
  defaultProps: {
    title: "默认标题",
    data: [],
    height: "200px",
  },

  // 属性配置面板
  propConfig: [
    {
      name: "title",
      label: "标题",
      type: "text",
    },
    {
      name: "height",
      label: "高度",
      type: "text",
      placeholder: "如: 200px",
    },
  ],
};
```

### 3. 组件注册表 (registry.js)

所有组件必须在此注册：

```javascript
// registry.js
import MyWidget from "./widgets/MyWidget.vue";

export const widgetComponents = {
  // 组件映射（用于渲染）
  TextWidget,
  ImageWidget,
  ButtonWidget,
  TitleWidget,
  SwiperWidget,
  MyWidget,  // 添加新组件
};

export const widgetMetas = [
  // 组件元信息列表（用于编辑器面板）
  {
    name: "MyWidget",
    title: "我的组件",
    icon: "M",
    category: "business",
    description: "组件描述",
  },
];

export const widgetDefaults = {
  // 组件默认值
  MyWidget: {
    title: "默认标题",
    height: "200px",
  },
};
```

## 开发新组件

### 步骤 1：创建组件文件

```bash
# 创建组件文件
src/widgets/ProductListWidget.vue
```

```vue
<template>
  <div class="product-list" :style="mergedStyles">
    <div v-for="item in products" :key="item.id" class="product-item">
      <img :src="item.image" :alt="item.title" />
      <div class="title">{{ item.title }}</div>
      <div class="price">¥{{ item.price }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Number,
    default: 2,
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
});

const mergedStyles = computed(() => ({
  display: "grid",
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  gap: "10px",
  padding: props.styles.padding || "8px",
  ...props.styles,
}));
</script>

<style scoped>
.product-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.product-item img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
.title, .price {
  padding: 8px;
  font-size: 14px;
}
</style>
```

### 步骤 2：注册组件

编辑 `src/registry.js`：

```javascript
import ProductListWidget from "./widgets/ProductListWidget.vue";

export const widgetComponents = {
  // ... 其他组件
  ProductListWidget,
};

export const widgetMetas = [
  // ... 其他元信息
  {
    name: "ProductListWidget",
    title: "商品列表",
    icon: "P",
    category: "business",
    description: "展示商品列表",
  },
];

export const widgetDefaults = {
  // ... 其他默认值
  ProductListWidget: {
    products: [
      { id: 1, title: "商品1", price: 99, image: "https://..." },
      { id: 2, title: "商品2", price: 199, image: "https://..." },
    ],
    columns: 2,
  },
};
```

### 步骤 3：重启服务

```bash
pnpm dev
```

刷新页面即可看到新组件。

## 页面数据结构

导出的 JSON 结构：

```json
{
  "version": "1.0.0",
  "widgetList": [
    {
      "id": "widget_1699876543_abc123",
      "name": "TextWidget",
      "title": "文本",
      "props": {
        "text": "欢迎使用"
      },
      "styles": {
        "fontSize": "16px",
        "color": "#333"
      }
    },
    {
      "id": "widget_1699876544_def456",
      "name": "SwiperWidget",
      "title": "幻灯片",
      "props": {
        "images": [...],
        "height": "200px",
        "autoplay": true
      },
      "styles": {}
    }
  ]
}
```

## 渲染器（消费 JSON）

在目标项目中使用 JSON 渲染页面：

```vue
<template>
  <div class="page">
    <component
      v-for="widget in pageData.widgetList"
      :key="widget.id"
      :is="getComponent(widget.name)"
      v-bind="widget.props"
      :styles="widget.styles"
    />
  </div>
</template>

<script setup>
import { widgetComponents } from "./registry";

const props = defineProps({
  pageData: {
    type: Object,
    required: true,
  },
});

function getComponent(name) {
  return widgetComponents[name];
}
</script>
```

## 集成到其他项目

```bash
# 1. 复制 yunda-editor 目录到目标项目
# 2. 安装依赖
pnpm install

# 3. 在目标项目中使用
import { VisualEditor, useEditorStore } from "./yunda-editor";

export default {
  components: { VisualEditor },
  setup() {
    const editorStore = useEditorStore();
    return { editorStore };
  },
};
```

```html
<template>
  <VisualEditor />
</template>
```

## 配置说明

### UnoCSS 配置

编辑 `uno.config.js`：

```javascript
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  shortcuts: {
    "my-btn": "px-4 py-2 bg-primary text-white rounded",
  },
  theme: {
    colors: {
      primary: "#5e3aff",
    },
  },
});
```

### Vite 配置

编辑 `vite.config.js`：

```javascript
export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
```

## API 参考

### useEditorStore

```javascript
import { useEditorStore } from "@/store/editor";

const store = useEditorStore();

// 状态
store.widgetList      // 画布组件列表
store.selectedWidget  // 选中的组件

// 方法
store.addWidget(widget)           // 添加组件
store.removeWidget(id)            // 删除组件
store.selectWidget(id)            // 选中组件
store.updateWidgetProps(id, props) // 更新属性
store.updateWidgetStyles(id, styles) // 更新样式
store.clearCanvas()               // 清空画布
store.exportData()                // 导出数据
store.init(data)                  // 初始化数据
```

## 组件分类

| 分类 | 说明 | 组件示例 |
|------|------|----------|
| base | 基础组件 | 文本、图片、按钮、标题 |
| media | 媒体组件 | 幻灯片、视频 |
| business | 业务组件 | 商品列表、优惠券 |

## 常见问题

### Q: 新组件不显示？
1. 检查是否在 `registry.js` 中注册
2. 检查组件名称是否与 `componentName` 一致
3. 重启开发服务器

### Q: 样式不生效？
组件样式需要使用 `:style` 绑定或 scoped 样式

### Q: 如何添加自定义属性配置器？
在 `src/setters/` 目录下创建配置器组件

## License

MIT
