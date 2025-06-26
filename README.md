# 📋 Corelab Task Manager

Um sistema moderno e intuitivo de gerenciamento de tarefas desenvolvido com Next.js, React e MongoDB. Projetado para produtividade máxima com interface elegante, filtros inteligentes e visualizações analíticas.

## ✨ Funcionalidades

### 🔧 Core Features

- **Gestão Completa de Tarefas**: Criar, editar, concluir e excluir tarefas
- **Sistema de Favoritos**: Marque tarefas importantes para acesso rápido
- **Categorização por Cores**: Organize tarefas visualmente com cores personalizáveis
- **Busca Inteligente**: Encontre tarefas rapidamente por título ou conteúdo
- **Filtros Avançados**: Filtre por status, favoritas e cores
- **Interface Responsiva**: Experiência otimizada para desktop e mobile

### 📊 Analytics & Insights

- **Dashboard Interativo**: Visão geral das tarefas com métricas em tempo real
- **Gráficos Dinâmicos**:
  - Distribuição por status (concluídas vs pendentes)
  - Análise por cores/categorias
  - Tendências temporais
  - Métricas de produtividade
- **Visualização em Modal**: Gráficos exibidos em overlay elegante com animações

### 🛡️ Segurança

- **Rate Limiting**: Proteção contra ataques de força bruta
- **Sanitização de Entrada**: Validação e limpeza de dados do usuário
- **Headers de Segurança**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Validação Rigorosa**: Verificação de formatos e tipos de dados
- **Proteção CSRF**: Implementação de tokens anti-CSRF

## 🚀 Tecnologias Utilizadas

### Frontend

- **Framework**: Next.js 15.3.3
- **React**: 19.0.0
- **Styling**: Tailwind CSS 4
- **Animações**: Framer Motion 12.18.1
- **Ícones**: Lucide React 0.514.0
- **HTTP Client**: Axios 1.7.9

### Backend

- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: MongoDB Atlas
- **ODM**: Mongoose 8.8.4

## 📋 Funcionalidades

### ✅ Funcionalidades Principais

- [x] Criar, ler, atualizar e deletar tarefas (CRUD)
- [x] Marcar tarefas como favoritas
- [x] Definir cores personalizadas para cada tarefa
- [x] Filtrar tarefas por favoritas e por cor
- [x] Buscar tarefas por título e descrição
- [x] Exibir favoritas no topo da lista
- [x] Interface responsiva e visualmente atraente
- [x] Animações suaves com Framer Motion

### 🎨 Interface

- Design moderno com tema escuro
- Sidebar navegável com ícones
- Cards de tarefas com indicadores visuais
- Filtros interativos
- Animações e transições suaves
- Layout responsivo (mobile-first)

### 🔧 Funcionalidades Adicionais

- Dashboard com estatísticas
- Página dedicada para favoritas
- Sistema de cores com 8 opções
- Contador de tarefas por categoria
- Busca em tempo real
- Ordenação flexível

## 🛠 Como Executar o Projeto

### Pré-requisitos

- Node.js ^16.15.0
- NPM ^8.5.5
- Conta no MongoDB Atlas

### 1. Clone o Repositório

