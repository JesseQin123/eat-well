# 设计系统规范

> 基于DoorDash设计分析的视觉设计系统

## 📐 设计原则

### 1. 视觉层次
```
重要程度 = 大小 + 颜色 + 位置 + 对比度
```

### 2. 8px栅格系统
所有间距、尺寸使用8的倍数：
```
4px  (0.5单位) - 最小间距
8px  (1单位)   - 标准小间距
12px (1.5单位) - 中小间距
16px (2单位)   - 标准间距
24px (3单位)   - 大间距
32px (4单位)   - 特大间距
```

### 3. 一致性优先
- 相同功能的组件保持一致的样式
- 相同级别的信息使用相同的样式
- 交互反馈保持一致

## 🎨 颜色系统

### 主色调

```css
/* Primary Colors - 主要品牌色 */
--color-yellow-400: #FBBF24;  /* 主黄色 - CTA按钮 */
--color-pink-400: #EC4899;    /* 主粉色 - 强调元素 */
--color-black: #0A0910;       /* 纯黑 - 边框、文字 */
--color-white: #FFFFFF;       /* 纯白 - 背景 */

/* DoorDash红色参考（可选） */
--color-red-500: #EF4444;     /* DoorDash风格的红色 */
```

### 语义色

```css
/* Semantic Colors - 状态色 */
--color-success: #10B981;   /* 成功 - 绿色 */
--color-error: #EF4444;     /* 错误 - 红色 */
--color-warning: #F59E0B;   /* 警告 - 橙色 */
--color-info: #3B82F6;      /* 信息 - 蓝色 */
```

### 中性色阶

```css
/* Neutral Colors - 灰度 */
--color-gray-50: #F9FAFB;
--color-gray-100: #F3F4F6;
--color-gray-200: #E5E7EB;
--color-gray-300: #D1D5DB;
--color-gray-400: #9CA3AF;
--color-gray-500: #6B7280;
--color-gray-600: #4B5563;
--color-gray-700: #374151;
--color-gray-800: #1F2937;
--color-gray-900: #111827;
```

### 使用场景

| 颜色 | 使用场景 | 示例 |
|------|----------|------|
| `yellow-400` | 主要CTA按钮背景 | "开始生成"按钮 |
| `pink-400` | 次要强调、渐变终点 | 渐变按钮的终点色 |
| `black` | 边框、标题文字 | 所有2px边框 |
| `gray-700` | 正文文字 | 描述性文字 |
| `gray-500` | 次要文字 | Meta信息 |
| `gray-100` | 浅色背景 | 输入框背景 |

## 🔤 字体系统

### 字体家族

```css
--font-family-sans: -apple-system, BlinkMacSystemFont,
                    "Segoe UI", Roboto, "Helvetica Neue", Arial,
                    "Noto Sans", sans-serif, "Apple Color Emoji",
                    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
```

### 字号层级

```css
/* Font Sizes */
--text-xs: 12px;      /* 小标签、辅助信息 */
--text-sm: 14px;      /* 次要文字、按钮文字 */
--text-base: 16px;    /* 正文 */
--text-lg: 18px;      /* 小标题 */
--text-xl: 20px;      /* 中标题 */
--text-2xl: 24px;     /* 大标题 */
--text-3xl: 30px;     /* 页面主标题 */
--text-4xl: 36px;     /* 超大标题 */
```

### 字重

```css
--font-normal: 400;    /* 正文 */
--font-medium: 500;    /* 次要强调 */
--font-semibold: 600;  /* 中等强调 */
--font-bold: 700;      /* 强调、按钮 */
```

### 使用规范

```vue
<!-- 页面标题 -->
<h1 class="text-3xl font-bold text-black">
  什么值得吃
</h1>

<!-- 卡片标题 -->
<h3 class="text-lg font-bold text-black">
  宫保鸡丁
</h3>

<!-- 正文 -->
<p class="text-base font-normal text-gray-700">
  经典川菜，鸡肉鲜嫩，花生香脆...
</p>

<!-- 次要信息 -->
<span class="text-sm text-gray-500">
  ⏱️ 30分钟
</span>

<!-- 小标签 -->
<span class="text-xs font-medium text-gray-600">
  川菜
</span>
```

## 📏 间距系统

### 基础单位

