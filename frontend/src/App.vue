<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-dark-900 dark:to-dark-800">
    <!-- Navigation -->
    <NavBar v-if="showNavigation" />
    
    <!-- Main Content -->
    <main :class="{ 'pt-0': !showNavigation }">
      <router-view />
    </main>
    
    <!-- Footer -->
    <AppFooter v-if="showNavigation" />
    
    <!-- Toast Notifications -->
    <Toast />
    
    <!-- Global Loading -->
    <div v-if="loading" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="text-gray-600 font-medium">Carregando...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
import Toast from './components/Toast.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    AppFooter,
    Toast
  },
  setup() {
    const route = useRoute()
    const authStore = useAuthStore()
    
    // Routes that don't show navigation
    const noNavRoutes = ['/checkout']
    
    const showNavigation = computed(() => {
      return !noNavRoutes.some(path => route.path.startsWith(path))
    })
    
    const loading = computed(() => authStore.loading)
    
    onMounted(() => {
      authStore.initializeAuth()
      
      // Check for saved theme preference or default to light
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      }
    })
    
    return {
      showNavigation,
      loading
    }
  }
}
</script>
