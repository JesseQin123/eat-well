<script setup lang="ts">
/**
 * Chip组件 - 标签/徽章组件
 * 支持激活状态、不同变体、点击事件等
 */

interface Props {
  active?: boolean
  variant?: 'default' | 'success' | 'error' | 'warning'
  size?: 'sm' | 'md'
  clickable?: boolean
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  variant: 'default',
  size: 'md',
  clickable: true,
  closable: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  close: []
}>()

const handleClick = (event: MouseEvent) => {
  if (props.clickable && !props.closable) {
    emit('click', event)
  }
}

const handleClose = (event: MouseEvent) => {
  event.stopPropagation()
  emit('close')
}
</script>

<template>
  <span
    @click="handleClick"
    :class="[
      // Base styles
      'chip',

      // Active/Variant styles
      {
        'chip-active': active && variant === 'default',
        'chip-default': !active && variant === 'default',
        'chip-success': variant === 'success',
        'chip-error': variant === 'error',
        'chip-warning': variant === 'warning',
      },

      // Size styles
      {
        'chip-sm': size === 'sm',
      },

      // Clickable styles
      {
        'cursor-pointer': clickable,
        'cursor-default': !clickable,
      }
    ]"
  >
    <!-- Chip content -->
    <slot />

    <!-- Close button -->
    <button
      v-if="closable"
      @click="handleClose"
      class="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
      aria-label="关闭"
    >
      <svg
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </span>
</template>

<style scoped>
/* Closable chip padding adjustment */
.chip:has(button) {
  @apply pr-2;
}
</style>
