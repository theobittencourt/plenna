<template>
  <BaseLayout 
    title="Fazer Depósito" 
    subtitle="Adicione saldo à sua conta via PIX"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="max-w-md mx-auto">
      <div class="card">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-plenna rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
        </div>

        <form @submit.prevent="createDeposit" class="space-y-4">
          <div class="form-group">
            <label class="form-label">
              Valor do Depósito
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">R$</span>
              <input
                v-model="form.amount"
                type="number"
                step="0.01"
                min="10"
                required
                class="input-field pl-10"
                placeholder="0,00"
              />
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Valor mínimo: R$ 10,00</p>
          </div>

          <div class="form-group">
            <label class="form-label">
              Nome Completo
            </label>
            <input
              v-model="form.debtor_name"
              type="text"
              required
              class="input-field"
              placeholder="Seu nome completo"
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              CPF
            </label>
            <input
              v-model="form.debtor_document_number"
              v-mask="'###.###.###-##'"
              type="text"
              required
              class="input-field"
              placeholder="000.000.000-00"
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="seu@email.com"
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              Telefone
            </label>
            <input
              v-model="form.phone"
              v-mask="'(##) #####-####'"
              type="text"
              required
              class="input-field"
              placeholder="(11) 99999-9999"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </span>
            <span v-else>Gerar PIX</span>
          </button>
        </form>
      </div>

    <!-- QR Code Modal -->
    <div v-if="qrCode" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="card max-w-sm w-full">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">PIX Gerado</h3>
          <div class="bg-white p-4 rounded-lg mb-4">
            <img :src="qrCodeImage" alt="QR Code PIX" class="w-full max-w-xs mx-auto" />
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Escaneie o QR Code ou copie o código PIX
          </p>
          <div class="bg-gray-100 dark:bg-dark-700 p-3 rounded-lg mb-4">
            <p class="text-xs font-mono break-all text-gray-800 dark:text-gray-200">{{ qrCode }}</p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="copyToClipboard"
              class="flex-1 btn-primary"
            >
              Copiar Código
            </button>
            <button
              @click="closeModal"
              class="flex-1 btn-secondary"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'
import BaseLayout from '../components/BaseLayout.vue'

export default {
  name: 'DepositView',
  components: {
    BaseLayout
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const loading = ref(false)
    const qrCode = ref('')
    const qrCodeImage = ref('')

    const form = ref({
      amount: '',
      debtor_name: '',
      debtor_document_number: '',
      email: '',
      phone: '',
      method_pay: 'pix',
      userId: ''
    })

    const breadcrumbItems = [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Depósito', href: '/deposit' }
    ]

    onMounted(() => {
      if (authStore.user) {
        form.value.userId = authStore.user.userId
        form.value.email = authStore.user.email
        form.value.debtor_name = authStore.user.name
      }
    })

    const createDeposit = async () => {
      loading.value = true
      try {
        const response = await api.post('/wallet/deposit/payment', form.value)
        qrCode.value = response.data.qrCode
        qrCodeImage.value = response.data.qrCodeImage
      } catch (error) {
        console.error('Erro ao criar depósito:', error)
      } finally {
        loading.value = false
      }
    }

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(qrCode.value)
        // Show toast notification
      } catch (error) {
        console.error('Erro ao copiar:', error)
      }
    }

    const closeModal = () => {
      qrCode.value = ''
      qrCodeImage.value = ''
      router.push('/deposits')
    }

    return {
      form,
      loading,
      qrCode,
      qrCodeImage,
      breadcrumbItems,
      createDeposit,
      copyToClipboard,
      closeModal
    }
  }
}
</script>