\`\`\`bash
git clone <url-do-repositorio>
cd corelab-pessoal
\`\`\`

### 2. Instale as Dependências

\`\`\`bash
npm install
\`\`\`

#### 🚨 Resolução de Problemas Comuns

Se encontrar erros de dependências durante a instalação, siga estes passos:

**Problema**: Conflito de versões (ERESOLVE)
\`\`\`bash
# Solução 1: Limpar cache e reinstalar
npm cache clean --force
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install

# Solução 2: Se o problema persistir
npm install --legacy-peer-deps
\`\`\`

**Problema**: 'next' não é reconhecido como comando
- Isso geralmente é resolvido após uma instalação limpa das dependências
- Certifique-se de que o `npm install` foi concluído com sucesso

### 3. Configuração do Banco de Dados

Configure sua string de conexão do MongoDB no arquivo `.env.local`:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

Copie o arquivo `.env.example` para `.env.local` e substitua pelos seus dados do MongoDB Atlas ou use uma instância local.

### 4. Execute o Projeto

\`\`\`bash

# Modo de desenvolvimento

npm run dev

# Build para produção

npm run build

# Executar em produção

npm start
\`\`\`

### 5. Acesse a Aplicação

Abra seu navegador e acesse: \`http://localhost:3000\`

> **Nota**: Se a porta 3000 estiver em uso, o Next.js automaticamente usará a próxima porta disponível (ex: 3001, 3002). Verifique o terminal para confirmar a porta correta.

## 📁 Estrutura do Projeto

\`\`\`
corelab-pessoal/
├── app/ # App Router do Next.js
│ ├── api/ # API Routes
│ │ └── tasks/ # Endpoints de tarefas
│ ├── favorites/ # Página de favoritas
│ ├── help/ # Página de ajuda
│ ├── messages/ # Página de mensagens
│ ├── notifications/ # Página de notificações
│ ├── settings/ # Página de configurações
│ ├── tasks/ # Página de todas as tarefas
│ ├── globals.css # Estilos globais
│ ├── layout.js # Layout principal
│ └── page.js # Página inicial (dashboard)
├── components/ # Componentes React
│ ├── AddTaskForm.jsx # Formulário de nova tarefa
│ ├── TaskCard.jsx # Card individual de tarefa
│ ├── TaskFilters.jsx # Componente de filtros
│ ├── Header.jsx # Cabeçalho
│ └── Sidebar.jsx # Barra lateral
├── lib/ # Utilitários
│ └── mongodb.js # Configuração do MongoDB
├── models/ # Modelos do banco
│ └── Task.js # Modelo da tarefa
├── public/ # Arquivos estáticos
│ └── data/ # Dados estáticos
└── package.json # Dependências do projeto
\`\`\`

## 🎯 Funcionalidades da API

### Endpoints Disponíveis

#### GET /api/tasks

Busca todas as tarefas com suporte a filtros:

- \`?filter=favorites\` - Apenas favoritas
- \`?color=#6366f1\` - Por cor específica

#### POST /api/tasks

Cria uma nova tarefa:
\`\`\`json
{
"title": "Título da tarefa",
"description": "Descrição opcional",
"color": "#6366f1",
"isFavorite": false
}
\`\`\`

#### PUT /api/tasks/[id]

Atualiza uma tarefa existente

#### DELETE /api/tasks/[id]

Remove uma tarefa

## 🎨 Sistema de Cores

O sistema oferece 8 cores predefinidas para categorização:

- Azul (#6366f1)
- Rosa (#ec4899)
- Verde (#10b981)
- Amarelo (#f59e0b)
- Vermelho (#ef4444)
- Roxo (#8b5cf6)
- Ciano (#06b6d4)
- Lima (#84cc16)

## 📱 Responsividade

O projeto foi desenvolvido com abordagem mobile-first:

- Layout adaptável para todas as telas
- Sidebar colapsável em dispositivos móveis
- Grid responsivo para cards de tarefas
- Tipografia e espaçamentos escaláveis

## 🔄 Estados e Fluxos

### Estados das Tarefas

- **Pendente**: Tarefa criada e não concluída
- **Concluída**: Tarefa marcada como finalizada
- **Favorita**: Tarefa marcada como importante

### Fluxo de Dados

1. Frontend faz requisição para API
2. API se conecta ao MongoDB
3. Operação é realizada no banco
4. Resposta é enviada ao frontend
5. Interface é atualizada com os novos dados

## 🚀 Melhorias Futuras

- Autenticação e autorização de usuários
- Categorias personalizadas
- Datas de vencimento
- Notificações push
- Compartilhamento de tarefas
- Relatórios e analytics
- Integração com calendários
- Testes automatizados
- Docker containerization
- CI/CD pipeline

## 👥 Contribuição

Este projeto foi desenvolvido como parte do Corelab Challenge seguindo os requisitos especificados:

- ✅ CRUD completo de tarefas
- ✅ Sistema de favoritos
- ✅ Cores personalizáveis
- ✅ Filtros por favoritas e cor
- ✅ Favoritas exibidas no topo
- ✅ Interface responsiva
- ✅ API RESTful em Node.js
- ✅ Frontend em React
- ✅ Banco de dados MongoDB

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do Corelab Challenge.

## 🔒 Segurança

Este projeto implementa várias camadas de segurança:

### 🛡️ Medidas de Segurança Implementadas

- **Rate Limiting**: Limitação de 100 requests por 15 minutos por IP
- **Sanitização de Input**: Todos os dados de entrada são sanitizados
- **Validação de Dados**: Validação rigorosa de formatos e campos obrigatórios
- **Headers de Segurança**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Tratamento de Erros**: Mensagens genéricas para evitar vazamento de informações
- **Variáveis de Ambiente**: Dados sensíveis isolados em variáveis de ambiente
- **Validação MongoDB**: ObjectId e queries validadas

### 🔐 Configuração Segura para Produção

1. **Gere chaves seguras**:

```bash
# Para NEXTAUTH_SECRET
openssl rand -base64 32
```

2. **Configure variáveis de ambiente**:

```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
NEXTAUTH_SECRET=sua-chave-super-secreta-aqui
NODE_ENV=production
```

3. **Use HTTPS em produção**
4. **Configure CORS adequadamente**
5. **Implemente backup do banco de dados**

Para mais detalhes, consulte [SECURITY.md](./SECURITY.md)

---

**Desenvolvido com ❤️ para o Corelab Challenge**
