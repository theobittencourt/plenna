# Integração com Pagar.me

## Configuração

1. **Variáveis de Ambiente (.env)**
```env
PAGARME_API_KEY=your_pagarme_api_key_here
PAGARME_ENVIRONMENT=production
```

2. **Configurar no Banco de Dados**
```sql
INSERT INTO adquirentes (nome, referencia, status, config) VALUES 
('Pagar.me', 'pagarme', true, '{"apiKey": "your_pagarme_api_key_here"}');
```

## Endpoints

### Criar Depósito PIX
```bash
POST /api/deposits
{
  "amount": 100.00,
  "description": "Depósito via PIX",
  "method_pay": "pix",
  "debtor_name": "João Silva",
  "debtor_document_number": "12345678901",
  "email": "joao@email.com"
}
```

### Webhook do Pagar.me
- **URL:** `https://seudominio.com/webhook/pagarme`
- **Eventos:** `order.paid`

### Criar Saque PIX
```bash
POST /api/withdrawals
{
  "value": 50.00,
  "pixKey": "usuario@email.com",
  "description": "Saque PIX"
}
```

## Funcionalidades Implementadas

- ✅ Criação de pagamentos PIX
- ✅ Consulta de status de pagamento
- ✅ Webhook para confirmação automática
- ✅ Transferências PIX (saques)
- ✅ Tratamento de erros

## Próximos Passos

- [ ] Implementar cartão de crédito
- [ ] Implementar boleto bancário
- [ ] Implementar split de pagamentos
- [ ] Implementar marketplace