<template>
  <div class="flex w-full h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
    <DesignLeft />
    <DesignCenter />
    <DesignRight />
  </div>
</template>

<script setup>
import DesignLeft from "./DesignLeft/index.vue";
import DesignCenter from "./DesignCenter/index.vue";
import DesignRight from "./DesignRight/index.vue";

defineProps({
  modelValue: {
    type: Object,
    default: () => ({ widgetList: [] }),
  },
});

defineEmits(["update:modelValue"]);
</script>
