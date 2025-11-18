const axios = require('axios');

async function testIntegration() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testando integração Frontend-Backend\n');

  try {
    // Teste 1: PIX Pagar.me
    console.log('1. Testando PIX Pagar.me...');
    const pagarmeResponse = await axios.post(`${baseUrl}/test/pagarme/pix`, {
      value: 10.00,
      customerName: 'João Silva',
      customerEmail: 'joao@teste.com',
      customerDocument: '11144477735'
    });

    console.log('✅ Pagar.me:', pagarmeResponse.data.success ? 'Sucesso' : 'Falha');
    if (pagarmeResponse.data.pixCode) {
      console.log('   PIX Code:', pagarmeResponse.data.pixCode.substring(0, 50) + '...');
    }

    // Teste 2: Asaas
    console.log('\n2. Testando Asaas...');
    const asaasResponse = await axios.post(`${baseUrl}/test/asaas/payment`, {
      value: 10.00,
      description: 'Teste Asaas Frontend'
    });

    console.log('✅ Asaas:', asaasResponse.data.success ? 'Sucesso' : 'Falha');

    console.log('\n🎉 Integração funcionando!');

  } catch (error) {
    console.log('❌ Erro:', error.response?.data?.message || error.message);
  }
}

testIntegration();