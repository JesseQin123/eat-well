<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SearchHeader from '@/components/SearchHeader.vue'
import FilterChips from '@/components/FilterChips.vue'
import SmartSceneCards, { type SceneCard } from '@/components/SmartSceneCards.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { generateRecipe } from '@/services/aiService'
import { cuisines } from '@/config/cuisines'
import type { Recipe, CuisineType } from '@/types'

const router = useRouter()

// 状态管理
const generating = ref(false)
const recipes = ref<Recipe[]>([])
const activeFilters = ref<string[]>([])
const errorMessage = ref('')

// 当前选中的场景
const currentScene = ref<SceneCard | null>(null)

// 处理筛选器变化
const handleFilterChange = (filters: string[]) => {
  activeFilters.value = filters
  console.log('Active filters:', filters)
  // TODO: 根据筛选条件更新推荐或重新生成菜谱
}

// 处理场景卡片点击 - 一键生成菜谱
const handleGenerateWithScene = async (scene: SceneCard) => {
  currentScene.value = scene
  generating.value = true
  errorMessage.value = ''

  try {
    // 根据场景ID选择对应的菜系
    let cuisineType: CuisineType = cuisines.find((c: CuisineType) => c.id === 'su') || cuisines[0]

    // 根据场景调整菜系选择
    if (scene.id.includes('quick') || scene.id.includes('breakfast')) {
      cuisineType = cuisines.find((c: CuisineType) => c.id === 'su') || cuisineType
    } else if (scene.id.includes('party') || scene.id.includes('special')) {
      cuisineType = cuisines.find((c: CuisineType) => c.id === 'fusion') || cuisineType
    } else if (scene.id.includes('healthy') || scene.id.includes('light')) {
      cuisineType = cuisines.find((c: CuisineType) => c.id === 'su') || cuisineType
    }

    // 构建自定义提示词
    let customPrompt = `场景：${scene.name} - ${scene.description}`

    // 添加筛选条件到提示词
    if (activeFilters.value.length > 0) {
      customPrompt += `\n要求：${activeFilters.value.join('、')}`
    }

    // 添加场景标签到提示词
    if (scene.tags && scene.tags.length > 0) {
      customPrompt += `\n特点：${scene.tags.join('、')}`
    }

    // 调用AI生成菜谱
    const recipe = await generateRecipe(
      scene.ingredients || [],
      cuisineType,
      customPrompt
    )

    // 添加场景信息到菜谱
    recipe.cuisine = cuisineType.name

    // 更新菜谱列表
    recipes.value = [recipe]

    // 滚动到结果
    setTimeout(() => {
      const resultsEl = document.getElementById('recipe-results')
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  } catch (error) {
    console.error('生成菜谱失败:', error)
    errorMessage.value = error instanceof Error ? error.message : '生成菜谱失败,请重试'
  } finally {
    generating.value = false
  }
}

// 重新生成
const handleRegenerate = () => {
  if (currentScene.value) {
    handleGenerateWithScene(currentScene.value)
  }
}

// 清除结果
const clearResults = () => {
  recipes.value = []
  currentScene.value = null
  errorMessage.value = ''
}

// 跳转到高级模式(旧版wizard)
const goToAdvancedMode = () => {
  router.push('/home-wizard')
}

// 计算是否显示结果区域
const hasResults = computed(() => recipes.value.length > 0)

// 页面加载时的欢迎提示
const welcomeMessage = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 9) return '早上好! 开始今天的美味旅程吧 ☀️'
  if (hour >= 9 && hour < 12) return '上午好! 准备做点什么好吃的? 🍳'
  if (hour >= 12 && hour < 14) return '午餐时间! 看看有什么想吃的 🍱'
  if (hour >= 14 && hour < 17) return '下午好! 为晚餐做点准备吧 ☕'
  if (hour >= 17 && hour < 20) return '晚上好! 今天吃什么呢? 🌆'
  return '夜深了,来点夜宵如何? 🌙'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 pb-20">
    <!-- 搜索头部 -->
    <SearchHeader />

    <!-- 快速筛选 -->
    <FilterChips @change="handleFilterChange" />

    <!-- 欢迎消息 -->
    <div v-if="!hasResults && !generating" class="px-4 pt-6 pb-4">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        {{ welcomeMessage }}
      </h1>
      <p class="text-sm text-gray-600">
        点击下方卡片,AI 为你即刻生成专属菜谱
      </p>
    </div>

    <!-- 智能推荐卡片 - 核心入口 -->
    <SmartSceneCards
      v-if="!generating"
      @generate="handleGenerateWithScene"
    />

    <!-- 加载状态 -->
    <div v-if="generating" class="px-4 py-12">
      <div class="card-brutal p-8 text-center">
        <div class="animate-spin text-6xl mb-4">🍳</div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">AI 大厨正在烹饪...</h3>
        <p class="text-sm text-gray-600">
          为 "{{ currentScene?.name }}" 生成专属菜谱
        </p>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMessage && !generating" class="px-4 py-4">
      <div class="bg-red-50 border-2 border-red-500 rounded-xl p-4">
        <div class="flex items-start gap-3">
          <span class="text-2xl">⚠️</span>
          <div class="flex-1">
            <h4 class="font-bold text-red-800 mb-1">生成失败</h4>
            <p class="text-sm text-red-600">{{ errorMessage }}</p>
          </div>
        </div>
        <button
          @click="handleRegenerate"
          class="mt-3 btn-secondary w-full"
        >
          重试
        </button>
      </div>
    </div>

    <!-- 结果展示区域 -->
    <div v-if="hasResults && !generating" id="recipe-results" class="px-4 py-6">
      <!-- 结果头部 -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-800">
          为你推荐 - {{ currentScene?.name }}
        </h2>
        <div class="flex gap-2">
          <button
            @click="handleRegenerate"
            class="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            换一个
          </button>
          <button
            @click="clearResults"
            class="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            清除
          </button>
        </div>
      </div>

      <!-- 菜谱卡片 -->
      <div class="space-y-4">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>

      <!-- 更多操作 -->
      <div class="mt-6 flex gap-3">
        <button
          @click="handleRegenerate"
          class="flex-1 btn-secondary"
        >
          🔄 再来一个
        </button>
        <button
          @click="clearResults"
          class="flex-1 btn-secondary"
        >
          ✨ 重新选择
        </button>
      </div>
    </div>

    <!-- 食材识别入口 (折叠) -->
    <div v-if="!hasResults && !generating" class="px-4 py-6">
      <details class="card-brutal overflow-hidden">
        <summary class="p-4 cursor-pointer font-medium flex items-center justify-between hover:bg-gray-50">
          <span class="flex items-center gap-2">
            <span class="text-2xl">📷</span>
            <span>拍照识别食材</span>
          </span>
          <span class="text-gray-400">▼</span>
        </summary>
        <div class="p-4 border-t-2 border-gray-200 bg-gray-50">
          <p class="text-sm text-gray-600 mb-3">
            上传冰箱照片,AI 识别食材,智能推荐菜谱
          </p>
          <button
            @click="router.push('/camera')"
            class="btn-secondary w-full"
          >
            打开相机
          </button>
        </div>
      </details>
    </div>

    <!-- 高级选项 (wizard模式入口) -->
    <div v-if="!hasResults && !generating" class="px-4 pb-6">
      <button
        @click="goToAdvancedMode"
        class="w-full text-sm text-gray-500 hover:text-gray-700 underline py-2"
      >
        使用高级模式 (3步精确配置) →
      </button>
    </div>
  </div>
</template>
