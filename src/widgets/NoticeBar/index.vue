<template>
  <div class="notice-bar" :style="mergedStyles">
    <div v-if="showIcon" class="notice-icon">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </div>
    <div class="notice-content" :class="{ 'notice-scrollable': scrollable }">
      <div class="notice-text" :class="{ 'notice-marquee': scrollable }">
        {{ text }}
      </div>
    </div>
    <div v-if="showClose" class="notice-close" @click="handleClose">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "这是一条公告信息，点击查看详情",
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  scrollable: {
    type: Boolean,
    default: true,
  },
  backgroundColor: {
    type: String,
    default: "#fff7e6",
  },
  textColor: {
    type: String,
    default: "#ff6600",
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const mergedStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
  color: props.textColor,
  ...props.styles,
}));

function handleClose() {
  emit("close");
}
</script>

<style scoped>
.notice-bar {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 12px;
  overflow: hidden;
}

.notice-icon {
  flex-shrink: 0;
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.notice-content {
  flex: 1;
  overflow: hidden;
}

.notice-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notice-scrollable .notice-text {
  white-space: nowrap;
}

.notice-close {
  flex-shrink: 0;
  margin-left: 8px;
  cursor: pointer;
  opacity: 0.6;
  display: flex;
  align-items: center;
}

.notice-close:hover {
  opacity: 1;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.notice-marquee {
  animation: marquee 10s linear infinite;
}
</style>
