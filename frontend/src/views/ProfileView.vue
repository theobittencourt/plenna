<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-4xl mx-auto py-6 px-4" v-if="user">
      <h2 class="text-3xl font-bold mb-6">Meu Perfil</h2>
      
      <div class="card">
        <form @submit.prevent="updateProfile" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label class="block text-sm font-medium mb-2">Nome</label><input v-model="user.name" class="input-field" /></div>
            <div><label class="block text-sm font-medium mb-2">Email</label><input v-model="user.email" type="email" class="input-field" /></div>
            <div><label class="block text-sm font-medium mb-2">Telefone</label><input v-model="user.telefone" class="input-field" /></div>
            <div><label class="block text-sm font-medium mb-2">CPF/CNPJ</label><input v-model="user.cpfCnpj" class="input-field" /></div>
          </div>
          <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">{{ success }}</div>
          <button type="submit" class="btn-primary">Salvar Alterações</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'ProfileView',
  data() {
    return {
      user: null,
      success: null
    }
  },
  async mounted() {
    const { data } = await api.get('/users/profile')
    this.user = data
  },
  methods: {
    async updateProfile() {
      await api.put('/users/profile', this.user)
      this.success = 'Perfil atualizado com sucesso!'
      setTimeout(() => this.success = null, 3000)
    }
  }
}
</script>
