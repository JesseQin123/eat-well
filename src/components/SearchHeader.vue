<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'

const router = useRouter()
const searchQuery = ref('')
const showDropdown = ref(false)
const showSceneSelector = ref(false)
const searchHistory = useLocalStorage<string[]>('search-history', [])

const currentScene = ref({ id: 'home', name: '家常菜', icon: '🍽️' })

const scenes = [
  { id: 'home', name: '家常菜', icon: '🍽️' },
  { id: 'quick', name: '快手菜', icon: '⚡' },
  { id: 'party', name: '聚餐菜', icon: '🎉' },
  { id: 'healthy', name: '健康菜', icon: '🥗' },
  { id: 'kids', name: '儿童菜', icon: '👶' },
]

const hotSearches = ['宫保鸡丁', '麻婆豆腐', '糖醋排骨', '红烧肉', '番茄炒蛋', '清蒸鱼']

const handleSearch = () => {
  if (!searchQuery.value.trim()) return

  // 添加到历史
  if (!searchHistory.value.includes(searchQuery.value)) {
    searchHistory.value.unshift(searchQuery.value)
    if (searchHistory.value.length > 10) {
      searchHistory.value = searchHistory.value.slice(0, 10)
    }
  }

  // 跳转到搜索结果页
  router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  showDropdown.value = false
}

const clearSearch = () => {
  searchQuery.value = ''
  showDropdown.value = false
}

const selectScene = (scene: typeof scenes[0]) => {
  currentScene.value = scene
  showSceneSelector.value = false
}

const removeHistoryItem = (item: string) => {
  searchHistory.value = searchHistory.value.filter(h => h !== item)
}

const clearHistory = () => {
  searchHistory.value = []
}

// 点击搜索历史项
const selectHistoryItem = (item: string) => {
  searchQuery.value = item
  handleSearch()
}

// 点击热门搜索项
const selectHotSearch = (item: string) => {
  searchQuery.value = item
  handleSearch()
}

// 处理输入框失焦
const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}
</script>

<template>
  <div class="sticky top-0 z-50 bg-white border-b-2 border-black">
    <div class="flex items-center gap-2 p-3">
      <!-- 场景选择器 -->
      <div class="relative">
        <button
          @click="showSceneSelector = !showSceneSelector"
          class="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium
                 border-2 border-gray-300 hover:border-gray-400 active:scale-95 transition-all whitespace-nowrap"
        >
          <span>{{ currentScene.icon }}</span>
          <span>{{ currentScene.name }}</span>
          <span class="text-xs">▼</span>
        </button>

        <!-- 场景选择下拉 -->
        <Transition name="dropdown">
          <div
            v-if="showSceneSelector"
            class="absolute top-full left-0 mt-2 bg-white border-2 border-black
                   rounded-lg shadow-brutal-lg z-10 min-w-[120px] overflow-hidden"
          >
            <button
              v-for="scene in scenes"
              :key="scene.id"
              @click="selectScene(scene)"
              :class="[
                'w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-2',
                'hover:bg-gray-50 active:bg-gray-100 transition-colors',
                scene.id === currentScene.id && 'bg-yellow-50'
              ]"
            >
              <span>{{ scene.icon }}</span>
              <span>{{ scene.name }}</span>
            </button>
          </div>
        </Transition>
      </div>

      <!-- 搜索框 -->
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          @focus="showDropdown = true"
          @blur="handleBlur"
          @keyup.enter="handleSearch"
          placeholder='搜索 "宫保鸡丁"'
          class="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-full text-sm
                 border-2 border-transparent focus:border-yellow-400 focus:bg-white
                 focus:outline-none transition-all"
        />
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <!-- 搜索下拉框 -->
        <Transition name="dropdown">
          <div
            v-if="showDropdown && (searchHistory.length > 0 || !searchQuery)"
            class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black
                   rounded-lg shadow-brutal-lg z-10 max-h-[400px] overflow-y-auto"
          >
            <!-- 搜索历史 -->
            <div v-if="searchHistory.length > 0" class="p-3 border-b-2 border-gray-200">
              <div class="flex items-center justify-between mb-2">
                <div class="text-xs text-gray-500 font-medium">最近搜索</div>
                <button
                  @click="clearHistory"
                  class="text-xs text-gray-400 hover:text-gray-600"
                >
                  清空
                </button>
              </div>
              <div class="flex flex-col gap-2">
                <div
                  v-for="item in searchHistory.slice(0, 5)"
                  :key="item"
                  class="flex items-center justify-between group"
                >
                  <button
                    @click="selectHistoryItem(item)"
                    class="flex-1 text-left text-sm text-gray-700 hover:text-black py-1"
                  >
                    🕐 {{ item }}
                  </button>
                  <button
                    @click="removeHistoryItem(item)"
                    class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 text-xs px-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <!-- 热门搜索 -->
            <div class="p-3">
              <div class="text-xs text-gray-500 font-medium mb-2">热门搜索</div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in hotSearches"
                  :key="item"
                  @click="selectHotSearch(item)"
                  class="chip chip-default text-xs"
                >
                  🔥 {{ item }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 拍照按钮 -->
      <button
        @click="router.push('/camera')"
        class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center
               border-2 border-gray-300 hover:border-gray-400 active:scale-95 transition-all flex-shrink-0"
      >
        <span class="text-xl">📷</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
