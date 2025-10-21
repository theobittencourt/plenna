<template>
  <BaseLayout 
    title="Saques" 
    subtitle="Gerencie seus saques PIX"
    :breadcrumbs="[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Saques' }]"
  >
    <template #actions>
      <router-link
        to="/withdraw"
        class="btn-danger flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Novo Saque</span>
      </router-link>
    </template>


    <!-- Withdrawals List -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Histórico de Saques</h2>
        <div class="flex items-center space-x-4">
          <!-- Filter -->
          <select
            v-model="filter.status"
            @change="fetchWithdrawals"
            class="input-field w-auto"
          >
            <option value="">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="processing">Processando</option>
            <option value="approved">Aprovado</option>
            <option value="failed">Falhou</option>
          </select>
          
          <!-- Refresh -->
          <button
            @click="fetchWithdrawals"
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
              <th>Chave PIX</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="withdrawal in withdrawals" :key="withdrawal.id" class="table-row">
              <td class="table-cell font-medium">
                #{{ withdrawal.id }}
              </td>
              <td class="table-cell">
                {{ formatCurrency(withdrawal.valor) }}
              </td>
              <td class="table-cell">
                <div>
                  <p class="font-medium">{{ withdrawal.chave }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ withdrawal.tipoChave }}</p>
                </div>
              </td>
              <td class="table-cell">
                <StatusBadge :status="withdrawal.status" type="withdrawal" />
              </td>
              <td class="table-cell text-gray-500 dark:text-gray-400">
                {{ formatDate(withdrawal.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
        
        <SkeletonLoader v-if="loading" type="table" :rows="5" />
        
        <div v-else-if="withdrawals.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BanknotesIcon class="w-8 h-8 text-gray-400" />
          </div>
          <p class="text-gray-500 dark:text-gray-400">Nenhum saque encontrado</p>
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
  name: 'WithdrawalsView',
  components: {
    BaseLayout,
    StatusBadge,
    SkeletonLoader,
    BanknotesIcon,
    ArrowPathIcon
  },
  setup() {
    const authStore = useAuthStore()
    const withdrawals = ref([])
    const loading = ref(false)
    const error = ref('')

    const filter = ref({
      status: ''
    })

    const pagination = ref({
      currentPage: 1,
      totalPages: 1,
      total: 0,
      limit: 10
    })

    const fetchWithdrawals = async (page = 1) => {
      loading.value = true
      try {
        const params = {
          page,
          limit: pagination.value.limit,
          ...(filter.value.status && { status: filter.value.status })
        }
        
        const response = await api.get('/withdrawals', { params })
        withdrawals.value = response.data.withdrawals || response.data || []
        
        if (response.data.pagination) {
          pagination.value = response.data.pagination
        }
      } catch (err) {
        error.value = handleApiError(err)
      } finally {
        loading.value = false
      }
    }

    const changePage = (page) => {
      if (page >= 1 && page <= pagination.value.totalPages) {
        fetchWithdrawals(page)
      }
    }

    onMounted(() => {
      fetchWithdrawals()
    })

    return {
      authStore,
      withdrawals,
      loading,
      error,
      filter,
      pagination,
      fetchWithdrawals,
      changePage,
      formatCurrency,
      formatDate
    }
  }
}
</script>
