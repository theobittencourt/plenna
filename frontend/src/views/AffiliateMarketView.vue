<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 md:ml-64">
    <div class="p-4 md:p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Mercado de Afiliação</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-1">Encontre produtos para se afiliar e começar a ganhar comissões</p>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <!-- Search -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Buscar Produtos</label>
            <div class="relative">
              <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input v-model="filters.search" type="text" class="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="Nome do produto, categoria..." />
            </div>
          </div>
          
          <!-- Sort -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Ordenar por</label>
            <select v-model="filters.sort" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
              <option value="popular">Mais vendidos</option>
              <option value="price_asc">Menor valor</option>
              <option value="price_desc">Maior valor</option>
              <option value="commission_desc">Maior comissão</option>
            </select>
          </div>
          
          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tipo</label>
            <select v-model="filters.type" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
              <option value="">Todos</option>
              <option value="open">Liberado para afiliação</option>
              <option value="approval">Somente com autorização</option>
            </select>
          </div>
        </div>
        
        <!-- Advanced Filters -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Modelo</label>
            <select v-model="filters.model" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
              <option value="">Geral</option>
              <option value="br">BR</option>
              <option value="global">Global</option>
              <option value="monthly">Mensal BR + Global</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preço Mínimo</label>
            <input v-model="filters.minPrice" type="number" min="0" step="0.01" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="0,00" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preço Máximo</label>
            <input v-model="filters.maxPrice" type="number" min="0" step="0.01" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="1000,00" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Comissão Mínima (%)</label>
            <input v-model="filters.minCommission" type="number" min="0" max="100" step="0.01" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="0" />
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <div v-for="product in filteredProducts" :key="product.id" class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer" @click="viewProduct(product)">
          <div class="relative">
            <img :src="product.image || '/api/placeholder/400/200'" :alt="product.name" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute top-4 left-4">
              <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{{ product.category }}</span>
            </div>
            <div class="absolute top-4 right-4">
              <span v-if="product.affiliateType === 'open'" class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <CheckCircleIcon class="w-3 h-3 inline mr-1" />
                Livre
              </span>
              <span v-else class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <ClockIcon class="w-3 h-3 inline mr-1" />
                Aprovação
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">{{ product.name }}</h3>
            
            <div class="flex items-center justify-between mb-3">
              <div class="text-xl font-bold text-slate-900 dark:text-white">R$ {{ formatCurrency(product.price) }}</div>
              <div class="text-right">
                <div class="text-sm text-slate-500 dark:text-slate-400">até</div>
                <div class="text-lg font-bold text-green-600">{{ product.maxCommission }}%</div>
              </div>
            </div>
            
            <div class="text-sm text-green-600 font-medium mb-4">
              R$ {{ formatCurrency(product.price * product.maxCommission / 100) }} por venda
            </div>
            
            <div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>{{ product.totalSales || 0 }} vendas</span>
              <span>{{ product.activeAffiliates || 0 }} afiliados</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
          <MagnifyingGlassIcon class="w-12 h-12 text-purple-600" />
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Nenhum produto encontrado</h3>
        <p class="text-slate-600 dark:text-slate-400 mb-6">Tente ajustar os filtros para encontrar produtos</p>
        <button @click="clearFilters" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          Limpar Filtros
        </button>
      </div>

      <!-- Product Detail Modal -->
      <BaseModal v-model="showProductModal" :title="selectedProduct?.name" size="xl">
        <ProductDetailModal v-if="selectedProduct" :product="selectedProduct" @affiliate="handleAffiliate" />
      </BaseModal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline'
import BaseModal from '@/components/BaseModal.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import api from '@/services/api'

const products = ref([])
const selectedProduct = ref(null)
const showProductModal = ref(false)

const filters = ref({
  search: '',
  sort: 'popular',
  type: '',
  model: '',
  minPrice: '',
  maxPrice: '',
  minCommission: ''
})

const filteredProducts = computed(() => {
  let result = [...products.value]
  
  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    )
  }
  
  // Type filter
  if (filters.value.type) {
    result = result.filter(product => product.affiliateType === filters.value.type)
  }
  
  // Price filters
  if (filters.value.minPrice) {
    result = result.filter(product => product.price >= parseFloat(filters.value.minPrice))
  }
  if (filters.value.maxPrice) {
    result = result.filter(product => product.price <= parseFloat(filters.value.maxPrice))
  }
  
  // Commission filter
  if (filters.value.minCommission) {
    result = result.filter(product => product.maxCommission >= parseFloat(filters.value.minCommission))
  }
  
  // Sort
  switch (filters.value.sort) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'commission_desc':
      result.sort((a, b) => b.maxCommission - a.maxCommission)
      break
    default: // popular
      result.sort((a, b) => (b.totalSales || 0) - (a.totalSales || 0))
  }
  
  return result
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const loadProducts = async () => {
  try {
    const response = await api.get('/affiliate-market')
    products.value = response.data
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
}

const viewProduct = (product) => {
  selectedProduct.value = product
  showProductModal.value = true
}

const handleAffiliate = async (productId) => {
  try {
    await api.post(`/affiliate-market/${productId}/affiliate`)
    showProductModal.value = false
    // Show success message
  } catch (error) {
    console.error('Erro ao se afiliar:', error)
  }
}

const clearFilters = () => {
  filters.value = {
    search: '',
    sort: 'popular',
    type: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minCommission: ''
  }
}

onMounted(() => {
  loadProducts()
})
</script>