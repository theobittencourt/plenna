<template>
  <BaseLayout 
    title="Checkouts" 
    subtitle="Gerencie suas páginas de vendas"
    :breadcrumbs="[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Checkouts' }]"
  >
    <template #actions>
      <button @click="showModal = true" class="btn-primary">
        Criar Checkout
      </button>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="checkout in checkouts" 
        :key="checkout.id" 
        class="card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1" 
        @click="$router.push(`/checkout/${checkout.id}`)"
      >
        <img 
          v-if="checkout.produtoImage" 
          :src="checkout.produtoImage" 
          class="w-full h-48 object-cover rounded-lg mb-4" 
        />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ checkout.produtoName }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {{ checkout.produtoDescricao }}
        </p>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold gradient-text">
            R$ {{ formatMoney(checkout.produtoValor) }}
          </span>
          <span 
            :class="checkout.status ? 'status-success' : 'status-info'" 
            class="status-badge"
          >
            {{ checkout.status ? 'Ativo' : 'Inativo' }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="checkouts.length === 0" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </div>
      <p class="text-gray-500 dark:text-gray-400">Nenhum checkout encontrado</p>
    </div>

    <!-- Modal -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" 
      @click.self="showModal = false"
    >
      <div class="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Criar Novo Checkout</h3>
        <form @submit.prevent="createCheckout" class="space-y-6">
          <div class="form-group">
            <label class="form-label">Nome do Produto</label>
            <input 
              v-model="form.produtoName" 
              required 
              class="input-field" 
              placeholder="Digite o nome do produto" 
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Descrição</label>
            <textarea 
              v-model="form.produtoDescricao" 
              class="input-field" 
              rows="3" 
              placeholder="Descreva seu produto"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Valor (R$)</label>
            <input 
              v-model="form.produtoValor" 
              type="number" 
              step="0.01" 
              required 
              class="input-field" 
              placeholder="0,00" 
            />
          </div>
          
          <div class="flex space-x-4">
            <button type="submit" class="btn-primary flex-1" :disabled="loading">
              <span v-if="loading">Criando...</span>
              <span v-else>Criar Checkout</span>
            </button>
            <button type="button" @click="showModal = false" class="btn-secondary flex-1">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import BaseLayout from '../components/BaseLayout.vue'

export default {
  name: 'CheckoutsView',
  components: {
    BaseLayout
  },
  setup() {
    const checkouts = ref([])
    const showModal = ref(false)
    const loading = ref(false)
    const form = ref({
      produtoName: '',
      produtoDescricao: '',
      produtoValor: ''
    })

    const loadCheckouts = async () => {
      try {
        const { data } = await api.get('/checkout')
        checkouts.value = data
      } catch (error) {
        console.error('Error loading checkouts:', error)
      }
    }

    const createCheckout = async () => {
      loading.value = true
      try {
        await api.post('/checkout', form.value)
        showModal.value = false
        form.value = { produtoName: '', produtoDescricao: '', produtoValor: '' }
        await loadCheckouts()
      } catch (error) {
        console.error('Error creating checkout:', error)
      } finally {
        loading.value = false
      }
    }

    const formatMoney = (value) => {
      return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value || 0)
    }

    onMounted(() => {
      loadCheckouts()
    })

    return {
      checkouts,
      showModal,
      loading,
      form,
      loadCheckouts,
      createCheckout,
      formatMoney
    }
  }
}
</script>