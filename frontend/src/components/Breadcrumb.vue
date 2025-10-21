<template>
  <nav class="flex mb-6" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <router-link
          v-if="(item.to || item.href) && index < items.length - 1"
          :to="item.to || item.href"
          class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {{ item.label || item.name }}
        </router-link>
        <span
          v-else
          class="text-gray-900 dark:text-white font-medium"
          :class="{ 'text-gray-500 dark:text-gray-400': index < items.length - 1 }"
        >
          {{ item.label || item.name }}
        </span>
        <ChevronRightIcon
          v-if="index < items.length - 1"
          class="w-4 h-4 text-gray-400 dark:text-gray-500 mx-2"
        />
      </li>
    </ol>
  </nav>
</template>

<script>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'Breadcrumb',
  components: {
    ChevronRightIcon
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>