<template>
  <div class="w-70 flex flex-col h-full bg-white border-l border-gray-200">
    <div class="px-4 py-4 pr-5 border-b border-gray-200">
      <div class="flex items-center gap-2.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span class="text-sm font-semibold text-gray-800">属性配置</span>
      </div>
    </div>

    <div v-if="!selectedWidget" class="flex-1 overflow-auto p-3 pr-5">
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-2xl font-bold text-primary">📄</span>
          <span class="text-sm font-medium text-gray-800">页面设置</span>
        </div>
      </div>

      <div class="mb-4">
        <div class="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          背景设置
        </div>
        <div class="space-y-3">
          <div class="prop-item">
            <label class="block text-xs text-gray-600 mb-1">背景颜色</label>
            <el-color-picker
              :model-value="pageConfig.backgroundColor"
              @update:model-value="(value) => editorStore.updatePageConfig({ backgroundColor: value })"
              show-alpha
            />
          </div>
          <div class="prop-item">
            <label class="block text-xs text-gray-600 mb-1">背景图片</label>
            <el-input
              :model-value="pageConfig.backgroundImage"
              placeholder="输入图片URL，留空则无背景图"
              @update:model-value="(value) => editorStore.updatePageConfig({ backgroundImage: value })"
              size="small"
            />
          </div>
          <div class="prop-item">
            <label class="block text-xs text-gray-600 mb-1">页面内边距</label>
            <el-input
              :model-value="pageConfig.padding"
              placeholder="如: 0 8px"
              @update:model-value="(value) => editorStore.updatePageConfig({ padding: value })"
              size="small"
            />
          </div>
        </div>
      </div>

      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
        <p class="text-xs text-gray-400">💡 提示：点击画布中的组件可单独配置该组件的属性</p>
      </div>
    </div>

    <div v-else class="flex-1 overflow-auto">
      <div class="p-3 pr-5">
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-2xl font-bold text-primary">{{ widgetMeta?.icon }}</span>
            <span class="text-sm font-medium text-gray-800">{{ widgetMeta?.title }}</span>
          </div>
        </div>

        <div v-if="propConfig.length > 0" class="mb-4">
          <div class="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            内容设置
          </div>
          <div class="space-y-2">
            <div v-for="config in propConfig" :key="config.name" class="prop-item">
              <label class="block text-xs text-gray-600 mb-1">{{ config.label }}</label>
              <ImageListSetter
                v-if="config.type === 'image-list'"
                :model-value="selectedWidget.props[config.name] || []"
                v-bind="config.options || {}"
                @update:model-value="(value) => handlePropValueChange(config.name, value)"
              />
              <GridNavListSetter
                v-else-if="config.type === 'grid-nav-list'"
                :model-value="selectedWidget.props[config.name] || []"
                v-bind="config.options || {}"
                @update:model-value="(value) => handlePropValueChange(config.name, value)"
              />
              <ProductListSetter
                v-else-if="config.type === 'product-list'"
                :model-value="selectedWidget.props[config.name] || []"
                v-bind="config.options || {}"
                @update:model-value="(value) => handlePropValueChange(config.name, value)"
              />
              <AgentGroupSetter
                v-else-if="config.type === 'agent-group-list'"
                :model-value="selectedWidget.props[config.name] || []"
                v-bind="config.options || {}"
                @update:model-value="(value) => handlePropValueChange(config.name, value)"
              />
              <MovieTagListSetter
                v-else-if="config.type === 'movie-tag-list'"
                :model-value="selectedWidget.props[config.name] || []"
                @update:model-value="(value) => handlePropValueChange(config.name, value)"
              />
              <MovieListSetter
                v-else-if="config.type === 'movie-list'"
                :model-value="selectedWidget.props[config.name] || []"
                v-bind="config.options || {}"
                @update:model-value="(value) => handlePropValueChange(config.name, value)"
              />
              <HotspotListSetter
                v-else-if="config.type === 'hotspot-list'"
                :model-value="selectedWidget.props[config.name] || []"
                v-bind="config.options || {}"
                @update:model-value="(value) => handlePropValueChange(config.name, value)"
              />
              <LightCardListSetter
                v-else-if="config.type === 'light-card-list' && selectedWidget.name === 'LightCardWidget'"
                :model-value="selectedWidget.props[config.name] || []"
                v-bind="config.options || {}"
                @update:model-value="(value) => handlePropValueChange(config.name, value)"
              />
              <LightCardListSetter2
                v-else-if="config.type === 'light-card-list' && selectedWidget.name === 'LightCardListWidget'"
                :model-value="selectedWidget.props[config.name] || []"
                v-bind="config.options || {}"
                @update:model-value="(value) => handlePropValueChange(config.name, value)"
              />
              <el-input-number
                v-else-if="config.type === 'number'"
                :model-value="selectedWidget.props[config.name]"
                :placeholder="config.placeholder || ''"
                @update:model-value="handlePropChange(config.name, $event)"
                class="w-full"
                size="small"
                :min="0"
              />
              <el-color-picker
                v-else-if="config.type === 'color'"
                :model-value="selectedWidget.props[config.name] || '#000000'"
                @update:model-value="handlePropChange(config.name, $event)"
                show-alpha
              />
              <el-select
                v-else-if="config.type === 'select'"
                :model-value="selectedWidget.props[config.name]"
                @update:model-value="handlePropChange(config.name, $event)"
                class="w-full"
                size="small"
              >
                <el-option
                  v-for="option in config.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
              <el-switch
                v-else-if="config.type === 'switch'"
                :model-value="selectedWidget.props[config.name]"
                @update:model-value="handlePropValueChange(config.name, $event)"
              />
              <el-input
                v-else
                :model-value="selectedWidget.props[config.name]"
                :placeholder="config.placeholder || ''"
                @update:model-value="handlePropChange(config.name, $event)"
                size="small"
              />
            </div>
          </div>
        </div>

        <div v-if="styleConfig.length > 0">
          <div class="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            样式设置
          </div>
          <div class="space-y-2">
            <div v-for="config in styleConfig" :key="config.name" class="prop-item">
              <label class="block text-xs text-gray-600 mb-1">{{ config.label }}</label>
              <el-color-picker
                v-if="config.type === 'color'"
                :model-value="selectedWidget.styles[config.name] || '#000000'"
                @update:model-value="handleStyleChange(config.name, $event)"
                show-alpha
              />
              <el-input
                v-else
                :model-value="selectedWidget.styles[config.name]"
                :placeholder="config.placeholder || ''"
                @update:model-value="handleStyleChange(config.name, $event)"
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useEditorStore } from "../../../store/editor";
import { getWidgetMeta } from "../../../registry";
import ImageListSetter from "../../../widgets/ImageListSetter.vue";
import GridNavListSetter from "../../../widgets/GridNavWidget/GridNavListSetter.vue";
import ProductListSetter from "../../../widgets/ProductListWidget/ProductListSetter.vue";
import AgentGroupSetter from "../../../widgets/AgentGroupWidget/AgentGroupSetter.vue";
import MovieTagListSetter from "../../../widgets/MovieRecommendWidget/MovieTagListSetter.vue";
import MovieListSetter from "../../../widgets/MovieCardWidget/MovieListSetter.vue";
import HotspotListSetter from "../../../widgets/HotspotWidget/HotspotListSetter.vue";
import LightCardListSetter from "../../../widgets/LightCardWidget/LightCardListSetter.vue";
import LightCardListSetter2 from "../../../widgets/LightCardListWidget/LightCardListSetter.vue";
import {
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElColorPicker,
  ElSwitch,
} from "element-plus";

const editorStore = useEditorStore();

const selectedWidget = computed(() => editorStore.selectedWidget);
const pageConfig = computed(() => editorStore.pageConfig);

const widgetMeta = computed(() => {
  if (!selectedWidget.value) return null;
  return getWidgetMeta(selectedWidget.value.name);
});

const propConfig = computed(() => widgetMeta.value?.propConfig || []);
const styleConfig = computed(() => widgetMeta.value?.styleConfig || []);

function handlePropChange(name, event) {
  let value = event;
  if (typeof event === 'object' && event.target) {
    value = event.target.value;
    if (event.target.type === "number") {
      value = Number(value);
    }
  }
  editorStore.updateWidgetProps(selectedWidget.value.id, { [name]: value });
}

function handlePropValueChange(name, value) {
  editorStore.updateWidgetProps(selectedWidget.value.id, { [name]: value });
}

function handleStyleChange(name, event) {
  let value = event;
  if (typeof event === 'object' && event.target) {
    value = event.target.value;
  }
  editorStore.updateWidgetStyles(selectedWidget.value.id, { [name]: value });
}
</script>

<style scoped>
.prop-item {
  margin-bottom: 1rem;
}
</style>
