# Testes de Integração - Adquirentes

Pasta organizada para testes de integração com os adquirentes de pagamento.

## Como usar

```bash
# Testar Pagar.me
node tests/pagarme.test.js

# Testar Asaas
node tests/asaas.test.js
```

## Estrutura

- `pagarme.test.js` - Testes para Pagar.me (PIX)
- `asaas.test.js` - Testes para Asaas (PIX)

## Configuração

Certifique-se de ter as chaves configuradas no `.env`:

```env
PAGARME_API_KEY_PROD=sk_test_...
ASAAS_API_KEY=$aact_...
```

## Status dos Testes

- ✅ **Pagar.me**: Integração funcionando (Basic Auth)
- 🔄 **Asaas**: Aguardando teste