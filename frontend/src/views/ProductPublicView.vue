<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div v-if="loading" class="text-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p class="text-slate-600 dark:text-slate-400 mt-4">Carregando produto...</p>
      </div>

      <div v-else-if="product" class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <!-- Product Header -->
        <div class="relative">
          <div v-if="!product.image" class="w-full h-64 md:h-80 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <span class="text-white font-bold text-4xl">{{ product.name.charAt(0) }}</span>
          </div>
          <img v-else :src="product.image" :alt="product.name" class="w-full h-64 md:h-80 object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div class="absolute bottom-6 left-6 text-white">
            <span class="bg-purple-600 px-3 py-1 rounded-full text-sm font-medium">{{ product.category }}</span>
            <h1 class="text-3xl md:text-4xl font-bold mt-2">{{ product.name }}</h1>
          </div>
        </div>

        <!-- Product Content -->
        <div class="p-6 md:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Product Info -->
            <div class="lg:col-span-2">
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Sobre o Produto</h2>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{{ product.description }}</p>
              
              <!-- Features -->
              <div class="space-y-3">
                <div class="flex items-center">
                  <CheckCircleIcon class="w-5 h-5 text-green-600 mr-3" />
                  <span class="text-slate-700 dark:text-slate-300">Acesso imediato após pagamento</span>
                </div>
                <div class="flex items-center">
                  <CheckCircleIcon class="w-5 h-5 text-green-600 mr-3" />
                  <span class="text-slate-700 dark:text-slate-300">Suporte especializado</span>
                </div>
                <div class="flex items-center">
                  <CheckCircleIcon class="w-5 h-5 text-green-600 mr-3" />
                  <span class="text-slate-700 dark:text-slate-300">Garantia de satisfação</span>
                </div>
              </div>
            </div>

            <!-- Purchase Card -->
            <div class="lg:col-span-1">
              <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 sticky top-6">
                <div class="text-center mb-6">
                  <div class="text-3xl font-bold text-purple-600 mb-2">R$ {{ formatCurrency(product.price) }}</div>
                  <p class="text-slate-600 dark:text-slate-400">Pagamento único</p>
                </div>

                <button class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors mb-4">
                  Comprar Agora
                </button>

                <div class="text-center">
                  <p class="text-xs text-slate-500 dark:text-slate-400">Pagamento seguro via PIX</p>
                </div>

                <!-- Seller Info -->
                <div class="border-t border-slate-200 dark:border-slate-600 pt-4 mt-6">
                  <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">Vendido por:</p>
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm font-medium">{{ seller?.name?.charAt(0) }}</span>
                    </div>
                    <span class="ml-2 font-medium text-slate-900 dark:text-white">{{ seller?.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Produto não encontrado</h1>
        <p class="text-slate-600 dark:text-slate-400">O produto que você está procurando não existe ou foi removido.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import api from '@/services/api'

const route = useRoute()
const product = ref(null)
const seller = ref(null)
const loading = ref(true)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const loadProduct = async () => {
  try {
    const { userId, productId } = route.params
    const response = await api.get(`/products/public/${userId}/${productId}`)
    product.value = response.data.product
    seller.value = response.data.seller
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>