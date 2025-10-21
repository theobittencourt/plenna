<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Pagamentos PIX
            <span class="block text-white/90">Simplificados</span>
          </h1>
          <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            Sistema completo de pagamentos PIX com múltiplos adquirentes, checkouts personalizados e gestão financeira avançada.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <router-link to="/register" class="bg-white text-dark-900 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Começar Agora
            </router-link>
            <router-link to="/login" class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-dark-900 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              Fazer Login
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div class="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse-slow"></div>
      <div class="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-float" style="animation-delay: 2s"></div>
      <div class="absolute top-32 right-32 w-8 h-8 bg-white/5 rounded-full animate-float" style="animation-delay: 4s"></div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white dark:bg-dark-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Por que escolher a Plenna?</h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Oferecemos a solução mais completa para pagamentos PIX do mercado
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style="animation-delay: 0.1s">
            <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <CreditCardIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Múltiplos Adquirentes</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Integração com Pixup, Cashtime, Mercado Pago, EFI, Pagarme, XGate e Witetec
            </p>
          </div>
          
          <div class="card text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style="animation-delay: 0.2s">
            <div class="w-16 h-16 bg-gradient-to-r from-success-600 to-success-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <ShoppingCartIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Checkouts Personalizados</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Crie páginas de vendas profissionais com order bumps e depoimentos
            </p>
          </div>
          
          <div class="card text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style="animation-delay: 0.3s">
            <div class="w-16 h-16 bg-gradient-to-r from-warning-600 to-warning-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <ChartBarIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dashboard Completo</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Acompanhe suas vendas, saques e transações em tempo real
            </p>
          </div>
          
          <div class="card text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style="animation-delay: 0.4s">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <BanknotesIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Saques Automáticos</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Configure saques automáticos via cron jobs for maior praticidade
            </p>
          </div>
          
          <div class="card text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style="animation-delay: 0.5s">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <ShieldCheckIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Segurança Avançada</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Autenticação JWT e criptografia de ponta para proteger seus dados
            </p>
          </div>
          
          <div class="card text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style="animation-delay: 0.6s">
            <div class="w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <CodeBracketIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">API Completa</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Documentação Swagger e endpoints para todas as funcionalidades
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-24 bg-gradient-to-r from-primary-500 to-secondary-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="text-white">
            <div class="text-4xl md:text-5xl font-bold mb-2">7+</div>
            <div class="text-white/90 text-lg">Adquirentes Integrados</div>
          </div>
          <div class="text-white">
            <div class="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
            <div class="text-white/90 text-lg">Uptime Garantido</div>
          </div>
          <div class="text-white">
            <div class="text-4xl md:text-5xl font-bold mb-2">24/7</div>
            <div class="text-white/90 text-lg">Suporte Técnico</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-white dark:bg-dark-900">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Pronto para revolucionar seus pagamentos?
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Junte-se a milhares de empresas que já confiam na Plenna
        </p>
        <router-link to="/register" class="btn-primary text-lg px-12 py-4">
          Criar Conta Gratuita
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { 
  CreditCardIcon, 
  ShoppingCartIcon, 
  ChartBarIcon, 
  BanknotesIcon, 
  ShieldCheckIcon, 
  CodeBracketIcon 
} from '@heroicons/vue/24/outline'

export default {
  name: 'HomeView',
  components: {
    CreditCardIcon,
    ShoppingCartIcon,
    ChartBarIcon,
    BanknotesIcon,
    ShieldCheckIcon,
    CodeBracketIcon
  }
}
</script>
