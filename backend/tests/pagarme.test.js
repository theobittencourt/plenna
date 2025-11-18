const axios = require('axios');
require('dotenv').config();

class PagarmeTest {
  constructor() {
    this.apiKey = process.env.PAGARME_API_KEY_PROD;
    this.baseUrl = 'https://api.pagar.me/core/v5';
    this.basicAuth = Buffer.from(`${this.apiKey}:`).toString('base64');
  }

  async createPixPayment() {
    console.log('🔧 Testando criação de PIX - Pagar.me');
    
    try {
      const response = await axios.post(`${this.baseUrl}/orders`, {
        amount: 1000,
        currency: 'BRL',
        items: [{
          amount: 1000,
          description: 'Teste PIX Plenna',
          quantity: 1
        }],
        customer: {
          name: 'João Silva',
          email: 'joao@teste.com',
          document: '11144477735',
          type: 'individual',
          phones: {
            mobile_phone: {
              country_code: '55',
              area_code: '11',
              number: '999999999'
            }
          }
        },
        payments: [{
          payment_method: 'pix',
          pix: {
            expires_in: 3600
          }
        }]
      }, {
        headers: {
          'Authorization': `Basic ${this.basicAuth}`,
          'Content-Type': 'application/json'
        }
      });

      const charge = response.data.charges[0];
      const pix = charge.last_transaction;

      console.log('✅ PIX criado com sucesso!');
      console.log(`   Order: ${response.data.id}`);
      console.log(`   Status: ${response.data.status}`);
      console.log(`   PIX Code: ${pix.qr_code || 'N/A'}`);
      console.log(`   Expires: ${pix.expires_at}`);

      return {
        success: true,
        orderId: response.data.id,
        pixCode: pix.qr_code,
        status: response.data.status
      };

    } catch (error) {
      console.log('❌ Erro:', error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data };
    }
  }

  async checkPaymentStatus(orderId) {
    console.log(`🔍 Consultando status do pedido: ${orderId}`);
    
    try {
      const response = await axios.get(`${this.baseUrl}/orders/${orderId}`, {
        headers: { 'Authorization': `Basic ${this.basicAuth}` }
      });

      console.log(`   Status: ${response.data.status}`);
      return { success: true, status: response.data.status };

    } catch (error) {
      console.log('❌ Erro na consulta:', error.response?.data?.message);
      return { success: false };
    }
  }

  async runTests() {
    console.log('🚀 Iniciando testes Pagar.me\n');
    
    // Teste 1: Criar PIX
    const pixResult = await this.createPixPayment();
    
    if (pixResult.success && pixResult.orderId) {
      // Teste 2: Consultar status
      await this.checkPaymentStatus(pixResult.orderId);
    }

    console.log('\n🎉 Testes concluídos!');
  }
}

// Executar testes
new PagarmeTest().runTests();