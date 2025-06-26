#!/bin/bash

echo "🚀 Configurando o Corelab Task Manager..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se o arquivo .env.local existe
if [ ! -f .env.local ]; then
    echo "⚙️ Configurando variáveis de ambiente..."
    cp .env.example .env.local
    echo "📝 Arquivo .env.local criado. Configure suas variáveis de ambiente antes de prosseguir."
else
    echo "✅ Arquivo .env.local já existe."
fi

# Verificar se MongoDB está configurado
echo "🔍 Verificando configuração do MongoDB..."
if grep -q "your_mongodb_connection_string" .env.local; then
    echo "⚠️ ATENÇÃO: Configure sua string de conexão do MongoDB no arquivo .env.local"
fi

# Verificar se NEXTAUTH_SECRET está configurado
if grep -q "generate-a-secure-random-string-here" .env.local; then
    echo "🔐 Gerando NEXTAUTH_SECRET..."
    if command -v openssl &> /dev/null; then
        SECRET=$(openssl rand -base64 32)
        sed -i "s/generate-a-secure-random-string-here/$SECRET/" .env.local
        echo "✅ NEXTAUTH_SECRET gerado automaticamente."
    else
        echo "⚠️ ATENÇÃO: Gere uma chave secreta para NEXTAUTH_SECRET no arquivo .env.local"
    fi
fi

echo ""
echo "🎉 Setup concluído!"
echo ""
echo "📝 Próximos passos:"
echo "1. Configure sua string de conexão do MongoDB em .env.local"
echo "2. Execute 'npm run dev' para iniciar o servidor de desenvolvimento"
echo "3. Acesse http://localhost:3000 no seu navegador"
echo ""
echo "📚 Documentação completa: README.md"
echo "🔒 Informações de segurança: SECURITY.md"
echo ""
