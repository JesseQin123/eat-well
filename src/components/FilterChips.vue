<script setup lang="ts">
import { ref } from 'vue'

interface Filter {
  id: string
  label: string
  icon: string
  active: boolean
}

const filters = ref<Filter[]>([
  { id: 'quick', label: '快手', icon: '⚡', active: false },
  { id: 'spicy', label: '微辣', icon: '🌶️', active: false },
  { id: 'vegan', label: '素食', icon: '🥬', active: false },
  { id: 'healthy', label: '健康', icon: '💚', active: false },
  { id: 'kids', label: '儿童', icon: '👶', active: false },
  { id: 'party', label: '聚餐', icon: '🎉', active: false },
  { id: 'breakfast', label: '早餐', icon: '🥪', active: false },
  { id: 'lunch', label: '午餐', icon: '🍱', active: false },
  { id: 'dinner', label: '晚餐', icon: '🍽️', active: false },
])

const emit = defineEmits<{
  change: [activeFilters: string[]]
}>()

const toggleFilter = (filterId: string) => {
  const filter = filters.value.find(f => f.id === filterId)
  if (filter) {
    filter.active = !filter.active
    const activeFilters = filters.value.filter(f => f.active).map(f => f.id)
    emit('change', activeFilters)
  }
}

const clearAllFilters = () => {
  filters.value.forEach(f => f.active = false)
  emit('change', [])
}

const hasActiveFilters = () => {
  return filters.value.some(f => f.active)
}
</script>

<template>
  <div class="bg-white border-b-2 border-gray-100">
    <div class="px-4 py-3">
      <div class="flex items-center gap-2">
        <!-- 筛选标题和清除按钮 -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <span class="text-sm font-medium text-gray-700">筛选</span>
          <button
            v-if="hasActiveFilters()"
            @click="clearAllFilters"
            class="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            清除
          </button>
        </div>

        <!-- 筛选标签 - 横向滚动 -->
        <div class="flex-1 overflow-x-auto scrollbar-hide">
          <div class="flex gap-2">
            <button
              v-for="filter in filters"
              :key="filter.id"
              @click="toggleFilter(filter.id)"
              :class="[
                'chip flex items-center gap-1 whitespace-nowrap',
                filter.active ? 'chip-active' : 'chip-default'
              ]"
            >
              <span>{{ filter.icon }}</span>
              <span>{{ filter.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