```css
/* Spacing Scale - 基于8px */
--space-0: 0px;
--space-1: 4px;   /* 0.5 * 8 */
--space-2: 8px;   /* 1 * 8 */
--space-3: 12px;  /* 1.5 * 8 */
--space-4: 16px;  /* 2 * 8 */
--space-5: 20px;  /* 2.5 * 8 */
--space-6: 24px;  /* 3 * 8 */
--space-8: 32px;  /* 4 * 8 */
--space-10: 40px; /* 5 * 8 */
--space-12: 48px; /* 6 * 8 */
--space-16: 64px; /* 8 * 8 */
```

### 使用场景

| 间距 | 使用场景 | Tailwind类 |
|------|----------|------------|
| 4px | chip内部间距 | `gap-1` |
| 8px | 列表项之间 | `gap-2` |
| 12px | 卡片内元素间距 | `gap-3` |
| 16px | 页面边距、卡片padding | `p-4`, `px-4` |
| 24px | 区块之间 | `gap-6`, `mb-6` |
| 32px | 页面顶部间距 | `pt-8` |

### 组件间距示例

```vue
<!-- 页面容器 -->
<div class="px-4 py-6">  <!-- 16px左右, 24px上下 -->

  <!-- 区块间距 -->
  <section class="mb-6">  <!-- 24px底部间距 -->

    <!-- 卡片内间距 -->
    <div class="p-4">  <!-- 16px内边距 -->

      <!-- 元素间距 -->
      <div class="flex gap-3">  <!-- 12px元素间距 -->
        <span>⭐ 4.5</span>
        <span>⏱️ 30分钟</span>
      </div>

    </div>
  </section>
</div>
```

## 🔲 圆角系统

### 圆角层级

```css
/* Border Radius */
--radius-sm: 8px;    /* 小组件：chip、tag */
--radius-md: 12px;   /* 中等：input、button */
--radius-lg: 16px;   /* 大组件：card */
--radius-xl: 20px;   /* 超大：modal */
--radius-2xl: 24px;  /* 巨大：特殊容器 */
--radius-full: 9999px; /* 圆形：avatar、pill */
```

### 使用规范

```vue
<!-- Chip标签 -->
<span class="rounded-full">  <!-- 完全圆角 -->
  快手菜
</span>

<!-- 按钮 -->
<button class="rounded-xl">  <!-- 20px圆角 -->
  查看菜谱
</button>

<!-- 卡片 -->
<div class="rounded-2xl">  <!-- 24px圆角 -->
  <!-- 卡片内容 -->
</div>

<!-- 输入框 -->
<input class="rounded-lg">  <!-- 16px圆角 -->
```

## ✨ 阴影系统

### 阴影层级（Brutal Design风格）

```css
/* Box Shadows - Brutal/Neo-brutalism Style */
--shadow-sm: 2px 2px 0px 0px rgba(0, 0, 0, 0.1);
--shadow-md: 4px 4px 0px 0px rgba(0, 0, 0, 0.1);
--shadow-lg: 4px 4px 0px 0px rgba(0, 0, 0, 1);
--shadow-xl: 6px 6px 0px 0px rgba(0, 0, 0, 1);
```

### 配置Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px rgba(0, 0, 0, 0.1)',
        'brutal-md': '4px 4px 0px 0px rgba(0, 0, 0, 0.1)',
        'brutal-lg': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-xl': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
      }
    }
  }
}
```

### 使用示例

```vue
<!-- 主CTA按钮 - 强阴影 -->
<button class="border-2 border-black shadow-brutal-lg
               active:shadow-brutal-sm
               active:translate-x-[2px] active:translate-y-[2px]">
  开始生成
</button>

<!-- 卡片 - 中等阴影 -->
<div class="border-2 border-black shadow-brutal-md
            hover:shadow-brutal-lg hover:-translate-y-1">
  <!-- 卡片内容 -->
</div>

<!-- Chip - 轻阴影 -->
<span class="border-2 border-black shadow-brutal-sm">
  快手菜
</span>
```

## 🎭 边框系统

### 边框宽度

```css
--border-0: 0px;
--border-1: 1px;   /* 默认边框 */
--border-2: 2px;   /* 粗边框（主要使用） */
--border-4: 4px;   /* 特粗边框 */
```

### 使用规范

```vue
<!-- 主要组件都使用2px边框 -->
<div class="border-2 border-black">
  主要内容
