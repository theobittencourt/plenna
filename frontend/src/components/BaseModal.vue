<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click="closeModal">
    <div 
      class="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
        <button 
          @click="closeModal"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <XMarkIcon class="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <!-- Content -->
      <div class="mb-6">
        <slot />
      </div>

      <!-- Actions -->
      <div class="flex space-x-3 justify-end">
        <button 
          v-if="showCancel"
          @click="closeModal"
          class="btn-secondary"
        >
          {{ cancelText }}
        </button>
        <button 
          v-if="showConfirm"
          @click="confirmAction"
          class="btn-primary"
          :disabled="loading"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Carregando...
          </span>
          <span v-else>{{ confirmText }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'BaseModal',
  components: {
    XMarkIcon
  },
  props: {
    title: {
      type: String,
      default: 'Modal'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: 'Cancelar'
    },
    confirmText: {
      type: String,
      default: 'Confirmar'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'confirm'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close')
    }

    const confirmAction = () => {
      emit('confirm')
    }

    return {
      closeModal,
      confirmAction
    }
  }
}
</script>