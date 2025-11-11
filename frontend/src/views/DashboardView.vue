<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 md:ml-64">
    <div class="p-4 md:p-6">
      <!-- Welcome Header -->
      <div class="mb-6 md:mb-8">
        <h2 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Bem-vindo de volta, {{ authStore.user?.name }}!</h2>
        <p class="text-slate-600 dark:text-slate-400 mt-1 text-sm md:text-base">Aqui está um resumo da sua conta</p>
      </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-6 hover:shadow-md transition-shadow group">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BanknotesIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">Saldo Disponível</p>
            <p class="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(stats.balance) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-6 hover:shadow-md transition-shadow group">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowDownIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">Recebido Hoje</p>
            <p class="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(stats.todayReceived) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-6 hover:shadow-md transition-shadow group">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowUpIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">Sacado Hoje</p>
            <p class="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(stats.todayWithdrawn) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-6 hover:shadow-md transition-shadow group">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShoppingCartIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">Vendas do Mês</p>
            <p class="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">{{ stats.monthSales }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
      <!-- Quick Actions Card -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-6">
        <h3 class="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-4">Ações Rápidas</h3>
        <div class="space-y-3">
          <router-link 
            to="/deposit" 
            class="flex items-center p-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
          >
            <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
              <PlusIcon class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div class="ml-3">
              <p class="font-medium text-slate-900 dark:text-white text-sm md:text-base">Novo Depósito</p>
              <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400">Receber pagamento PIX</p>
            </div>
          </router-link>

          <router-link 
            to="/withdraw" 
            class="flex items-center p-3 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors group"
          >
            <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/50 transition-colors">
              <MinusIcon class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div class="ml-3">
              <p class="font-medium text-slate-900 dark:text-white text-sm md:text-base">Novo Saque</p>
              <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400">Sacar para sua conta</p>
            </div>
          </router-link>

          <router-link 
            to="/products" 
            class="flex items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
          >
            <div class="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
              <DocumentPlusIcon class="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div class="ml-3">
              <p class="font-medium text-slate-900 dark:text-white text-sm md:text-base">Novo Produto</p>
              <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400">Criar produto para venda</p>
            </div>
          </router-link>

          <router-link 
            to="/affiliate-market" 
            class="flex items-center p-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
          >
            <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
              <ShareIcon class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div class="ml-3">
              <p class="font-medium text-slate-900 dark:text-white text-sm md:text-base">Mercado de Afiliação</p>
              <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400">Encontrar produtos para afiliar</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base md:text-lg font-semibold text-slate-900 dark:text-white">Transações Recentes</h3>
          <router-link 
            to="/transactions" 
            class="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium"
          >
            Ver todas
          </router-link>
        </div>
        
        <div class="space-y-3">
          <div 
            v-for="transaction in recentTransactions" 
            :key="transaction.id"
            class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                   :class="transaction.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'">
                <ArrowDownIcon v-if="transaction.type === 'deposit'" class="w-5 h-5 text-green-600 dark:text-green-400" />
                <ArrowUpIcon v-else class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div class="ml-3">
                <p class="font-medium text-slate-900 dark:text-white text-sm md:text-base">{{ transaction.description }}</p>
                <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400">{{ formatDate(transaction.createdAt) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-sm md:text-base" 
                 :class="transaction.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'">
                {{ transaction.type === 'deposit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
              </p>
              <StatusBadge :status="transaction.status" :type="transaction.type" />
            </div>
          </div>
          
          <div v-if="recentTransactions.length === 0" class="text-center py-8">
            <div class="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentIcon class="w-8 h-8 text-slate-400" />
            </div>
            <p class="text-slate-500 dark:text-slate-400">Nenhuma transação encontrada</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <!-- Revenue Chart -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-6">
        <h3 class="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-4">Receita dos Últimos 7 Dias</h3>
        <div class="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-xl">
          <p class="text-slate-500 dark:text-slate-400">Gráfico de receita (implementar com Chart.js)</p>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-6">
        <h3 class="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-4">Métodos de Pagamento</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span class="text-xs font-bold text-purple-600 dark:text-purple-400">PIX</span>
              </div>
              <span class="ml-3 text-slate-900 dark:text-white text-sm md:text-base">PIX</span>
            </div>
            <div class="flex items-center">
              <div class="w-32 bg-slate-200 dark:bg-slate-600 rounded-full h-2 mr-3">
                <div class="bg-purple-600 h-2 rounded-full" style="width: 85%"></div>
              </div>
              <span class="text-sm text-slate-600 dark:text-slate-400">85%</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CreditCardIcon class="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span class="ml-3 text-slate-900 dark:text-white text-sm md:text-base">Cartão</span>
            </div>
            <div class="flex items-center">
              <div class="w-32 bg-slate-200 dark:bg-slate-600 rounded-full h-2 mr-3">
                <div class="bg-green-600 h-2 rounded-full" style="width: 15%"></div>
              </div>
              <span class="text-sm text-slate-600 dark:text-slate-400">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { formatCurrency, formatDate } from '../services/api'
import api from '../services/api'
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
  CreditCardIcon,
  ShareIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'DashboardView',
  components: {
    StatusBadge,
    BanknotesIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    ShoppingCartIcon,
    PlusIcon,
    MinusIcon,
    DocumentPlusIcon,
    DocumentIcon,
    CreditCardIcon,
    ShareIcon
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