<template>
  <!-- Sidebar -->
  <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out md:translate-x-0" :class="{ '-translate-x-full': !sidebarOpen }">
    <!-- Logo -->
    <div class="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-700">
      <img src="/src/assets/logo.png" alt="Plenna" class="h-24" />
      <button @click="sidebarOpen = false" class="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <XMarkIcon class="w-5 h-5 text-slate-600 dark:text-slate-400" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6 space-y-2">
      <router-link v-for="item in navigation" :key="item.name" :to="item.href" class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors" :class="[
        $route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/dashboard')
          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-r-2 border-purple-500'
          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
      ]" @click="sidebarOpen = false">
        <component :is="item.icon" class="w-5 h-5 mr-3" />
        {{ item.name }}
      </router-link>
    </nav>

    <!-- User Info -->
    <div class="border-t border-slate-200 dark:border-slate-700 p-4">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
          <span class="text-white text-sm font-medium">{{ userInitials }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ authStore.user?.name }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ authStore.user?.email }}</p>
        </div>
      </div>
      
      <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 mb-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-600 dark:text-slate-400">Saldo Disponível</span>
          <span class="text-sm font-semibold text-purple-600 dark:text-purple-400">{{ formatCurrency(authStore.user?.balance || 0) }}</span>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button @click="toggleDarkMode" class="flex-1 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <SunIcon v-if="isDark" class="w-4 h-4 text-slate-600 dark:text-slate-400 mx-auto" />
          <MoonIcon v-else class="w-4 h-4 text-slate-600 mx-auto" />
        </button>
        <button @click="logout" class="flex-1 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <ArrowRightOnRectangleIcon class="w-4 h-4 text-red-600 dark:text-red-400 mx-auto" />
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu Button -->
  <button @click="sidebarOpen = true" class="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
    <Bars3Icon class="w-5 h-5 text-slate-600 dark:text-slate-400" />
  </button>

  <!-- Mobile Sidebar Overlay -->
  <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"></div>


</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { 
  Bars3Icon, 
  XMarkIcon, 
  SunIcon, 
  MoonIcon, 
  ArrowRightOnRectangleIcon,
  HomeIcon,
  CubeIcon,
  ShareIcon,
  UserGroupIcon,
  ChartBarIcon,
  UserIcon,
  CogIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'NavBar',
  components: { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ArrowRightOnRectangleIcon, HomeIcon, CubeIcon, ShareIcon, UserGroupIcon, ChartBarIcon, UserIcon, CogIcon },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const sidebarOpen = ref(false)
    const isDark = ref(false)

    const navigation = [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'Produtos', href: '/products', icon: CubeIcon },
      { name: 'Afiliação', href: '/affiliate-market', icon: ShareIcon },
      { name: 'Quem Indica', href: '/referrals', icon: UserGroupIcon },
      { name: 'Relatórios', href: '/reports', icon: ChartBarIcon },
      { name: 'Integrações', href: '/integrations', icon: CogIcon },
      { name: 'Perfil', href: '/profile', icon: UserIcon }
    ]

    const userInitials = computed(() => {
      if (!authStore.user?.name) return 'U'
      return authStore.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    })

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)
    }

    const toggleDarkMode = () => {
      isDark.value = !isDark.value
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }



    const logout = async () => {
      await authStore.logout()
      sidebarOpen.value = false
      router.push('/')
    }

    onMounted(() => {
      isDark.value = document.documentElement.classList.contains('dark')
    })

    return { 
      authStore, 
      sidebarOpen, 
      userInitials, 
      isDark, 
      navigation,
      formatCurrency, 
      toggleDarkMode, 
      logout
    }
  }
}
</script>


