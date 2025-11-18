<template>
  <div class="home">
    <LandingNavbar />
    
    <main>
      <!-- Hero Section -->
      <section id="porque" class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">Venda parcelado, receba à vista e defina suas taxas.</h1>
              <p class="hero-subtitle">Expanda suas vendas para o mundo todo. Pagamentos globais, checkout inteligente, cobrança automatizada, antecipação de recebíveis, área de membros personalizada e suporte humano.</p>
            </div>
            <div class="hero-actions">
              <a href="#produtos" class="btn-outline">Saiba mais</a>
              <a href="/register" class="btn-primary">Criar Conta</a>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Full Width Carousel -->
      <div class="hero-carousel">
        <div class="carousel-track" :style="{ transform: `translateX(calc(-${currentSlide * (280 + 5)}px + 50vw - 140px))` }">
          <div class="carousel-slide" v-for="(image, index) in duplicatedImages" :key="index" :class="{ center: isCenterSlide(index) }">
            <img :src="image.src" :alt="image.alt" />
          </div>
        </div>
      </div>
      
      <section class="spacer-section">
      </section>

    <!-- Products Section -->
    <section id="produtos" class="products-section">
      <div class="container">
        <div class="section-header">
          <h1>Vender deveria ser simples. Receber também.</h1>
          <p class="section-subtitle">Com a Plenna, você vende parcelado, recebe à vista e garante cada pagamento. Um ecossistema completo que elimina as travas, amplia seu público e devolve o controle do seu negócio.</p>
        </div>

        <div class="products-grid">
          <div class="product-card">
            <h3>Pagamentos Recorrentes</h3>
            <p>Venda parcelado e receba à vista. Use boleto, Pix ou cartão com cobrança recorrente.</p>
          </div>
          <div class="product-card">
            <h3>Métodos de Pagamento</h3>
            <p>Pix, boleto, cartão e pagamentos internacionais em um único sistema.</p>
          </div>
          <div class="product-card">
            <h3>Gestão de Cobrança</h3>
            <p>Automação completa, retentativas inteligentes e segurança total no recebimento.</p>
          </div>
          <div class="product-card">
            <h3>Checkout Inteligente</h3>
            <p>Identifica o comportamento do cliente e otimiza conversão. Aceita dois cartões e retentativas automáticas.</p>
          </div>
          <div class="product-card">
            <h3>Integrações</h3>
            <p>Checkout transparente, IA com CodeChat e API para sua área de membros.</p>
          </div>
          <div class="product-card">
            <h3>Área de Membros</h3>
            <p>Crie e modele a experiência ideal com a identidade da sua marca.</p>
          </div>
          <div class="product-card">
            <h3>Antecipação de Recebíveis</h3>
            <p>Antecipe boletos. A Plenna assume o risco, você acelera o crescimento.</p>
          </div>
          <div class="product-card">
            <h3>Indique e Ganhe</h3>
            <p>Indique parceiros e receba até 2% das vendas deles. Bônus sem desconto para ninguém.</p>
          </div>
          <div class="product-card">
            <h3>Eventos e Premiações</h3>
            <p>Plaquinhas, eventos exclusivos e networking com quem está no seu nível.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Taxas Section -->
    <section id="taxas" class="taxas-section">
      <div class="container">
        <div class="section-header">
          <h1>O dinheiro é seu. E agora ele fica com você.</h1>
        </div>
        
        <div class="pricing-showcase">
          <div class="pricing-comparison">
            <div class="offer-summary">
              <div class="offer-header">
                <h3>Exemplo Prático</h3>
                <p>Venda de R$ 1.500,00</p>
              </div>
              <div class="offer-metrics">
                <div class="metric">
                  <span class="metric-label">Você vende</span>
                  <span class="metric-value base">R$ 1.500,00</span>
                </div>
                <div class="metric highlight">
                  <span class="metric-label">Você recebe à vista</span>
                  <span class="metric-value">R$ 1.614,60</span>
                </div>
                <div class="metric success">
                  <span class="metric-label">Lucro extra</span>
                  <span class="metric-value">+R$ 114,60</span>
                </div>
              </div>
            </div>

            <div class="pricing-details">
              <div class="pricing-header">
                <h3>Nossa Taxa</h3>
                <div class="rate-display">
                  <span class="main-rate">6,9%</span>
                  <span class="fixed-fee">+ R$ 1,99</span>
                </div>
                <p class="rate-desc">Só paga quando vender</p>
              </div>
              
              <div class="benefits-grid">
                <div class="benefit">Aprovação Imediata</div>
                <div class="benefit">Saque PIX em D0</div>
                <div class="benefit">Saque cartão em D2</div>
                <div class="benefit">Até 12x à vista</div>
                <div class="benefit">Pagamentos Globais</div>
                <div class="benefit">Recorrência</div>
              </div>
            </div>
          </div>
        </div>

        <div class="zero-fee-card">
          <h3>Tenha Taxa 0 na Plenna</h3>
          <p>Em outras plataformas, cerca de 20,8% do seu lucro desaparece em taxas. Na Plenna, você recupera esse valor e ainda ganha 10% a mais sobre o total da venda. Isso representa até 30% a mais no seu caixa, podendo zerar completamente a taxa da Plenna.</p>
        </div>

        <div class="section-actions">
          <a href="#quem-somos" class="btn-outline">Saiba mais</a>
          <a href="/register" class="btn-primary">Criar Conta</a>
        </div>
      </div>
    </section>

    <!-- Quem Somos Section -->
    <section id="quem-somos" class="about-section">
      <div class="container">
        <div class="section-header">
          <h1>Feita por quem viveu o mercado. Movida por quem quer transformá-lo.</h1>
        </div>
        
        <div class="about-content">
          <div class="company-story">
            <h3>A Plenna é um propósito</h3>
            <p>A Plenna nasceu do sonho de dois infoprodutores que queriam levar o poder do conhecimento para mais pessoas. No caminho, entenderam uma verdade que o mercado ignorava: o que limita o acesso à educação não é a vontade de aprender, é o poder de pagar.</p>
            <p>Hoje, somos um ecossistema global que conecta quem ensina e quem aprende, unindo tecnologia, propósito e liberdade financeira. Com pagamentos recorrentes e alcance mundial, a Plenna torna possível vender, receber e crescer em qualquer lugar.</p>
          </div>

          <div class="founders-grid">
            <div class="founder-card">
              <div class="founder-image">
                <img src="/src/assets/images/fundador-1.jpg" alt="João Gabriel Mansour" />
              </div>
              <div class="founder-info">
                <h4>João Gabriel Mansour</h4>
                <span class="founder-role">CEO e Fundador</span>
                <p>Mais de oito anos liderando equipes comerciais e estratégias de expansão com resultados consistentes e sustentáveis.</p>
              </div>
            </div>
            <div class="founder-card">
              <div class="founder-image">
                <img src="/src/assets/images/fundador-2.jpg" alt="João Pedro Duarte" />
              </div>
              <div class="founder-info">
                <h4>João Pedro Duarte</h4>
                <span class="founder-role">CTO e Fundador</span>
                <p>Especialista em growth e performance. Unindo dados, tecnologia e criatividade para impulsionar resultados no digital.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section-actions">
          <a href="#faq" class="btn-outline">Saiba mais</a>
          <a href="/register" class="btn-primary">Criar Conta</a>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="faq-section">
      <div class="container">
        <div class="section-header">
          <h1>Perguntas Frequentes</h1>
        </div>
        
        <div class="faq-container">
          <details class="faq-item" open>
            <summary>O que é a Plenna?</summary>
            <div class="faq-content">
              <p>A Plenna é um ecossistema completo que une pagamentos, checkout, cobrança, antecipação e área de membros em um único lugar.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary>Como funciona o sistema de pagamentos recorrentes?</summary>
            <div class="faq-content">
              <p>Você vende parcelado, o cliente paga mensalmente e a Plenna garante cada cobrança com automação e retentativas inteligentes.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary>Eu recebo à vista mesmo vendendo parcelado?</summary>
            <div class="faq-content">
              <p>Sim. Você pode optar por receber o valor total imediatamente, mantendo o fluxo de caixa previsível.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary>Quais formas de pagamento a Plenna aceita?</summary>
            <div class="faq-content">
              <p>Pix, boleto, cartão e pagamentos internacionais, todos compatíveis com modelo recorrente.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary>Como entro em contato com o suporte?</summary>
            <div class="faq-content">
              <p>Atendimento humano, de segunda a sexta, das 9h às 20h. Fale conosco por WhatsApp ou e-mail.</p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <!-- <footer class="footer">
      Plenna Tecnologia © 2025 - Todos os direitos reservados •
      <a href="#">Política de Privacidade</a> •
      <a href="#">Termos de Uso</a>
    </footer> -->
    </main>
  </div>
