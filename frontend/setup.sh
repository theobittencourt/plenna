#!/bin/bash

echo "🚀 Configurando Plenna Frontend..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 18+ primeiro."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se a instalação foi bem-sucedida
if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso!"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "🔧 Criando arquivo .env..."
    cat > .env << EOL
VITE_API_URL=http://localhost:3000/api
EOL
    echo "✅ Arquivo .env criado"
else
    echo "✅ Arquivo .env já existe"
fi

echo ""
echo "🎉 Plenna Frontend configurado com sucesso!"
echo ""
echo "Para executar o projeto:"
echo "  npm run dev"
echo ""
echo "Para build de produção:"
echo "  npm run build"
echo ""
echo "Acesse: http://localhost:5173"