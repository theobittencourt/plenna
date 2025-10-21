-- Script para criar usuário ADMIN
-- Senha: theo123 (hash bcrypt com salt 10)

INSERT INTO users (
  name,
  email,
  password,
  username,
  user_id,
  cliente_id,
  permission,
  status,
  banido,
  saldo,
  total_transacoes,
  transacoes_aproved,
  transacoes_recused,
  valor_sacado,
  valor_saque_pendente,
  taxa_cash_in,
  taxa_cash_out,
  taxa_cash_in_fixa,
  taxa_cash_out_fixa,
  taxa_percentual,
  volume_transacional,
  valor_pago_taxa,
  gerente_aprovar,
  data_cadastro,
  created_at,
  updated_at
) VALUES (
  'Administrador',
  'admin@lucrapix.com',
  '$2b$10$YQ7qZ8K3xJ5X5Z5Z5Z5Z5uK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
  'admin',
  'USR' || EXTRACT(EPOCH FROM NOW())::BIGINT,
  'CLI' || EXTRACT(EPOCH FROM NOW())::BIGINT,
  'admin',
  true,
  false,
  0.00,
  0,
  0,
  0,
  0.00,
  0.00,
  0.00,
  0.00,
  0.00,
  0.00,
  5.00,
  0.00,
  0.00,
  false,
  NOW(),
  NOW(),
  NOW()
);

-- Criar chave API para o admin
INSERT INTO users_keys (
  user_id,
  token,
  secret,
  created_at,
  updated_at
)
SELECT 
  user_id,
  'ADM' || SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 32),
  'SEC' || SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 32),
  NOW(),
  NOW()
FROM users 
WHERE email = 'admin@lucrapix.com';

-- Exibir credenciais criadas
SELECT 
  u.name,
  u.email,
  u.username,
  u.permission,
  u.user_id,
  uk.token,
  uk.secret
FROM users u
LEFT JOIN users_keys uk ON u.user_id = uk.user_id
WHERE u.email = 'admin@lucrapix.com';
