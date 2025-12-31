<script setup lang="ts">
/**
 * Button组件 - 基础按钮
 * 支持3种变体: primary(主要), secondary(次要), ghost(幽灵)
 * 支持3种尺寸: sm(小), md(中), lg(大)
 */

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button'
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
    :class="[
      // Base styles
      'inline-flex items-center justify-center gap-2',
      'font-medium rounded-xl border-2',
      'transition-all duration-normal',
      'disabled:opacity-50 disabled:cursor-not-allowed',

      // Variant styles
      {
        'btn-primary': variant === 'primary' && !disabled && !loading,
        'btn-secondary': variant === 'secondary' && !disabled && !loading,
        'btn-ghost': variant === 'ghost' && !disabled && !loading,
      },

      // Size styles
      {
        'btn-sm': size === 'sm',
        'btn-lg': size === 'lg',
      }
    ]"
  >
    <!-- Loading spinner -->
    <span
      v-if="loading"
      class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
    ></span>

    <!-- Button content -->
    <slot v-if="!loading" />
    <span v-if="loading && $slots.default">
      <slot />
    </span>
  </button>
</template>

<style scoped>
/* Size variants not covered by utilities.css */
button:not(.btn-sm):not(.btn-lg) {
  @apply py-3 px-6;
}
</style>
