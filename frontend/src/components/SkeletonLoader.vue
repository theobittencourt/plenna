<template>
  <div class="animate-pulse">
    <!-- Card Skeleton -->
    <div v-if="type === 'card'" class="card">
      <div class="skeleton h-4 w-3/4 mb-4"></div>
      <div class="skeleton h-3 w-full mb-2"></div>
      <div class="skeleton h-3 w-2/3"></div>
    </div>

    <!-- Table Skeleton -->
    <div v-else-if="type === 'table'" class="space-y-3">
      <div v-for="i in rows" :key="i" class="flex space-x-4">
        <div class="skeleton h-4 w-1/4"></div>
        <div class="skeleton h-4 w-1/3"></div>
        <div class="skeleton h-4 w-1/6"></div>
        <div class="skeleton h-4 w-1/4"></div>
      </div>
    </div>

    <!-- Text Skeleton -->
    <div v-else-if="type === 'text'" class="space-y-2">
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-5/6"></div>
      <div class="skeleton h-4 w-4/6"></div>
    </div>

    <!-- Avatar Skeleton -->
    <div v-else-if="type === 'avatar'" class="skeleton w-10 h-10 rounded-full"></div>

    <!-- Button Skeleton -->
    <div v-else-if="type === 'button'" class="skeleton h-10 w-24 rounded-xl"></div>

    <!-- Custom Skeleton -->
    <div v-else :class="customClass" class="skeleton"></div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['card', 'table', 'text', 'avatar', 'button', 'custom'].includes(value)
    },
    rows: {
      type: Number,
      default: 3
    },
    customClass: {
      type: String,
      default: 'h-4 w-full'
    }
  }
}
</script>