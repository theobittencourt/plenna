const axios = require('axios');
require('dotenv').config();

class AsaasTest {
  constructor() {
    this.apiKey = process.env.ASAAS_API_KEY;
    this.baseUrl = 'https://sandbox.asaas.com/api/v3'; // Sandbox para testes
  }

  async createPixPayment() {
    console.log('🔧 Testando criação de Boleto - Asaas (PIX não disponível no sandbox)');
    console.log('API Key:', this.apiKey ? this.apiKey.substring(0, 20) + '...' : 'Não encontrada');
    
    try {
      // Primeiro criar um customer
      const customerResponse = await axios.post(`${this.baseUrl}/customers`, {
        name: 'João Silva Teste',
        email: 'joao.teste@asaas.com',
        cpfCnpj: '11144477735'
      }, {
        headers: {
          'access_token': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      const customerId = customerResponse.data.id;
      console.log('Customer criado:', customerId);

      // Testar com boleto (PIX não disponível no sandbox)
      const response = await axios.post(`${this.baseUrl}/payments`, {
        customer: customerId,
        billingType: 'BOLETO',
        value: 10.00,
        description: 'Teste Boleto Plenna - Sandbox',
        externalReference: 'teste-plenna-' + Date.now(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }, {
        headers: {
          'access_token': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Boleto criado com sucesso!');
      console.log(`   Payment: ${response.data.id}`);
      console.log(`   Status: ${response.data.status}`);
      console.log(`   Boleto URL: ${response.data.bankSlipUrl || 'N/A'}`);
      console.log(`   Due Date: ${response.data.dueDate}`);

      return {
        success: true,
        paymentId: response.data.id,
        pixCode: response.data.pixTransaction?.qrCode?.payload,
        status: response.data.status
      };

    } catch (error) {
      console.log('❌ Erro:', error.response?.data?.errors?.[0]?.description || error.message);
      return { success: false, error: error.response?.data };
    }
  }

  async checkPaymentStatus(paymentId) {
    console.log(`🔍 Consultando status do pagamento: ${paymentId}`);
    
    try {
      const response = await axios.get(`${this.baseUrl}/payments/${paymentId}`, {
        headers: { 'access_token': this.apiKey }
      });

      console.log(`   Status: ${response.data.status}`);
      return { success: true, status: response.data.status };

    } catch (error) {
      console.log('❌ Erro na consulta:', error.response?.data?.errors?.[0]?.description);
      return { success: false };
    }
  }

  async runTests() {
    console.log('🚀 Iniciando testes Asaas\n');
    
    // Teste 1: Criar PIX
    const pixResult = await this.createPixPayment();
    
    if (pixResult.success && pixResult.paymentId) {
      // Teste 2: Consultar status
      await this.checkPaymentStatus(pixResult.paymentId);
    }

    console.log('\n🎉 Testes concluídos!');
  }
}

// Executar testes
new AsaasTest().runTests();