<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-dark-900 dark:to-dark-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 animate-scale-in">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <img src="../../assets/logo.png" alt="Plenna" class="h-24 w-auto" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Entrar na sua conta</h2>
        <p class="text-gray-600 dark:text-gray-400">Acesse seu painel</p>
      </div>

      <!-- Form -->
      <div class="card animate-slide-up" style="animation-delay: 0.2s">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label for="login" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email ou Usuário</label>
              <input
                id="login"
                v-model="form.login"
                type="text"
                required
                class="input-field"
                placeholder="seu@email.com ou usuário"
                :disabled="loading"
              />
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Senha</label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="input-field pr-12"
                  placeholder="Sua senha"
                  :disabled="loading"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Lembrar de mim
              </label>
            </div>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-500">
              Esqueceu a senha?
            </a>
          </div>
          
          <div v-if="error" class="px-4 py-3 rounded-xl" :class="isActivationError ? 'bg-warning-50 border border-warning-200 text-warning-700' : 'bg-danger-50 border border-danger-200 text-danger-700'">
            {{ error }}
            <div v-if="isActivationError" class="mt-2 text-sm">
              Entre em contato com o suporte para ativar sua conta.
            </div>
          </div>
          
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Entrando...
            </span>
            <span v-else>Entrar</span>
          </button>
        </form>
        
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400">Ou</span>
            </div>
          </div>
          
          <div class="mt-6 text-center">
            <p class="text-gray-600 dark:text-gray-400">
              Não tem uma conta?
              <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500">
                Cadastre-se gratuitamente
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { handleApiError } from '../../services/api'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'LoginView',
  components: {
    EyeIcon,
    EyeSlashIcon
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const form = ref({
      login: '',
      password: '',
      rememberMe: false
    })
    
    const loading = ref(false)
    const error = ref('')
    const showPassword = ref(false)
    
    const isActivationError = computed(() => {
      return error.value.includes('Conta não ativada')
    })
    
    const handleLogin = async () => {
      loading.value = true
      error.value = ''
      
      try {
        await authStore.login({
          login: form.value.login,
          password: form.value.password
        })
        router.push('/dashboard')
      } catch (err) {
        error.value = handleApiError(err)
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      loading,
      error,
      showPassword,
      isActivationError,
      handleLogin
    }
  }
}
</script>
