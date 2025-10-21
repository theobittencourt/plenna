# 🚀 Guia de Instalação - LucraPix

## Pré-requisitos

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## 📦 Instalação Completa

### 1. Backend (NestJS)

```bash
cd backend
npm install
```

### 2. Configurar Banco de Dados

Crie o banco PostgreSQL:

```sql
CREATE DATABASE lucrapix;
CREATE USER lucrapix WITH PASSWORD '4815162342';
GRANT ALL PRIVILEGES ON DATABASE lucrapix TO lucrapix;
```

### 3. Configurar Variáveis de Ambiente

Edite o arquivo `backend/.env` com suas configurações.

### 4. Executar Migrations

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

### 5. Seed Inicial (Opcional)

Crie um registro inicial na tabela `app`:

```sql
INSERT INTO app (id, gateway_name, taxa_cash_in_padrao, taxa_cash_out_padrao, taxa_fixa_padrao, taxa_fixa_padrao_cash_out, deposito_minimo, saque_minimo, saques_automaticos) 
VALUES (1, 'LucraPix', 4.00, 4.00, 5.00, 5.00, 10.00, 10.00, false);
```

Crie um adquirente padrão:

```sql
INSERT INTO adquirentes (referencia, nome, status, config) 
VALUES ('pixup', 'Pixup', true, '{"apiUrl": "https://api.pixup.com", "apiKey": "YOUR_KEY"}');
```

### 6. Iniciar Backend

```bash
cd backend
npm run start:dev
```

Backend rodando em: http://localhost:3000
Documentação API: http://localhost:3000/docs

### 7. Frontend (Vue 3)

```bash
cd frontend
npm install
npm run dev
```

Frontend rodando em: http://localhost:5173

## 🔧 Configuração dos Adquirentes

### Pixup

```json
{
  "apiUrl": "https://api.pixup.com",
  "apiKey": "sua_chave_api"
}
```

### Cashtime

```json
{
  "apiUrl": "https://api.cashtime.com.br",
  "apiKey": "sua_chave_api"
}
```

### Mercado Pago

```json
{
  "accessToken": "seu_access_token"
}
```

## 📝 Primeiro Acesso

1. Acesse http://localhost:5173
2. Clique em "Cadastrar"
3. Preencha os dados
4. Faça login
5. Acesse o dashboard

## 🔐 Usuário Admin

Para criar um usuário admin, após o registro, execute:

```sql
UPDATE users SET permission = 'admin' WHERE email = 'seu@email.com';
```

## ⚙️ Configurações Importantes

### Saques Automáticos

Para habilitar saques automáticos:

```sql
UPDATE app SET saques_automaticos = true WHERE id = 1;
```

### Limites

```sql
UPDATE app SET 
  deposito_minimo = 10.00,
  saque_minimo = 20.00,
  limite_saque_mensal = 50000.00,
  limite_saque_automatico = 5000.00
WHERE id = 1;
```

## 🐛 Troubleshooting

### Erro de conexão com banco

Verifique se o PostgreSQL está rodando:
```bash
sudo service postgresql status
```

### Erro no Prisma

Regenere o client:
```bash
npx prisma generate
```

### Porta em uso

Altere a porta no `.env`:
```env
PORT=3001
```

## 📚 Próximos Passos

1. Configure os webhooks dos adquirentes
2. Personalize o design no Tailwind
3. Configure SSL para produção
4. Configure backup automático do banco
5. Implemente monitoramento

## 🆘 Suporte

Para dúvidas ou problemas, consulte a documentação completa no README.md
