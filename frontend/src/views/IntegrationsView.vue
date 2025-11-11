<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 md:ml-64">
    <div class="p-4 md:p-6">
      <div class="mb-8">
        <h1 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Integrações</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-1">Conecte suas ferramentas favoritas</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="integration in integrations" :key="integration.id" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <component :is="integration.icon" class="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
            <span :class="[
              'px-2 py-1 rounded-full text-xs font-medium',
              integration.status === 'connected' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
            ]">
              {{ integration.status === 'connected' ? 'Conectado' : 'Desconectado' }}
            </span>
          </div>
          
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">{{ integration.name }}</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">{{ integration.description }}</p>
          
          <button 
            @click="toggleIntegration(integration)"
            :class="[
              'w-full px-4 py-2 rounded-lg font-medium transition-colors',
              integration.status === 'connected'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            ]"
          >
            {{ integration.status === 'connected' ? 'Desconectar' : 'Conectar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CogIcon, EnvelopeIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const integrations = ref([
  {
    id: 1,
    name: 'Webhook',
    description: 'Receba notificações em tempo real',
    icon: CogIcon,
    status: 'disconnected'
  },
  {
    id: 2,
    name: 'Email Marketing',
    description: 'Integre com ferramentas de email',
    icon: EnvelopeIcon,
    status: 'disconnected'
  },
  {
    id: 3,
    name: 'Analytics',
    description: 'Acompanhe métricas avançadas',
    icon: ChartBarIcon,
    status: 'disconnected'
  }
])

const toggleIntegration = (integration) => {
  integration.status = integration.status === 'connected' ? 'disconnected' : 'connected'
}
</script>