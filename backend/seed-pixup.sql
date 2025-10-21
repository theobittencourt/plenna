-- Configurar adquirente Pixup
INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
VALUES (
  'pixup',
  'Pixup',
  true,
  '{
    "apiUrl": "https://api.pixup.com.br/v1",
    "apiKey": "YOUR_PIXUP_API_KEY_HERE",
    "webhookUrl": "https://yourdomain.com/webhook/pixup"
  }',
  NOW(),
  NOW()
) ON CONFLICT (referencia) DO UPDATE SET
  nome = EXCLUDED.nome,
  status = EXCLUDED.status,
  config = EXCLUDED.config,
  updated_at = NOW();

-- Configurar aplicação com valores padrão
INSERT INTO app (
  gateway_name,
  taxa_cash_in_padrao,
  taxa_cash_out_padrao,
  taxa_fixa_padrao,
  taxa_fixa_padrao_cash_out,
  deposito_minimo,
  saque_minimo,
  saques_automaticos,
  created_at,
  updated_at
) VALUES (
  'Plenna',
  4.00,
  4.00,
  5.00,
  5.00,
  10.00,
  20.00,
  false,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  gateway_name = EXCLUDED.gateway_name,
  taxa_cash_in_padrao = EXCLUDED.taxa_cash_in_padrao,
  taxa_cash_out_padrao = EXCLUDED.taxa_cash_out_padrao,
  deposito_minimo = EXCLUDED.deposito_minimo,
  saque_minimo = EXCLUDED.saque_minimo,
  updated_at = NOW();