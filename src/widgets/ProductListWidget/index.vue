<template>
  <div class="grid gap-3" :style="gridStyle">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <component :is="product.link ? 'a' : 'div'" class="block">
        <div class="relative">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.title"
            class="w-full aspect-square object-cover"
          />
          <div
            v-else
            class="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div class="p-3">
          <div class="text-sm font-medium text-gray-800 mb-2 truncate">{{ product.title }}</div>
          <div class="text-xs text-gray-500 mb-2 line-clamp-2">{{ product.description }}</div>
          <div class="flex items-center justify-between">
            <div class="text-red-600 font-semibold">
              <span class="text-xs">¥</span>
              <span class="text-lg">{{ product.price }}</span>
            </div>
            <div v-if="product.sales" class="text-xs text-gray-400">
              已售{{ product.sales }}
            </div>
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  products: {
    type: Array,
    default: () => [
      {
        title: "商品标题 1",
        description: "商品描述信息",
        price: "99.00",
        sales: 100,
        image: "",
        link: "",
      },
      {
        title: "商品标题 2",
        description: "商品描述信息",
        price: "199.00",
        sales: 50,
        image: "",
        link: "",
      },
    ],
  },
  columns: { type: Number, default: 2 },
  gap: { type: String, default: "12px" },
  styles: { type: Object, default: () => ({}) },
});

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  gap: props.gap,
  padding: props.styles.padding || "8px",
  backgroundColor: props.styles.backgroundColor || "#f5f5f5",
  ...props.styles,
}));
</script>
