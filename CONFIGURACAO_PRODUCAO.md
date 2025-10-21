# 🔧 Configuração para Produção - Sistema Plenna

## ❗ **O QUE FALTA PARA FUNCIONAR**

Para que os pagamentos PIX funcionem em produção, você precisa obter as **chaves de API** dos adquirentes e configurar os **webhooks**.

---

## 🔑 **CHAVES API NECESSÁRIAS**

### **1. PIXUP** (Prioritário - Já integrado)
**Status:** ✅ Código pronto | ❌ Chave API necessária

### **2. CASHTIME** (Opcional)
**Status:** ✅ Código pronto | ❌ Chave API necessária

### **3. MERCADO PAGO** (Opcional)
**Status:** ✅ Código pronto | ❌ Chave API necessária

---

## 📋 **PERGUNTAS PARA OS ADQUIRENTES**

### **PIXUP - Perguntas Essenciais**

1. **Credenciais de API:**
   - Qual é a **API Key** de produção?
   - Qual é a **URL base** da API? (ex: https://api.pixup.com.br/v1)
   - Existe **API Key diferente** para sandbox/teste?

2. **Webhooks:**
   - Qual **URL de webhook** devo configurar no painel Pixup?
   - Quais **eventos** vocês enviam? (pagamento confirmado, cancelado, etc.)
   - Qual é o **formato do payload** do webhook?
   - Existe **assinatura/token** para validar webhooks?

3. **Limites e Taxas:**
   - Qual o **valor mínimo** para depósitos?
   - Qual o **valor máximo** por transação?
   - Qual a **taxa** cobrada por transação?
   - Existe **limite diário/mensal**?

4. **Documentação:**
   - Onde está a **documentação completa** da API?
   - Existe **Postman collection** ou **SDK**?
   - Como funciona o **ambiente de testes**?

### **CASHTIME - Perguntas Essenciais**

1. **Credenciais:**
   - API Key de produção?
   - URL base da API?
   - Credenciais de sandbox?

2. **Funcionalidades:**
   - Suporta **depósitos PIX**?
   - Suporta **saques PIX**?
   - Quais **tipos de chave PIX** aceita?

3. **Webhooks:**
   - URL de webhook necessária?
   - Formato do payload?
   - Como validar autenticidade?

### **MERCADO PAGO - Perguntas Essenciais**

1. **Credenciais:**
   - **Access Token** de produção?
   - **Public Key** necessária?
   - **Client ID** e **Client Secret**?

2. **PIX:**
   - Como criar **QR Code PIX**?
   - Suporta **saques PIX**?
   - Qual endpoint para consultar status?

---

## 🛠️ **COMO CONFIGURAR AS CHAVES**

### **Método 1: Via Banco de Dados**
```sql
-- Pixup
UPDATE adquirentes 
SET config = '{
  "apiUrl": "https://api.pixup.com.br/v1",
  "apiKey": "SUA_CHAVE_AQUI",
  "webhookUrl": "https://seudominio.com/webhook/pixup"
}'::jsonb
WHERE referencia = 'pixup';

-- Cashtime
INSERT INTO adquirentes (referencia, nome, status, config) VALUES (
  'cashtime',
  'Cashtime',
  true,
  '{
    "apiUrl": "https://api.cashtime.com.br",
    "apiKey": "SUA_CHAVE_AQUI",
    "webhookUrl": "https://seudominio.com/webhook/cashtime"
  }'::jsonb
);
```

### **Método 2: Via Variáveis de Ambiente**
```env
# .env
PIXUP_API_KEY=sua_chave_pixup_aqui
PIXUP_API_URL=https://api.pixup.com.br/v1
CASHTIME_API_KEY=sua_chave_cashtime_aqui
MERCADOPAGO_ACCESS_TOKEN=seu_token_mp_aqui
```

---

## 🌐 **CONFIGURAÇÃO DE WEBHOOKS**

### **URLs Necessárias:**
```
https://seudominio.com/webhook/pixup
https://seudominio.com/webhook/cashtime  
https://seudominio.com/webhook/mercadopago
```

### **Implementação (Já pronta):**
```typescript
// Webhook endpoints já criados no código
@Post('webhook/pixup')
async pixupWebhook(@Body() data: any) {
  // Processa webhook do Pixup
}
```

---

## 🔒 **SEGURANÇA EM PRODUÇÃO**

### **SSL/HTTPS Obrigatório**
- Certificado SSL válido
- Todas as URLs devem usar HTTPS
- Webhooks só funcionam com HTTPS

### **Validação de Webhooks**
- Verificar assinatura/token dos webhooks
- Validar IP de origem (se fornecido)
- Log de todas as transações

---

## 📞 **CONTATOS PARA SUPORTE**

### **PIXUP**
- Site: https://pixup.com.br
- Suporte: suporte@pixup.com.br
- Documentação: https://docs.pixup.com.br

### **CASHTIME**
- Site: https://cashtime.com.br
- Suporte: suporte@cashtime.com.br

### **MERCADO PAGO**
- Site: https://mercadopago.com.br
- Documentação: https://www.mercadopago.com.br/developers

---

## ⚡ **CHECKLIST PARA PRODUÇÃO**

- [ ] **Chaves API** obtidas e configuradas
- [ ] **Webhooks** configurados nos painéis
- [ ] **URLs HTTPS** funcionando
- [ ] **Testes** realizados em sandbox
- [ ] **Limites** e taxas configurados
- [ ] **Logs** de auditoria ativos
- [ ] **Backup** do banco configurado

---

## 🚀 **APÓS CONFIGURAÇÃO**

1. **Teste em sandbox** primeiro
2. **Faça um depósito pequeno** (R$ 10)
3. **Verifique se o webhook** chegou
4. **Teste um saque pequeno** (R$ 20)
5. **Monitore os logs** por 24h

**Sistema estará 100% operacional!** 🎉

---

*Precisa de ajuda? Entre em contato com a equipe de desenvolvimento.*