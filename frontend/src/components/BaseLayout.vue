<template>
  <div class="page-container">
    <main class="content-wrapper">
      <!-- Breadcrumb -->
      <Breadcrumb v-if="breadcrumbs" :items="breadcrumbs" class="mb-6" />
      
      <!-- Page Header -->
      <div class="page-header" v-if="title || subtitle || $slots.header">
        <slot name="header">
          <div class="flex justify-between items-start">
            <div>
              <h1 v-if="title" class="page-title">{{ title }}</h1>
              <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
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
    </main>
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