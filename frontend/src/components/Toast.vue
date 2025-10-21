<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center p-4 rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-300 transform"
        :class="getToastClasses(toast.type)"
      >
        <div class="flex-shrink-0 mr-3">
          <CheckCircleIcon v-if="toast.type === 'success'" class="w-5 h-5" />
          <ExclamationTriangleIcon v-else-if="toast.type === 'warning'" class="w-5 h-5" />
          <XCircleIcon v-else-if="toast.type === 'error'" class="w-5 h-5" />
          <InformationCircleIcon v-else class="w-5 h-5" />
        </div>
        <div class="flex-1">
          <p class="font-medium">{{ toast.title }}</p>
          <p v-if="toast.message" class="text-sm opacity-90">{{ toast.message }}</p>
        </div>
        <button @click="removeToast(toast.id)" class="ml-3 opacity-70 hover:opacity-100 transition-opacity">
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref } from 'vue'
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const toasts = ref([])
let toastId = 0

export default {
  name: 'Toast',
  components: {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    InformationCircleIcon,
    XMarkIcon
  },
  setup() {
    const addToast = (toast) => {
      const id = ++toastId
      const newToast = { id, ...toast }
      toasts.value.push(newToast)
      
      if (toast.duration !== 0) {
        setTimeout(() => removeToast(id), toast.duration || 5000)
      }
      
      return id
    }

    const removeToast = (id) => {
      const index = toasts.value.findIndex(t => t.id === id)
      if (index > -1) toasts.value.splice(index, 1)
    }

    const getToastClasses = (type) => {
      const classes = {
        success: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800 text-success-800 dark:text-success-200',
        error: 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800 text-danger-800 dark:text-danger-200',
        warning: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800 text-warning-800 dark:text-warning-200',
        info: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-200'
      }
      return classes[type] || classes.info
    }

    return {
      toasts,
      addToast,
      removeToast,
      getToastClasses
    }
  }
}

export const useToast = () => {
  const toast = (options) => {
    return addToast(options)
  }

  const success = (title, message) => toast({ type: 'success', title, message })
  const error = (title, message) => toast({ type: 'error', title, message })
  const warning = (title, message) => toast({ type: 'warning', title, message })
  const info = (title, message) => toast({ type: 'info', title, message })

  return { toast, success, error, warning, info }
}
</script>