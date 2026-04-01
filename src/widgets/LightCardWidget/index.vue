<template>
  <div class="light-card-widget" :style="mergedStyles">
    <div class="card-scroll">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card-item"
        :style="{ width: cardWidth, height: cardHeight }"
      >
        <div class="card-container">
          <!-- 背景图 -->
          <img
            v-if="card.backgroundImage"
            :src="card.backgroundImage"
            class="card-bg"
            alt="背景"
          />
          <div v-else class="card-bg-placeholder"></div>

          <!-- 内容区 -->
          <div class="card-content">
            <!-- 左侧图标 -->
            <div class="card-left">
              <img
                v-if="card.iconImage"
                :src="card.iconImage"
                class="card-icon-img"
                alt="图标"
              />
              <div v-else class="card-icon-default">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>

            <!-- 右侧信息 -->
            <div class="card-right">
              <div class="card-title">{{ card.title }}</div>
              <div class="card-desc" v-if="card.description">{{ card.description }}</div>

              <div class="card-bottom">
                <div class="card-price" v-if="card.showPrice !== false">
                  <span class="price-symbol">¥</span>
                  <span class="price-value">{{ card.price }}</span>
                </div>
                <div
                  class="card-btn"
                  :style="{ backgroundColor: card.btnBgColor || '#ffffff', color: card.btnTextColor || '#667eea' }"
                  @click="handleClick(card)"
                >
                  {{ card.buttonText || '开通' }}
                </div>
              </div>
            </div>
          </div>

          <!-- 角标 -->
          <div
            class="card-tag"
            v-if="card.showTag !== false && card.tagText"
            :style="{ backgroundColor: card.tagBgColor || '#ffd700' }"
          >
            {{ card.tagText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  cards: {
    type: Array,
    default: () => [
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
  cardWidth: {
    type: String,
    default: "140px",
  },
  cardHeight: {
    type: String,
    default: "210px",
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["click"]);

const mergedStyles = computed(() => ({
  ...props.styles,
}));

function handleClick(card) {
  emit("click", card.cardId);
}
</script>

<style scoped>
.light-card-widget {
  width: 100%;
}

.card-scroll {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 12px;
  padding: 4px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.card-scroll::-webkit-scrollbar {
  display: none;
}

.card-item {
  flex-shrink: 0;
}

.card-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-bg-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 12px;
  gap: 6px;
  z-index: 1;
}

.card-left {
  flex-shrink: 0;
}

.card-icon-img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
}

.card-icon-default {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-right {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: white;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.card-desc {
  font-size: 10px;
  opacity: 0.85;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 4px;
}

.card-price {
  display: flex;
  align-items: baseline;
  gap: 1px;
}

.price-symbol {
  font-size: 11px;
  font-weight: 500;
  opacity: 0.9;
}

.price-value {
  font-size: 14px;
  font-weight: 700;
}

.card-btn {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  white-space: nowrap;
}

.card-btn:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.card-tag {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 2px 6px;
  color: #333;
  font-size: 9px;
  font-weight: 700;
  border-radius: 3px;
}
</style>
