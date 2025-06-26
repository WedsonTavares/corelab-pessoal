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

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18.17+ ou superior
- MongoDB (Atlas recomendado para produção)
- Git

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/corelab-task-manager.git
   cd corelab-task-manager
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env.local
   ```

   Edite `.env.local` com suas configurações:

   ```env
   MONGODB_URI=sua_string_de_conexao_mongodb
   NEXTAUTH_SECRET=sua_chave_secreta_aqui
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Arquitetura

### Stack Tecnológica

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Banco de Dados**: MongoDB com Mongoose ODM
- **Visualização**: Chart.js com React Chart.js 2
- **Estilização**: Tailwind CSS com design responsivo
- **Ícones**: Lucide React

### Estrutura do Projeto

```
corelab-task-manager/
├── app/                          # App Router (Next.js 13+)
│   ├── api/                     # API Routes
│   │   └── tasks/               # Endpoints de tarefas
│   ├── overview/                # Página de dashboard
│   ├── tasks/                   # Página de tarefas
│   ├── globals.css              # Estilos globais
│   ├── layout.js                # Layout principal
│   └── page.js                  # Página inicial
├── components/                   # Componentes React
│   ├── charts/                  # Componentes de gráficos
│   ├── forms/                   # Formulários
│   ├── layout/                  # Layout components
│   └── ui/                      # Componentes de UI
├── lib/                         # Bibliotecas e utilitários
│   ├── mongodb.js               # Conexão com MongoDB
│   ├── rateLimit.js             # Rate limiting
│   └── utils.js                 # Funções utilitárias
├── models/                      # Schemas do MongoDB
│   └── Task.js                  # Modelo de tarefa
├── public/                      # Arquivos estáticos
└── docs/                        # Documentação
```

### Modelo de Dados

```javascript
// Task Schema
{
  title: String,        // Título da tarefa
  description: String,  // Descrição detalhada
  completed: Boolean,   // Status de conclusão
  isFavorite: Boolean,  // Marcação como favorita
  color: String,        // Cor da categoria (#hexcode)
  createdAt: Date,      // Data de criação
  updatedAt: Date       // Data de atualização
}
```

## 🎯 Decisões Técnicas

### Por que Next.js?

- **Full-Stack**: API Routes eliminam necessidade de backend separado
- **Performance**: SSR/SSG para carregamento otimizado
- **Developer Experience**: Hot reload, TypeScript integrado, tooling moderno
- **Ecosystem**: Grande comunidade e bibliotecas disponíveis

### Por que MongoDB?

- **Flexibilidade**: Schema flexível para evolução de features
- **Escalabilidade**: Escala horizontalmente com facilidade
- **Developer Experience**: API intuitiva com Mongoose
- **Cloud Ready**: MongoDB Atlas simplifica deploy

### Gestão de Estado

- **Local State**: React hooks para estado de componentes
- **Server State**: Fetch nativo com revalidação automática
- **Form State**: Formulários controlados com validação

### UI/UX Design Decisions

- **Layout Inline**: Filtros, favoritas e busca em linha única para otimização de espaço
- **Modal Overlay**: Gráficos em modal para melhor foco e experiência
- **Color System**: Categorização visual intuitiva
- **Responsive First**: Design mobile-first com breakpoints progressivos

## 🔒 Segurança

### Medidas Implementadas

- ✅ **Rate Limiting**: 100 requests por 15 minutos por IP
- ✅ **Input Sanitization**: Limpeza e validação de entrada
- ✅ **Security Headers**: Proteção XSS, clickjacking, MIME sniffing
- ✅ **Data Validation**: Schemas rigorosos com Mongoose
- ✅ **Environment Variables**: Configurações sensíveis protegidas
- ✅ **Error Handling**: Logs controlados sem exposição de dados

### Para Produção

- [ ] **HTTPS**: Certificado SSL obrigatório
- [ ] **Database Security**: IP whitelist, autenticação forte
- [ ] **Monitoring**: Logs estruturados e alertas
- [ ] **Backup**: Estratégia de backup automatizada
- [ ] **Session Management**: Configuração de sessões seguras

Consulte [SECURITY.md](./SECURITY.md) para detalhes completos.

## 🧪 Testes

### Estrutura de Testes

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Coverage report
npm run test:coverage

# Testes E2E
npm run test:e2e
```

### Tipos de Teste

- **Unit Tests**: Componentes e funções utilitárias
- **Integration Tests**: API endpoints e fluxos
- **E2E Tests**: Jornadas completas do usuário

## 🐳 Docker

### Build e execução local

```bash
# Build da imagem
docker build -t corelab-task-manager .

# Executar container
docker run -p 3000:3000 \
  -e MONGODB_URI=sua_connection_string \
  -e NEXTAUTH_SECRET=sua_chave_secreta \
  corelab-task-manager
```

### Docker Compose

```bash
# Subir aplicação completa (app + MongoDB)
docker-compose up -d

# Logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

- **Netlify**: Build command: `npm run build`
- **Railway**: Detecta Next.js automaticamente
- **DigitalOcean App Platform**: Node.js 18+
- **AWS Amplify**: Suporte nativo ao Next.js

### Variáveis de Ambiente para Produção

```env
# Essenciais
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=chave-super-segura-gerada-aleatoriamente
NEXTAUTH_URL=https://seu-dominio.com

# Opcionais
NODE_ENV=production
ENABLE_RATE_LIMITING=true
MAX_REQUESTS_PER_MINUTE=60
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run lint:fix     # Correção automática

# Testes
npm test             # Executar testes
npm run test:watch   # Testes em modo watch
npm run test:e2e     # Testes end-to-end

# Banco de dados
npm run db:seed      # Popular dados de exemplo
npm run db:reset     # Resetar banco de dados
npm run db:migrate   # Executar migrações

# Utilitários
npm run analyze      # Análise do bundle
npm run check-types  # Verificação TypeScript
```

## 📊 Performance

### Métricas

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 250KB gzipped

### Otimizações

- Code splitting automático (Next.js)
- Image optimization
- CSS-in-JS com Tailwind purge
- API response caching
- Database indexing

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Add: nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. **Abra** um Pull Request

### Padrões de Código

- **ESLint + Prettier**: Formatação automática
- **Conventional Commits**: Padrão de mensagens
- **Componentes**: PascalCase, arquivos em kebab-case
- **Hooks**: Prefixo `use`, ex: `useTaskFilter`

### Estrutura de Commits

```
type(scope): description

feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

### Issues e Feedback

- 🐛 **Bug Reports**: Use o template de bug issue
- ✨ **Feature Requests**: Descreva o caso de uso
- 📝 **Documentation**: Melhorias na documentação
- 🤔 **Questions**: Use as Discussions

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](./LICENSE) para detalhes.

## 🔗 Links Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [Vercel Deploy](https://vercel.com/)

## 👥 Equipe

Desenvolvido por [Corelab](https://github.com/corelab) com ❤️

---

⭐ **Se este projeto foi útil, dê uma estrela!**

📧 **Dúvidas?** Abra uma [issue](https://github.com/seu-usuario/corelab-task-manager/issues) ou entre em contato.
