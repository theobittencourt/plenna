<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 md:ml-64">
    <div class="p-4 md:p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Relatórios</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-1">Análises detalhadas do seu negócio</p>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Produto</label>
            <select v-model="filters.product" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
              <option value="">Todos os produtos</option>
              <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Categoria</label>
            <select v-model="filters.category" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
              <option value="">Todas as categorias</option>
              <option value="sales">Vendas</option>
              <option value="subscriptions">Assinaturas</option>
              <option value="contracts">Contratos</option>
              <option value="recovery">Recuperação/Devolutivas</option>
              <option value="engagement">Engajamento</option>
              <option value="affiliates">Afiliações</option>
              <option value="coproduction">Coprodução</option>
              <option value="referrals">Indicações</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Período</label>
            <select v-model="filters.period" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="12m">Últimos 12 meses</option>
              <option value="custom">Período personalizado</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Dashboard Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div v-for="dashboard in dashboards" :key="dashboard.id" @click="viewDashboard(dashboard)" class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 group">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <component :is="dashboard.icon" class="w-6 h-6 text-white" />
            </div>
            <ArrowRightIcon class="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
          </div>
          
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">{{ dashboard.name }}</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">{{ dashboard.description }}</p>
          
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold text-purple-600">{{ dashboard.value }}</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">{{ dashboard.reports.length }} relatórios</div>
          </div>
        </div>
      </div>

      <!-- Main Chart -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Evolução nos Últimos 12 Meses</h3>
          <div class="flex space-x-2">
            <button v-for="metric in chartMetrics" :key="metric.id" @click="activeMetric = metric.id" :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeMetric === metric.id
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            ]">
              {{ metric.name }}
            </button>
          </div>
        </div>
        
        <div class="h-80">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Quick Reports -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Top Products -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Produtos Mais Vendidos</h3>
          <div class="space-y-4">
            <div v-for="product in topProducts" :key="product.id" class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <span class="text-purple-600 font-medium text-sm">{{ product.name.charAt(0) }}</span>
                </div>
                <div>
                  <div class="font-medium text-slate-900 dark:text-white">{{ product.name }}</div>
                  <div class="text-sm text-slate-500 dark:text-slate-400">{{ product.sales }} vendas</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-semibold text-slate-900 dark:text-white">R$ {{ formatCurrency(product.revenue) }}</div>
                <div class="text-sm text-green-600">+{{ product.growth }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Atividade Recente</h3>
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <component :is="activity.icon" class="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-slate-900 dark:text-white">{{ activity.description }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ formatDate(activity.date) }}</p>
              </div>
              <div class="text-sm font-medium text-slate-900 dark:text-white">
                {{ activity.value }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Detail Modal -->
      <BaseModal v-model="showDashboardModal" :title="selectedDashboard?.name" size="xl">
        <DashboardDetail v-if="selectedDashboard" :dashboard="selectedDashboard" :filters="filters" />
      </BaseModal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { 
  ArrowRightIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  TrendingUpIcon,
  ShoppingCartIcon
} from '@heroicons/vue/24/outline'
import BaseModal from '@/components/BaseModal.vue'
import DashboardDetail from '@/components/DashboardDetail.vue'
import { Chart, registerables } from 'chart.js'
import api from '@/services/api'

Chart.register(...registerables)

const products = ref([])
const topProducts = ref([])
const recentActivity = ref([])
const showDashboardModal = ref(false)
const selectedDashboard = ref(null)
const chartCanvas = ref(null)
const chart = ref(null)
const activeMetric = ref('sales')

const filters = ref({
  product: '',
  category: '',
  period: '30d'
})

const dashboards = ref([
  {
    id: 'sales',
    name: 'Vendas',
    description: 'Receitas, faturas e pagamentos',
    icon: CurrencyDollarIcon,
    value: 'R$ 45.2K',
    reports: ['receita-liquida', 'receita-bruta', 'faturas', 'pagamentos-pendentes']
  },
  {
    id: 'subscriptions',
    name: 'Assinaturas',
    description: 'Receitas recorrentes e renovações',
    icon: DocumentChartBarIcon,
    value: 'R$ 12.8K',
    reports: ['receita-assinaturas', 'renovacoes', 'cancelamentos']
  },
  {
    id: 'affiliates',
    name: 'Afiliações',
    description: 'Performance de afiliados',
    icon: UserGroupIcon,
    value: '156',
    reports: ['afiliados-ativos', 'vendas-afiliados', 'comissoes']
  },
  {
    id: 'engagement',
    name: 'Engajamento',
    description: 'Atividade e consumo de conteúdo',
    icon: ChartBarIcon,
    value: '89%',
    reports: ['horas-assistidas', 'progresso', 'atividade']
  }
])

const chartMetrics = ref([
  { id: 'sales', name: 'Vendas' },
  { id: 'revenue', name: 'Receita' },
  { id: 'users', name: 'Usuários' },
  { id: 'conversion', name: 'Conversão' }
])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const loadData = async () => {
  try {
    const [productsRes, topProductsRes, activityRes] = await Promise.all([
      api.get('/products'),
      api.get('/reports/top-products'),
      api.get('/reports/recent-activity')
    ])
    
    products.value = productsRes.data
    topProducts.value = topProductsRes.data
    recentActivity.value = activityRes.data
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}

const createChart = () => {
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  
  if (chart.value) {
    chart.value.destroy()
  }
  
  chart.value = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [{
        label: 'Vendas',
        data: [12, 19, 3, 5, 2, 3, 15, 8, 12, 18, 25, 30],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(148, 163, 184, 0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(148, 163, 184, 0.1)'
          }
        }
      }
    }
  })
}

const viewDashboard = (dashboard) => {
  selectedDashboard.value = dashboard
  showDashboardModal.value = true
}

onMounted(async () => {
  await loadData()
  await nextTick()
  createChart()
})
</script>