</div>

<!-- 次要组件使用1px边框 -->
<div class="border border-gray-300">
  次要内容
</div>

<!-- 分隔线 -->
<hr class="border-t-2 border-gray-200" />
```

## 🎬 动画系统

### 动画时长

```css
/* Duration */
--duration-fast: 150ms;    /* 快速反馈 */
--duration-normal: 200ms;  /* 标准过渡 */
--duration-slow: 300ms;    /* 复杂动画 */
```

### 缓动函数

```css
/* Easing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### 常用动画

```vue
<!-- 按钮点击反馈 -->
<button class="transition-all duration-200
               active:scale-95">
  点击我
</button>

<!-- 卡片hover效果 -->
<div class="transition-all duration-200
            hover:shadow-lg hover:-translate-y-1">
  卡片内容
</div>

<!-- 淡入效果 -->
<div class="transition-opacity duration-300
            opacity-0 group-hover:opacity-100">
  悬浮显示
</div>

<!-- 滑动展开 -->
<Transition
  enter-active-class="transition-all duration-300 ease-out"
  enter-from-class="opacity-0 -translate-y-2"
  enter-to-class="opacity-100 translate-y-0"
>
  <div v-if="show">内容</div>
</Transition>
```

## 🧩 组件规范

### Button按钮

#### Primary Button

```vue
<template>
  <button class="btn-primary">
    {{ label }}
  </button>
</template>

<style scoped>
.btn-primary {
  @apply w-full py-4 px-6
         bg-gradient-to-r from-yellow-400 to-pink-400
         text-white font-bold text-base
         rounded-xl border-2 border-black
         shadow-brutal-lg
         active:shadow-brutal-sm
         active:translate-x-[2px] active:translate-y-[2px]
         transition-all duration-200
         disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
```

#### Secondary Button

```vue
<style scoped>
.btn-secondary {
  @apply py-3 px-6
         bg-white text-gray-800 font-medium text-sm
         border-2 border-black rounded-xl
         hover:bg-gray-50 active:scale-95
         transition-all duration-200;
}
</style>
```

#### Ghost Button

```vue
<style scoped>
.btn-ghost {
  @apply py-2 px-4
         bg-transparent text-gray-700 font-medium text-sm
         hover:bg-gray-100 rounded-lg
         transition-colors duration-200;
}
</style>
```

### Input输入框

```vue
<template>
  <input
    :placeholder="placeholder"
    class="input-primary"
  />
</template>

<style scoped>
.input-primary {
  @apply w-full px-4 py-3
         bg-white border-2 border-gray-300
         rounded-lg text-base
         focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100
         placeholder:text-gray-400
         transition-all duration-200
         disabled:bg-gray-100 disabled:cursor-not-allowed;
}
</style>
```

### Card卡片

```vue
<style scoped>
.card {
  @apply bg-white border-2 border-black rounded-2xl
         overflow-hidden
         transition-all duration-200
         hover:shadow-brutal-lg hover:-translate-y-1;
}

.card-header {
  @apply p-4 border-b-2 border-black
         bg-gradient-to-r from-yellow-50 to-pink-50;
}

.card-body {
  @apply p-4;
}

.card-footer {
  @apply p-4 border-t-2 border-gray-100
         bg-gray-50;
}
</style>
```

### Chip标签

```vue
<style scoped>
.chip {
  @apply px-4 py-2
         rounded-full text-sm font-medium
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

.chip-success {
  @apply bg-green-500 text-white border-green-600;
}

.chip-error {
  @apply bg-red-500 text-white border-red-600;
}
</style>
```

## 📱 响应式设计

### 断点

```css
/* Breakpoints */
--screen-sm: 640px;   /* 手机横屏 */
--screen-md: 768px;   /* 平板竖屏 */
--screen-lg: 1024px;  /* 平板横屏、小桌面 */
--screen-xl: 1280px;  /* 桌面 */
--screen-2xl: 1536px; /* 大桌面 */
```

### 使用示例

```vue
<!-- 响应式网格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <RecipeCard v-for="recipe in recipes" :recipe="recipe" />
</div>

<!-- 响应式间距 -->
<div class="px-4 md:px-6 lg:px-8">
  <!-- 手机16px, 平板24px, 桌面32px -->
