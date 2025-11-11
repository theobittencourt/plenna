<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" @click="closeModal">
      <div 
        :class="[
          'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl transform transition-all duration-300 p-6',
          sizeClasses
        ]"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ title }}</h3>
          <button 
            @click="closeModal"
            class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <XMarkIcon class="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <!-- Content -->
        <div>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'BaseModal',
  components: {
    XMarkIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal'
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  },
  emits: ['update:modelValue'],
  computed: {
    sizeClasses() {
      const sizes = {
        sm: 'max-w-sm w-full',
        md: 'max-w-md w-full',
        lg: 'max-w-2xl w-full',
        xl: 'max-w-4xl w-full'
      }
      return sizes[this.size]
    }
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:modelValue', false)
    }

    return {
      closeModal
    }
  }
}
</script>