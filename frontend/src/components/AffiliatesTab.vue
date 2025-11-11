<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Programa de Afiliados</h3>
        <p class="text-slate-600 dark:text-slate-400 mt-1">Configure e gerencie afiliados do produto</p>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input v-model="settings.enabled" type="checkbox" class="sr-only peer" @change="updateSettings" />
        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"></div>
        <span class="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">Ativar Afiliação</span>
      </label>
    </div>

    <div v-if="settings.enabled" class="space-y-6">
      <!-- Settings -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <h4 class="text-lg font-medium text-slate-900 dark:text-white mb-4">Configurações</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quem pode se afiliar?</label>
            <select v-model="settings.type" @change="updateSettings" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
              <option value="open">Qualquer um pode ser afiliado</option>
              <option value="approval">Somente afiliados com autorização</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tipo da comissão</label>
            <select v-model="settings.commissionType" @change="updateSettings" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
              <option value="single">Venda única</option>
              <option value="recurring">Recorrência</option>
              <option value="both">Ambos</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Comissão em venda única (%)</label>
            <input v-model="settings.singleCommission" @input="updateSettings" type="number" min="0" max="100" step="0.01" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Comissão em recorrência (%)</label>
            <input v-model="settings.recurringCommission" @input="updateSettings" type="number" min="0" max="100" step="0.01" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" />
          </div>
        </div>
        
        <div class="mt-6">
          <div class="flex items-center mb-4">
            <input v-model="settings.commissionUpsell" @change="updateSettings" type="checkbox" class="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" />
            <label class="ml-2 text-sm text-slate-700 dark:text-slate-300">Comissionar upsell</label>
          </div>
          
          <div class="flex items-center">
            <input v-model="settings.allowOfferCreation" @change="updateSettings" type="checkbox" class="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" />
            <label class="ml-2 text-sm text-slate-700 dark:text-slate-300">Permitir acesso e criação de ofertas próprias</label>
          </div>
          
          <div v-if="settings.allowOfferCreation" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preço mínimo (R$)</label>
              <input v-model="settings.minPrice" @input="updateSettings" type="number" min="0" step="0.01" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preço máximo (R$)</label>
              <input v-model="settings.maxPrice" @input="updateSettings" type="number" min="0" step="0.01" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Affiliates List -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h4 class="text-lg font-medium text-slate-900 dark:text-white">Afiliados Ativos</h4>
        </div>
        
        <div v-if="affiliates.length === 0" class="p-8 text-center">
          <UserGroupIcon class="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Nenhum afiliado encontrado</h3>
          <p class="text-slate-600 dark:text-slate-400">Quando alguém se afiliar ao produto, aparecerá aqui</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Afiliado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vendas</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Comissões</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
              <tr v-for="affiliate in affiliates" :key="affiliate.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <span class="text-purple-600 font-medium text-sm">{{ affiliate.name.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-slate-900 dark:text-white">{{ affiliate.name }}</div>
                      <div class="text-sm text-slate-500 dark:text-slate-400">{{ affiliate.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <StatusBadge :status="affiliate.status" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  {{ affiliate.totalSales || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  R$ {{ formatCurrency(affiliate.totalCommissions || 0) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button v-if="affiliate.status === 'pending'" @click="approveAffiliate(affiliate)" class="text-green-600 hover:text-green-900 dark:hover:text-green-400 mr-4">
                    Aprovar
                  </button>
                  <button @click="viewAffiliate(affiliate)" class="text-purple-600 hover:text-purple-900 dark:hover:text-purple-400">
                    Ver detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Disabled State -->
    <div v-else class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center">
      <ShareIcon class="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Programa de Afiliados Desativado</h3>
      <p class="text-slate-600 dark:text-slate-400">Ative o programa para permitir que outros usuários se afiliem ao seu produto</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UserGroupIcon, ShareIcon } from '@heroicons/vue/24/outline'
import StatusBadge from '@/components/StatusBadge.vue'
import api from '@/services/api'

const props = defineProps({
  productId: {
    type: String,
    required: true
  }
})

const affiliates = ref([])
const settings = ref({
  enabled: false,
  type: 'open',
  commissionType: 'single',
  singleCommission: 0,
  recurringCommission: 0,
  commissionUpsell: false,
  allowOfferCreation: false,
  minPrice: 0,
  maxPrice: 0
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const loadAffiliates = async () => {
  try {
    const response = await api.get(`/products/${props.productId}/affiliates`)
    affiliates.value = response.data.affiliates
    settings.value = { ...settings.value, ...response.data.settings }
  } catch (error) {
    console.error('Erro ao carregar afiliados:', error)
  }
}

const updateSettings = async () => {
  try {
    await api.put(`/products/${props.productId}/affiliate-settings`, settings.value)
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error)
  }
}

const approveAffiliate = async (affiliate) => {
  try {
    await api.post(`/products/${props.productId}/affiliates/${affiliate.id}/approve`)
    loadAffiliates()
  } catch (error) {
    console.error('Erro ao aprovar afiliado:', error)
  }
}

const viewAffiliate = (affiliate) => {
  // Implement view affiliate functionality
  console.log('View affiliate:', affiliate)
}

onMounted(() => {
  loadAffiliates()
})
</script>