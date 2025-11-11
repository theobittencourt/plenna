<template>
  <div id="app" class="min-h-screen">
    <!-- Navigation -->
    <NavBar v-if="showNavigation" />
    
    <!-- Main Content -->
    <div v-if="showNavigation">
      <router-view />
    </div>
    <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <router-view />
      <AppFooter />
    </div>
    
    <!-- Toast Notifications -->
    <Toast />
    
    <!-- Global Loading -->
    <div v-if="loading" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center space-y-4 max-w-sm w-full">
        <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-purple-600"></div>
        <p class="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base">Carregando...</p>
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
    const landingRoutes = ['/', '/login', '/register']
    
    const showNavigation = computed(() => {
      // Don't show navbar on checkout routes
      if (noNavRoutes.some(path => route.path.startsWith(path))) {
        return false
      }
      // Don't show dashboard navbar on landing routes when not authenticated
      if (landingRoutes.includes(route.path) && !authStore.isAuthenticated) {
        return false
      }
      // Show dashboard navbar only when authenticated
      return authStore.isAuthenticated
    })
    
    const loading = computed(() => authStore.loading)
    
    onMounted(() => {
      authStore.initializeAuth()
      
      // Check for saved theme preference or default to light
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark')
      } else {
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
