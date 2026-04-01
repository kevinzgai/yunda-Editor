<template>
  <div class="hotspot-widget" :style="mergedStyles">
    <div
      ref="containerRef"
      class="hotspot-container"
      :style="containerStyle"
      @mousedown="handleContainerMouseDown"
    >
      <img
        v-if="backgroundImage"
        :src="backgroundImage"
        class="hotspot-bg"
        alt="背景图"
        draggable="false"
        @load="handleImageLoad"
      />
      <div v-else class="hotspot-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-gray-400 text-xs mt-2">请设置背景图片</span>
      </div>

      <div
        v-for="(spot, index) in hotspots"
        :key="index"
        class="hotspot-item"
        :class="{
          'is-selected': selectedIndex === index,
          'is-dragging': draggingIndex === index
        }"
        :style="getHotspotStyle(spot)"
        @mousedown.stop="handleSpotMouseDown($event, index)"
        @click.stop="handleSpotClick(index)"
      >
        <div class="hotspot-content">
          {{ spot.text || `热区${index + 1}` }}
        </div>

        <!-- 调整大小手柄 -->
        <template v-if="selectedIndex === index && editMode">
          <div
            class="resize-handle resize-handle-nw"
            @mousedown.stop="handleResizeMouseDown($event, index, 'nw')"
          ></div>
          <div
            class="resize-handle resize-handle-ne"
            @mousedown.stop="handleResizeMouseDown($event, index, 'ne')"
          ></div>
          <div
            class="resize-handle resize-handle-sw"
            @mousedown.stop="handleResizeMouseDown($event, index, 'sw')"
          ></div>
          <div
            class="resize-handle resize-handle-se"
            @mousedown.stop="handleResizeMouseDown($event, index, 'se')"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  backgroundImage: {
    type: String,
    default: "",
  },
  hotspots: {
    type: Array,
    default: () => [
      { x: 10, y: 10, width: 20, height: 10, text: "热区1", link: "" },
      { x: 50, y: 50, width: 20, height: 10, text: "热区2", link: "" },
    ],
  },
  editMode: {
    type: Boolean,
    default: true,
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:hotspots", "select"]);

const containerRef = ref(null);
const selectedIndex = ref(-1);
const draggingIndex = ref(-1);
const resizingIndex = ref(-1);
const naturalAspectRatio = ref(null);

let dragStartX = 0;
let dragStartY = 0;
let dragStartSpot = null;
let resizeHandle = "";

const mergedStyles = computed(() => ({
  ...props.styles,
}));

const containerStyle = computed(() => {
  const baseStyle = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
  };

  // 用图片的实际比例
  if (props.backgroundImage && naturalAspectRatio.value) {
    return {
      ...baseStyle,
      paddingTop: `${naturalAspectRatio.value}%`,
    };
  }

  // 默认16:9比例
  return {
    ...baseStyle,
    paddingTop: "56.25%",
  };
});

function handleImageLoad(e) {
  const img = e.target;
  // 计算图片的实际宽高比 (高/宽 * 100)
  if (img.naturalWidth > 0) {
    naturalAspectRatio.value = (img.naturalHeight / img.naturalWidth) * 100;
  }
}

function getHotspotStyle(spot) {
  return {
    position: "absolute",
    left: `${spot.x}%`,
    top: `${spot.y}%`,
    width: `${spot.width}%`,
    height: `${spot.height}%`,
    cursor: props.editMode ? "move" : "pointer",
  };
}

function handleSpotClick(index) {
  if (props.editMode) {
    selectedIndex.value = index;
    emit("select", index);
  }
}

function handleContainerMouseDown() {
  selectedIndex.value = -1;
  emit("select", -1);
}

