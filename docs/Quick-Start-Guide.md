# UI/UX改进快速开始指南

> 快速参考：如何实施DoorDash启发的UI/UX改进

## 📚 相关文档

- **完整PRD**: [UI-UX-Improvement-PRD.md](./UI-UX-Improvement-PRD.md)
- **实施计划**: 见PRD第六章

## 🎯 核心改进点（优先级排序）

### P0 - 立即实施（本周）

#### 1. 添加顶部搜索栏
```bash
# 创建组件
src/components/SearchHeader.vue
```

**关键特性:**
- 固定在顶部(sticky)
- 场景选择器 + 搜索框 + 拍照按钮
- 搜索历史 + 热门搜索

#### 2. 快速筛选Chips
```bash
# 创建组件
src/components/FilterChips.vue
```

**关键特性:**
- 横向滚动
- 选中状态明显（黑底白字）
- ⚡快手 🌶️微辣 🥬素食 等

#### 3. RecipeCard组件重构
```bash
# 修改现有组件
src/components/RecipeCard.vue
```

**关键改进:**
- 4:3大图
- 悬浮收藏按钮
- Meta信息行（评分⭐ 时间⏱️ 难度🔥）
- 快速操作栏

### P1 - 短期优化（下周）

#### 4. 首页简化
**从3步到1步:**
```
❌ 旧流程: 食材选择 → 菜系选择 → 确认 → 生成
✅ 新流程: 智能推荐 → 一键生成
```

#### 5. 智能场景推荐
```bash
# 创建组件
src/components/SmartSceneCards.vue
```

**推荐逻辑:**
- 时间感知（早/午/晚餐）
- 历史偏好
- 季节性推荐
- 天气感知（可选）

#### 6. 骨架屏加载
```bash
# 创建组件
src/components/SkeletonLoader.vue
```

**替代空白加载:**
- RecipeCard骨架
- 列表骨架
- 搜索结果骨架

## 🎨 设计令牌

### 快速配置 Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#FBBF24',
          pink: '#EC4899',
        },
        black: '#0A0910',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px rgba(0, 0, 0, 0.1)',
        'brutal-md': '4px 4px 0px 0px rgba(0, 0, 0, 0.1)',
        'brutal-lg': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
      },
    },
  },
}
```

### 通用样式类

```css
/* src/styles/utilities.css */

/* Button样式 */
.btn-primary {
  @apply py-4 px-6 bg-gradient-to-r from-yellow-400 to-pink-400
         text-white font-bold rounded-xl border-2 border-black
         shadow-brutal-lg
         active:shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px]
         transition-all duration-200
         disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply py-3 px-6 bg-white text-gray-800 font-medium
         border-2 border-black rounded-xl
         hover:bg-gray-50 active:scale-95
         transition-all;
}

/* Chip样式 */
.chip {
  @apply px-4 py-2 rounded-full text-sm font-medium
         border-2 whitespace-nowrap
         transition-all duration-200;
}

.chip-active {
  @apply bg-black text-white border-black
         shadow-brutal-sm;
}

.chip-default {
  @apply bg-white text-gray-700 border-gray-300
         hover:border-gray-400 active:scale-95;
}

/* Card样式 */
.card {
  @apply bg-white border-2 border-black rounded-xl
         transition-all duration-200
         hover:shadow-lg hover:-translate-y-1;
}
```

## 🔧 实施步骤

### Step 1: 安装依赖（如需要）

```bash
# 如果需要额外的库
npm install @vueuse/core          # Vue组合式工具
npm install @vueuse/gesture       # 手势支持
npm install intersection-observer # 懒加载polyfill
```

### Step 2: 创建设计系统基础

```bash
# 1. 创建设计令牌
touch src/styles/design-tokens.ts

# 2. 创建通用样式
touch src/styles/utilities.css

# 3. 更新tailwind配置
# 编辑 tailwind.config.js
```

### Step 3: 创建基础组件

```bash
# 按优先级创建
mkdir -p src/components/ui

# P0组件
touch src/components/SearchHeader.vue
touch src/components/FilterChips.vue
# 修改 src/components/RecipeCard.vue

# P1组件
touch src/components/SmartSceneCards.vue
touch src/components/IngredientScanner.vue
touch src/components/SkeletonLoader.vue
```

### Step 4: 逐页重构

```bash
# 1. 首页
# 修改 src/views/Home.vue

# 2. 菜谱页
# 修改 src/views/TableDesign.vue 或重命名为 Recipes.vue

# 3. 底部导航
# 修改 src/components/BottomTabBar.vue
```

### Step 5: 测试与优化

```bash
# 运行开发服务器
npm run dev

# 构建生产版本
npm run build

