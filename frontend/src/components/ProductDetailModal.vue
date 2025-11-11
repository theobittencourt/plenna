<template>
  <div class="space-y-6">
    <!-- Product Header -->
    <div class="flex items-start space-x-6">
      <img :src="product.image || '/api/placeholder/200/200'" :alt="product.name" class="w-32 h-32 object-cover rounded-xl" />
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">{{ product.name }}</h2>
        <div class="flex items-center space-x-4 mb-4">
          <span class="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">{{ product.category }}</span>
          <span v-if="product.affiliateType === 'open'" class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            <CheckCircleIcon class="w-4 h-4 inline mr-1" />
            Afiliação Livre
          </span>
          <span v-else class="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
            <ClockIcon class="w-4 h-4 inline mr-1" />
            Requer Aprovação
          </span>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-3xl font-bold text-slate-900 dark:text-white">R$ {{ formatCurrency(product.price) }}</div>
          <div class="text-right">
            <div class="text-sm text-slate-500 dark:text-slate-400">Comissão até</div>
            <div class="text-2xl font-bold text-green-600">{{ product.maxCommission }}%</div>
            <div class="text-sm text-green-600">R$ {{ formatCurrency(product.price * product.maxCommission / 100) }} por venda</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-slate-200 dark:border-slate-700">
      <nav class="-mb-px flex space-x-8">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
          'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
          activeTab === tab.id
            ? 'border-purple-500 text-purple-600 dark:text-purple-400'
            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
        ]">
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="min-h-[300px]">
      <!-- Details Tab -->
      <div v-if="activeTab === 'details'" class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-3">Descrição do Produto</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">{{ product.description }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-medium text-slate-900 dark:text-white mb-2">Atribuição de Comissão</h4>
            <div class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div v-if="product.commissionType === 'single' || product.commissionType === 'both'">
                <span class="font-medium">Venda única:</span> {{ product.singleCommission }}%
              </div>
              <div v-if="product.commissionType === 'recurring' || product.commissionType === 'both'">
                <span class="font-medium">Recorrente:</span> {{ product.recurringCommission }}%
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-medium text-slate-900 dark:text-white mb-2">Informações de Contato</h4>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              <div><span class="font-medium">E-mail de suporte:</span> {{ product.supportEmail || 'Não informado' }}</div>
              <div><span class="font-medium">Página de vendas:</span> 
                <a v-if="product.salesUrl" :href="product.salesUrl" target="_blank" class="text-purple-600 hover:text-purple-700 ml-1">
                  Ver página
                  <ArrowTopRightOnSquareIcon class="w-4 h-4 inline ml-1" />
                </a>
                <span v-else class="ml-1">Não informado</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div class="text-center">
            <div class="text-2xl font-bold text-slate-900 dark:text-white">{{ product.totalSales || 0 }}</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Total de Vendas</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-slate-900 dark:text-white">{{ product.activeAffiliates || 0 }}</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Afiliados Ativos</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ product.conversionRate || 0 }}%</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Taxa de Conversão</div>
          </div>
        </div>
      </div>

      <!-- Offers Tab -->
      <div v-if="activeTab === 'offers'" class="space-y-4">
        <div v-if="offers.length === 0" class="text-center py-12">
          <ShoppingCartIcon class="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Nenhuma oferta disponível</h3>
          <p class="text-slate-600 dark:text-slate-400">Este produto ainda não possui ofertas específicas</p>
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="offer in offers" :key="offer.id" class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-slate-900 dark:text-white">{{ offer.name }}</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{{ offer.description }}</p>
              </div>
              <div class="text-right">
                <div class="text-xl font-bold text-slate-900 dark:text-white">R$ {{ formatCurrency(offer.price) }}</div>
                <div class="text-sm text-green-600">Você recebe: R$ {{ formatCurrency(offer.commission) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <div class="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-700">
      <button @click="handleAffiliate" :disabled="isAffiliated" :class="[
        'px-6 py-3 rounded-lg font-medium transition-colors',
        isAffiliated
          ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
          : product.affiliateType === 'open'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-yellow-600 hover:bg-yellow-700 text-white'
      ]">
        {{ getButtonText() }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowTopRightOnSquareIcon, 
  ShoppingCartIcon 
} from '@heroicons/vue/24/outline'
import api from '@/services/api'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['affiliate'])

const activeTab = ref('details')
const offers = ref([])
const isAffiliated = ref(false)

const tabs = [
  { id: 'details', name: 'Detalhes' },
  { id: 'offers', name: 'Ofertas' }
]

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const getButtonText = () => {
  if (isAffiliated.value) return 'Já Afiliado'
  return props.product.affiliateType === 'open' ? 'Afiliar Agora' : 'Solicitar Afiliação'
}

const loadOffers = async () => {
  try {
    const response = await api.get(`/products/${props.product.id}/offers`)
    offers.value = response.data
  } catch (error) {
    console.error('Erro ao carregar ofertas:', error)
  }
}

const checkAffiliationStatus = async () => {
  try {
    const response = await api.get(`/products/${props.product.id}/affiliation-status`)
    isAffiliated.value = response.data.isAffiliated
  } catch (error) {
    console.error('Erro ao verificar status de afiliação:', error)
  }
}

const handleAffiliate = () => {
  if (!isAffiliated.value) {
    emit('affiliate', props.product.id)
  }
}

onMounted(() => {
  loadOffers()
  checkAffiliationStatus()
})
</script>