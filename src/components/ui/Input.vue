<script setup lang="ts">
/**
 * Input组件 - 基础输入框
 * 支持双向绑定、placeholder、禁用状态等
 */

interface Props {
  modelValue: string | number
  placeholder?: string
  disabled?: boolean
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  success?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  type: 'text',
  size: 'md',
  error: false,
  success: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  enter: [event: KeyboardEvent]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (props.type === 'number') {
    emit('update:modelValue', target.valueAsNumber)
  } else {
    emit('update:modelValue', target.value)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    emit('enter', event)
  }
}
</script>

<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="handleInput"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @keydown="handleKeydown"
    :class="[
      // Base styles
      'input-primary',

      // Size styles
      {
        'input-sm': size === 'sm',
        'input-lg': size === 'lg',
      },

      // State styles
      {
        'error': error,
        'success': success,
      }
    ]"
  />
</template>

<style scoped>
/* Additional state styles */
input.error {
  @apply border-red-500 focus:border-red-500 focus:ring-red-100;
}

input.success {
  @apply border-green-500 focus:border-green-500 focus:ring-green-100;
}
</style>
