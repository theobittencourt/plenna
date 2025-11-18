# Integração com Asaas

## Configuração

1. **Variáveis de Ambiente (.env)**
```env
ASAAS_API_KEY=your_asaas_api_key_here
ASAAS_ENVIRONMENT=production
```

2. **Configurar no Banco de Dados**
```sql
INSERT INTO adquirentes (nome, referencia, status, config) VALUES 
('Asaas', 'asaas', true, '{"apiKey": "your_asaas_api_key_here"}');
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
  "email": "joao@email.com",
  "phone": "11999999999"
}
```

### Webhook do Asaas
- **URL:** `https://seudominio.com/webhook/asaas`
- **Eventos:** `PAYMENT_RECEIVED`

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

- [ ] Implementar boleto bancário
- [ ] Implementar cartão de crédito
- [ ] Implementar split de pagamentos
- [ ] Implementar assinatura recorrente