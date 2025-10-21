-- Ativar usuário pelo email
UPDATE users SET ativo = true WHERE email = 'theo@theo.com.br';

-- Ou ativar todos os usuários
-- UPDATE users SET ativo = true;

-- Verificar status
SELECT id, name, email, ativo FROM users WHERE email = 'theo@theo.com.br';
