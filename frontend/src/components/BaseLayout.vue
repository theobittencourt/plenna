<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div class="p-6">
      <!-- Breadcrumb -->
      <Breadcrumb v-if="breadcrumbs" :items="breadcrumbs" class="mb-6" />
      
      <!-- Page Header -->
      <div v-if="subtitle || $slots.header" class="mb-8">
        <slot name="header">
          <div class="flex justify-between items-start">
            <div>
              <p v-if="subtitle" class="text-slate-600 dark:text-slate-400">{{ subtitle }}</p>
            </div>
            <div v-if="$slots.actions" class="flex items-center space-x-4">
              <slot name="actions" />
            </div>
          </div>
        </slot>
      </div>
      
      <!-- Main Content -->
      <div class="animate-fade-in-up">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'

export default {
  name: 'BaseLayout',
  components: {
    Breadcrumb
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    breadcrumbs: {
      type: Array,
      default: null
    }
  }
}
</script>