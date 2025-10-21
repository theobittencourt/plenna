# Plenna - Sistema de Pagamentos PIX

Sistema completo de pagamentos PIX desenvolvido com NestJS, Prisma, PostgreSQL e Vue 3.

## 🚀 Tecnologias

### Backend
- **NestJS** - Framework Node.js
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação API
- **Cron Jobs** - Saques automáticos

### Frontend
- **Vue 3** - Framework JavaScript (Composition API)
- **Tailwind CSS** - Framework CSS utilitário
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento SPA
- **Axios** - Cliente HTTP
- **Heroicons** - Ícones SVG
- **Chart.js** - Gráficos e visualizações
- **Headless UI** - Componentes acessíveis

## 📦 Instalação

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### Frontend

```bash
cd frontend

# Instalação automática
chmod +x setup.sh
./setup.sh

# Ou instalação manual
npm install
npm run dev
```

**Acesse:** http://localhost:5173

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```env
DATABASE_URL="postgresql://lucrapix:4815162342@127.0.0.1:5432/lucrapix?schema=public"
JWT_SECRET=szWzG3VJD9sYESpIVqQGplUFIt2PKpEcg2EHlftj27ow58F8ROFiJUut6WjToTIu
JWT_EXPIRES_IN=7d
PORT=3000
```

## 📚 Funcionalidades

### ✅ Implementadas

- **Autenticação JWT** - Login e registro
- **Gestão de Usuários** - Perfil, saldo, permissões
- **Depósitos PIX** - Múltiplos adquirentes (Pixup, Cashtime, Mercado Pago)
- **Saques PIX** - Processamento manual e automático via cron
- **Checkouts** - Páginas de vendas personalizadas
- **Order Bumps** - Ofertas adicionais
- **Depoimentos** - Sistema de avaliações
- **Transações** - Histórico e relatórios
- **Dashboard** - Visão geral com estatísticas
- **API REST** - Documentação Swagger
- **Upload de Arquivos** - Via API
- **Dark Mode** - Tema escuro elegante

### 🎨 Design

**Paleta de Cores (Baseada no Plenna):**
- **Primary:** Tons de roxo/violeta (#a855f7 - #581c87)
- **Secondary:** Tons de cinza (#f8fafc - #0f172a)
- **Success:** Verde (#22c55e)
- **Warning:** Amarelo (#f59e0b)
- **Danger:** Vermelho (#ef4444)

**Características:**
- Interface moderna com glassmorphism
- Animações suaves e microinterações
- Design responsivo (mobile-first)
- Componentes reutilizáveis
- Tipografia Inter
- Gradientes e sombras elevadas

## 🔐 Adquirentes Suportados

- **Pixup** - Depósitos e saques
- **Cashtime** - Depósitos e saques
- **Mercado Pago** - Depósitos
- **EFI (Gerencianet)** - Depósitos
- **Pagarme** - Depósitos
- **XGate** - Depósitos
- **Witetec** - Depósitos

## 📡 Endpoints Principais

### Autenticação
- `POST /api/auth/register` - Registrar
- `POST /api/auth/login` - Login

### Usuários
- `GET /api/users/profile` - Perfil
- `GET /api/users/balance` - Saldo
- `PUT /api/users/profile` - Atualizar perfil

### Depósitos
- `POST /api/wallet/deposit/payment` - Criar depósito
- `POST /api/wallet/status` - Status do depósito
- `GET /api/wallet/deposits` - Listar depósitos

### Saques
- `POST /api/pixout` - Criar saque
- `GET /api/withdrawals` - Listar saques

### Checkouts
- `POST /api/checkout` - Criar checkout
- `GET /api/checkout/:id` - Obter checkout
- `PUT /api/checkout/:id` - Atualizar checkout
- `DELETE /api/checkout/:id` - Deletar checkout
- `POST /api/checkout/:id/order` - Criar pedido

### Transações
- `GET /api/transactions` - Listar transações
- `GET /api/transactions/stats` - Estatísticas

## 🔄 Cron Jobs

### Saques Automáticos
Executa a cada 5 minutos processando saques pendentes quando habilitado nas configurações.

```typescript
@Cron(CronExpression.EVERY_5_MINUTES)
async processAutomaticWithdrawals()
```

## 🗄️ Estrutura do Banco

### Principais Tabelas
- `users` - Usuários do sistema
- `users_keys` - Chaves API
- `app` - Configurações globais
- `checkout_build` - Checkouts
- `checkout_orders` - Pedidos
- `solicitacoes` - Depósitos
- `solicitacoes_cash_out` - Saques
- `transactions` - Transações
- `adquirentes` - Configurações dos gateways
- `nivels` - Níveis de comissão

## 🎯 Próximos Passos

- [ ] Implementar webhooks dos adquirentes
- [ ] Sistema de notificações
- [ ] Relatórios avançados
- [ ] Painel administrativo completo
- [ ] Sistema de afiliados
- [ ] Integração com mais gateways
- [ ] Testes automatizados
- [ ] Docker compose

## 📄 Licença

MIT

## 👨‍💻 Desenvolvido por

Plenna Team
