# 📞 Script de Perguntas para Adquirentes

## 🎯 **ROTEIRO DE CONTATO**

### **Apresentação Inicial**
> "Olá, sou [SEU NOME] da empresa [SUA EMPRESA]. Desenvolvemos um sistema de pagamentos PIX e gostaríamos de integrar com vocês. Podem me ajudar com algumas informações técnicas?"

---

## 🔑 **PIXUP - Perguntas Prioritárias**

### **1. Credenciais e Acesso**
- [ ] "Qual é o processo para obter as credenciais de API de produção?"
- [ ] "Vocês fornecem API Key ou é Client ID + Secret?"
- [ ] "Qual é a URL base da API de produção?"
- [ ] "Existe ambiente de sandbox para testes? Qual a URL?"
- [ ] "As credenciais de sandbox são diferentes das de produção?"

### **2. Funcionalidades PIX**
- [ ] "Vocês suportam criação de QR Code PIX via API?"
- [ ] "Suportam saques PIX (cash-out) via API?"
- [ ] "Quais tipos de chave PIX vocês aceitam? (CPF, email, telefone, aleatória)"
- [ ] "Existe limite mínimo e máximo por transação?"

### **3. Webhooks e Notificações**
- [ ] "Como funciona o sistema de webhooks de vocês?"
- [ ] "Quais eventos vocês enviam? (pagamento confirmado, cancelado, expirado)"
- [ ] "Qual é o formato do payload do webhook? Podem enviar um exemplo?"
- [ ] "Como validamos a autenticidade do webhook? Existe assinatura?"
- [ ] "Quantas tentativas de reenvio fazem se nosso webhook falhar?"

### **4. Taxas e Limites**
- [ ] "Qual é a taxa cobrada por transação PIX?"
- [ ] "Existe taxa fixa + percentual ou só percentual?"
- [ ] "Qual o prazo para recebimento dos valores?"
- [ ] "Existe limite diário ou mensal de transações?"

### **5. Documentação e Suporte**
- [ ] "Onde posso acessar a documentação completa da API?"
- [ ] "Vocês têm Postman Collection ou SDK disponível?"
- [ ] "Qual é o canal de suporte técnico para desenvolvedores?"
- [ ] "Existe SLA de resposta para suporte?"

---

## 💰 **CASHTIME - Perguntas Específicas**

### **Funcionalidades**
- [ ] "Vocês suportam tanto depósitos quanto saques PIX?"
- [ ] "Como funciona o processo de KYC para saques?"
- [ ] "Existe diferença de taxa entre depósito e saque?"

### **Integração**
- [ ] "A API é RESTful? Usam JSON?"
- [ ] "Existe rate limiting? Quantas requests por minuto?"
- [ ] "Como funciona a autenticação? Bearer token?"

---

## 🛒 **MERCADO PAGO - Perguntas Específicas**

### **PIX no Mercado Pago**
- [ ] "Como criar pagamentos PIX via API?"
- [ ] "Vocês suportam saques PIX ou só recebimentos?"
- [ ] "Qual é a diferença entre Access Token e Public Key?"
- [ ] "Existe SDK oficial para Node.js?"

### **Webhooks**
- [ ] "Como configurar webhooks no painel do Mercado Pago?"
- [ ] "Qual é a estrutura do payload para eventos PIX?"
- [ ] "Como validar a assinatura dos webhooks?"

---

## 📋 **TEMPLATE DE EMAIL**

```
Assunto: Integração API PIX - [SUA EMPRESA]

Prezados,

Somos a [SUA EMPRESA] e desenvolvemos um sistema de pagamentos PIX. 
Gostaríamos de integrar com a API de vocês.

Poderiam nos ajudar com as seguintes informações:

1. CREDENCIAIS:
   - Como obter API Key de produção?
   - URL base da API?
   - Existe ambiente de testes?

2. FUNCIONALIDADES:
   - Suportam criação de QR Code PIX?
   - Suportam saques PIX?
   - Quais tipos de chave PIX aceitam?

3. WEBHOOKS:
   - Como configurar webhooks?
   - Quais eventos são enviados?
   - Como validar autenticidade?

4. DOCUMENTAÇÃO:
   - Onde acessar docs da API?
   - Existe Postman Collection?

Aguardo retorno para darmos início à integração.

Atenciosamente,
[SEU NOME]
[SEU TELEFONE]
[SEU EMAIL]
```

---

## 📞 **CONTATOS DIRETOS**

### **PIXUP**
- **Site:** https://pixup.com.br
- **Email:** suporte@pixup.com.br
- **Telefone:** Verificar no site
- **WhatsApp:** Verificar no site

### **CASHTIME**
- **Site:** https://cashtime.com.br
- **Email:** suporte@cashtime.com.br
- **Telefone:** Verificar no site

### **MERCADO PAGO**
- **Site:** https://mercadopago.com.br/developers
- **Suporte:** https://www.mercadopago.com.br/ajuda
- **Documentação:** https://www.mercadopago.com.br/developers/pt/docs

---

## ✅ **CHECKLIST PÓS-CONTATO**

Após cada conversa, anote:

- [ ] **Nome do contato** e cargo
- [ ] **Prazo** para fornecimento das credenciais
- [ ] **Documentação** recebida
- [ ] **Próximos passos** definidos
- [ ] **Taxa negociada** (se aplicável)
- [ ] **Limitações** identificadas

---

## 🚨 **INFORMAÇÕES IMPORTANTES**

### **Para Todos os Adquirentes:**
- Mencione que o sistema já está **desenvolvido e testado**
- Enfatize que só precisam das **credenciais para ativar**
- Destaque que têm **experiência com APIs de pagamento**
- Pergunte sobre **período de homologação** se necessário

### **Documentos que Podem Solicitar:**
- CNPJ da empresa
- Contrato social
- Comprovante de endereço
- Faturamento estimado
- Descrição do negócio

---

**Boa sorte nas negociações!** 🚀