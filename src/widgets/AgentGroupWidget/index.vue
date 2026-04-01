<template>
  <div class="overflow-x-auto" :style="containerStyle">
    <div class="flex pb-2" :style="listStyle">
      <div
        v-for="(agent, index) in agents"
        :key="index"
        class="flex-shrink-0 w-28 bg-white rounded-lg p-3 shadow-sm"
        :style="cardStyle"
      >
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 rounded-full overflow-hidden mb-2">
            <img
              v-if="agent.avatar"
              :src="agent.avatar"
              :alt="agent.name"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-purple-400 text-white text-xl font-bold"
            >
              {{ agent.name?.charAt(0) || 'A' }}
            </div>
          </div>
          <div class="text-sm font-medium text-gray-800 truncate w-full text-center mb-1">
            {{ agent.name }}
          </div>
          <div class="text-xs text-gray-400 mb-2">
            {{ agent.chatCount || 0 }} 条对话
          </div>
          <a
            v-if="agent.link"
            :href="agent.link"
            class="w-full py-1.5 text-center text-xs text-white bg-primary rounded-md hover:opacity-90 transition-opacity"
          >
            去聊天
          </a>
          <button
            v-else
            class="w-full py-1.5 text-center text-xs text-white bg-primary rounded-md hover:opacity-90 transition-opacity"
          >
            去聊天
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  agents: {
    type: Array,
    default: () => [
      { name: "智能体1", avatar: "", chatCount: 10, link: "" },
      { name: "智能体2", avatar: "", chatCount: 20, link: "" },
    ],
  },
  styles: { type: Object, default: () => ({}) },
});

const containerStyle = computed(() => ({
  backgroundColor: props.styles.backgroundColor || "#f5f5f5",
  padding: props.styles.padding || "12px",
  marginTop: props.styles.marginTop || "5px",
  marginBottom: props.styles.marginBottom || "5px",
}));

const listStyle = computed(() => ({
  gap: props.styles.gap || "12px",
}));

const cardStyle = computed(() => ({
  borderRadius: props.styles.cardRadius || "8px",
}));
</script>
