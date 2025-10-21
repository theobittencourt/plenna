<template>
  <BaseLayout 
    title="Transações" 
    subtitle="Histórico completo de transações"
    :breadcrumbs="[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Transações' }]"
  >
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Todas as Transações</h2>
        <div class="flex items-center space-x-4">
          <select v-model="filter.status" @change="loadTransactions" class="input-field w-auto">
            <option value="">Todos os status</option>
            <option value="1">Aprovado</option>
            <option value="0">Pendente</option>
          </select>
          <button @click="loadTransactions" class="btn-secondary" :disabled="loading">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table-modern">
          <thead class="table-header">
            <tr>
              <th>Referência</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="tx in transactions" :key="tx.id" class="table-row">
              <td class="table-cell font-medium">
                {{ tx.reference || `#${tx.id}` }}
              </td>
              <td class="table-cell">
                <span :class="tx.type === 'deposit' ? 'text-success-600 dark:text-success-400' : 'text-warning-600 dark:text-warning-400'">
                  {{ tx.type === 'deposit' ? '+' : '-' }}R$ {{ formatMoney(tx.price || tx.amount) }}
                </span>
              </td>
              <td class="table-cell">
                <span class="capitalize">{{ tx.type === 'deposit' ? 'Depósito' : 'Saque' }}</span>
              </td>
              <td class="table-cell">
                <StatusBadge :status="tx.status" />
              </td>
              <td class="table-cell text-gray-500 dark:text-gray-400">
                {{ formatDate(tx.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="transactions.length === 0 && !loading" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p class="text-gray-500 dark:text-gray-400">Nenhuma transação encontrada</p>
        </div>
      </div>

      <div v-if="pagination.totalPages > 1" class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-dark-600">
        <div class="text-sm text-gray-700 dark:text-gray-300">
          Mostrando {{ (pagination.currentPage - 1) * pagination.limit + 1 }} a 
          {{ Math.min(pagination.currentPage * pagination.limit, pagination.total) }} de 
          {{ pagination.total }} resultados
        </div>
        <div class="flex space-x-2">
          <button @click="changePage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1" class="btn-secondary">
            Anterior
          </button>
          <button @click="changePage(pagination.currentPage + 1)" :disabled="pagination.currentPage === pagination.totalPages" class="btn-secondary">
            Próxima
          </button>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import BaseLayout from '../components/BaseLayout.vue'
import StatusBadge from '../components/StatusBadge.vue'

export default {
  name: 'TransactionsView',
  components: {
    BaseLayout,
    StatusBadge
  },
  setup() {
    const transactions = ref([])
    const loading = ref(false)
    const filter = ref({ status: '' })
    const pagination = ref({
      currentPage: 1,
      totalPages: 1,
      total: 0,
      limit: 10
    })

    const loadTransactions = async (page = 1) => {
      loading.value = true
      try {
        const params = {
          page,
          limit: pagination.value.limit,
          ...(filter.value.status && { status: filter.value.status })
        }
        
        const { data } = await api.get('/transactions', { params })
        transactions.value = data.transactions || data
        
        if (data.pagination) {
          pagination.value = data.pagination
        }
      } catch (error) {
        console.error('Error loading transactions:', error)
      } finally {
        loading.value = false
      }
    }

    const changePage = (page) => {
      if (page >= 1 && page <= pagination.value.totalPages) {
        loadTransactions(page)
      }
    }

    const formatMoney = (value) => {
      return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format((value || 0) / 100)
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleString('pt-BR')
    }

    onMounted(() => {
      loadTransactions()
    })

    return {
      transactions,
      loading,
      filter,
      pagination,
      loadTransactions,
      changePage,
      formatMoney,
      formatDate
    }
  }
}
</script>