<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
    <div class="text-center">
      <div class="mb-8">
        <div class="w-32 h-32 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="text-white font-bold text-6xl">404</span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Página não encontrada</h1>
        <p class="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
      </div>
      
      <div class="space-y-4">
        <router-link 
          to="/" 
          class="btn-primary inline-flex items-center"
        >
          <HomeIcon class="w-5 h-5 mr-2" />
          Voltar ao Início
        </router-link>
        
        <div class="text-center">
          <button 
            @click="$router.go(-1)" 
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Voltar à página anterior
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HomeIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'NotFoundView',
  components: {
    HomeIcon
  }
}
</script>