</template>

<script>
import LandingNavbar from '../components/LandingNavbar.vue'

export default {
  name: 'HomeView',
  components: {
    LandingNavbar
  },
  data() {
    return {
      currentSlide: 0,
      carouselImages: [
        { src: '/src/assets/images/1.png', alt: 'Dashboard Plenna 1' },
        { src: '/src/assets/images/2.png', alt: 'Dashboard Plenna 2' },
        { src: '/src/assets/images/3.png', alt: 'Dashboard Plenna 3' },
        { src: '/src/assets/images/4.png', alt: 'Dashboard Plenna 4' },
        { src: '/src/assets/images/5.png', alt: 'Dashboard Plenna 4' },
        { src: '/src/assets/images/6.png', alt: 'Dashboard Plenna 6' },
        { src: '/src/assets/images/7.png', alt: 'Dashboard Plenna 7' },
        { src: '/src/assets/images/8.png', alt: 'Dashboard Plenna 7' },
      ],
      carouselInterval: null
    }
  },
  computed: {
    duplicatedImages() {
      return [...this.carouselImages, ...this.carouselImages, ...this.carouselImages]
    },
    totalSlides() {
      return this.duplicatedImages.length
    }
  },
  mounted() {
    this.startCarousel()
  },
  beforeUnmount() {
    this.stopCarousel()
  },
  methods: {
    startCarousel() {
      this.currentSlide = this.carouselImages.length
      this.carouselInterval = setInterval(() => {
        this.nextSlide()
      }, 3000)
    },
    stopCarousel() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval)
      }
    },
    nextSlide() {
      this.currentSlide++
      if (this.currentSlide >= this.carouselImages.length * 2) {
        this.currentSlide = this.carouselImages.length
      }
    },
    isCenterSlide(index) {
      return index === this.currentSlide
    }
  }
}
</script>

