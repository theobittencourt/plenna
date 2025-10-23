<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-dark-900 dark:to-dark-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 animate-scale-in">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Criar sua conta</h2>
        <p class="text-gray-600 dark:text-gray-400">Comece a usar gratuitamente</p>
      </div>

      <!-- Form -->
      <div class="card animate-slide-up" style="animation-delay: 0.2s">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome Completo</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="input-field"
                placeholder="Seu nome completo"
                :disabled="loading"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="input-field"
                :class="{ 'border-danger-300 focus:border-danger-500': form.email && !validateEmail(form.email) }"
                placeholder="seu@email.com"
                :disabled="loading"
              />
              <p v-if="form.email && !validateEmail(form.email)" class="text-danger-600 text-sm mt-1">Email inválido</p>
            </div>

            <div>
              <label for="telefone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Telefone</label>
              <input
                id="telefone"
                v-model="form.telefone"
                type="tel"
                class="input-field"
                placeholder="(11) 99999-9999"
                :disabled="loading"
                @input="form.telefone = maskPhone($event.target.value)"
              />
            </div>

            <div>
              <label for="cpfCnpj" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CPF/CNPJ</label>
              <input
                id="cpfCnpj"
                v-model="form.cpfCnpj"
                type="text"
                class="input-field"
                placeholder="000.000.000-00"
                :disabled="loading"
                @input="form.cpfCnpj = maskCPF($event.target.value)"
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
                  placeholder="Mínimo 6 caracteres"
                  :disabled="loading"
                  minlength="6"
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

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirmar Senha</label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                class="input-field"
                placeholder="Confirme sua senha"
                :disabled="loading"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Aceito os 
              <a href="#" class="text-primary-600 hover:text-primary-500">termos de uso</a>
              e 
              <a href="#" class="text-primary-600 hover:text-primary-500">política de privacidade</a>
            </label>
          </div>
          
          <div v-if="error" class="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-xl">
            {{ error }}
          </div>
          
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full btn-primary"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cadastrando...
            </span>
            <span v-else>Criar Conta</span>
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
              Já tem uma conta?
              <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
                Faça login
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
import { handleApiError, maskCPF, maskPhone, validateEmail, validateCPF } from '../../services/api'
import { useToast } from '../../components/Toast.vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'RegisterView',
  components: {
    EyeIcon,
    EyeSlashIcon
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { success, error: showError } = useToast()
    
    const form = ref({
      name: '',
      email: '',
      telefone: '',
      cpfCnpj: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    })
    
    const loading = ref(false)
    const error = ref('')
    const showPassword = ref(false)
    
    const isFormValid = computed(() => {
      return form.value.name &&
             form.value.email &&
             validateEmail(form.value.email) &&
             form.value.password &&
             form.value.password.length >= 6 &&
             form.value.confirmPassword &&
             form.value.password === form.value.confirmPassword &&
             form.value.acceptTerms &&
             (!form.value.cpfCnpj || validateCPF(form.value.cpfCnpj))
    })
    
    const handleRegister = async () => {
      console.log('Register form submitted', form.value)
      
      if (form.value.password !== form.value.confirmPassword) {
        error.value = 'As senhas não coincidem'
        return
      }
      
      loading.value = true
      error.value = ''
      
      try {
        const registerData = {
          name: form.value.name,
          email: form.value.email,
          telefone: form.value.telefone,
          cpfCnpj: form.value.cpfCnpj,
          password: form.value.password
        }
        
        console.log('Sending register data:', registerData)
        await authStore.register(registerData)
        success('Conta criada!', 'Bem-vindo à Plenna')
        router.push('/dashboard')
      } catch (err) {
        console.error('Register error:', err)
        const errorMsg = handleApiError(err)
        error.value = errorMsg
        showError('Erro no cadastro', errorMsg)
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      loading,
      error,
      showPassword,
      isFormValid,
      handleRegister
    }
  }
}
</script>
