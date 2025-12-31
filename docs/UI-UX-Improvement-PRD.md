# 什么值得吃 App UI/UX 改进产品需求文档 (PRD)

> **文档版本:** v1.0
> **创建时间:** 2025-12-30
> **参考标杆:** DoorDash iOS App (Feb 2025)
> **目标:** 提升用户体验，简化操作流程，符合现代使用习惯

---

## 📋 目录

1. [项目背景](#项目背景)
2. [设计原则](#设计原则)
3. [核心改进点](#核心改进点)
4. [详细设计方案](#详细设计方案)
5. [技术实现规范](#技术实现规范)
6. [实施计划](#实施计划)
7. [成功指标](#成功指标)

---

## 项目背景

### 当前痛点

通过分析DoorDash iOS应用的285张设计稿，发现我们的app在以下方面存在优化空间：

1. **操作流程复杂** - 用户需要经历3步才能生成菜谱（食材选择 → 菜系选择 → 确认）
2. **缺少快捷入口** - 没有一键式快速操作
3. **搜索不够显眼** - 搜索功能隐藏较深
4. **视觉层级不够清晰** - 信息密度过高
5. **缺少智能推荐** - 未充分利用用户历史数据

### DoorDash 核心优势分析

#### ✅ 优秀设计模式

1. **一目了然的首页**
   - 顶部固定搜索栏
   - 横向滚动分类图标
   - 快速筛选chips（Delivery Fees, Pickup, Deals）
   - 个性化推荐卡片

2. **清晰的信息架构**
   - 卡片式布局，每张卡片信息完整
   - 视觉层级分明（图片 > 标题 > Meta信息 > 操作按钮）
   - 使用badge和标签突出重点信息

3. **流畅的交互体验**
   - 底部Tab导航清晰（Home, Grocery, Shopping, Browse, Me）
   - Sticky购物车，随时可见
   - 渐进式披露（先显示必要信息，详情可展开）
   - 平滑的动画过渡

4. **强烈的视觉识别**
   - DoorDash红色作为主色调
   - 大胆的CTA按钮（红底白字，无法忽视）
   - 高品质的食物图片
   - 统一的圆角和阴影系统

---

## 设计原则

### 核心设计哲学

基于DoorDash的设计分析，我们确定以下设计原则：

#### 1. **简化第一 (Simplicity First)**

```
从3步到1步
❌ 旧流程: 食材选择 → 菜系选择 → 确认 → 生成
✅ 新流程: 首页智能推荐 → 一键生成
```

- 默认智能推荐场景
- 可选展开详细配置
- 保存用户偏好，减少重复输入

#### 2. **视觉优先 (Visual First)**

- **大图优先**: 菜谱卡片使用4:3比例的高质量图片
- **留白适度**: 参考DoorDash的间距系统（8px基础单位）
- **层次分明**: 使用卡片、阴影、边框区分内容区域

#### 3. **即时反馈 (Instant Feedback)**

- 加载状态使用骨架屏（Skeleton Screen）
- 操作结果用Toast提示
- 按钮状态清晰（default, hover, active, disabled）
- 使用动画提升体验（淡入、滑动、缩放）

#### 4. **上下文感知 (Context Aware)**

```javascript
智能推荐场景:
- 时间: 早餐(7-10点) / 午餐(11-14点) / 晚餐(17-20点)
- 季节: 春季清爽 / 夏季消暑 / 秋季滋补 / 冬季暖身
- 历史: 用户最常选择的菜系和食材
- 天气: 晴天轻食 / 雨天暖心料理
```

#### 5. **渐进增强 (Progressive Enhancement)**

- 核心功能简单直接
- 高级功能可选展开
- 新手引导清晰
- 专家模式快捷操作

---

## 核心改进点

### 改进点总览

| 改进项 | 优先级 | 当前状态 | 目标状态 | DoorDash参考 |
|--------|--------|----------|----------|--------------|
| **搜索功能** | P0 | 隐藏在页面中 | 顶部固定搜索栏 | ✅ 首页顶部 |
| **快速筛选** | P0 | 无 | 横向chips筛选 | ✅ 分类下方 |
| **操作流程** | P0 | 3步向导 | 1步智能推荐 | ✅ 一键下单 |
| **卡片设计** | P1 | 基础样式 | 大图+Meta信息 | ✅ Restaurant Card |
| **底部导航** | P1 | 4个Tab | 优化icon+文字 | ✅ 5个Tab清晰 |
| **智能推荐** | P1 | 无 | 场景化推荐 | ✅ 个性化推荐 |
| **图片优化** | P2 | 基础加载 | 渐进式+懒加载 | ✅ WebP+CDN |
| **手势操作** | P2 | 无 | 滑动快捷操作 | ✅ 滑动收藏 |

---

## 详细设计方案

### 1️⃣ 首页改版 (Home Redesign)

#### 1.1 布局结构

```
┌─────────────────────────────────────┐
│ 📍 家常菜 ▼     🔍 搜索菜谱...  📷 │ ← Sticky Header
├─────────────────────────────────────┤
│ 🥬 蔬菜  🥩 肉类  🌶️ 辣味  🍜 汤... │ ← 分类横滚
├─────────────────────────────────────┤
│ [⚡快手] [🌶️微辣] [🥬素食] [更多▼] │ ← 筛选Chips
├─────────────────────────────────────┤
│                                     │
│  💡 智能推荐                         │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │快手菜│ │家常菜│ │聚餐菜│        │ ← 场景卡片
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  📸 扫描冰箱，智能推荐                │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │   [📷 拍照识别食材]          │   │ ← 核心功能
│  │                             │   │
│  │        或                   │   │
│  │   [✍️ 手动输入食材 ▼]        │   │
│  └─────────────────────────────┘   │
│                                     │
│  🕐 最近使用                         │
│  [鸡胸肉] [西兰花] [胡萝卜]...      │ ← 快速添加
│                                     │
│  ┌──────────┐ ┌──────────┐         │
│  │🎲 今日盲盒│ │❤️ 我的收藏│         │ ← 快捷入口
│  └──────────┘ └──────────┘         │
│                                     │
└─────────────────────────────────────┘
│ 🏠 首页 | 🎲 盲盒 | 📚 菜谱 | ❤️ 收藏│ ← Bottom Tab
└─────────────────────────────────────┘
```

#### 1.2 核心组件设计

##### 搜索栏 (SearchHeader)

```vue
<template>
  <div class="sticky top-0 z-50 bg-white border-b-2 border-black">
    <div class="flex items-center gap-2 p-3">
      <!-- 场景选择器 -->
      <button
        @click="showScenePicker = true"
        class="flex items-center gap-1 text-sm font-medium shrink-0"
      >
        <span>{{ currentScene.icon }}</span>
        <span>{{ currentScene.name }}</span>
        <svg class="w-4 h-4"><!-- 下拉箭头 --></svg>
      </button>

      <!-- 搜索框 -->
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          @focus="showSearchSuggestions = true"
          :placeholder="searchPlaceholder"
          class="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full
                 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400
                 placeholder:text-gray-500"
        />
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        <!-- 清除按钮 -->
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-3 top-1/2 -translate-y-1/2
                 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center"
        >
          ×
        </button>
      </div>

      <!-- 拍照识别 -->
      <button
        @click="openCamera"
        class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center
               active:bg-gray-200 transition-colors shrink-0"
      >
        <span class="text-xl">📷</span>
      </button>
    </div>

    <!-- 搜索建议（下拉） -->
    <Transition name="slide-down">
      <div v-if="showSearchSuggestions" class="border-t-2 border-gray-100 bg-white">
        <!-- 搜索历史 -->
        <div v-if="searchHistory.length" class="p-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-gray-500">最近搜索</span>
            <button @click="clearHistory" class="text-xs text-gray-400">清除</button>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="item in searchHistory"
              @click="searchQuery = item"
              class="px-3 py-1.5 bg-gray-100 text-sm rounded-full
                     hover:bg-gray-200 transition-colors"
            >
              🕐 {{ item }}
            </button>
          </div>
        </div>

        <!-- 热门搜索 -->
        <div class="p-3 border-t border-gray-100">
          <div class="text-xs font-bold text-gray-500 mb-2">热门搜索</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="item in hotSearches"
              @click="searchQuery = item"
              class="px-3 py-1.5 bg-red-50 text-sm rounded-full
                     text-red-700 hover:bg-red-100 transition-colors"
            >
              🔥 {{ item }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const showSearchSuggestions = ref(false)
const showScenePicker = ref(false)

const currentScene = ref({
  icon: '🍽️',
  name: '家常菜',
  id: 'home-cooking'
})

const searchPlaceholder = computed(() => {
  const placeholders = [
    '搜索 "宫保鸡丁" 或 "鸡肉"',
    '试试 "西红柿炒鸡蛋"',
    '搜索 "快手菜"',
    '输入食材如 "西兰花"'
  ]
  return placeholders[Math.floor(Math.random() * placeholders.length)]
})

const searchHistory = ref(['宫保鸡丁', '西红柿炒鸡蛋', '青椒肉丝'])
const hotSearches = ref(['快手菜', '减脂餐', '儿童餐', '下饭菜', '汤类'])

const openCamera = () => {
  // 打开相机识别食材
}

const clearHistory = () => {
  searchHistory.value = []
}
</script>
```

##### 分类横滚 (CategoryScroll)

```vue
<template>
  <div class="category-scroll overflow-x-auto bg-white border-b border-gray-100">
    <div class="flex gap-6 px-4 py-3 min-w-max">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category)"
        class="flex flex-col items-center gap-1 min-w-[60px]"
        :class="{ 'opacity-100': selectedCategory === category.id, 'opacity-60': selectedCategory !== category.id }"
      >
        <!-- 图标容器 -->
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                 transition-all duration-200"
          :class="selectedCategory === category.id
            ? 'bg-yellow-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-110'
            : 'bg-gray-100 border-2 border-gray-200'"
        >
          {{ category.icon }}
        </div>

        <!-- 文字标签 -->
        <span
          class="text-xs font-medium transition-colors"
          :class="selectedCategory === category.id ? 'text-black' : 'text-gray-600'"
        >
          {{ category.name }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categories = [
  { id: 'vegetable', icon: '🥬', name: '蔬菜' },
  { id: 'meat', icon: '🥩', name: '肉类' },
  { id: 'seafood', icon: '🦐', name: '海鲜' },
  { id: 'spicy', icon: '🌶️', name: '辣味' },
  { id: 'soup', icon: '🍜', name: '汤类' },
  { id: 'noodles', icon: '🍝', name: '面食' },
  { id: 'rice', icon: '🍚', name: '米饭' },
  { id: 'dessert', icon: '🍰', name: '甜品' }
]

const selectedCategory = ref('vegetable')

const selectCategory = (category) => {
  selectedCategory.value = category.id
  // 触发筛选逻辑
}
</script>

<style scoped>
.category-scroll {
  /* 隐藏滚动条但保持可滚动 */
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.category-scroll::-webkit-scrollbar {
  display: none;
}
</style>
```

##### 筛选Chips (FilterChips)

```vue
<template>
  <div class="filter-chips overflow-x-auto bg-white px-4 py-2">
    <div class="flex gap-2 min-w-max">
      <button
        v-for="filter in filters"
        :key="filter.id"
        @click="toggleFilter(filter.id)"
        class="chip"
        :class="activeFilters.includes(filter.id) ? 'chip-active' : 'chip-default'"
      >
        <span>{{ filter.icon }}</span>
        <span>{{ filter.name }}</span>

        <!-- 选中标记 -->
        <svg
          v-if="activeFilters.includes(filter.id)"
          class="w-4 h-4 ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
        </svg>
      </button>

      <!-- 更多筛选 -->
      <button
        @click="showMoreFilters = true"
        class="chip chip-outline"
      >
        <span>更多筛选</span>
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const filters = [
  { id: 'quick', icon: '⚡', name: '快手菜' },
  { id: 'spicy-mild', icon: '🌶️', name: '微辣' },
  { id: 'vegetarian', icon: '🥬', name: '素食' },
  { id: 'high-protein', icon: '💪', name: '高蛋白' },
  { id: 'seasonal', icon: '🔥', name: '当季' },
  { id: 'low-fat', icon: '🥗', name: '低脂' }
]

const activeFilters = ref<string[]>([])
const showMoreFilters = ref(false)

const toggleFilter = (filterId: string) => {
  const index = activeFilters.value.indexOf(filterId)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(filterId)
  }
}
</script>

<style scoped>
.chip {
  @apply px-4 py-2 rounded-full text-sm font-medium
         whitespace-nowrap flex items-center gap-1
         transition-all duration-200 border-2;
}

.chip-active {
  @apply bg-black text-white border-black
         shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)];
}

.chip-default {
  @apply bg-white text-gray-700 border-gray-300
         hover:border-gray-400 active:scale-95;
}

.chip-outline {
  @apply bg-gray-50 text-gray-600 border-gray-200
         hover:bg-gray-100;
}
</style>
```

##### 智能场景推荐 (SmartSceneCards)

```vue
<template>
  <section class="px-4 py-4">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-bold text-gray-700 flex items-center gap-2">
        <span class="text-lg">💡</span>
        <span>智能推荐</span>
      </h3>
      <button class="text-xs text-gray-500 hover:text-gray-700">
        换一批
      </button>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="scene in smartScenes"
        :key="scene.id"
        @click="generateWithScene(scene)"
        class="scene-card group"
      >
        <!-- 图标 -->
        <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-br rounded-xl
                    flex items-center justify-center text-2xl
                    group-active:scale-95 transition-transform"
             :style="{ background: scene.gradient }"
        >
          {{ scene.icon }}
        </div>

        <!-- 标题 -->
        <div class="text-xs font-bold text-gray-800 mb-1">
          {{ scene.name }}
        </div>

        <!-- 描述 -->
        <div class="text-[10px] text-gray-500 line-clamp-2">
          {{ scene.desc }}
        </div>

        <!-- 标签 -->
        <div v-if="scene.tag" class="mt-2">
          <span class="px-2 py-0.5 bg-yellow-100 text-yellow-700
                       rounded-full text-[10px] font-medium">
            {{ scene.tag }}
          </span>
        </div>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 根据时间、历史、季节等智能推荐场景
const smartScenes = computed(() => {
  const hour = new Date().getHours()
  const isWeekend = [0, 6].includes(new Date().getDay())

  // 基础场景库
  const allScenes = [
    {
      id: 'quick-lunch',
      icon: '⚡',
      name: '快手午餐',
      desc: '15分钟快速搞定',
      gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      tag: '推荐',
      timeRange: [11, 14]
    },
    {
      id: 'family-dinner',
      icon: '👨‍👩‍👧‍👦',
      name: '家庭晚餐',
      desc: '全家老少都爱吃',
      gradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
      timeRange: [17, 20]
    },
    {
      id: 'healthy-meal',
      icon: '🥗',
      name: '健康轻食',
      desc: '低脂高蛋白',
      gradient: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
      tag: '减脂'
    },
    {
      id: 'weekend-feast',
      icon: '🎉',
      name: '周末大餐',
      desc: '慢工出细活',
      gradient: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
      weekend: true
    },
    {
      id: 'soup-comfort',
      icon: '🍲',
      name: '暖心汤品',
      desc: '养生滋补',
      gradient: 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)'
    },
    {
      id: 'spicy-kick',
      icon: '🌶️',
      name: '香辣过瘾',
      desc: '重口味首选',
      gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
      tag: '热门'
    }
  ]

  // 根据时间和条件筛选推荐场景
  return allScenes
    .filter(scene => {
      if (scene.timeRange) {
        return hour >= scene.timeRange[0] && hour <= scene.timeRange[1]
      }
      if (scene.weekend) {
        return isWeekend
      }
      return true
    })
    .slice(0, 6)
})

const generateWithScene = (scene) => {
  // 根据场景生成菜谱
  console.log('Generating with scene:', scene)
}
</script>

<style scoped>
.scene-card {
  @apply bg-white border-2 border-gray-200 rounded-2xl p-4
         text-center transition-all duration-200
         hover:border-gray-300 hover:shadow-sm
         active:scale-95;
}
</style>
```

##### 食材识别主卡片 (IngredientScanner)

```vue
<template>
  <section class="px-4 py-3">
    <div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50
                rounded-2xl border-2 border-black p-5
                shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
      <!-- 标题 -->
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="font-bold text-lg mb-1 flex items-center gap-2">
            <span class="text-2xl">📸</span>
            <span>扫描冰箱，智能推荐</span>
          </h3>
          <p class="text-xs text-gray-600">
            AI识别食材，秒出菜谱
          </p>
        </div>

        <!-- 帮助按钮 -->
        <button
          @click="showHelp = true"
          class="w-6 h-6 bg-white/50 rounded-full flex items-center justify-center
                 text-xs text-gray-600 hover:bg-white/80"
        >
          ?
        </button>
      </div>

      <!-- 拍照按钮 -->
      <button
        @click="openCamera"
        :disabled="isProcessing"
        class="w-full py-4 bg-gradient-to-r from-yellow-400 to-pink-400
               text-white font-bold rounded-xl border-2 border-black
               shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
               active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
               active:translate-x-[2px] active:translate-y-[2px]
               transition-all duration-200
               disabled:opacity-50 disabled:cursor-not-allowed
               flex items-center justify-center gap-2"
      >
        <template v-if="isProcessing">
          <div class="w-5 h-5 border-2 border-white border-t-transparent
                      rounded-full animate-spin"></div>
          <span>AI识别中...</span>
        </template>
        <template v-else>
          <span class="text-xl">📷</span>
          <span>拍照识别食材</span>
        </template>
      </button>

      <!-- 分隔线 -->
      <div class="flex items-center gap-3 my-4">
        <div class="flex-1 h-px bg-gray-300"></div>
        <span class="text-xs text-gray-500 font-medium">或</span>
        <div class="flex-1 h-px bg-gray-300"></div>
      </div>

      <!-- 手动输入（可折叠） -->
      <button
        @click="showManualInput = !showManualInput"
        class="w-full py-3 text-sm text-gray-700 font-medium
               hover:text-gray-900 flex items-center justify-center gap-2
               transition-colors"
      >
        <span>✍️ 手动输入食材</span>
        <svg
          class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': showManualInput }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- 手动输入区域 -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="showManualInput" class="mt-4 pt-4 border-t border-gray-200">
          <!-- 已选食材 -->
          <div v-if="selectedIngredients.length > 0" class="mb-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-gray-600">
                已选 {{ selectedIngredients.length }}/10
              </span>
              <button
                @click="clearIngredients"
                class="text-xs text-gray-500 hover:text-gray-700"
              >
                清空
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(ing, index) in selectedIngredients"
                :key="index"
                @click="removeIngredient(index)"
                class="px-3 py-1.5 bg-yellow-100 text-yellow-800
                       rounded-full text-sm font-medium
                       flex items-center gap-1
                       hover:bg-yellow-200 transition-colors"
              >
                <span>{{ ing }}</span>
                <span class="text-xs opacity-70">×</span>
              </button>
            </div>
          </div>

          <!-- 输入框 -->
          <div class="relative mb-3">
            <input
              v-model="ingredientInput"
              @keyup.enter="addIngredient"
              placeholder="输入食材名称，如：鸡胸肉"
              class="w-full px-4 py-3 bg-white border-2 border-gray-300
                     rounded-xl text-sm
                     focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100
                     transition-all"
              :disabled="selectedIngredients.length >= 10"
            />
            <button
              v-if="ingredientInput"
              @click="addIngredient"
              class="absolute right-2 top-1/2 -translate-y-1/2
                     px-3 py-1.5 bg-yellow-400 text-black rounded-lg
                     text-sm font-medium
                     hover:bg-yellow-500 transition-colors"
            >
              添加
            </button>
          </div>

          <!-- 快速选择 -->
          <div>
            <div class="text-xs font-bold text-gray-600 mb-2">快速选择</div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="ing in quickIngredients"
                :key="ing"
                @click="quickAddIngredient(ing)"
                :disabled="selectedIngredients.includes(ing) || selectedIngredients.length >= 10"
                class="px-3 py-1.5 bg-white border border-gray-300
                       rounded-full text-sm
                       hover:border-yellow-400 hover:bg-yellow-50
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all"
              >
                {{ ing }}
              </button>
            </div>
          </div>

          <!-- 生成按钮 -->
          <button
            v-if="selectedIngredients.length > 0"
            @click="generateRecipes"
            class="w-full mt-4 py-3 bg-black text-white font-bold rounded-xl
                   border-2 border-black
                   shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]
                   active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                   transition-all"
          >
            🎯 生成菜谱 ({{ selectedIngredients.length }}种食材)
          </button>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showManualInput = ref(false)
const showHelp = ref(false)
const isProcessing = ref(false)
const selectedIngredients = ref<string[]>([])
const ingredientInput = ref('')

const quickIngredients = [
  '鸡胸肉', '西兰花', '胡萝卜', '鸡蛋', '番茄',
  '土豆', '青椒', '豆腐', '牛肉', '虾仁'
]

const openCamera = () => {
  // 打开相机进行食材识别
  isProcessing.value = true
  // 模拟识别过程
  setTimeout(() => {
    isProcessing.value = false
  }, 2000)
}

const addIngredient = () => {
  if (ingredientInput.value.trim() && selectedIngredients.value.length < 10) {
    selectedIngredients.value.push(ingredientInput.value.trim())
    ingredientInput.value = ''
  }
}

const quickAddIngredient = (ing: string) => {
  if (!selectedIngredients.value.includes(ing) && selectedIngredients.value.length < 10) {
    selectedIngredients.value.push(ing)
  }
}

const removeIngredient = (index: number) => {
  selectedIngredients.value.splice(index, 1)
}

const clearIngredients = () => {
  selectedIngredients.value = []
}

const generateRecipes = () => {
  // 生成菜谱逻辑
  console.log('Generating recipes with:', selectedIngredients.value)
}
</script>
```

### 2️⃣ 菜谱卡片组件 (RecipeCard)

**参考DoorDash的Restaurant Card设计**

```vue
<template>
  <div
    class="recipe-card group cursor-pointer"
    @click="$emit('click', recipe)"
  >
    <!-- 图片容器 -->
    <div class="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-gray-100">
      <!-- 图片 -->
      <img
        v-if="recipe.image"
        :src="recipe.image"
        :alt="recipe.name"
        class="w-full h-full object-cover
               group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />

      <!-- 图片加载占位符 -->
      <div v-else class="w-full h-full flex items-center justify-center text-4xl">
        🍳
      </div>

      <!-- 收藏按钮（悬浮右上角） -->
      <button
        @click.stop="toggleFavorite"
        class="absolute top-3 right-3
               w-10 h-10 bg-white/90 backdrop-blur-sm
               rounded-full flex items-center justify-center
               border border-gray-200
               hover:bg-white hover:scale-110
               active:scale-95
               transition-all duration-200
               z-10"
      >
        <span class="text-xl">{{ isFavorited ? '❤️' : '🤍' }}</span>
      </button>

      <!-- 左下角标签组 -->
      <div class="absolute bottom-3 left-3 flex flex-wrap gap-2 max-w-[80%]">
        <!-- 菜系标签 -->
        <span class="px-2 py-1 bg-black/70 text-white
                     rounded-full text-xs font-medium backdrop-blur-sm">
          {{ recipe.cuisine }}
        </span>

        <!-- 特色标签 -->
        <span
          v-if="recipe.isQuick"
          class="px-2 py-1 bg-green-500/90 text-white
                 rounded-full text-xs font-medium"
        >
          ⚡ 快手
        </span>

        <span
          v-if="recipe.isHealthy"
          class="px-2 py-1 bg-blue-500/90 text-white
                 rounded-full text-xs font-medium"
        >
          🥗 健康
        </span>

        <span
          v-if="recipe.isSpicy"
          class="px-2 py-1 bg-red-500/90 text-white
                 rounded-full text-xs font-medium"
        >
          🌶️ 辣
        </span>
      </div>

      <!-- 右下角徽章（如果有促销） -->
      <div v-if="recipe.badge" class="absolute bottom-3 right-3">
        <span class="px-2 py-1 bg-yellow-400 text-black
                     rounded-full text-xs font-bold
                     border-2 border-black
                     shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {{ recipe.badge }}
        </span>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="p-4 bg-white border-2 border-black border-t-0 rounded-b-xl">
      <!-- 标题 -->
      <h3 class="font-bold text-lg mb-2 line-clamp-1 group-hover:text-yellow-600 transition-colors">
        {{ recipe.name }}
      </h3>

      <!-- Meta信息行 -->
      <div class="flex items-center gap-3 text-sm text-gray-600 mb-3 flex-wrap">
        <!-- 评分 -->
        <div v-if="recipe.rating" class="flex items-center gap-1">
          <span class="text-yellow-500">⭐</span>
          <span class="font-medium text-black">{{ recipe.rating }}</span>
          <span v-if="recipe.reviews" class="text-gray-500">({{ recipe.reviews }})</span>
        </div>

        <span class="text-gray-300">•</span>

        <!-- 烹饪时间 -->
        <span class="flex items-center gap-1">
          <span>⏱️</span>
          <span>{{ recipe.cookingTime }}分钟</span>
        </span>

        <span class="text-gray-300">•</span>

        <!-- 难度 -->
        <span class="flex items-center gap-1">
          <span>{{ getDifficultyIcon(recipe.difficulty) }}</span>
          <span>{{ recipe.difficulty }}</span>
        </span>
      </div>

      <!-- 食材标签 -->
      <div v-if="recipe.ingredients?.length" class="flex gap-1 flex-wrap mb-3">
        <span
          v-for="(ing, index) in recipe.ingredients.slice(0, 4)"
          :key="index"
          class="px-2 py-0.5 bg-gray-100 text-gray-700
                 rounded text-xs border border-gray-200"
        >
          {{ ing }}
        </span>
        <span
          v-if="recipe.ingredients.length > 4"
          class="px-2 py-0.5 text-gray-500 text-xs"
        >
          +{{ recipe.ingredients.length - 4 }}
        </span>
      </div>

      <!-- 厨师信息 -->
      <div v-if="recipe.chef" class="flex items-center gap-2 pt-2 border-t border-gray-100">
        <span class="text-sm">{{ recipe.chef.avatar }}</span>
        <span class="text-xs text-gray-600">{{ recipe.chef.name }}</span>
      </div>

      <!-- 快速操作栏 -->
      <div class="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        <button
          @click.stop="viewRecipe"
          class="flex-1 py-2 bg-yellow-400 text-black font-medium rounded-lg
                 border-2 border-black
                 hover:bg-yellow-500 active:scale-95
                 transition-all text-sm"
        >
          查看菜谱
        </button>

        <button
          @click.stop="shareRecipe"
          class="px-3 py-2 border-2 border-gray-300 rounded-lg
                 hover:border-gray-400 hover:bg-gray-50
                 active:scale-95 transition-all"
        >
          <span class="text-lg">↗️</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Recipe {
  id: string
  name: string
  image?: string
  cuisine: string
  rating?: number
  reviews?: number
  cookingTime: number
  difficulty: '简单' | '中等' | '困难'
  ingredients?: string[]
  chef?: {
    avatar: string
    name: string
  }
  isQuick?: boolean
  isHealthy?: boolean
  isSpicy?: boolean
  badge?: string
}

const props = defineProps<{
  recipe: Recipe
}>()

const emit = defineEmits<{
  click: [recipe: Recipe]
  favorite: [recipe: Recipe]
  share: [recipe: Recipe]
}>()

const isFavorited = ref(false)

const getDifficultyIcon = (difficulty: string) => {
  const icons = {
    '简单': '🔥',
    '中等': '🔥🔥',
    '困难': '🔥🔥🔥'
  }
  return icons[difficulty] || '🔥'
}

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  emit('favorite', props.recipe)
}

const viewRecipe = () => {
  emit('click', props.recipe)
}

const shareRecipe = () => {
  emit('share', props.recipe)
}
</script>

<style scoped>
.recipe-card {
  @apply transition-all duration-200
         hover:shadow-lg
         hover:-translate-y-1;
}
</style>
```

### 3️⃣ 底部导航优化 (BottomTabBar)

**参考DoorDash的5个Tab设计**

```vue
<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50
              bg-white border-t-2 border-black
              safe-area-bottom">
    <div class="flex items-center justify-around h-16">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="navigateTo(tab)"
        class="flex-1 flex flex-col items-center justify-center gap-1
               transition-all duration-200"
        :class="isActive(tab) ? 'scale-110' : 'scale-100'"
      >
        <!-- 图标 -->
        <div
          class="relative text-2xl transition-all"
          :class="isActive(tab) ? 'transform -translate-y-0.5' : ''"
        >
          {{ isActive(tab) ? tab.iconActive : tab.icon }}

          <!-- Badge（如收藏数量） -->
          <span
            v-if="tab.badge && getBadgeCount(tab) > 0"
            class="absolute -top-1 -right-1
                   min-w-[18px] h-[18px]
                   bg-red-500 text-white
                   rounded-full
                   text-[10px] font-bold
                   flex items-center justify-center
                   border-2 border-white"
          >
            {{ getBadgeCount(tab) > 99 ? '99+' : getBadgeCount(tab) }}
          </span>
        </div>

        <!-- 文字 -->
        <span
          class="text-xs font-medium transition-colors"
          :class="isActive(tab) ? 'text-black' : 'text-gray-500'"
        >
          {{ tab.label }}
        </span>

        <!-- 活动指示器 -->
        <div
          class="w-1 h-1 rounded-full bg-yellow-400 transition-opacity"
          :class="isActive(tab) ? 'opacity-100' : 'opacity-0'"
        ></div>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  {
    id: 'home',
    label: '首页',
    icon: '🏠',
    iconActive: '🏠',
    path: '/',
    badge: false
  },
  {
    id: 'random',
    label: '盲盒',
    icon: '🎲',
    iconActive: '🎲',
    path: '/random',
    badge: false
  },
  {
    id: 'recipes',
    label: '菜谱',
    icon: '📚',
    iconActive: '📚',
    path: '/recipes',
    badge: false
  },
  {
    id: 'favorites',
    label: '收藏',
    icon: '🤍',
    iconActive: '❤️',
    path: '/favorites',
    badge: true // 显示收藏数量
  }
]

const isActive = (tab) => {
  return route.path === tab.path
}

const navigateTo = (tab) => {
  if (route.path !== tab.path) {
    router.push(tab.path)
  }
}

const getBadgeCount = (tab) => {
  // 从store或localStorage获取相应的数量
  if (tab.id === 'favorites') {
    // 示例：从localStorage获取收藏数量
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      return favorites.length
    } catch {
      return 0
    }
  }
  return 0
}
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
```

### 4️⃣ 骨架屏加载状态 (SkeletonLoader)

**参考DoorDash的加载状态**

```vue
<template>
  <!-- RecipeCard Skeleton -->
  <div class="recipe-card-skeleton">
    <!-- 图片骨架 -->
    <div class="skeleton-image"></div>

    <!-- 内容骨架 -->
    <div class="p-4 bg-white border-2 border-gray-200 border-t-0 rounded-b-xl">
      <!-- 标题 -->
      <div class="skeleton-text-lg mb-2"></div>

      <!-- Meta信息 -->
      <div class="flex gap-3 mb-3">
        <div class="skeleton-text-sm w-20"></div>
        <div class="skeleton-text-sm w-24"></div>
        <div class="skeleton-text-sm w-16"></div>
      </div>

      <!-- 食材标签 -->
      <div class="flex gap-2 mb-3">
        <div class="skeleton-tag"></div>
        <div class="skeleton-tag"></div>
        <div class="skeleton-tag"></div>
      </div>

      <!-- 按钮 -->
      <div class="skeleton-button"></div>
    </div>
  </div>
</template>

<style scoped>
.recipe-card-skeleton {
  @apply animate-pulse;
}

.skeleton-image {
  @apply w-full aspect-[4/3] bg-gray-200 rounded-t-xl;
}

.skeleton-text-lg {
  @apply h-6 bg-gray-200 rounded-lg;
}

.skeleton-text-sm {
  @apply h-4 bg-gray-200 rounded;
}

.skeleton-tag {
  @apply w-16 h-6 bg-gray-200 rounded-full;
}

.skeleton-button {
  @apply w-full h-10 bg-gray-200 rounded-lg mt-3;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
```

---

## 技术实现规范

### 设计令牌 (Design Tokens)

```typescript
// src/styles/design-tokens.ts

export const designTokens = {
  // 颜色系统
  colors: {
    primary: {
      yellow: '#FBBF24',
      pink: '#EC4899',
      black: '#0A0910',
    },
    semantic: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
    },
    neutral: {
      white: '#FFFFFF',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
    },
  },

  // 间距系统（8px基础单位）
  spacing: {
    xs: '4px',    // 0.5 * 8
    sm: '8px',    // 1 * 8
    md: '12px',   // 1.5 * 8
    lg: '16px',   // 2 * 8
    xl: '24px',   // 3 * 8
    '2xl': '32px', // 4 * 8
    '3xl': '48px', // 6 * 8
  },

  // 圆角
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },

  // 阴影
  shadows: {
    sm: '2px 2px 0px 0px rgba(0, 0, 0, 0.1)',
    md: '4px 4px 0px 0px rgba(0, 0, 0, 0.1)',
    lg: '4px 4px 0px 0px rgba(0, 0, 0, 1)',
    none: 'none',
  },

  // 字体
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // 动画
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
}
```

### 组件规范

```typescript
// src/components/ui/Button.vue 示例

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

// 使用Tailwind CSS的@apply指令定义样式
// 确保一致性
```

### 性能优化

```typescript
// 图片懒加载配置
export const imageOptimization = {
  lazyLoad: {
    root: null,
    rootMargin: '50px',
    threshold: 0.01
  },

  // 渐进式图片
  progressive: true,

  // WebP支持检测
  supportsWebP: async () => {
    const webp = await createImageBitmap(
      await fetch('data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=').then(r => r.blob())
    )
    return webp.width === 1
  }
}

// 虚拟滚动（大列表优化）
export const virtualScrollConfig = {
  itemHeight: 300, // RecipeCard高度
  buffer: 3,       // 预加载3个
  threshold: 0.5   // 滚动阈值
}
```

---

## 实施计划

### Phase 1: 基础重构 (Week 1)

**目标:** 建立设计系统基础，优化核心组件

#### 任务清单

- [ ] **Day 1-2: 设计系统搭建**
  - [ ] 创建 `design-tokens.ts`
  - [ ] 配置 Tailwind 使用 design tokens
  - [ ] 创建基础UI组件库 (`Button`, `Input`, `Card`)
  - [ ] 建立组件文档（Storybook可选）

- [ ] **Day 3-4: RecipeCard 重构**
  - [ ] 实现新的 RecipeCard 组件
  - [ ] 添加图片懒加载
  - [ ] 实现骨架屏加载状态
  - [ ] 添加快捷操作（收藏、分享）

- [ ] **Day 5-7: 底部导航优化**
  - [ ] 重构 BottomTabBar
  - [ ] 添加badge支持
  - [ ] 优化动画过渡
  - [ ] 适配安全区域

**验收标准:**
- ✅ 所有基础组件支持主题系统
- ✅ RecipeCard 在所有页面统一使用
- ✅ 底部导航流畅，无闪烁

### Phase 2: 首页改版 (Week 2)

**目标:** 实现新首页设计，简化用户流程

#### 任务清单

- [ ] **Day 1-2: 搜索功能**
  - [ ] 实现 SearchHeader 组件
  - [ ] 添加搜索历史
  - [ ] 添加热门搜索
  - [ ] 实现搜索建议

- [ ] **Day 3-4: 分类与筛选**
  - [ ] 实现 CategoryScroll 组件
  - [ ] 实现 FilterChips 组件
  - [ ] 添加筛选逻辑
  - [ ] 实现"更多筛选"模态框

- [ ] **Day 5-6: 智能推荐**
  - [ ] 实现 SmartSceneCards 组件
  - [ ] 添加时间感知推荐
  - [ ] 添加历史数据分析
  - [ ] 实现场景快速生成

- [ ] **Day 7: 整合测试**
  - [ ] 整合所有新组件到首页
  - [ ] 性能优化
  - [ ] 响应式适配
  - [ ] 用户测试

**验收标准:**
- ✅ 首页加载时间 < 2s
- ✅ 用户可在3步内完成菜谱生成
- ✅ 搜索响应时间 < 300ms

### Phase 3: 功能增强 (Week 3)

**目标:** 添加智能功能和交互优化

#### 任务清单

- [ ] **Day 1-2: 食材识别优化**
  - [ ] 优化 IngredientScanner 组件
  - [ ] 提升AI识别准确率
  - [ ] 添加识别结果预览
  - [ ] 优化错误处理

- [ ] **Day 3-4: 个性化推荐**
  - [ ] 实现推荐算法
  - [ ] 添加用户偏好学习
  - [ ] 实现季节性推荐
  - [ ] 添加天气感知

- [ ] **Day 5-6: 手势操作**
  - [ ] 添加滑动收藏功能
  - [ ] 添加长按快捷菜单
  - [ ] 实现下拉刷新
  - [ ] 优化触摸反馈

- [ ] **Day 7: 性能优化**
  - [ ] 实现虚拟滚动
  - [ ] 优化图片加载
  - [ ] 添加离线缓存
  - [ ] 减少包体积

**验收标准:**
- ✅ 食材识别成功率 > 85%
- ✅ 推荐准确率 > 70%
- ✅ 60fps 流畅滚动

### Phase 4: 打磨与优化 (Week 4)

**目标:** 细节打磨，提升整体体验

#### 任务清单

- [ ] **Day 1-2: 动画优化**
  - [ ] 添加页面切换动画
  - [ ] 优化加载动画
  - [ ] 添加微交互动画
  - [ ] 统一动画时长

- [ ] **Day 3-4: 无障碍优化**
  - [ ] 添加ARIA标签
  - [ ] 优化键盘导航
  - [ ] 添加屏幕阅读器支持
  - [ ] 色彩对比度检查

- [ ] **Day 5-6: 用户测试**
  - [ ] A/B测试新旧设计
  - [ ] 收集用户反馈
  - [ ] 数据分析
  - [ ] 迭代优化

- [ ] **Day 7: 上线准备**
  - [ ] 性能测试
  - [ ] 兼容性测试
  - [ ] 文档完善
  - [ ] 灰度发布计划

**验收标准:**
- ✅ 通过WCAG 2.1 AA标准
- ✅ Lighthouse分数 > 90
- ✅ 用户满意度 > 80%

---

## 成功指标

### 用户体验指标

| 指标 | 当前 | 目标 | 测量方式 |
|------|------|------|----------|
| **首屏加载时间** | 3s | < 2s | Lighthouse |
| **菜谱生成速度** | 5-8s | < 5s | 平均API响应时间 |
| **用户操作步骤** | 3步 | 1-2步 | 用户行为分析 |
| **搜索使用率** | 15% | > 40% | 搜索功能使用次数/总访问 |
| **收藏转化率** | 8% | > 20% | 收藏数/浏览数 |
| **页面跳出率** | 35% | < 20% | Google Analytics |

### 技术指标

| 指标 | 当前 | 目标 | 测量方式 |
|------|------|------|----------|
| **Lighthouse Performance** | 75 | > 90 | Lighthouse CI |
| **First Contentful Paint** | 2.1s | < 1.5s | Web Vitals |
| **Time to Interactive** | 4.2s | < 3s | Web Vitals |
| **Cumulative Layout Shift** | 0.15 | < 0.1 | Web Vitals |
| **Bundle Size** | 850KB | < 600KB | Webpack Bundle Analyzer |

### 业务指标

| 指标 | 当前 | 目标 | 测量方式 |
|------|------|------|----------|
| **日活跃用户** | - | +30% | 后端统计 |
| **用户留存率(7天)** | - | > 40% | 后端统计 |
| **平均使用时长** | - | +25% | 用户行为分析 |
| **分享次数** | - | +50% | 分享功能调用次数 |

### A/B测试计划

```typescript
// A/B测试配置
const abTestConfig = {
  // 测试1: 新旧首页对比
  homepage: {
    variants: ['old', 'new'],
    traffic: [50, 50], // 各50%流量
    metrics: [
      'conversion_rate',  // 生成菜谱转化率
      'time_to_generate', // 完成生成的时间
      'bounce_rate'       // 跳出率
    ],
    duration: 14 // 测试14天
  },

  // 测试2: 搜索栏位置
  searchPosition: {
    variants: ['top-sticky', 'inline'],
    traffic: [50, 50],
    metrics: [
      'search_usage',     // 搜索使用率
      'search_success'    // 搜索成功率
    ],
    duration: 7
  }
}
```

---

## 附录

### A. DoorDash设计分析总结

#### 优秀设计模式

1. **信息架构清晰**
   - 三级信息层次：重要 > 次要 > 辅助
   - 视觉引导自然（Z字形浏览路径）

2. **交互符合预期**
   - CTA按钮位置固定（底部右侧或全宽）
   - 返回按钮统一在左上角
   - 搜索栏固定在顶部

3. **视觉一致性强**
   - 统一的圆角系统（8px/12px/16px）
   - 一致的间距（8px基础单位）
   - 品牌色运用恰当（不过度）

4. **性能优化到位**
   - 图片渐进式加载
   - 骨架屏过渡自然
   - 滚动流畅无卡顿

#### 可借鉴的细节

```typescript
// 1. 搜索占位符动态化
const dynamicPlaceholder = [
  '搜索 "宫保鸡丁" 或 "鸡肉"',
  '试试 "西红柿炒鸡蛋"',
  '搜索 "快手菜"'
]

// 2. Badge数字显示逻辑
const formatBadge = (count: number) => {
  if (count === 0) return null
  if (count > 99) return '99+'
  return count.toString()
}

// 3. 图片加载优先级
const imageLoadingPriority = {
  above_fold: 'high',      // 首屏图片
  below_fold: 'low',       // 懒加载
  background: 'auto'       // 背景图
}

// 4. 触觉反馈
const hapticFeedback = {
  light: () => navigator.vibrate?.(10),
  medium: () => navigator.vibrate?.(20),
  heavy: () => navigator.vibrate?.(30)
}
```

### B. 设计自查清单

**上线前检查项:**

- [ ] **视觉一致性**
  - [ ] 所有按钮使用统一的圆角和阴影
  - [ ] 间距遵循8px网格系统
  - [ ] 颜色仅使用设计系统中定义的颜色
  - [ ] 字体大小符合规范

- [ ] **交互体验**
  - [ ] 所有按钮有明确的hover/active状态
  - [ ] 加载状态使用骨架屏或loading指示器
  - [ ] 错误提示清晰友好
  - [ ] 动画流畅，时长适中(200-300ms)

- [ ] **响应式适配**
  - [ ] 在iPhone SE(375px)上正常显示
  - [ ] 在iPad(768px)上正常显示
  - [ ] 在桌面端(1920px)上正常显示
  - [ ] 横屏模式下体验良好

- [ ] **性能**
  - [ ] Lighthouse Performance > 90
  - [ ] 首屏加载 < 2s
  - [ ] 图片使用WebP格式
  - [ ] 实现代码分割

- [ ] **无障碍**
  - [ ] 所有交互元素可键盘访问
  - [ ] 图片有alt文本
  - [ ] 颜色对比度符合WCAG AA
  - [ ] 支持屏幕阅读器

### C. 参考资源

- [DoorDash Design System](https://www.doordash.com/design) (假设链接)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vue 3 Best Practices](https://vuejs.org/guide/best-practices)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 版本历史

| 版本 | 日期 | 作者 | 变更说明 |
|------|------|------|----------|
| v1.0 | 2025-12-30 | Claude | 初始版本，基于DoorDash设计分析 |

---

## 反馈与迭代

如有任何问题或建议，请通过以下方式反馈：

- **GitHub Issues**: [项目地址]/issues
- **设计评审**: 每周三下午2点
- **用户测试**: 每两周一次

---

**文档结束**
