<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Informações Básicas -->
    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Informações Básicas</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nome do Produto</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="Digite o nome do produto" />
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descrição</label>
          <textarea v-model="form.description" rows="3" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="Descreva seu produto"></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Categoria</label>
          <select v-model="form.category" required class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
            <option value="">Selecione uma categoria</option>
            <option value="curso">Curso Online</option>
            <option value="ebook">E-book</option>
            <option value="software">Software</option>
            <option value="consultoria">Consultoria</option>
            <option value="servico">Serviço</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preço (R$)</label>
          <input v-model="form.price" type="number" step="0.01" min="0" required class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="0,00" />
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Imagem do Produto</label>
          <div class="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
            <input ref="fileInput" type="file" accept="image/*" @change="handleImageUpload" class="hidden" />
            <div v-if="!form.image" @click="$refs.fileInput.click()" class="cursor-pointer">
              <PhotoIcon class="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p class="text-slate-600 dark:text-slate-400">Clique para fazer upload da imagem</p>
            </div>
            <div v-else class="relative">
              <img :src="form.image" alt="Preview" class="w-32 h-32 object-cover rounded-lg mx-auto mb-2" />
              <button type="button" @click="form.image = null" class="text-red-600 hover:text-red-700 text-sm">Remover imagem</button>
            </div>
          </div>
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL da Página de Vendas</label>
          <input v-model="form.salesUrl" type="url" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="https://exemplo.com/produto" />
        </div>
      </div>
    </div>

    <!-- Afiliados -->
    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Programa de Afiliados</h3>
        <label class="relative inline-flex items-center cursor-pointer">
          <input v-model="form.affiliateEnabled" type="checkbox" class="sr-only peer" />
          <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"></div>
        </label>
      </div>
      
      <div v-if="form.affiliateEnabled" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quem pode se afiliar?</label>
          <select v-model="form.affiliateType" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
            <option value="open">Qualquer um pode ser afiliado</option>
            <option value="approval">Somente afiliados com autorização</option>
          </select>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Comissão em venda única (%)</label>
            <input v-model="form.affiliateCommission" type="number" min="0" max="100" step="0.01" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="0" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Comissão em recorrência (%)</label>
            <input v-model="form.affiliateRecurringCommission" type="number" min="0" max="100" step="0.01" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="0" />
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-slate-700">
      <button type="button" @click="handleCancel" class="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors">
        Cancelar
      </button>
      <button type="submit" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
        Salvar Produto
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PhotoIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  name: '',
  description: '',
  category: '',
  price: '',
  image: null,
  salesUrl: '',
  affiliateEnabled: false,
  affiliateType: 'open',
  affiliateCommission: 0,
  affiliateRecurringCommission: 0
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = () => {
  emit('submit', { ...form })
}

const handleCancel = () => {
  emit('cancel')
}
</script>