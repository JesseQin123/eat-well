<script setup lang="ts">
import { computed } from 'vue'

export interface SceneCard {
  id: string
  name: string
  icon: string
  description: string
  ingredients?: string[]
  tags?: string[]
}

const props = defineProps<{
  scenes?: SceneCard[]
  customRecommendations?: boolean
}>()

const emit = defineEmits<{
  generate: [scene: SceneCard]
}>()

// 智能推荐算法 - 基于时间和场景
const smartScenes = computed<SceneCard[]>(() => {
  // 如果有自定义推荐场景,直接使用
  if (props.scenes && props.scenes.length > 0) {
    return props.scenes
  }

  const hour = new Date().getHours()
  const dayOfWeek = new Date().getDay() // 0=周日, 6=周六

  // 早餐时段 (7:00-10:00)
  if (hour >= 7 && hour <= 10) {
    return [
      {
        id: 'quick-breakfast',
        name: '快手早餐',
        icon: '🥪',
        description: '10分钟搞定营养早餐',
        tags: ['快手', '早餐'],
        ingredients: ['鸡蛋', '面包', '牛奶']
      },
      {
        id: 'healthy-breakfast',
        name: '营养早餐',
        icon: '🥗',
        description: '健康活力的一天',
        tags: ['健康', '早餐'],
        ingredients: ['燕麦', '水果', '酸奶']
      },
      {
        id: 'chinese-breakfast',
        name: '中式早餐',
        icon: '🥟',
        description: '传统中式早点',
        tags: ['中式', '早餐'],
        ingredients: ['包子', '豆浆', '油条']
      },
      {
        id: 'simple-breakfast',
        name: '极简早餐',
        icon: '🍳',
        description: '5分钟快速出餐',
        tags: ['快手', '简单'],
        ingredients: ['鸡蛋', '吐司']
      }
    ]
  }

  // 午餐时段 (11:00-14:00)
  if (hour >= 11 && hour <= 14) {
    // 工作日午餐
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      return [
        {
          id: 'office-lunch',
          name: '上班便当',
          icon: '🍱',
          description: '适合带饭的健康午餐',
          tags: ['便当', '午餐'],
          ingredients: []
        },
        {
          id: 'quick-lunch',
          name: '快手午餐',
          icon: '⚡',
          description: '20分钟快速午餐',
          tags: ['快手', '午餐'],
          ingredients: []
        },
        {
          id: 'light-lunch',
          name: '轻食午餐',
          icon: '🥙',
          description: '清爽不油腻',
          tags: ['健康', '轻食'],
          ingredients: []
        },
        {
          id: 'energy-lunch',
          name: '能量午餐',
          icon: '💪',
          description: '下午不困的秘诀',
          tags: ['健康', '营养'],
          ingredients: []
        }
      ]
    }
    // 周末午餐
    return [
      {
        id: 'weekend-lunch',
        name: '周末大餐',
        icon: '🍖',
        description: '犒劳自己的丰盛午餐',
        tags: ['周末', '丰盛'],
        ingredients: []
      },
      {
        id: 'family-lunch',
        name: '家庭聚餐',
        icon: '👨‍👩‍👧‍👦',
        description: '全家人的温馨时光',
        tags: ['家庭', '聚餐'],
        ingredients: []
      },
      {
        id: 'creative-lunch',
        name: '创意料理',
        icon: '👨‍🍳',
        description: '尝试新菜式',
        tags: ['创意', '新手'],
        ingredients: []
      },
      {
        id: 'comfort-food',
        name: '治愈美食',
        icon: '🍜',
        description: '周末的慢时光',
        tags: ['治愈', '慢食'],
        ingredients: []
      }
    ]
  }

  // 晚餐时段 (17:00-20:00)
  if (hour >= 17 && hour <= 20) {
    return [
      {
        id: 'family-dinner',
        name: '家常晚餐',
        icon: '🏠',
        description: '温馨家常菜',
        tags: ['家常', '晚餐'],
        ingredients: []
      },
      {
        id: 'quick-dinner',
        name: '快手晚餐',
        icon: '⚡',
        description: '30分钟上桌',
        tags: ['快手', '晚餐'],
        ingredients: []
      },
      {
        id: 'healthy-dinner',
        name: '健康晚餐',
        icon: '🥗',
        description: '低卡营养不发胖',
        tags: ['健康', '低卡'],
        ingredients: []
      },
      {
        id: 'special-dinner',
        name: '特色晚餐',
        icon: '🌟',
        description: '给生活加点料',
        tags: ['特色', '精致'],
        ingredients: []
      }
    ]
  }

  // 夜宵时段 (20:00-23:00)
  if (hour >= 20 && hour <= 23) {
    return [
      {
        id: 'late-night',
        name: '夜宵小食',
        icon: '🌙',
        description: '不罪恶的夜宵',
        tags: ['夜宵', '小食'],
        ingredients: []
      },
      {
        id: 'light-snack',
        name: '清淡小吃',
        icon: '🍲',
        description: '不影响睡眠',
        tags: ['清淡', '夜宵'],
        ingredients: []
      },
      {
        id: 'comfort-snack',
        name: '治愈夜宵',
        icon: '🍜',
        description: '温暖的深夜食堂',
        tags: ['治愈', '夜宵'],
        ingredients: []
      },
      {
        id: 'healthy-snack',
        name: '健康夜宵',
        icon: '🥛',
        description: '营养又不长胖',
        tags: ['健康', '低卡'],
        ingredients: []
      }
    ]
  }

  // 默认推荐 (其他时段)
  return [
    {
      id: 'popular',
      name: '热门菜谱',
      icon: '🔥',
      description: '大家都在做',
      tags: ['热门', '经典'],
      ingredients: []
    },
    {
      id: 'seasonal',
      name: '时令推荐',
      icon: '🌿',
      description: '应季新鲜食材',
      tags: ['时令', '新鲜'],
      ingredients: []
    },
    {
      id: 'beginner',
      name: '新手友好',
      icon: '👍',
      description: '零失败的简单菜',
      tags: ['新手', '简单'],
      ingredients: []
    },
    {
      id: 'special',
      name: '特色菜系',
      icon: '🎨',
      description: '探索不同风味',
      tags: ['特色', '多样'],
      ingredients: []
    }
  ]
})

