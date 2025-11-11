<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 md:ml-64">
    <div class="p-4 md:p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Quem Indica</h1>
          <p class="text-slate-600 dark:text-slate-400 mt-1">Programa de indicação de novos produtores para a Plenna</p>
        </div>
        <button v-if="!referralLink" @click="showGenerateModal = true" class="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
          <ShareIcon class="w-5 h-5 inline mr-2" />
          Indicar Agora
        </button>
      </div>

      <!-- Referral Link Card -->
      <div v-if="referralLink" class="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg p-6 mb-8 text-white">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-2">Seu Link de Indicação</h3>
            <div class="bg-white/10 rounded-lg p-4 mb-4">
              <div class="flex items-center justify-between">
                <code class="text-white/90 text-sm break-all">{{ referralLink }}</code>
                <button @click="copyLink" class="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <ClipboardIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div class="text-2xl font-bold">{{ stats.totalReferrals }}</div>
                <div class="text-white/80 text-sm">Indicações</div>
              </div>
              <div>
                <div class="text-2xl font-bold">R$ {{ formatCurrency(stats.totalEarnings) }}</div>
                <div class="text-white/80 text-sm">Ganhos Totais</div>
              </div>
              <div>
                <div class="text-2xl font-bold">{{ stats.activeReferrals }}</div>
                <div class="text-white/80 text-sm">Ativos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Benefits Card -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Vantagens do Programa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="flex items-start space-x-3">
            <div class="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon class="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 class="font-semibold text-slate-900 dark:text-white">Comissões Vitalícias</h4>
              <p class="text-slate-600 dark:text-slate-400 text-sm">Ganhe comissão sobre todas as vendas dos produtores indicados</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <ChartBarIcon class="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 class="font-semibold text-slate-900 dark:text-white">Renda Passiva</h4>
              <p class="text-slate-600 dark:text-slate-400 text-sm">Construa uma fonte de renda recorrente</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <UserGroupIcon class="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 class="font-semibold text-slate-900 dark:text-white">Rede de Contatos</h4>
              <p class="text-slate-600 dark:text-slate-400 text-sm">Expanda sua rede de produtores digitais</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Referrals Table -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 class="text-lg font-medium text-slate-900 dark:text-white">Histórico de Indicações</h3>
        </div>
        
        <div v-if="referrals.length === 0" class="p-8 text-center">
          <UserGroupIcon class="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Nenhuma indicação encontrada</h3>
          <p class="text-slate-600 dark:text-slate-400 mb-4">Comece a indicar produtores e ganhe comissões</p>
          <button v-if="!referralLink" @click="showGenerateModal = true" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Gerar Link de Indicação
          </button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Produtor</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Origem</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Valor da Venda</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Comissão</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
              <tr v-for="referral in referrals" :key="referral.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {{ formatDate(referral.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <span class="text-purple-600 font-medium text-xs">{{ referral.producer.name.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-slate-900 dark:text-white">{{ referral.producer.name }}</div>
                      <div class="text-sm text-slate-500 dark:text-slate-400">{{ referral.producer.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {{ referral.origin }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                  R$ {{ formatCurrency(referral.saleValue) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  R$ {{ formatCurrency(referral.commission) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="viewDetails(referral)" class="text-purple-600 hover:text-purple-900 dark:hover:text-purple-400">
                    Ver detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Generate Link Modal -->
      <BaseModal v-model="showGenerateModal" title="Gerar Link de Indicação" size="md">
        <div class="space-y-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShareIcon class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Programa Quem Indica</h3>
            <p class="text-slate-600 dark:text-slate-400">Ao gerar seu link, você poderá indicar novos produtores e ganhar comissões vitalícias sobre suas vendas.</p>
          </div>
          
          <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
            <h4 class="font-medium text-slate-900 dark:text-white mb-2">Como funciona:</h4>
            <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Compartilhe seu link único</li>
              <li>• Novos produtores se cadastram através dele</li>
              <li>• Você ganha comissão sobre todas as vendas deles</li>
              <li>• Comissões são pagas automaticamente</li>
            </ul>
          </div>
          
          <div class="flex items-center">
            <input v-model="acceptTerms" type="checkbox" required class="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" />
            <label class="ml-2 text-sm text-slate-700 dark:text-slate-300">Entendi as regras e aceito participar do programa</label>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button @click="showGenerateModal = false" class="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors">
              Cancelar
            </button>
            <button @click="generateReferralLink" :disabled="!acceptTerms" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors">
              Gerar Meu Link
            </button>
          </div>
        </div>
      </BaseModal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  ShareIcon, 
  ClipboardIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  UserGroupIcon 
} from '@heroicons/vue/24/outline'
import BaseModal from '@/components/BaseModal.vue'
import api from '@/services/api'

const referrals = ref([])
const referralLink = ref('')
const showGenerateModal = ref(false)
const acceptTerms = ref(false)

const stats = ref({
  totalReferrals: 0,
  totalEarnings: 0,
  activeReferrals: 0
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const loadReferrals = async () => {
  try {
    const response = await api.get('/referrals')
    referrals.value = response.data.referrals
    referralLink.value = response.data.referralLink
    stats.value = response.data.stats
  } catch (error) {
    console.error('Erro ao carregar indicações:', error)
  }
}

const generateReferralLink = async () => {
  try {
    const response = await api.post('/referrals/generate')
    referralLink.value = response.data.link
    showGenerateModal.value = false
    acceptTerms.value = false
    loadReferrals()
  } catch (error) {
    console.error('Erro ao gerar link:', error)
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(referralLink.value)
    // Show success toast
  } catch (error) {
    console.error('Erro ao copiar link:', error)
  }
}

const viewDetails = (referral) => {
  // Implement view details functionality
  console.log('View details:', referral)
}

onMounted(() => {
  loadReferrals()
})
</script>