# 检查包大小
npm run build -- --report
```

## 📊 检查清单

### 视觉设计

- [ ] 所有圆角使用 `rounded-xl` 或 `rounded-2xl`
- [ ] 间距使用 8px 的倍数 (p-2, p-4, p-6, p-8)
- [ ] CTA按钮使用黄色渐变 + 黑边
- [ ] 卡片有 2px 黑边 + 阴影
- [ ] 颜色仅使用设计令牌中定义的颜色

### 交互体验

- [ ] 所有按钮有 `active:scale-95` 或类似反馈
- [ ] 加载状态使用骨架屏
- [ ] 搜索框有清除按钮（输入时显示）
- [ ] 底部导航有活动指示器
- [ ] Toast提示自动消失（3秒）

### 性能

- [ ] 图片使用 `loading="lazy"`
- [ ] 长列表考虑虚拟滚动
- [ ] 路由使用懒加载
- [ ] 首屏加载 < 2秒

### 响应式

- [ ] 在 375px (iPhone SE) 正常显示
- [ ] 在 768px (iPad) 正常显示
- [ ] 横屏适配良好
- [ ] 安全区域适配 (safe-area-inset)

## 🎯 快速代码片段

### 1. 搜索栏基础结构

```vue
<template>
  <div class="sticky top-0 z-50 bg-white border-b-2 border-black">
    <div class="flex items-center gap-2 p-3">
      <!-- 场景选择 -->
      <button class="flex items-center gap-1 text-sm font-medium">
        <span>🍽️</span>
        <span>家常菜</span>
        <span>▼</span>
      </button>

      <!-- 搜索框 -->
      <input
        placeholder='搜索 "宫保鸡丁"'
        class="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm"
      />

      <!-- 拍照 -->
      <button class="w-10 h-10 bg-gray-100 rounded-full">
        📷
      </button>
    </div>
  </div>
</template>
```

### 2. RecipeCard快速模板

```vue
<template>
  <div class="card cursor-pointer">
    <!-- 图片 -->
    <div class="relative aspect-[4/3] overflow-hidden rounded-t-xl">
      <img :src="recipe.image" class="w-full h-full object-cover" />

      <!-- 收藏 -->
      <button class="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full">
        {{ isFavorited ? '❤️' : '🤍' }}
      </button>

      <!-- 标签 -->
      <span class="absolute bottom-3 left-3 px-2 py-1 bg-black/70 text-white rounded-full text-xs">
        {{ recipe.cuisine }}
      </span>
    </div>

    <!-- 内容 -->
    <div class="p-4 border-2 border-black border-t-0 rounded-b-xl">
      <h3 class="font-bold text-lg mb-2">{{ recipe.name }}</h3>

      <!-- Meta -->
      <div class="flex gap-3 text-sm text-gray-600 mb-3">
        <span>⭐ {{ recipe.rating }}</span>
        <span>⏱️ {{ recipe.time }}分钟</span>
        <span>🔥 {{ recipe.difficulty }}</span>
      </div>

      <!-- 操作 -->
      <button class="w-full py-2 bg-yellow-400 rounded-lg font-medium">
        查看菜谱
      </button>
    </div>
  </div>
</template>
```

### 3. 骨架屏快速实现

```vue
<template>
  <div class="animate-pulse">
    <!-- 图片骨架 -->
    <div class="w-full aspect-[4/3] bg-gray-200 rounded-t-xl"></div>

    <!-- 内容骨架 -->
    <div class="p-4 border-2 border-gray-200 border-t-0 rounded-b-xl">
      <div class="h-6 bg-gray-200 rounded-lg mb-2"></div>
      <div class="flex gap-3 mb-3">
        <div class="h-4 w-20 bg-gray-200 rounded"></div>
        <div class="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
      <div class="h-10 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
</template>
```

## 🚀 部署建议

### 灰度发布计划

```typescript
// 1. 功能开关配置
const featureFlags = {
  newHomepage: {
    enabled: true,
    rolloutPercentage: 10, // 先给10%用户
  },
  newSearch: {
    enabled: true,
    rolloutPercentage: 50,
  }
}

// 2. A/B测试
// 使用 localStorage 或 cookie 标记用户组
const userGroup = localStorage.getItem('ab_test_group') ||
                  (Math.random() < 0.5 ? 'A' : 'B')

// 3. 逐步放量
// Day 1-3: 10%
// Day 4-7: 30%
// Day 8-10: 50%
// Day 11-14: 100%
```

### 性能监控

```typescript
// 添加性能监控
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.timing
    const loadTime = perfData.loadEventEnd - perfData.navigationStart

    // 上报性能数据
    analytics.track('page_load_time', {
      time: loadTime,
      page: window.location.pathname
    })
  })
}
```

## 📞 获取帮助

- **完整PRD**: [UI-UX-Improvement-PRD.md](./UI-UX-Improvement-PRD.md)
- **GitHub Issues**: 项目问题追踪
- **设计评审**: 每周三下午2点

## ✅ 下一步

1. 阅读完整PRD文档
2. 创建开发分支 `git checkout -b feature/ui-ux-improvement`
3. 按优先级实施改进
4. 提交PR并请求代码评审
5. 进行用户测试
6. 收集反馈并迭代

---

**祝改进顺利！🎉**