</div>

<!-- 响应式文字大小 -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">
  什么值得吃
</h1>

<!-- 移动端隐藏/显示 -->
<div class="hidden md:block">
  <!-- 仅平板和桌面显示 -->
</div>

<div class="block md:hidden">
  <!-- 仅手机显示 -->
</div>
```

## 🎯 图标系统

### Emoji图标（推荐）

```vue
<!-- 使用原生Emoji -->
<span class="text-2xl">🍜</span>  <!-- 汤类 -->
<span class="text-2xl">🥬</span>  <!-- 蔬菜 -->
<span class="text-2xl">🥩</span>  <!-- 肉类 -->
<span class="text-2xl">🌶️</span>  <!-- 辣味 -->
<span class="text-2xl">⭐</span>  <!-- 评分 -->
<span class="text-2xl">⏱️</span>  <!-- 时间 -->
<span class="text-2xl">🔥</span>  <!-- 难度 -->
<span class="text-2xl">❤️</span>  <!-- 收藏 -->
```

### SVG图标（备选）

```vue
<!-- 使用Heroicons或自定义SVG -->
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
```

## 📐 布局模式

### 页面布局

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部导航 -->
    <header class="sticky top-0 z-50 bg-white border-b-2 border-black">
      <SearchHeader />
    </header>

    <!-- 主要内容 -->
    <main class="flex-1 pb-20 md:pb-4">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <!-- 页面内容 -->
      </div>
    </main>

    <!-- 底部导航（移动端） -->
    <nav class="md:hidden">
      <BottomTabBar />
    </nav>
  </div>
</template>
```

### Grid布局

```vue
<!-- 响应式网格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 手机1列, 平板2列, 桌面3列 -->
</div>

<!-- 固定宽度网格 -->
<div class="grid grid-cols-3 gap-3">
  <!-- 始终3列 -->
</div>

<!-- 自适应网格 -->
<div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
  <!-- 自动计算列数 -->
</div>
```

### Flex布局

```vue
<!-- 水平居中 -->
<div class="flex items-center justify-center">
  <!-- 内容 -->
</div>

<!-- 两端对齐 -->
<div class="flex items-center justify-between">
  <div>左侧</div>
  <div>右侧</div>
</div>

<!-- 垂直堆叠 -->
<div class="flex flex-col gap-4">
  <div>项目1</div>
  <div>项目2</div>
</div>
```

## 🌓 暗色模式（可选）

### 配置

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // 或 'media'
  theme: {
    extend: {
      colors: {
        // 暗色模式颜色
      }
    }
  }
}
```

### 使用

```vue
<!-- 自动切换 -->
<div class="bg-white dark:bg-gray-900
            text-gray-900 dark:text-white">
  内容
</div>

<!-- 按钮在暗色模式下 -->
<button class="bg-yellow-400 dark:bg-yellow-500
               text-black dark:text-white">
  点击
</button>
```

## ✅ 设计检查清单

### 视觉检查

- [ ] 所有圆角使用 `rounded-lg` 或以上
- [ ] 所有主要边框使用 `border-2 border-black`
- [ ] 所有间距是8的倍数
- [ ] CTA按钮使用黄粉渐变
- [ ] 卡片有Brutal风格阴影
- [ ] 字体大小符合层级

### 交互检查

- [ ] 所有按钮有 `active:scale-95` 或 `active:translate` 反馈
- [ ] 悬浮效果流畅（200ms过渡）
- [ ] 禁用状态清晰（`opacity-50`）
- [ ] 焦点状态可见（`focus:ring`）

### 响应式检查

- [ ] 在375px宽度正常显示
- [ ] 在768px有合适的布局调整
- [ ] 在1920px不会过宽
- [ ] 触摸区域 ≥ 44x44px

### 性能检查

- [ ] 图片有 `loading="lazy"`
- [ ] 动画使用 `transform` 和 `opacity`
- [ ] 避免使用 `width`、`height`、`left`、`top` 动画
- [ ] 长列表使用虚拟滚动

---

## 📚 参考资源

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Hero Icons**: https://heroicons.com
- **Brutalist Design**: https://brutalistwebsites.com
- **DoorDash Design**: 本地参考图片 `docs/doordash-designs/`

---

**设计系统版本**: v1.0
**最后更新**: 2025-12-30
