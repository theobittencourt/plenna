<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 md:ml-64">
    <div class="p-4 md:p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Meu Perfil</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-1">Gerencie suas informações pessoais</p>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>

      <div v-else-if="user" class="max-w-4xl">
        <!-- Profile Header Card -->
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div class="flex items-center space-x-6">
            <!-- Avatar -->
            <div class="relative">
              <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span class="text-white text-2xl font-bold">{{ userInitials }}</span>
              </div>
              <button class="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors">
                <CameraIcon class="w-3 h-3" />
              </button>
            </div>
            
            <!-- User Info -->
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ user.name }}</h2>
              <p class="text-slate-600 dark:text-slate-400">{{ user.email }}</p>
              <div class="flex items-center mt-2">
                <span class="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                  <CheckCircleIcon class="w-3 h-3 inline mr-1" />
                  Conta Ativa
                </span>
              </div>
            </div>

            <!-- Balance Card -->
            <div class="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 text-center">
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">Saldo Disponível</p>
              <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ formatCurrency(user.saldo || 0) }}</p>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="border-b border-slate-200 dark:border-slate-700 mb-8">
          <nav class="-mb-px flex space-x-8">
            <button 
              v-for="tab in tabs" 
              :key="tab.id" 
              @click="activeTab = tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
              ]"
            >
              <component :is="tab.icon" class="w-5 h-5 inline mr-2" />
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="space-y-8">
          <!-- Personal Info Tab -->
          <div v-if="activeTab === 'personal'" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-6">Informações Pessoais</h3>
            
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nome Completo</label>
                  <input 
                    v-model="user.name" 
                    type="text" 
                    required
                    class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
                    placeholder="Digite seu nome completo"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input 
                    v-model="user.email" 
                    type="email" 
                    required
                    class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Telefone</label>
                  <input 
                    v-model="user.telefone" 
                    type="tel"
                    class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">CPF/CNPJ</label>
                  <input 
                    v-model="user.cpfCnpj" 
                    type="text"
                    class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
                    placeholder="000.000.000-00"
                  />
                </div>
              </div>

              <!-- Success Message -->
              <div v-if="success" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg flex items-center">
                <CheckCircleIcon class="w-5 h-5 mr-2" />
                {{ success }}
              </div>

              <!-- Error Message -->
              <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg flex items-center">
                <ExclamationCircleIcon class="w-5 h-5 mr-2" />
                {{ error }}
              </div>

              <div class="flex justify-end">
                <button 
                  type="submit" 
                  :disabled="updating"
                  class="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                >
                  <span v-if="updating" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  {{ updating ? 'Salvando...' : 'Salvar Alterações' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Security Tab -->
          <div v-if="activeTab === 'security'" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-6">Segurança</h3>
            
            <div class="space-y-6">
              <!-- Change Password -->
              <div class="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 class="font-medium text-slate-900 dark:text-white mb-2">Alterar Senha</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Mantenha sua conta segura com uma senha forte</p>
                <button class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors">
                  Alterar Senha
                </button>
              </div>

              <!-- Two Factor -->
              <div class="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 class="font-medium text-slate-900 dark:text-white mb-2">Autenticação de Dois Fatores</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Adicione uma camada extra de segurança à sua conta</p>
                <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Configurar 2FA
                </button>
              </div>
            </div>
          </div>

          <!-- Preferences Tab -->
          <div v-if="activeTab === 'preferences'" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-6">Preferências</h3>
            
            <div class="space-y-6">
              <!-- Theme -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-slate-900 dark:text-white">Tema</h4>
                  <p class="text-sm text-slate-600 dark:text-slate-400">Escolha entre tema claro ou escuro</p>
                </div>
                <button @click="toggleDarkMode" class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors">
                  <SunIcon v-if="isDark" class="w-4 h-4 inline mr-2" />
                  <MoonIcon v-else class="w-4 h-4 inline mr-2" />
                  {{ isDark ? 'Tema Claro' : 'Tema Escuro' }}
                </button>
              </div>

              <!-- Notifications -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-slate-900 dark:text-white">Notificações</h4>
                  <p class="text-sm text-slate-600 dark:text-slate-400">Receba notificações sobre suas vendas</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notifications" type="checkbox" class="sr-only peer" />
                  <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  UserIcon, 
  ShieldCheckIcon, 
  CogIcon, 
  CameraIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const authStore = useAuthStore()
const user = ref(null)
const loading = ref(true)
const updating = ref(false)
const success = ref('')
const error = ref('')
const activeTab = ref('personal')
const notifications = ref(true)
const isDark = ref(false)

const tabs = [
  { id: 'personal', name: 'Informações Pessoais', icon: UserIcon },
  { id: 'security', name: 'Segurança', icon: ShieldCheckIcon },
  { id: 'preferences', name: 'Preferências', icon: CogIcon }
]

const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value / 100)
}

const loadProfile = async () => {
  try {
    const response = await api.get('/users/profile')
    user.value = response.data
  } catch (err) {
    error.value = 'Erro ao carregar perfil'
  } finally {
    loading.value = false
  }
}

const updateProfile = async () => {
  updating.value = true
  error.value = ''
  success.value = ''
  
  try {
    await api.put('/users/profile', user.value)
    success.value = 'Perfil atualizado com sucesso!'
    setTimeout(() => success.value = '', 3000)
  } catch (err) {
    error.value = 'Erro ao atualizar perfil'
  } finally {
    updating.value = false
  }
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

onMounted(() => {
  loadProfile()
  isDark.value = document.documentElement.classList.contains('dark')
})
</script>