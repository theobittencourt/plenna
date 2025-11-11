<template>
  <div class="space-y-6">
    <!-- Filters -->
    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Produto</label>
          <select v-model="localFilters.product" @change="loadData" class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white text-sm">
            <option value="">Todos os produtos</option>
            <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Período</label>
          <select v-model="localFilters.period" @change="loadData" class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white text-sm">
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="12m">Últimos 12 meses</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button @click="exportData" class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            <ArrowDownTrayIcon class="w-4 h-4 inline mr-2" />
            Exportar
          </button>
        </div>
      </div>
    </div>

    <!-- Main Chart -->
    <div class="bg-white dark:bg-slate-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">{{ dashboard.name }} - Evolução</h3>
      <div class="h-64">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="metric in metrics" :key="metric.id" class="bg-white dark:bg-slate-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-600 dark:text-slate-400">{{ metric.label }}</p>
            <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ metric.value }}</p>
          </div>
          <div :class="[
            'w-10 h-10 rounded-lg flex items-center justify-center',
            metric.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20' : 
            metric.trend === 'down' ? 'bg-red-100 dark:bg-red-900/20' : 
            'bg-slate-100 dark:bg-slate-700'
          ]">
            <TrendingUpIcon v-if="metric.trend === 'up'" class="w-5 h-5 text-green-600" />
            <TrendingDownIcon v-else-if="metric.trend === 'down'" class="w-5 h-5 text-red-600" />
            <component v-else :is="metric.icon" class="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
        </div>
        <div v-if="metric.change" class="mt-2">
          <span :class="[
            'text-sm font-medium',
            metric.trend === 'up' ? 'text-green-600' : 
            metric.trend === 'down' ? 'text-red-600' : 
            'text-slate-600 dark:text-slate-400'
          ]">
            {{ metric.change }}
          </span>
          <span class="text-sm text-slate-500 dark:text-slate-400 ml-1">vs período anterior</span>
        </div>
      </div>
    </div>

    <!-- Detailed Reports -->
    <div class="bg-white dark:bg-slate-800 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Relatórios Detalhados</h3>
        <div class="flex space-x-2">
          <button v-for="view in views" :key="view.id" @click="activeView = view.id" :class="[
            'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
            activeView === view.id
              ? 'bg-purple-600 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
          ]">
            {{ view.name }}
          </button>
        </div>
      </div>
      
      <!-- Table View -->
      <div v-if="activeView === 'table'" class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th v-for="column in tableColumns" :key="column.key" class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="row in tableData" :key="row.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td v-for="column in tableColumns" :key="column.key" class="px-4 py-3 whitespace-nowrap text-sm">
                <span v-if="column.type === 'currency'" class="font-medium text-slate-900 dark:text-white">
                  R$ {{ formatCurrency(row[column.key]) }}
                </span>
                <span v-else-if="column.type === 'date'" class="text-slate-600 dark:text-slate-400">
                  {{ formatDate(row[column.key]) }}
                </span>
                <StatusBadge v-else-if="column.type === 'status'" :status="row[column.key]" />
                <span v-else class="text-slate-900 dark:text-white">
                  {{ row[column.key] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Chart View -->
      <div v-else-if="activeView === 'chart'" class="h-80">
        <canvas ref="detailChartCanvas"></canvas>
      </div>
      
      <!-- Summary View -->
      <div v-else-if="activeView === 'summary'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="summary in summaryData" :key="summary.id" class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
          <h4 class="font-medium text-slate-900 dark:text-white mb-2">{{ summary.title }}</h4>
          <div class="text-2xl font-bold text-purple-600 mb-1">{{ summary.value }}</div>
          <p class="text-sm text-slate-600 dark:text-slate-400">{{ summary.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { 
  ArrowDownTrayIcon, 
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowTrendingDownIcon as TrendingDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'
const ArrowTrendingUpIcon = TrendingUpIcon
import StatusBadge from '@/components/StatusBadge.vue'
import { Chart, registerables } from 'chart.js'
import api from '@/services/api'

Chart.register(...registerables)

const props = defineProps({
  dashboard: {
    type: Object,
    required: true
  },
  filters: {
    type: Object,
    default: () => ({})
  }
})

const chartCanvas = ref(null)
const detailChartCanvas = ref(null)
const chart = ref(null)
const detailChart = ref(null)
const activeView = ref('table')
const products = ref([])
const metrics = ref([])
const tableData = ref([])
const summaryData = ref([])

const localFilters = reactive({
  product: props.filters.product || '',
  period: props.filters.period || '30d'
})

const views = [
  { id: 'table', name: 'Tabela' },
  { id: 'chart', name: 'Gráfico' },
  { id: 'summary', name: 'Resumo' }
]

const tableColumns = ref([
  { key: 'date', label: 'Data', type: 'date' },
  { key: 'description', label: 'Descrição', type: 'text' },
  { key: 'value', label: 'Valor', type: 'currency' },
  { key: 'status', label: 'Status', type: 'status' }
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
    const response = await api.get(`/reports/${props.dashboard.id}`, {
      params: localFilters
    })
    
    metrics.value = response.data.metrics
    tableData.value = response.data.tableData
    summaryData.value = response.data.summaryData
    
    await nextTick()
    createCharts()
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error)
  }
}

const createCharts = () => {
  // Main chart
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d')
    
    if (chart.value) {
      chart.value.destroy()
    }
    
    chart.value = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: props.dashboard.name,
          data: [12, 19, 3, 5, 2, 3],
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
        }
      }
    })
  }
  
  // Detail chart
  if (detailChartCanvas.value && activeView.value === 'chart') {
    const ctx = detailChartCanvas.value.getContext('2d')
    
    if (detailChart.value) {
      detailChart.value.destroy()
    }
    
    detailChart.value = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Dados Detalhados',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(147, 51, 234, 0.8)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
}

