-- Queries para adicionar adquirentes no banco de dados

-- 1. Asaas
INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
VALUES (
  'asaas', 
  'Asaas', 
  true, 
  '{"apiKey": "your_asaas_api_key_here", "environment": "production", "webhookUrl": "/webhook/asaas"}',
  NOW(),
  NOW()
);

-- 2. Pagar.me
INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
VALUES (
  'pagarme', 
  'Pagar.me', 
  true, 
  '{"apiKey": "your_pagarme_api_key_here", "environment": "production", "webhookUrl": "/webhook/pagarme"}',
  NOW(),
  NOW()
);

-- 3. Verificar adquirentes inseridos
SELECT * FROM adquirentes WHERE referencia IN ('asaas', 'pagarme');

-- 4. Atualizar configurações específicas (opcional)
-- Para Asaas com chave real
UPDATE adquirentes 
SET config = '{"apiKey": "your_real_asaas_api_key", "environment": "production", "webhookUrl": "/webhook/asaas"}'
WHERE referencia = 'asaas';

-- Para Pagar.me com chave real
UPDATE adquirentes 
SET config = '{"apiKey": "sk_703a953904444d4894b229b682cd75b2", "environment": "production", "webhookUrl": "/webhook/pagarme"}'
WHERE referencia = 'pagarme';

-- 5. Desativar outros adquirentes (opcional)
UPDATE adquirentes SET status = false WHERE referencia NOT IN ('asaas', 'pagarme');

-- 6. Ativar apenas um adquirente específico (opcional)
UPDATE adquirentes SET status = false;
UPDATE adquirentes SET status = true WHERE referencia = 'pagarme';