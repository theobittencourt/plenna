<template>
  <span :class="badgeClasses" class="status-badge">
    <span v-if="showIcon" :class="iconClasses" class="w-2 h-2 rounded-full mr-1.5"></span>
    {{ statusText }}
  </span>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'default' // payment, withdrawal, order, etc.
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    badgeClasses() {
      const baseClasses = 'status-badge'
      
      switch (this.status.toLowerCase()) {
        case 'paid':
        case 'approved':
        case 'completed':
        case 'success':
          return `${baseClasses} status-success`
        
        case 'pending':
        case 'processing':
        case 'waiting':
          return `${baseClasses} status-warning`
        
        case 'failed':
        case 'cancelled':
        case 'rejected':
        case 'error':
          return `${baseClasses} status-danger`
        
        case 'expired':
        case 'timeout':
          return `${baseClasses} status-danger`
        
        default:
          return `${baseClasses} status-info`
      }
    },
    
    iconClasses() {
      switch (this.status.toLowerCase()) {
        case 'paid':
        case 'approved':
        case 'completed':
        case 'success':
          return 'bg-success-500'
        
        case 'pending':
        case 'processing':
        case 'waiting':
          return 'bg-warning-500 animate-pulse'
        
        case 'failed':
        case 'cancelled':
        case 'rejected':
        case 'error':
        case 'expired':
        case 'timeout':
          return 'bg-danger-500'
        
        default:
          return 'bg-primary-500'
      }
    },
    
    statusText() {
      const statusMap = {
        // Payment statuses
        'paid': 'Pago',
        'pending': 'Pendente',
        'cancelled': 'Cancelado',
        'expired': 'Expirado',
        'failed': 'Falhou',
        
        // Withdrawal statuses
        'approved': 'Aprovado',
        'processing': 'Processando',
        'rejected': 'Rejeitado',
        
        // Order statuses
        'completed': 'Concluído',
        'waiting': 'Aguardando',
        'success': 'Sucesso',
        'error': 'Erro',
        'timeout': 'Expirado'
      }
      
      return statusMap[this.status.toLowerCase()] || this.status
    }
  }
}
</script>