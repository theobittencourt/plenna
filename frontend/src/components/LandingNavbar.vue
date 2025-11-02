<template>
  <!-- Cabeçalho flutuante em cápsula -->
  <div class="header-wrap">
    <div class="header">
      <div class="brand">
        <router-link to="/" class="flex items-center gap-2">
          <img class="logo-simbolo" src="/src/assets/logo.png" alt="Plenna" />
        </router-link>
      </div>

      <div class="nav-pill">
        <nav class="nav">
          <a href="#porque" :class="{ 'is-active': activeSection === 'porque' }">Por que Plenna</a>
          <a href="#produtos" :class="{ 'is-active': activeSection === 'produtos' }">Produtos</a>
          <a href="#taxas" :class="{ 'is-active': activeSection === 'taxas' }">Taxas e Prazos</a>
          <a href="#quem-somos" :class="{ 'is-active': activeSection === 'quem-somos' }">Quem Somos</a>
          <a href="#faq" :class="{ 'is-active': activeSection === 'faq' }">Suporte</a>
        </nav>
      </div>

      <div class="actions">
        <router-link to="/login" class="btn-login">Entrar</router-link>
        <router-link to="/register" class="btn-register">Criar Conta</router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="showMobileMenu = !showMobileMenu" class="mobile-menu-btn md:hidden">
        <Bars3Icon v-if="!showMobileMenu" class="w-5 h-5" />
        <XMarkIcon v-else class="w-5 h-5" />
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div v-show="showMobileMenu" class="mobile-menu">
    <div class="mobile-menu-content">
      <a href="#porque" @click="showMobileMenu = false">Por que Plenna</a>
      <a href="#produtos" @click="showMobileMenu = false">Produtos</a>
      <a href="#taxas" @click="showMobileMenu = false">Taxas e Prazos</a>
      <a href="#quem-somos" @click="showMobileMenu = false">Quem Somos</a>
      <a href="#faq" @click="showMobileMenu = false">Suporte</a>
      <div class="mobile-actions">
        <router-link to="/login" @click="showMobileMenu = false">Entrar</router-link>
        <router-link to="/register" @click="showMobileMenu = false">Criar Conta</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'LandingNavbar',
  components: { Bars3Icon, XMarkIcon },
  setup() {
    const showMobileMenu = ref(false)
    const activeSection = ref('')

    const updateActiveSection = () => {
      const sections = ['porque', 'produtos', 'taxas', 'quem-somos', 'faq']
      const scrollPosition = window.scrollY + 150
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && scrollPosition >= element.offsetTop) {
          activeSection.value = sections[i]
          break
        }
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', updateActiveSection)
      updateActiveSection()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', updateActiveSection)
    })

    return {
      showMobileMenu,
      activeSection
    }
  }
}
</script>

<style scoped>
/* Landing Page Navbar Styles */
.header-wrap {
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: min(calc(100% - 16px), 1320px);
  z-index: 1000;
  pointer-events: none;
}

@media (min-width: 768px) {
  .header-wrap {
    top: 16px;
    width: min(calc(75% - 24px), 1320px);
  }
}

.header {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
  padding: 4px;
  max-height: 65px;
  border-radius: 40px;
  /* background: linear-gradient(135deg, rgba(0, 212, 170, 0.06) 0%, rgba(102, 126, 234, 0.06) 100%); */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 170, 0.12);
  box-shadow: 0 4px 15px -6px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 768px) {
  .header {
    gap: 12px;
    padding: 5px 12px;
  }
}

.header:hover {
  
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.brand {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 1px;
}

.logo-simbolo {
  width: 62px;
  height: 62px;
}

@media (min-width: 768px) {
  .logo-simbolo {
    width: 94px;
    height: 94px;
  }
}

.nav-pill {
  /* flex: 1 1 auto;; */
  display: none;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  /* padding: 2px 8px; */
  min-height: 28px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
}

@media (min-width: 768px) {
  .nav-pill {
    display: flex;
    padding: 3px 12px;
    min-height: 30px;
  }
}



.nav {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

@media (min-width: 1024px) {
  .nav {
    gap: 32px;
  }
}

.nav a {
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.02em;
  position: relative;
  transition: all 0.3s ease;
  padding: 3px 6px;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .nav a {
    font-size: 13px;
    /* padding: 4px 8px; */
    /* border-radius: 6px; */
  }
}

.nav a::before {
  /* content: ''; */
  position: absolute;
  /* inset: 0; */
  /* background: linear-gradient(135deg, rgba(0, 212, 170, 0.3) 0%, rgba(102, 126, 234, 0.3) 100%); */
  /* border-radius: 12px; */
  opacity: 0;
  /* transition: opacity 0.3s ease; */
}

.nav a::after {
  /* content: ""; */
  position: absolute;
  left: 50%;
  bottom: -2px;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, #00d4aa, #667eea);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 0 20px rgba(0, 212, 170, 0.5);
}

.nav a:hover {
  /* transform: translateY(-2px); */
  text-shadow: 0 0 20px rgba(0, 212, 170, 0.5);
}

.nav a:hover::before {
  opacity: 1;
}

.nav a:hover::after {
  width: 80%;
}

.nav a.is-active {
  color: #00d4aa;
  /* background: linear-gradient(135deg, rgba(0, 212, 170, 0.4) 0%, rgba(102, 126, 234, 0.4) 100%); */
  /* text-shadow: 0 0 15px rgba(0, 212, 170, 0.6); */
}

.nav a.is-active::after {
  width: 0;
}

.actions {
  display: none;
  align-items: center;
  gap: 4px;
  padding-right: 1px;
}

@media (min-width: 768px) {
  .actions {
    display: flex;
    gap: 6px;
    padding-right: 2px;
  }
}

.btn-login {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-login:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-register {
  background: #a855f7;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: none;
}

.btn-register:hover {
  background: #9333ea;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
}

.mobile-menu-btn {
  background: rgba(255, 255, 255, 0.06);
  color: white;
  padding: 3px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: block;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

.mobile-menu {
  position: fixed;
  top: 80px;
  left: 8px;
  right: 8px;
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.95) 0%, rgba(102, 126, 234, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 255, 195, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 999;
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}

.mobile-menu-content {
  padding: 16px;
}

.mobile-menu-content a {
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-decoration: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 12px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

.mobile-menu-content a:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.mobile-actions {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-actions a {
  padding: 12px 16px;
  text-align: center;
  border-radius: 12px;
  font-weight: 600;
  margin-bottom: 0;
}

.mobile-actions a:first-child {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.mobile-actions a:last-child {
  background: linear-gradient(135deg, #00d4aa 0%, #667eea 100%);
  box-shadow: 0 4px 15px rgba(0, 212, 170, 0.3);
}



@media (max-width: 1024px) {
  .nav {
    gap: 32px;
  }
  
  .nav a {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .nav {
    gap: 20px;
  }
  
  .nav a {
    font-size: 13px;
  }
  
  .header {
    padding: 10px 16px;
  }
  
  .nav-pill {
    padding: 12px 20px;
    min-height: 48px;
  }
  
  .header-wrap {
    top: 16px;
    width: min(calc(100% - 24px), 1320px);
  }
}
</style>