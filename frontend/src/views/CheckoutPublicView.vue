<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" v-if="checkout">
    <div class="max-w-4xl mx-auto py-12 px-4">
      <div class="card animate-fade-in">
        <div v-if="checkout.checkoutHeaderImage" class="mb-6">
          <img :src="checkout.checkoutHeaderImage" class="w-full h-64 object-cover rounded-xl" />
        </div>

        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ checkout.produtoName }}</h1>
          <p class="text-xl text-gray-600 mb-6">{{ checkout.produtoDescricao }}</p>
          
          <div class="flex justify-center items-baseline space-x-2 mb-6">
            <span v-if="checkout.produtoDeValor" class="text-2xl text-gray-400 line-through">R$ {{ formatMoney(checkout.produtoDeValor) }}</span>
            <span class="text-5xl font-bold text-primary-600">R$ {{ formatMoney(checkout.produtoValor) }}</span>
          </div>

          <button @click="showPaymentModal = true" class="btn-primary text-xl px-12 py-4">Comprar Agora</button>
        </div>

        <div v-if="checkout.depoimentos?.length" class="mt-12">
          <h3 class="text-2xl font-bold text-center mb-6">Depoimentos</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="dep in checkout.depoimentos" :key="dep.id" class="p-4 bg-gray-50 rounded-lg">
              <p class="text-gray-700 mb-2">"{{ dep.depoimento }}"</p>
              <p class="font-semibold text-primary-600">- {{ dep.nome }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="showPaymentModal = false">
      <div class="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 class="text-2xl font-bold mb-4">Finalizar Compra</h3>
        <form @submit.prevent="createOrder" class="space-y-4">
          <div><input v-model="orderForm.clienteNome" placeholder="Nome Completo" required class="input-field" /></div>
          <div><input v-model="orderForm.clienteEmail" type="email" placeholder="Email" required class="input-field" /></div>
          <div><input v-model="orderForm.clienteCpf" placeholder="CPF" required class="input-field" /></div>
          <div><input v-model="orderForm.clienteTelefone" placeholder="Telefone" required class="input-field" /></div>
          <button type="submit" class="btn-primary w-full">Gerar PIX</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'CheckoutPublicView',
  data() {
    return {
      checkout: null,
      showPaymentModal: false,
      orderForm: { clienteNome: '', clienteEmail: '', clienteCpf: '', clienteTelefone: '' }
    }
  },
  async mounted() {
    const { data } = await api.get(`/checkout/${this.$route.params.id}`)
    this.checkout = data
  },
  methods: {
    async createOrder() {
      await api.post(`/checkout/${this.checkout.id}/order`, {
        ...this.orderForm,
        valor: this.checkout.produtoValor
      })
      alert('Pedido criado! Aguarde o PIX...')
      this.showPaymentModal = false
    },
    formatMoney(value) {
      return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value || 0)
    }
  }
}
</script>
