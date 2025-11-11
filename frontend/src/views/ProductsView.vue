<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 md:ml-64">
    <div class="p-4 md:p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Produtos</h1>
          <p class="text-slate-600 dark:text-slate-400 mt-1">Gerencie seus produtos e ofertas</p>
        </div>
        <button @click="showCreateModal = true" class="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
          <PlusIcon class="w-5 h-5 inline mr-2" />
          Novo Produto
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div class="relative">
            <div v-if="!product.image" class="w-full h-48 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <span class="text-white font-semibold text-lg">{{ product.name.charAt(0) }}</span>
            </div>
            <img v-else :src="product.image" :alt="product.name" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute top-4 right-4">
              <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{{ product.category }}</span>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">{{ product.name }}</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="text-2xl font-bold text-purple-600">R$ {{ formatCurrency(product.price) }}</div>
              <StatusBadge :status="product.status" />
            </div>
            
            <div class="flex space-x-2">
              <button @click="editProduct(product)" class="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors">
                Editar
              </button>
              <button @click="viewProduct(product)" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <EyeIcon class="w-4 h-4 inline mr-1" />
                Visualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="products.length === 0" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
          <CubeIcon class="w-12 h-12 text-purple-600" />
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Nenhum produto encontrado</h3>
        <p class="text-slate-600 dark:text-slate-400 mb-6">Crie seu primeiro produto para começar a vender</p>
        <button @click="showCreateModal = true" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          Criar Primeiro Produto
        </button>
      </div>
    </div>

    <!-- Create Product Modal -->
    <BaseModal v-model="showCreateModal" title="Novo Produto" size="lg">
      <ProductForm @submit="createProduct" @cancel="showCreateModal = false" />
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon, CubeIcon, EyeIcon } from '@heroicons/vue/24/outline'
import BaseModal from '@/components/BaseModal.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import ProductForm from '@/components/ProductForm.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const router = useRouter()
const authStore = useAuthStore()
const products = ref([])
const showCreateModal = ref(false)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const loadProducts = async () => {
  try {
    console.log('Carregando produtos...')
    const response = await api.get('/products')
    console.log('Produtos carregados:', response.data)
    products.value = response.data
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
}

const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData)
    console.log('Produto criado:', response.data)
    showCreateModal.value = false
    await loadProducts()
  } catch (error) {
    console.error('Erro ao criar produto:', error)
  }
}

const editProduct = (product) => {
  router.push(`/products/${product.id}/edit`)
}

const viewProduct = (product) => {
  const { user } = authStore
  const productUrl = `${window.location.origin}/product/${user?.userId}/${product.id}`
  window.open(productUrl, '_blank')
}

onMounted(() => {
  loadProducts()
})
</script>