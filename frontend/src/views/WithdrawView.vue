<template>
  <BaseLayout 
    title="Solicitar Saque" 
    subtitle="Retire seu saldo via PIX"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="max-w-md mx-auto">
      <div class="card">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-warning-500 to-warning-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        <!-- Saldo Disponível -->
        <div class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-4 mb-6">
          <div class="text-center">
            <p class="text-sm text-primary-600 dark:text-primary-400 font-medium">Saldo Disponível</p>
            <p class="text-2xl font-bold gradient-text">
              R$ {{ balance.toFixed(2).replace('.', ',') }}
            </p>
          </div>
        </div>

        <form @submit.prevent="createWithdrawal" class="space-y-4">
          <div class="form-group">
            <label class="form-label">
              Valor do Saque
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">R$</span>
              <input
                v-model="form.valor"
                type="number"
                step="0.01"
                :min="minWithdraw"
                :max="balance"
                required
                class="input-field pl-10"
                placeholder="0,00"
              />
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Valor mínimo: R$ {{ minWithdraw.toFixed(2).replace('.', ',') }}
            </p>
          </div>

          <div class="form-group">
            <label class="form-label">
              Tipo da Chave PIX
            </label>
            <select
              v-model="form.tipoChave"
              required
              class="input-field"
            >
              <option value="">Selecione o tipo</option>
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
              <option value="email">Email</option>
              <option value="phone">Telefone</option>
              <option value="random">Chave Aleatória</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">
              Chave PIX
            </label>
            <input
              v-model="form.chave"
              :type="getInputType()"
              :placeholder="getPlaceholder()"
              required
              class="input-field"
            />
          </div>

          <!-- Taxa de Saque -->
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div class="flex justify-between text-sm">
              <span class="text-yellow-800 dark:text-yellow-200">Valor solicitado:</span>
              <span class="font-medium text-yellow-900 dark:text-yellow-100">R$ {{ Number(form.valor || 0).toFixed(2).replace('.', ',') }}</span>
            </div>
            <div class="flex justify-between text-sm mt-1">
              <span class="text-yellow-800 dark:text-yellow-200">Taxa (4%):</span>
              <span class="font-medium text-yellow-900 dark:text-yellow-100">- R$ {{ calculateFee().toFixed(2).replace('.', ',') }}</span>
            </div>
            <hr class="border-yellow-200 dark:border-yellow-700 my-2">
            <div class="flex justify-between text-sm font-semibold">
              <span class="text-yellow-800 dark:text-yellow-200">Valor líquido:</span>
              <span class="text-yellow-900 dark:text-yellow-100">R$ {{ calculateNetValue().toFixed(2).replace('.', ',') }}</span>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading || !canWithdraw()"
            class="w-full btn-danger"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </span>
            <span v-else>Solicitar Saque</span>
          </button>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'
import BaseLayout from '../components/BaseLayout.vue'

export default {
  name: 'WithdrawView',
  components: {
    BaseLayout
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const loading = ref(false)
    const balance = ref(0)
    const minWithdraw = ref(20)

    const form = ref({
      valor: '',
      tipoChave: '',
      chave: ''
    })

    const breadcrumbItems = [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Saque', href: '/withdraw' }
    ]

    onMounted(async () => {
      await loadBalance()
    })

    const loadBalance = async () => {
      try {
        const response = await api.get('/users/balance')
        balance.value = response.data.balance
      } catch (error) {
        console.error('Erro ao carregar saldo:', error)
      }
    }

    const getInputType = () => {
      switch (form.value.tipoChave) {
        case 'email': return 'email'
        case 'phone': return 'tel'
        default: return 'text'
      }
    }

    const getPlaceholder = () => {
      switch (form.value.tipoChave) {
        case 'cpf': return '000.000.000-00'
        case 'cnpj': return '00.000.000/0000-00'
        case 'email': return 'seu@email.com'
        case 'phone': return '(11) 99999-9999'
        case 'random': return 'Chave aleatória'
        default: return 'Digite sua chave PIX'
      }
    }

    const calculateFee = () => {
      const amount = Number(form.value.valor || 0)
      return amount * 0.04 // 4% fee
    }

    const calculateNetValue = () => {
      const amount = Number(form.value.valor || 0)
      return amount - calculateFee()
    }

    const canWithdraw = () => {
      const amount = Number(form.value.valor || 0)
      return amount >= minWithdraw.value && amount <= balance.value && form.value.tipoChave && form.value.chave
    }

    const createWithdrawal = async () => {
      if (!canWithdraw()) return

      loading.value = true
      try {
        await api.post('/pixout', {
          ...form.value,
          valor: Number(form.value.valor)
        })
        
        router.push('/withdrawals')
      } catch (error) {
        console.error('Erro ao criar saque:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      balance,
      minWithdraw,
      breadcrumbItems,
      getInputType,
      getPlaceholder,
      calculateFee,
      calculateNetValue,
      canWithdraw,
      createWithdrawal
    }
  }
}
</script>