<style scoped>
/* Plenna Home Styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;600;700;800&display=swap');



.home {
  font-family: 'Inter', 'Montserrat', system-ui, sans-serif;
  color: #ffffff;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}



.home::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 212, 170, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(0, 212, 170, 0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.home::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23ffffff" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
  z-index: 1;
}



main {
  padding-top: 100px;
  position: relative;
  z-index: 1;
}

@media (min-width: 768px) {
  main {
    padding-top: 140px;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 4rem;
  width: 100%;
  box-sizing: border-box;
}

.container {
  padding: 0 1rem;
}

@media (min-width: 480px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 640px) {
  .container {
    padding: 0 2rem;
  }
}

@media (min-width: 768px) {
  .container {
    padding: 0 3rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 4rem;
  }
}

section {
  padding: 3rem 0;
  position: relative;
  z-index: 2;
}

@media (min-width: 480px) {
  section {
    padding: 4rem 0;
  }
}

@media (min-width: 768px) {
  section {
    padding: 6rem 0;
  }
}

@media (min-width: 1024px) {
  section {
    padding: 8rem 0;
  }
}



@media (max-width: 768px) {
  section {
    padding: 6rem 0;
  }
}

@media (max-width: 480px) {
  section {
    padding: 4rem 0;
  }
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 3rem;
    padding: 0 1rem;
  }
}

.section-header h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #00d4aa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.375rem);
  font-weight: 400;
  color: #a1a1aa;
  margin: 0 auto;
  max-width: 700px;
  line-height: 1.7;
  letter-spacing: 0.01em;
}

p {
  font-size: 1rem;
  color: #a1a1aa;
  line-height: 1.7;
  letter-spacing: 0.01em;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0 3rem 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
}

@media (min-width: 768px) {
  .hero-section {
    padding: 6rem 0 4rem 0;
    min-height: 80vh;
  }
}

@media (min-width: 1024px) {
  .hero-section {
    padding: 8rem 0 6rem 0;
    min-height: 85vh;
  }
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .hero-content {
    gap: 3rem;
    padding: 0;
  }
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: #ffffff;
  margin: 0;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  letter-spacing: 0.005em;
  margin: 0;
  max-width: 700px;
  margin: 0 auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  isolation: isolate;
}

@media (min-width: 480px) {
  .hero-actions {
    flex-direction: row;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 0 4rem 0;
    min-height: auto;
  }
  
  .hero-content {
    gap: 2.5rem;
    padding: 0 1rem;
  }
  
  .hero-text {
    gap: 1.25rem;
  }
}

@media (max-width: 640px) {
  .hero-actions {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  
  .hero-section {
    padding: 4rem 0 3rem 0;
  }
}

/* Full Width Hero Carousel */
.hero-carousel {
  width: 100vw;
  height: 400px;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%);
  border-top: 1px solid rgba(0, 212, 170, 0.2);
  border-bottom: 1px solid rgba(0, 212, 170, 0.2);
  display: flex;
  align-items: center;
}

