#!/bin/bash

# Script para configurar o repositório Git com segurança

echo "🔧 Configurando repositório Git..."

# Inicializar git se não existir
if [ ! -d ".git" ]; then
    git init
    echo "✅ Repositório Git inicializado"
fi

# Configurar gitignore
echo "📝 Verificando .gitignore..."
if [ ! -f ".gitignore" ]; then
    echo "❌ .gitignore não encontrado!"
    exit 1
fi

# Verificar se há arquivos sensíveis
echo "🔍 Verificando arquivos sensíveis..."
if [ -f ".env" ]; then
    echo "⚠️  ATENÇÃO: Arquivo .env encontrado! Será ignorado pelo git."
fi

if [ -f ".env.local" ]; then
    echo "⚠️  ATENÇÃO: Arquivo .env.local encontrado! Será ignorado pelo git."
fi

# Adicionar arquivos
echo "📁 Adicionando arquivos ao git..."
git add .

# Verificar se há arquivos sensíveis no stage
SENSITIVE_FILES=$(git diff --cached --name-only | grep -E "\.env$|\.env\..*|.*\.key$|.*\.pem$|secrets/")
if [ ! -z "$SENSITIVE_FILES" ]; then
    echo "❌ ERRO: Arquivos sensíveis encontrados no stage:"
    echo "$SENSITIVE_FILES"
    echo "🔒 Remova estes arquivos antes de continuar!"
    exit 1
fi

# Fazer commit inicial
git commit -m "feat: initial commit - Corelab Task Manager

✨ Features:
- Complete task management (CRUD)
- Task favoriting and color categorization
- Advanced filtering and search
- Interactive charts and analytics
- Responsive design with animations
- Modern dark theme UI

🔒 Security:
- API rate limiting
- Input sanitization and validation
- Security headers
- Environment variable protection

🛠 Tech Stack:
- Next.js 15.3.3 + React 19
- MongoDB with Mongoose
- Tailwind CSS + Framer Motion
- Recharts for analytics
- Docker support + CI/CD"

echo "✅ Commit inicial criado!"

# Instruções para GitHub
echo ""
echo "🚀 Para subir para o GitHub:"
echo "1. Crie um repositório no GitHub"
echo "2. Execute os comandos:"
echo "   git remote add origin https://github.com/seu-usuario/seu-repositorio.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "🔒 IMPORTANTE:"
echo "- Certifique-se de que o arquivo .env NÃO está no repositório"
echo "- Configure as variáveis de ambiente no GitHub Secrets para CI/CD"
echo "- Configure o MongoDB Atlas com credenciais seguras"
echo ""
echo "📋 Próximos passos:"
echo "- Configure o deployment (Vercel/Netlify)"
echo "- Configure monitoring e logs"
echo "- Implemente autenticação se necessário"
