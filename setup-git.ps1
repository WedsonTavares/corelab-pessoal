# Script PowerShell para configurar o repositório Git com segurança

Write-Host "🔧 Configurando repositório Git..." -ForegroundColor Cyan

# Verificar se git está instalado
try {
    git --version | Out-Null
} catch {
    Write-Host "❌ Git não está instalado! Instale o Git primeiro." -ForegroundColor Red
    exit 1
}

# Inicializar git se não existir
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Repositório Git inicializado" -ForegroundColor Green
}

# Verificar gitignore
if (-not (Test-Path ".gitignore")) {
    Write-Host "❌ .gitignore não encontrado!" -ForegroundColor Red
    exit 1
}

# Verificar arquivos sensíveis
Write-Host "🔍 Verificando arquivos sensíveis..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "⚠️  ATENÇÃO: Arquivo .env encontrado! Será ignorado pelo git." -ForegroundColor Yellow
}

if (Test-Path ".env.local") {
    Write-Host "⚠️  ATENÇÃO: Arquivo .env.local encontrado! Será ignorado pelo git." -ForegroundColor Yellow
}

# Verificar se há node_modules
if (Test-Path "node_modules") {
    Write-Host "📦 node_modules encontrado - será ignorado pelo git" -ForegroundColor Blue
}

# Adicionar arquivos
Write-Host "📁 Adicionando arquivos ao git..." -ForegroundColor Cyan
git add .

# Verificar status
Write-Host "📊 Status do repositório:" -ForegroundColor Cyan
git status --short

# Fazer commit inicial
Write-Host "💾 Criando commit inicial..." -ForegroundColor Cyan
$commitMessage = @"
feat: initial commit - Corelab Task Manager

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
- Docker support + CI/CD
"@

git commit -m $commitMessage

Write-Host "✅ Commit inicial criado!" -ForegroundColor Green

# Instruções
Write-Host ""
Write-Host "🚀 Para subir para o GitHub:" -ForegroundColor Cyan
Write-Host "1. Crie um repositório no GitHub" -ForegroundColor White
Write-Host "2. Execute os comandos:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/seu-usuario/seu-repositorio.git" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "🔒 IMPORTANTE:" -ForegroundColor Red
Write-Host "- Certifique-se de que o arquivo .env NÃO está no repositório" -ForegroundColor Yellow
Write-Host "- Configure as variáveis de ambiente no GitHub Secrets" -ForegroundColor Yellow
Write-Host "- Use MongoDB Atlas com credenciais seguras" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "- Configure o deployment (Vercel/Netlify)" -ForegroundColor White
Write-Host "- Configure monitoring e logs" -ForegroundColor White
Write-Host "- Implemente autenticação se necessário" -ForegroundColor White

Write-Host ""
Write-Host "🎉 Repositório pronto para o GitHub!" -ForegroundColor Green