@media (min-width: 480px) {
  .hero-carousel {
    height: 500px;
  }
}

@media (min-width: 768px) {
  .hero-carousel {
    height: 600px;
  }
}

@media (min-width: 1024px) {
  .hero-carousel {
    height: 700px;
  }
}

.spacer-section {
  padding: 2rem 0;
}

.carousel-track {
  display: flex;
  width: calc((280px * 18) + (5px * 17));
  height: 100%;
  transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
  padding: 20px 0;
  gap: 5px;
}

.carousel-slide {
  flex: 0 0 280px;
  height: 100%;
  position: relative;
  transform: scale(0.85);
  opacity: 0.7;
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide.center {
  transform: scale(0.9);
  opacity: 1;
  z-index: 2;
}

.carousel-slide img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  display: block;
  border-radius: 16px;
  filter: blur(0.5px) brightness(0.9) contrast(0.95) saturate(0.9);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.15);
  transform: perspective(800px) rotateX(15deg) rotateY(-5deg);
  transform-origin: bottom center;
}

@media (min-width: 480px) {
  .carousel-slide img {
    width: 350px;
    height: 350px;
    border-radius: 18px;
    transform: perspective(900px) rotateX(15deg) rotateY(-5deg);
  }
}

@media (min-width: 768px) {
  .carousel-slide img {
    width: 400px;
    height: 400px;
    border-radius: 20px;
    transform: perspective(1000px) rotateX(15deg) rotateY(-5deg);
  }
}

@media (min-width: 1024px) {
  .carousel-slide img {
    width: 450px;
    height: 450px;
    border-radius: 24px;
    transform: perspective(1100px) rotateX(15deg) rotateY(-5deg);
  }
}

.carousel-slide.center img {
  filter: blur(0px) brightness(1.05) contrast(1.05) saturate(1.05);
  box-shadow: 
    0 25px 50px rgba(0, 212, 170, 0.4), 
    0 0 0 2px rgba(0, 212, 170, 0.3),
    0 5px 15px rgba(0, 0, 0, 0.2);
  transform: perspective(1200px) rotateX(12deg) rotateY(-3deg);
}



.section-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  flex-direction: column;
  align-items: center;
  padding: 0;
  isolation: isolate;
}

@media (min-width: 480px) {
  .section-actions {
    flex-direction: row;
    gap: 2rem;
    margin-top: 4rem;
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .section-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
  }
}

.btn-primary {
  color: #ffffff;
  font-weight: 500;
  text-decoration: none;
  padding: 0.875rem 1.5rem;
  border-radius: 50px;
  background: linear-gradient(135deg, #00d4aa 0%, #667eea 100%);
  box-shadow: 0 4px 20px rgba(0, 212, 170, 0.2);
  transition: all 0.3s ease;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  width: 100%;
  max-width: 280px;
  border: none;
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

@media (min-width: 480px) {
  .btn-primary {
    width: auto;
    min-width: 180px;
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 212, 170, 0.3);
}

@media (max-width: 640px) {
  .btn-primary {
    width: 100%;
    max-width: 280px;
    padding: 1rem 2rem;
  }
}



.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}



.btn-outline {
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  padding: 0.875rem 1.5rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  width: 100%;
  max-width: 280px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

@media (min-width: 480px) {
  .btn-outline {
    width: auto;
    min-width: 180px;
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

.btn-outline:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 212, 170, 0.4);
  background: rgba(0, 212, 170, 0.1);
  box-shadow: 0 8px 30px rgba(0, 212, 170, 0.15);
}

@media (max-width: 640px) {
  .btn-outline {
    width: 100%;
    max-width: 280px;
    padding: 1rem 2rem;
  }
}



.btn-outline:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 212, 170, 0.5);
}





