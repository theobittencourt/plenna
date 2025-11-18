-- Seed para todos os adquirentes implementados no projeto Plenna

-- Cashtime
-- INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
-- VALUES (
--   'cashtime',
--   'Cashtime',
--   true,
--   '{
--     "apiUrl": "https://api.cashtime.com.br/v1",
--     "apiKey": "YOUR_CASHTIME_API_KEY_HERE",
--     "webhookUrl": "https://yourdomain.com/webhook/cashtime"
--   }',
--   NOW(),
--   NOW()
-- ) ON CONFLICT (referencia) DO UPDATE SET
--   nome = EXCLUDED.nome,
--   status = EXCLUDED.status,
--   config = EXCLUDED.config,
--   updated_at = NOW();

-- Mercado Pago
-- INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
-- VALUES (
--   'mercadopago',
--   'Mercado Pago',
--   true,
--   '{
--     "accessToken": "YOUR_MERCADOPAGO_ACCESS_TOKEN_HERE",
--     "webhookUrl": "https://yourdomain.com/webhook/mercadopago"
--   }',
--   NOW(),
--   NOW()
-- ) ON CONFLICT (referencia) DO UPDATE SET
--   nome = EXCLUDED.nome,
--   status = EXCLUDED.status,
--   config = EXCLUDED.config,
--   updated_at = NOW();

-- Pagar.me
INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
VALUES (
  'pagarme',
  'Pagar.me',
  true,
  '{
    "apiKey": "YOUR_PAGARME_API_KEY_HERE",
    "webhookUrl": "https://yourdomain.com/webhook/pagarme"
  }',
  NOW(),
  NOW()
) ON CONFLICT (referencia) DO UPDATE SET
  nome = EXCLUDED.nome,
  status = EXCLUDED.status,
  config = EXCLUDED.config,
  updated_at = NOW();

-- Asaas
INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
VALUES (
  'asaas',
  'Asaas',
  true,
  '{
    "apiKey": "YOUR_ASAAS_API_KEY_HERE",
    "webhookUrl": "https://yourdomain.com/webhook/asaas"
  }',
  NOW(),
  NOW()
) ON CONFLICT (referencia) DO UPDATE SET
  nome = EXCLUDED.nome,
  status = EXCLUDED.status,
  config = EXCLUDED.config,
  updated_at = NOW();

-- Pixup
-- INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
-- VALUES (
--   'pixup',
--   'Pixup',
--   true,
--   '{
--     "apiUrl": "https://api.pixup.com.br/v1",
--     "apiKey": "YOUR_PIXUP_API_KEY_HERE",
--     "webhookUrl": "https://yourdomain.com/webhook/pixup"
--   }',
--   NOW(),
--   NOW()
-- ) ON CONFLICT (referencia) DO UPDATE SET
--   nome = EXCLUDED.nome,
--   status = EXCLUDED.status,
--   config = EXCLUDED.config,
--   updated_at = NOW();

-- EFI (Gerencianet)
-- INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
-- VALUES (
--   'efi',
--   'EFI (Gerencianet)',
--   false,
--   '{
--     "clientId": "YOUR_EFI_CLIENT_ID_HERE",
--     "clientSecret": "YOUR_EFI_CLIENT_SECRET_HERE",
--     "certificatePath": "/path/to/certificate.p12",
--     "sandbox": true,
--     "webhookUrl": "https://yourdomain.com/webhook/efi"
--   }',
--   NOW(),
--   NOW()
-- ) ON CONFLICT (referencia) DO UPDATE SET
--   nome = EXCLUDED.nome,
--   status = EXCLUDED.status,
--   config = EXCLUDED.config,
--   updated_at = NOW();

-- XGate
-- INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
-- VALUES (
--   'xgate',
--   'XGate',
--   false,
--   '{
--     "apiUrl": "https://api.xgate.com.br/v1",
--     "apiKey": "YOUR_XGATE_API_KEY_HERE",
--     "webhookUrl": "https://yourdomain.com/webhook/xgate"
--   }',
--   NOW(),
--   NOW()
-- ) ON CONFLICT (referencia) DO UPDATE SET
--   nome = EXCLUDED.nome,
--   status = EXCLUDED.status,
--   config = EXCLUDED.config,
--   updated_at = NOW();

-- Witetec
-- INSERT INTO adquirentes (referencia, nome, status, config, created_at, updated_at) 
-- VALUES (
--   'witetec',
--   'Witetec',
--   false,
--   '{
--     "apiUrl": "https://api.witetec.com.br/v1",
--     "apiKey": "YOUR_WITETEC_API_KEY_HERE",
--     "webhookUrl": "https://yourdomain.com/webhook/witetec"
--   }',
--   NOW(),
--   NOW()
-- ) ON CONFLICT (referencia) DO UPDATE SET
--   nome = EXCLUDED.nome,
--   status = EXCLUDED.status,
--   config = EXCLUDED.config,
--   updated_at = NOW();