// 获取当前时段文本
const currentTimePeriod = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 7 && hour <= 10) return '早餐'
  if (hour >= 11 && hour <= 14) return '午餐'
  if (hour >= 17 && hour <= 20) return '晚餐'
  if (hour >= 20 && hour <= 23) return '夜宵'
  return '美食'
})

const handleCardClick = (scene: SceneCard) => {
  emit('generate', scene)
}
</script>

<template>
  <div class="px-4 py-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
        <span>✨</span>
        <span>为你推荐</span>
        <span class="text-sm font-normal text-gray-500">{{ currentTimePeriod }}</span>
      </h2>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="scene in smartScenes"
        :key="scene.id"
        @click="handleCardClick(scene)"
        class="card-brutal p-4 text-left active:scale-95"
      >
        <!-- 图标 -->
        <div class="text-4xl mb-3 text-center">{{ scene.icon }}</div>

        <!-- 标题 -->
        <h3 class="text-base font-bold text-gray-800 mb-1 text-center">{{ scene.name }}</h3>

        <!-- 描述 -->
        <p class="text-xs text-gray-600 text-center mb-2">{{ scene.description }}</p>

        <!-- 标签 -->
        <div v-if="scene.tags && scene.tags.length > 0" class="flex flex-wrap gap-1 justify-center">
          <span
            v-for="tag in scene.tags.slice(0, 2)"
            :key="tag"
            class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
          >
            {{ tag }}
          </span>
        </div>
      </button>
    </div>
  </div>
</template>