/* Products Section */
.products-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  padding: 0;
}

@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.product-card {
  background: rgba(255, 255, 255, 0.03);
  color: var(--pl-white);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (min-width: 768px) {
  .product-card {
    padding: 2rem;
    border-radius: 24px;
  }
}

@media (min-width: 1024px) {
  .product-card {
    padding: 2.5rem;
  }
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 212, 170, 0.3);
  background: rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .product-card {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .product-card {
    padding: 1.5rem;
  }
}





.product-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  line-height: 1.4;
}

.product-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  flex-grow: 1;
  font-size: 0.9rem;
  font-weight: 400;
}

/* Pricing Section */
.pricing-showcase {
  margin-bottom: 4rem;
  padding: 0 1rem;
}

.pricing-comparison {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  max-width: 1000px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .pricing-comparison {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

@media (max-width: 960px) {
  .pricing-comparison {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.offer-summary,
.pricing-details {
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%);
  border: 1px solid rgba(0, 212, 170, 0.2);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.offer-header,
.pricing-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.offer-header h3,
.pricing-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.offer-header p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

.offer-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.metric.highlight {
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(102, 126, 234, 0.2) 100%);
  border-color: rgba(0, 212, 170, 0.3);
}

.metric.success {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%);
  border-color: rgba(34, 197, 94, 0.3);
}

.metric-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
}

.metric-value.base {
  color: rgba(255, 255, 255, 0.9);
}

.rate-display {
  text-align: center;
  margin: 1.5rem 0;
}

.main-rate {
  font-size: 3rem;
  font-weight: 800;
  color: #00d4aa;
  display: block;
  line-height: 1;
}

.fixed-fee {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.rate-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

@media (min-width: 480px) {
  .benefits-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

.benefit {
  background: rgba(0, 212, 170, 0.1);
  border: 1px solid rgba(0, 212, 170, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #ffffff;
  font-weight: 500;
  text-align: center;
}

@media (max-width: 768px) {
  .pricing-card {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .pricing-card {
    padding: 1.5rem;
  }
}

.pricing-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.offer-data h3 {
  text-align: left;
}

.pricing-desc {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.pricing-kpi {
  text-align: center;
  margin: 3rem 0;
}

.rate {
  font-size: 2.125rem;
  font-weight: 800;
  display: block;
}

.fee {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.8;
}

.pricing-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pricing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  padding: 2rem;
}

.pricing-item .label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.pricing-item .value {
  font-weight: 700;
  font-size: 1rem;
}

.pricing-item .value.highlight {
  color: #00d4aa;
}

.pricing-item .value.success {
  color: #22c55e;
}

.features-list {
  display: grid;
  gap: 1rem;
  margin-top: 3rem;
}

.feature {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  padding: 2rem;
  font-size: 0.9rem;
  color: #bfeeed;
}

.zero-fee-card {
  background: linear-gradient(135deg, #00d4aa 0%, #00a693 100%);
  color: #ffffff;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 10px 25px -5px rgba(0, 212, 170, 0.1), 0 10px 10px -5px rgba(0, 212, 170, 0.04);
  text-align: center;
  margin: 0 1rem;
}

@media (max-width: 768px) {
  .zero-fee-card {
    padding: 2rem;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .zero-fee-card {
    padding: 1.5rem;
  }
}

.zero-fee-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.zero-fee-card p {
  color: #ffffff;
  opacity: 0.9;
  line-height: 1.6;
}

/* About Section */
.about-content {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: start;
  padding: 0;
}

@media (min-width: 1024px) {
  .about-content {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 3rem;
  }
}

@media (max-width: 1020px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0;
  }
}

.company-story {
  background: linear-gradient(135deg, #00d4aa 0%, #00a693 100%);
  border-radius: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 212, 170, 0.1), 0 10px 10px -5px rgba(0, 212, 170, 0.04);
  padding: 3rem;
}

@media (max-width: 768px) {
  .company-story {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .company-story {
    padding: 1.5rem;
  }
}

.company-story h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #ffffff;
}

.company-story p {
  color: #ffffff;
  line-height: 1.7;
  margin-bottom: 3rem;
}

.company-story p:last-child {
  margin-bottom: 0;
}

.founders-grid {
  display: grid;
  gap: 1.5rem;
}

.founder-card {
  background: linear-gradient(135deg, #00d4aa 0%, #00a693 100%);
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(0, 212, 170, 0.1), 0 10px 10px -5px rgba(0, 212, 170, 0.04);
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  text-align: center;
}

@media (min-width: 480px) {
  .founder-card {
    grid-template-columns: 100px 1fr;
    gap: 1.5rem;
    text-align: left;
    padding: 2rem;
    border-radius: 24px;
  }
}

@media (min-width: 768px) {
  .founder-card {
    grid-template-columns: 120px 1fr;
  }
}

@media (max-width: 768px) {
  .founder-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .founder-card {
    padding: 1rem;
  }
}

@media (max-width: 640px) {
  .founder-card {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
  }
}

.founder-image {
  display: flex;
  justify-content: center;
}

.founder-image img {
  border-radius: 1rem;
  width: 100%;
  height: auto;
  max-width: 120px;
  aspect-ratio: 1;
  object-fit: cover;
}

.founder-info h4 {
  font-weight: 700;
  font-size: 1.125rem;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.founder-role {
  font-size: 0.875rem;
  color: #00d4aa;
  font-weight: 600;
  display: block;
  margin-bottom: 2rem;
}

.founder-info p {
  color: #ffffff;
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.9;
}

/* FAQ Section */
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  padding: 0;
}

.faq-item {
  background: linear-gradient(135deg, #00d4aa 0%, #00a693 100%);
  border-radius: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 212, 170, 0.1), 0 10px 10px -5px rgba(0, 212, 170, 0.04);
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -10px rgba(0, 212, 170, 0.2);
}

.faq-item summary {
  list-style: none;
  cursor: pointer;
  outline: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .faq-item summary {
    font-size: 1.125rem;
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .faq-item summary {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .faq-item summary {
    padding: 1rem;
  }
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  font-weight: 300;
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .faq-item summary::after {
    right: 1.5rem;
  }
}

@media (max-width: 480px) {
  .faq-item summary::after {
    right: 1rem;
  }
}

.faq-item[open] summary::after {
  transform: translateY(-50%) rotate(45deg);
}

.faq-item summary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.faq-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

@media (min-width: 768px) {
  .faq-content {
    padding: 0 2rem 2rem 2rem;
  }
}

@media (max-width: 768px) {
  .faq-content {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .faq-content {
    padding: 0 1rem 1rem 1rem;
  }
}

.faq-content p {
  color: #ffffff;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0;
}

/* Footer */
.footer {
  margin-top: 4rem;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #00d4aa 0%, #00a693 100%);
  color: #000000;
  text-align: center;
  box-shadow: 0 -8px 24px rgba(0, 255, 195, 0.18);
  font-size: 0.8rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .footer {
    margin-top: 6rem;
    padding: 3rem 2rem;
    font-size: 0.9rem;
  }
}

@media (min-width: 1024px) {
  .footer {
    margin-top: 8rem;
    padding: 4rem 3rem;
  }
}

@media (max-width: 640px) {
  .footer {
    padding: 3rem 2rem;
    font-size: 0.8rem;
  }
}

.footer a {
  color: #000000;
  text-decoration: none;
  font-weight: 700;
  transition: opacity 0.3s ease;
}

.footer a:hover {
  opacity: 0.8;
  text-decoration: underline;
}



/* Floating animation for elements */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Scroll behavior */
:target {
  scroll-margin-top: 120px;
}

/* Utility classes */
.text-center {
  text-align: center;
}

/* Section responsive padding */
@media (max-width: 1024px) {
  section {
    padding: 6rem 0;
  }
}

@media (max-width: 768px) {
  section {
    padding: 4rem 0;
  }
}

@media (max-width: 480px) {
  section {
    padding: 3rem 0;
  }
  
  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-header h1 {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
  }
  
  .section-subtitle {
    font-size: 0.95rem;
  }
}

@media (max-width: 360px) {
  .container {
    padding: 0 2rem;
  }
  
  .product-card,
  .pricing-card,
  .company-story,
  .founder-card,
  .zero-fee-card {
    padding: 3rem;
  }
}
</style>