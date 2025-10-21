<template>
  <nav class="bg-white/95 dark:bg-dark-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link to="/">
            <img src="/src/assets/logo.png" alt="Plenna" style="height: 120px;" />
          </router-link>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/dashboard" class="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors" :class="{ 'text-primary-500 dark:text-primary-400': $route.path === '/dashboard' }">Dashboard</router-link>
            <router-link to="/deposits" class="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors" :class="{ 'text-primary-500 dark:text-primary-400': $route.path === '/deposits' }">Depósitos</router-link>
            <router-link to="/withdrawals" class="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors" :class="{ 'text-primary-500 dark:text-primary-400': $route.path === '/withdrawals' }">Saques</router-link>
            <router-link to="/checkouts" class="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors" :class="{ 'text-primary-500 dark:text-primary-400': $route.path === '/checkouts' }">Checkouts</router-link>
            <router-link to="/transactions" class="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors" :class="{ 'text-primary-500 dark:text-primary-400': $route.path === '/transactions' }">Transações</router-link>
          </template>
          <template v-else>
            <router-link to="/login" class="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors">Entrar</router-link>
            <router-link to="/register" class="btn-primary">Cadastrar</router-link>
          </template>
        </div>

        <div v-if="authStore.isAuthenticated" class="hidden md:flex items-center space-x-4">
          <button @click="toggleDarkMode" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
            <SunIcon v-if="isDark" class="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <MoonIcon v-else class="w-5 h-5 text-gray-700" />
          </button>
          
          <div class="flex items-center space-x-2 text-sm bg-gray-100 dark:bg-dark-700 px-3 py-2 rounded-lg">
            <span class="text-gray-700 dark:text-gray-200">Saldo:</span>
            <span class="font-semibold text-primary-600 dark:text-primary-400">{{ formatCurrency(authStore.user?.balance || 0) }}</span>
          </div>
          
          <div class="relative" ref="userMenuRef">
            <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
              <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ userInitials }}</span>
              </div>
              <ChevronDownIcon class="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
            
            <div v-show="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 py-2 z-50">
              <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors" @click="showUserMenu = false">Meu Perfil</router-link>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-dark-700 transition-colors">Sair</button>
            </div>
          </div>
        </div>

        <div class="md:hidden flex items-center space-x-2">
          <button v-if="authStore.isAuthenticated" @click="toggleDarkMode" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
            <SunIcon v-if="isDark" class="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <MoonIcon v-else class="w-5 h-5 text-gray-700" />
          </button>
          <button @click="showMobileMenu = !showMobileMenu" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
            <Bars3Icon v-if="!showMobileMenu" class="w-6 h-6 text-gray-700 dark:text-gray-200" />
            <XMarkIcon v-else class="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>

      <div v-show="showMobileMenu" class="md:hidden py-4 border-t border-gray-200 dark:border-dark-700">
        <div class="space-y-2">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/dashboard" class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors rounded-lg" @click="showMobileMenu = false">Dashboard</router-link>
            <router-link to="/deposits" class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors rounded-lg" @click="showMobileMenu = false">Depósitos</router-link>
            <router-link to="/withdrawals" class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors rounded-lg" @click="showMobileMenu = false">Saques</router-link>
            <router-link to="/checkouts" class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors rounded-lg" @click="showMobileMenu = false">Checkouts</router-link>
            <router-link to="/transactions" class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors rounded-lg" @click="showMobileMenu = false">Transações</router-link>
            <div class="border-t border-gray-200 dark:border-dark-700 pt-2 mt-2">
              <div class="px-4 py-2 text-sm bg-gray-100 dark:bg-dark-700 rounded-lg mx-2">
                <span class="text-gray-700 dark:text-gray-200">Saldo: </span>
                <span class="font-semibold text-primary-600 dark:text-primary-400">{{ formatCurrency(authStore.user?.balance || 0) }}</span>
              </div>
              <router-link to="/profile" class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors rounded-lg" @click="showMobileMenu = false">Meu Perfil</router-link>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors rounded-lg">Sair</button>
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors rounded-lg" @click="showMobileMenu = false">Entrar</router-link>
            <router-link to="/register" class="block px-4 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors rounded-lg" @click="showMobileMenu = false">Cadastrar</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ChevronDownIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'NavBar',
  components: { ChevronDownIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const showUserMenu = ref(false)
    const showMobileMenu = ref(false)
    const userMenuRef = ref(null)
    const isDark = ref(false)

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
      showUserMenu.value = false
      showMobileMenu.value = false
      router.push('/login')
    }

    const handleClickOutside = (event) => {
      if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
        showUserMenu.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      isDark.value = document.documentElement.classList.contains('dark')
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return { authStore, showUserMenu, showMobileMenu, userMenuRef, userInitials, isDark, formatCurrency, toggleDarkMode, logout }
  }
}
</script>
