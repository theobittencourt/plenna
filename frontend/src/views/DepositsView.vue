<template>
  <BaseLayout 
    title="Depósitos" 
    subtitle="Gerencie seus depósitos PIX"
    :breadcrumbs="[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Depósitos' }]"
  >
    <template #actions>
      <router-link
        to="/deposit"
        class="btn-primary flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <span>Novo Depósito</span>
      </router-link>
    </template>


    <!-- Deposits List -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Histórico de Depósitos</h2>
        <div class="flex items-center space-x-4">
          <!-- Filter -->
          <select
            v-model="filter.status"
            @change="fetchDeposits"
            class="input-field w-auto"
          >
            <option value="">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="paid">Pago</option>
            <option value="cancelled">Cancelado</option>
            <option value="expired">Expirado</option>
          </select>
          
          <!-- Refresh -->
          <button
            @click="fetchDeposits"
            class="btn-secondary"
            :disabled="loading"
          >
            <ArrowPathIcon class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table-modern">
          <thead class="table-header">
            <tr>
              <th>ID</th>
              <th>Valor</th>
              <th>Adquirente</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="deposit in deposits" :key="deposit.id" class="table-row">
              <td class="table-cell font-medium">
                #{{ deposit.id }}
              </td>
              <td class="table-cell">
                {{ formatCurrency(deposit.amount) }}
              </td>
              <td class="table-cell">
                <span class="capitalize">{{ deposit.acquirer }}</span>
              </td>
              <td class="table-cell">
                <StatusBadge :status="deposit.status" type="payment" />
              </td>
              <td class="table-cell text-gray-500 dark:text-gray-400">
                {{ formatDate(deposit.createdAt) }}
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <button
                    v-if="deposit.status === 'pending' && deposit.qrCode"
                    @click="showQRCode(deposit)"
                    class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    QR Code
                  </button>
                  <button
                    @click="checkStatus(deposit.id)"
                    class="text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300"
                    :disabled="loading"
                  >
                    Verificar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <SkeletonLoader v-if="loading" type="table" :rows="5" />
        
        <div v-else-if="deposits.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BanknotesIcon class="w-8 h-8 text-gray-400" />
          </div>
          <p class="text-gray-500 dark:text-gray-400">Nenhum depósito encontrado</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-dark-600">
        <div class="text-sm text-gray-700 dark:text-gray-300">
          Mostrando {{ (pagination.currentPage - 1) * pagination.limit + 1 }} a 
          {{ Math.min(pagination.currentPage * pagination.limit, pagination.total) }} de 
          {{ pagination.total }} resultados
        </div>
        <div class="flex space-x-2">
          <button
            @click="changePage(pagination.currentPage - 1)"
            :disabled="pagination.currentPage === 1"
            class="btn-secondary"
          >
            Anterior
          </button>
          <button
            @click="changePage(pagination.currentPage + 1)"
            :disabled="pagination.currentPage === pagination.totalPages"
            class="btn-secondary"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
    
    <!-- QR Code Modal -->
    <div v-if="showQRModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="card max-w-sm w-full">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">QR Code PIX</h3>
          <div v-if="selectedDeposit?.qrCode" class="mb-4">
            <img :src="selectedDeposit.qrCode" alt="QR Code PIX" class="mx-auto max-w-xs" />
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Escaneie o QR Code com seu app bancário para realizar o pagamento
          </p>
          <div class="bg-gray-50 dark:bg-dark-700 p-4 rounded-xl mb-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Valor:</p>
            <p class="font-semibold text-lg text-gray-900 dark:text-white">{{ formatCurrency(selectedDeposit?.amount) }}</p>
          </div>
          <button
            @click="showQRModal = false"
            class="btn-primary w-full"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { formatCurrency, formatDate, handleApiError } from '../services/api'
import api from '../services/api'
import BaseLayout from '../components/BaseLayout.vue'
import StatusBadge from '../components/StatusBadge.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'
import { BanknotesIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'DepositsView',
  components: {
    BaseLayout,
    StatusBadge,
    SkeletonLoader,
    BanknotesIcon,
    ArrowPathIcon
  },
  setup() {
    const authStore = useAuthStore()
    const deposits = ref([])
    const loading = ref(false)
    const error = ref('')
    const showQRModal = ref(false)
    const selectedDeposit = ref(null)

    const depositForm = ref({
      amount: '',
      acquirer: '',
      description: ''
    })

    const filter = ref({
      status: ''
    })

    const pagination = ref({
      currentPage: 1,
      totalPages: 1,
      total: 0,
      limit: 10
    })

    const fetchDeposits = async (page = 1) => {
      loading.value = true
      try {
        const params = {
          page,
          limit: pagination.value.limit,
          ...(filter.value.status && { status: filter.value.status })
        }
        
        const response = await api.get('/wallet/deposits', { params })
        deposits.value = response.data.deposits || []
        pagination.value = {
          currentPage: response.data.currentPage || 1,
          totalPages: response.data.totalPages || 1,
          total: response.data.total || 0,
          limit: response.data.limit || 10
        }
      } catch (err) {
        error.value = handleApiError(err)
      } finally {
        loading.value = false
      }
    }

    const createDeposit = async () => {
      loading.value = true
      error.value = ''
      
      try {
        const response = await api.post('/wallet/deposit/payment', {
          amount: parseFloat(depositForm.value.amount) * 100, // Convert to cents
          acquirer: depositForm.value.acquirer,
          description: depositForm.value.description
        })
        
        // Reset form
        depositForm.value = {
          amount: '',
          acquirer: '',
          description: ''
        }
        
        // Refresh deposits list
        await fetchDeposits()
        
        // Show QR code if available
        if (response.data.qrCode) {
          selectedDeposit.value = response.data
          showQRModal.value = true
        }
        
        // Update balance
        await authStore.fetchBalance()
      } catch (err) {
        error.value = handleApiError(err)
      } finally {
        loading.value = false
      }
    }

    const checkStatus = async (depositId) => {
      try {
        await api.post('/wallet/status', { depositId })
        await fetchDeposits(pagination.value.currentPage)
        await authStore.fetchBalance()
      } catch (err) {
        console.error('Error checking status:', err)
      }
    }

    const showQRCode = (deposit) => {
      selectedDeposit.value = deposit
      showQRModal.value = true
    }

    const changePage = (page) => {
      if (page >= 1 && page <= pagination.value.totalPages) {
        fetchDeposits(page)
      }
    }

    onMounted(() => {
      fetchDeposits()
    })

    return {
      authStore,
      deposits,
      loading,
      error,
      showQRModal,
      selectedDeposit,
      depositForm,
      filter,
      pagination,
      fetchDeposits,
      createDeposit,
      checkStatus,
      showQRCode,
      changePage,
      formatCurrency,
      formatDate
    }
  }
}
</script>