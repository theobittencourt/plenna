# Plenna Frontend

Frontend moderno para o sistema Plenna desenvolvido com Vue 3, Tailwind CSS e design system baseado na paleta Plenna.

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript (Composition API)
- **Tailwind CSS** - Framework CSS utilitário
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento SPA
- **Axios** - Cliente HTTP
- **Heroicons** - Ícones SVG
- **Chart.js** - Gráficos e visualizações
- **Headless UI** - Componentes acessíveis

## 🎨 Design System

### Paleta de Cores (Baseada no Plenna)
- **Primary**: Tons de roxo/violeta (#a855f7 - #581c87)
- **Secondary**: Tons de cinza (#f8fafc - #0f172a)
- **Success**: Verde (#22c55e)
- **Warning**: Amarelo (#f59e0b)
- **Danger**: Vermelho (#ef4444)

### Componentes
- Cards com glassmorphism
- Botões com gradientes e animações
- Inputs com focus states modernos
- Modais com backdrop blur
- Status badges contextuais
- Navegação responsiva

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

### Estrutura de Pastas

```
src/
├── assets/          # Arquivos estáticos (CSS, imagens)
├── components/      # Componentes reutilizáveis
│   ├── BaseModal.vue
│   ├── NavBar.vue
│   ├── AppFooter.vue
│   └── StatusBadge.vue
├── router/          # Configuração de rotas
├── services/        # Serviços (API, utilitários)
├── stores/          # Stores Pinia
├── views/           # Páginas/Views
│   ├── auth/        # Páginas de autenticação
│   ├── DashboardView.vue
│   ├── DepositsView.vue
│   ├── WithdrawalsView.vue
│   ├── CheckoutsView.vue
│   └── ...
├── App.vue          # Componente raiz
└── main.js          # Ponto de entrada
```

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Login com email/senha
- [x] Registro de usuários
- [x] Proteção de rotas
- [x] Persistência de sessão
- [x] Logout automático

### ✅ Dashboard
- [x] Estatísticas em tempo real
- [x] Saldo disponível
- [x] Transações recentes
- [x] Ações rápidas
- [x] Gráficos de receita

### ✅ Depósitos
- [x] Criar novos depósitos
- [x] Múltiplos adquirentes
- [x] QR Code PIX
- [x] Histórico com filtros
- [x] Verificação de status

### ✅ Saques
- [x] Solicitar saques
- [x] Validação de saldo
- [x] Histórico de saques
- [x] Status em tempo real

### ✅ Checkouts
- [x] Criar páginas de vendas
- [x] Personalização visual
- [x] Order bumps
- [x] Depoimentos
- [x] Preview em tempo real

### ✅ Transações
- [x] Histórico completo
- [x] Filtros avançados
- [x] Exportação de dados
- [x] Detalhes da transação

### ✅ Perfil
- [x] Editar informações
- [x] Alterar senha
- [x] Configurações de conta
- [x] Chaves API

## 🎨 Componentes Principais

### NavBar
Navegação principal com:
- Logo e branding
- Menu responsivo
- Indicador de saldo
- Menu do usuário
- Notificações

### BaseModal
Modal reutilizável com:
- Backdrop blur
- Animações suaves
- Botões customizáveis
- Fechamento por ESC/click

### StatusBadge
Badge de status com:
- Cores contextuais
- Tipos específicos (payment, withdrawal)
- Textos traduzidos

### Cards
Cards modernos com:
- Glassmorphism effect
- Hover animations
- Shadow elevations
- Responsive design

## 🔄 Estados de Loading

- Skeleton loaders
- Spinners contextuais
- Estados vazios
- Feedback visual

## 📱 Responsividade

- Mobile-first approach
- Breakpoints Tailwind
- Menu mobile
- Touch-friendly
- Adaptive layouts

## 🚀 Performance

- Lazy loading de rotas
- Code splitting automático
- Otimização de imagens
- Minificação CSS/JS
- Tree shaking

## 🔒 Segurança

- Sanitização de inputs
- Validação client-side
- Tokens JWT seguros
- HTTPS enforcement
- CSP headers

## 🧪 Testes

```bash
# Executar testes unitários
npm run test

# Testes com coverage
npm run test:coverage

# Testes E2E
npm run test:e2e
```

## 📈 Monitoramento

- Error boundaries
- Performance metrics
- User analytics
- API monitoring

## 🚀 Deploy

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Desenvolvido por

Plenna Team - Sistema completo de pagamentos PIX

---

Para mais informações, consulte a [documentação completa](../README.md) do projeto.