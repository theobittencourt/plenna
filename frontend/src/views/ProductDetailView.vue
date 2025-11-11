<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 md:ml-64">
    <div class="p-4 md:p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center space-x-4">
          <button @click="$router.go(-1)" class="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <ArrowLeftIcon class="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white">{{ product.name }}</h1>
            <p class="text-slate-600 dark:text-slate-400 mt-1">Gerencie todos os aspectos do seu produto</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <button @click="editProduct" class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors">
            <PencilIcon class="w-4 h-4 inline mr-2" />
            Editar
          </button>
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <EyeIcon class="w-4 h-4 inline mr-2" />
            Visualizar
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-slate-200 dark:border-slate-700 mb-8">
        <nav class="-mb-px flex space-x-8">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
            activeTab === tab.id
              ? 'border-purple-500 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
          ]">
            <component :is="tab.icon" class="w-5 h-5 inline mr-2" />
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="space-y-8">
        <!-- Informações Básicas -->
        <div v-if="activeTab === 'info'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Informações do Produto</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome</label>
                  <p class="text-slate-900 dark:text-white">{{ product.name }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição</label>
                  <p class="text-slate-600 dark:text-slate-400">{{ product.description }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {{ product.category }}
                    </span>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preço</label>
                    <p class="text-2xl font-bold text-purple-600">R$ {{ formatCurrency(product.price) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mensagem de Boas-vindas -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Mensagem de Boas-vindas</h3>
              <div class="space-y-4">
                <textarea v-model="welcomeMessage" rows="4" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="Digite a mensagem que será exibida ao cliente após a compra..."></textarea>
                <div class="flex items-center space-x-4">
                  <button class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors">
                    <PaperClipIcon class="w-4 h-4 inline mr-2" />
                    Adicionar Arquivo
                  </button>
                  <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Salvar Mensagem
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Imagem do Produto -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Imagem do Produto</h3>
              <div class="aspect-video bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                <img :src="product.image || '/api/placeholder/400/300'" :alt="product.name" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- Estatísticas -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Estatísticas</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-slate-600 dark:text-slate-400">Total de Vendas</span>
                  <span class="font-semibold text-slate-900 dark:text-white">{{ product.totalSales || 0 }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-600 dark:text-slate-400">Receita Total</span>
                  <span class="font-semibold text-green-600">R$ {{ formatCurrency(product.totalRevenue || 0) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-600 dark:text-slate-400">Afiliados Ativos</span>
                  <span class="font-semibold text-slate-900 dark:text-white">{{ product.activeAffiliates || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Co-produção -->
        <div v-if="activeTab === 'coproduction'">
          <CoProductionTab :productId="product.id" />
        </div>

        <!-- Afiliados -->
        <div v-if="activeTab === 'affiliates'">
          <AffiliatesTab :productId="product.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  EyeIcon, 
  InformationCircleIcon,
  UserGroupIcon,
  ShareIcon,
  PaperClipIcon
} from '@heroicons/vue/24/outline'
import CoProductionTab from '@/components/CoProductionTab.vue'
import AffiliatesTab from '@/components/AffiliatesTab.vue'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const product = ref({})
const activeTab = ref('info')
const welcomeMessage = ref('')

const tabs = [
  { id: 'info', name: 'Informações Básicas', icon: InformationCircleIcon },
  { id: 'coproduction', name: 'Co-produção', icon: UserGroupIcon },
  { id: 'affiliates', name: 'Afiliados', icon: ShareIcon }
]

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const loadProduct = async () => {
  try {
    const response = await api.get(`/products/${route.params.id}`)
    product.value = response.data
    welcomeMessage.value = response.data.welcomeMessage || ''
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
  }
}

const editProduct = () => {
  router.push(`/products/${product.value.id}/edit`)
}

onMounted(() => {
  loadProduct()
})
</script>