const exportData = async () => {
  try {
    const response = await api.get(`/reports/${props.dashboard.id}/export`, {
      params: localFilters,
      responseType: 'blob'
    })
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${props.dashboard.name}-${Date.now()}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Erro ao exportar dados:', error)
  }
}

watch(activeView, () => {
  nextTick(() => {
    if (activeView.value === 'chart') {
      createCharts()
    }
  })
})

onMounted(async () => {
  // Load products for filter
  try {
    const response = await api.get('/products')
    products.value = response.data
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
  
  // Initialize metrics based on dashboard type
  switch (props.dashboard.id) {
    case 'sales':
      metrics.value = [
        { id: 'revenue', label: 'Receita Total', value: 'R$ 45.200', trend: 'up', change: '+12%', icon: CurrencyDollarIcon },
        { id: 'orders', label: 'Pedidos', value: '156', trend: 'up', change: '+8%', icon: ChartBarIcon },
        { id: 'avg_ticket', label: 'Ticket Médio', value: 'R$ 290', trend: 'down', change: '-3%', icon: CurrencyDollarIcon },
        { id: 'conversion', label: 'Conversão', value: '3.2%', trend: 'up', change: '+0.5%', icon: ArrowTrendingUpIcon }
      ]
      break
    case 'affiliates':
      metrics.value = [
        { id: 'active_affiliates', label: 'Afiliados Ativos', value: '89', trend: 'up', change: '+15%', icon: UserGroupIcon },
        { id: 'affiliate_sales', label: 'Vendas por Afiliados', value: '234', trend: 'up', change: '+22%', icon: ChartBarIcon },
        { id: 'commissions', label: 'Comissões Pagas', value: 'R$ 12.500', trend: 'up', change: '+18%', icon: CurrencyDollarIcon },
        { id: 'avg_commission', label: 'Comissão Média', value: 'R$ 53', trend: 'neutral', change: '0%', icon: CurrencyDollarIcon }
      ]
      break
    default:
      metrics.value = []
  }
  
  await loadData()
})
</script>