function handleSpotMouseDown(e, index) {
  if (!props.editMode) return;

  selectedIndex.value = index;
  draggingIndex.value = index;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartSpot = { ...props.hotspots[index] };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleResizeMouseDown(e, index, handle) {
  if (!props.editMode) return;

  e.preventDefault();
  resizingIndex.value = index;
  resizeHandle = handle;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartSpot = { ...props.hotspots[index] };

  document.addEventListener("mousemove", handleResizeMove);
  document.addEventListener("mouseup", handleResizeUp);
}

function handleMouseMove(e) {
  if (draggingIndex.value === -1 || !dragStartSpot) return;

  const container = containerRef.value;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const deltaX = ((e.clientX - dragStartX) / rect.width) * 100;
  const deltaY = ((e.clientY - dragStartY) / rect.height) * 100;

  let newX = Math.max(0, Math.min(100 - dragStartSpot.width, dragStartSpot.x + deltaX));
  let newY = Math.max(0, Math.min(100 - dragStartSpot.height, dragStartSpot.y + deltaY));

  const newHotspots = props.hotspots.map((spot, i) => {
    if (i === draggingIndex.value) {
      return { ...spot, x: newX, y: newY };
    }
    return spot;
  });
  emit("update:hotspots", newHotspots);
}

function handleResizeMove(e) {
  if (resizingIndex.value === -1 || !dragStartSpot) return;

  const container = containerRef.value;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const deltaX = ((e.clientX - dragStartX) / rect.width) * 100;
  const deltaY = ((e.clientY - dragStartY) / rect.height) * 100;

  let newX = dragStartSpot.x;
  let newY = dragStartSpot.y;
  let newWidth = dragStartSpot.width;
  let newHeight = dragStartSpot.height;

  const minSize = 3;

  switch (resizeHandle) {
    case "se":
      newWidth = Math.max(minSize, Math.min(100 - newX, newWidth + deltaX));
      newHeight = Math.max(minSize, newHeight + deltaY);
      break;
    case "sw":
      newWidth = Math.max(minSize, newWidth - deltaX);
      newX = Math.max(0, newX + deltaX);
      if (newX + newWidth > 100) {
        newWidth = 100 - newX;
      }
      newHeight = Math.max(minSize, newHeight + deltaY);
      break;
    case "ne":
      newWidth = Math.max(minSize, Math.min(100 - newX, newWidth + deltaX));
      newHeight = Math.max(minSize, newHeight - deltaY);
      newY = Math.max(0, newY + deltaY);
      if (newY + newHeight > 100) {
        newHeight = 100 - newY;
      }
      break;
    case "nw":
      newWidth = Math.max(minSize, newWidth - deltaX);
      newX = Math.max(0, newX + deltaX);
      if (newX + newWidth > 100) {
        newWidth = 100 - newX;
      }
      newHeight = Math.max(minSize, newHeight - deltaY);
      newY = Math.max(0, newY + deltaY);
      if (newY + newHeight > 100) {
        newHeight = 100 - newY;
      }
      break;
  }

  const newHotspots = props.hotspots.map((spot, i) => {
    if (i === resizingIndex.value) {
      return { ...spot, x: newX, y: newY, width: newWidth, height: newHeight };
    }
    return spot;
  });
  emit("update:hotspots", newHotspots);
}

function handleMouseUp() {
  draggingIndex.value = -1;
  dragStartSpot = null;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

function handleResizeUp() {
  resizingIndex.value = -1;
  resizeHandle = "";
  dragStartSpot = null;
  document.removeEventListener("mousemove", handleResizeMove);
  document.removeEventListener("mouseup", handleResizeUp);
}
</script>

<style scoped>
.hotspot-widget {
  width: 100%;
}

.hotspot-container {
  position: relative;
  width: 100%;
  background-color: #f0f0f0;
}

.hotspot-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hotspot-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hotspot-item {
  border: 2px dashed rgba(99, 102, 241, 0.6);
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background-color 0.2s;
  user-select: none;
}

.hotspot-item:hover {
  border-color: rgba(99, 102, 241, 0.8);
  background-color: rgba(99, 102, 241, 0.15);
}

.hotspot-item.is-selected {
  border-color: #6366f1;
  border-style: solid;
  background-color: rgba(99, 102, 241, 0.2);
}

.hotspot-item.is-dragging {
  opacity: 0.8;
  cursor: move !important;
}

.hotspot-content {
  font-size: 10px;
  color: #6366f1;
  text-align: center;
  padding: 2px 4px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 调整大小手柄 */
.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #6366f1;
  border: 1px solid white;
  border-radius: 2px;
  z-index: 10;
}

.resize-handle-nw {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}

.resize-handle-ne {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}

.resize-handle-sw {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}

.resize-handle-se {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}
</style>
