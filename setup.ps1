# PowerShell script for Windows setup
Write-Host "🚀 Configurando o Corelab Task Manager..." -ForegroundColor Green

# Verificar se Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro." -ForegroundColor Red
    exit 1
}

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install

# Verificar se o arquivo .env.local existe
if (-not (Test-Path ".env.local")) {
    Write-Host "⚙️ Configurando variáveis de ambiente..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "📝 Arquivo .env.local criado. Configure suas variáveis de ambiente antes de prosseguir." -ForegroundColor Cyan
} else {
    Write-Host "✅ Arquivo .env.local já existe." -ForegroundColor Green
}

# Verificar se MongoDB está configurado
Write-Host "🔍 Verificando configuração do MongoDB..." -ForegroundColor Yellow
$envContent = Get-Content ".env.local" -Raw
if ($envContent -match "your_mongodb_connection_string") {
    Write-Host "⚠️ ATENÇÃO: Configure sua string de conexão do MongoDB no arquivo .env.local" -ForegroundColor Red
}

# Verificar se NEXTAUTH_SECRET está configurado
if ($envContent -match "generate-a-secure-random-string-here") {
    Write-Host "🔐 Gerando NEXTAUTH_SECRET..." -ForegroundColor Yellow
    try {
        $secret = [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
        $envContent = $envContent -replace "generate-a-secure-random-string-here", $secret
        Set-Content ".env.local" $envContent
        Write-Host "✅ NEXTAUTH_SECRET gerado automaticamente." -ForegroundColor Green
    } catch {
        Write-Host "⚠️ ATENÇÃO: Gere uma chave secreta para NEXTAUTH_SECRET no arquivo .env.local" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Setup concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure sua string de conexão do MongoDB em .env.local"
Write-Host "2. Execute 'npm run dev' para iniciar o servidor de desenvolvimento"
Write-Host "3. Acesse http://localhost:3000 no seu navegador"
Write-Host ""
Write-Host "📚 Documentação completa: README.md" -ForegroundColor Yellow
Write-Host "🔒 Informações de segurança: SECURITY.md" -ForegroundColor Yellow
Write-Host ""
