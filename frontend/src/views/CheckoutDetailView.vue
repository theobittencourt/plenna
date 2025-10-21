<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-7xl mx-auto py-6 px-4" v-if="checkout">
      <h2 class="text-3xl font-bold mb-6">{{ checkout.produtoName }}</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Informações</h3>
          <div class="space-y-3">
            <div><span class="text-gray-600">Valor:</span> <span class="font-bold">R$ {{ formatMoney(checkout.produtoValor) }}</span></div>
            <div><span class="text-gray-600">Status:</span> <span :class="checkout.status ? 'text-green-600' : 'text-gray-600'">{{ checkout.status ? 'Ativo' : 'Inativo' }}</span></div>
            <div><span class="text-gray-600">Link:</span> <a :href="`/checkout/public/${checkout.idUnico}`" target="_blank" class="text-primary-600 hover:underline">Ver Página</a></div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Pedidos Recentes</h3>
          <div class="space-y-2">
            <div v-for="order in checkout.orders" :key="order.id" class="p-3 bg-gray-50 rounded-lg">
              <p class="font-semibold">{{ order.clienteNome }}</p>
              <p class="text-sm text-gray-600">R$ {{ formatMoney(order.valor) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'CheckoutDetailView',
  data() {
    return {
      checkout: null
    }
  },
  async mounted() {
    const { data } = await api.get(`/checkout/${this.$route.params.id}`)
    this.checkout = data
  },
  methods: {
    formatMoney(value) {
      return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value || 0)
    }
  }
}
</script>
