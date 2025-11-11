<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Co-produção</h3>
        <p class="text-slate-600 dark:text-slate-400 mt-1">Gerencie parceiros e comissões do produto</p>
      </div>
      <button @click="showInviteModal = true" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        <UserPlusIcon class="w-4 h-4 inline mr-2" />
        Convidar Parceiro
      </button>
    </div>

    <!-- Partners Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h4 class="text-lg font-medium text-slate-900 dark:text-white">Parceiros</h4>
      </div>
      
      <div v-if="partners.length === 0" class="p-8 text-center">
        <UserGroupIcon class="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Nenhum parceiro encontrado</h3>
        <p class="text-slate-600 dark:text-slate-400 mb-4">Convide parceiros para co-produzir este produto</p>
        <button @click="showInviteModal = true" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Convidar Primeiro Parceiro
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Parceiro</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Comissão</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data de Encerramento</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="partner in partners" :key="partner.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <span class="text-purple-600 font-medium text-sm">{{ partner.name.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-slate-900 dark:text-white">{{ partner.name }}</div>
                    <div class="text-sm text-slate-500 dark:text-slate-400">{{ partner.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <StatusBadge :status="partner.status" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-medium text-slate-900 dark:text-white">{{ partner.commission }}%</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {{ partner.endDate ? formatDate(partner.endDate) : '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="relative inline-block text-left">
                  <button @click="toggleDropdown(partner.id)" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                    <EllipsisVerticalIcon class="w-5 h-5 text-slate-400" />
                  </button>
                  <div v-if="activeDropdown === partner.id" class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-10">
                    <button @click="editPartner(partner)" class="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-t-lg">
                      <PencilIcon class="w-4 h-4 inline mr-2" />
                      Editar
                    </button>
                    <button @click="removePartner(partner)" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg">
                      <TrashIcon class="w-4 h-4 inline mr-2" />
                      Excluir
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Commission Summary -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
      <h4 class="text-lg font-medium text-slate-900 dark:text-white mb-4">Resumo de Comissões</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-600">{{ totalCommission }}%</div>
          <div class="text-sm text-purple-600">Total Distribuído</div>
        </div>
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">{{ ownerCommission }}%</div>
          <div class="text-sm text-green-600">Sua Parte</div>
        </div>
        <div class="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
          <div class="text-2xl font-bold text-slate-600 dark:text-slate-300">{{ remainingCommission }}%</div>
          <div class="text-sm text-slate-600 dark:text-slate-400">Disponível</div>
        </div>
      </div>
    </div>

    <!-- Invite Partner Modal -->
    <BaseModal v-model="showInviteModal" title="Convidar Parceiro" size="md">
      <form @submit.prevent="invitePartner" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">E-mail do Parceiro</label>
          <input v-model="inviteForm.email" type="email" required class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="parceiro@exemplo.com" />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Porcentagem de Comissão</label>
          <input v-model="inviteForm.commission" type="number" min="1" :max="remainingCommission" step="0.01" required class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="0" />
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Disponível: {{ remainingCommission }}%</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirmação da Porcentagem</label>
          <input v-model="inviteForm.confirmCommission" type="number" min="1" :max="remainingCommission" step="0.01" required class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white" placeholder="0" />
        </div>
        
        <div class="flex items-center">
          <input v-model="inviteForm.acceptTerms" type="checkbox" required class="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" />
          <label class="ml-2 text-sm text-slate-700 dark:text-slate-300">Aceito os termos de co-produção</label>
        </div>
        
        <div class="flex justify-end space-x-4 pt-4">
          <button type="button" @click="showInviteModal = false" class="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
            Enviar Convite
          </button>
        </div>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  UserPlusIcon, 
  UserGroupIcon, 
  EllipsisVerticalIcon, 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/vue/24/outline'
import BaseModal from '@/components/BaseModal.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import api from '@/services/api'

const props = defineProps({
  productId: {
    type: String,
    required: true
  }
})

const partners = ref([])
const showInviteModal = ref(false)
const activeDropdown = ref(null)

const inviteForm = ref({
  email: '',
  commission: '',
  confirmCommission: '',
  acceptTerms: false
})

const totalCommission = computed(() => {
  return partners.value.reduce((sum, partner) => sum + parseFloat(partner.commission || 0), 0)
})

const ownerCommission = computed(() => {
  return Math.max(1, 100 - totalCommission.value)
})

const remainingCommission = computed(() => {
  return Math.max(0, 99 - totalCommission.value) // Owner keeps at least 1%
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const toggleDropdown = (partnerId) => {
  activeDropdown.value = activeDropdown.value === partnerId ? null : partnerId
}

const loadPartners = async () => {
  try {
    const response = await api.get(`/products/${props.productId}/partners`)
    partners.value = response.data
  } catch (error) {
    console.error('Erro ao carregar parceiros:', error)
  }
}

const invitePartner = async () => {
  if (inviteForm.value.commission !== inviteForm.value.confirmCommission) {
    alert('As porcentagens não coincidem')
    return
  }
  
  try {
    await api.post(`/products/${props.productId}/partners/invite`, inviteForm.value)
    showInviteModal.value = false
    inviteForm.value = { email: '', commission: '', confirmCommission: '', acceptTerms: false }
    loadPartners()
  } catch (error) {
    console.error('Erro ao convidar parceiro:', error)
  }
}

const editPartner = (partner) => {
  // Implement edit functionality
  activeDropdown.value = null
}

const removePartner = async (partner) => {
  if (confirm('Tem certeza que deseja remover este parceiro?')) {
    try {
      await api.delete(`/products/${props.productId}/partners/${partner.id}`)
      loadPartners()
    } catch (error) {
      console.error('Erro ao remover parceiro:', error)
    }
  }
  activeDropdown.value = null
}

onMounted(() => {
  loadPartners()
})
</script>