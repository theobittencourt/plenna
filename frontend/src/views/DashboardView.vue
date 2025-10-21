<template>
  <BaseLayout 
    title="Dashboard" 
    :subtitle="`Bem-vindo de volta, ${authStore.user?.name}!`"
  >
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card group">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-plenna rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BanknotesIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Saldo Disponível</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(stats.balance) }}</p>
          </div>
        </div>
      </div>

      <div class="card group">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowDownIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Recebido Hoje</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(stats.todayReceived) }}</p>
          </div>
        </div>
      </div>

      <div class="card group">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowUpIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Sacado Hoje</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(stats.todayWithdrawn) }}</p>
          </div>
        </div>
      </div>

      <div class="card group">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShoppingCartIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Vendas do Mês</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.monthSales }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Quick Actions Card -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ações Rápidas</h3>
        <div class="space-y-3">
          <router-link 
            to="/deposit" 
            class="flex items-center p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group"
          >
            <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
              <PlusIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div class="ml-3">
              <p class="font-medium text-gray-900 dark:text-white">Novo Depósito</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Receber pagamento PIX</p>
            </div>
          </router-link>

          <router-link 
            to="/withdraw" 
            class="flex items-center p-3 rounded-xl hover:bg-warning-50 dark:hover:bg-warning-900/20 transition-colors group"
          >
            <div class="w-10 h-10 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center group-hover:bg-warning-200 dark:group-hover:bg-warning-900/50 transition-colors">
              <MinusIcon class="w-5 h-5 text-warning-600 dark:text-warning-400" />
            </div>
            <div class="ml-3">
              <p class="font-medium text-gray-900 dark:text-white">Novo Saque</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Sacar para sua conta</p>
            </div>
          </router-link>

          <router-link 
            to="/checkouts" 
            class="flex items-center p-3 rounded-xl hover:bg-secondary-50 dark:hover:bg-secondary-900/20 transition-colors group"
          >
            <div class="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center group-hover:bg-secondary-200 dark:group-hover:bg-secondary-900/50 transition-colors">
              <DocumentPlusIcon class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div class="ml-3">
              <p class="font-medium text-gray-900 dark:text-white">Novo Checkout</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Criar página de vendas</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="lg:col-span-2 card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Transações Recentes</h3>
          <router-link 
            to="/transactions" 
            class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
          >
            Ver todas
          </router-link>
        </div>
        
        <div class="space-y-3">
          <div 
            v-for="transaction in recentTransactions" 
            :key="transaction.id"
            class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
          >
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                   :class="transaction.type === 'deposit' ? 'bg-success-100 dark:bg-success-900/30' : 'bg-warning-100 dark:bg-warning-900/30'">
                <ArrowDownIcon v-if="transaction.type === 'deposit'" class="w-5 h-5 text-success-600 dark:text-success-400" />
                <ArrowUpIcon v-else class="w-5 h-5 text-warning-600 dark:text-warning-400" />
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-900 dark:text-white">{{ transaction.description }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(transaction.createdAt) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold" 
                 :class="transaction.type === 'deposit' ? 'text-success-600 dark:text-success-400' : 'text-warning-600 dark:text-warning-400'">
                {{ transaction.type === 'deposit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
              </p>
              <StatusBadge :status="transaction.status" :type="transaction.type" />
            </div>
          </div>
          
          <div v-if="recentTransactions.length === 0" class="text-center py-8">
            <div class="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentIcon class="w-8 h-8 text-gray-400" />
            </div>
            <p class="text-gray-500 dark:text-gray-400">Nenhuma transação encontrada</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Revenue Chart -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Receita dos Últimos 7 Dias</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50 dark:bg-dark-700 rounded-xl">
          <p class="text-gray-500 dark:text-gray-400">Gráfico de receita (implementar com Chart.js)</p>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Métodos de Pagamento</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <span class="text-xs font-bold text-primary-600 dark:text-primary-400">PIX</span>
              </div>
              <span class="ml-3 text-gray-900 dark:text-white">PIX</span>
            </div>
            <div class="flex items-center">
              <div class="w-32 bg-gray-200 dark:bg-dark-600 rounded-full h-2 mr-3">
                <div class="bg-primary-600 h-2 rounded-full" style="width: 85%"></div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">85%</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center">
                <CreditCardIcon class="w-4 h-4 text-success-600 dark:text-success-400" />
              </div>
              <span class="ml-3 text-gray-900 dark:text-white">Cartão</span>
            </div>
            <div class="flex items-center">
              <div class="w-32 bg-gray-200 dark:bg-dark-600 rounded-full h-2 mr-3">
                <div class="bg-success-600 h-2 rounded-full" style="width: 15%"></div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { formatCurrency, formatDate } from '../services/api'
import api from '../services/api'
import BaseLayout from '../components/BaseLayout.vue'
import StatusBadge from '../components/StatusBadge.vue'
import {
  BanknotesIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  DocumentPlusIcon,
  DocumentIcon,
  CreditCardIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'DashboardView',
  components: {
    BaseLayout,
    StatusBadge,
    BanknotesIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    ShoppingCartIcon,
    PlusIcon,
    MinusIcon,
    DocumentPlusIcon,
    DocumentIcon,
    CreditCardIcon
  },
  setup() {
    const authStore = useAuthStore()
    const stats = ref({
      balance: 0,
      todayReceived: 0,
      todayWithdrawn: 0,
      monthSales: 0
    })
    const recentTransactions = ref([])
    const loading = ref(false)

    const fetchDashboardData = async () => {
      loading.value = true
      try {
        // Fetch stats
        const [statsResponse, transactionsResponse] = await Promise.all([
          api.get('/transactions/stats'),
          api.get('/transactions?limit=5')
        ])
        
        stats.value = statsResponse.data
        recentTransactions.value = transactionsResponse.data.transactions || []
        
        // Update user balance
        await authStore.fetchBalance()
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      authStore,
      stats,
      recentTransactions,
      loading,
      formatCurrency,
      formatDate
    }
  }
}
</script>