# Guia de Contribuição - Corelab Task Manager

Obrigado pelo interesse em contribuir com o projeto! Este guia ajudará você a entender como contribuir de forma efetiva.

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/corelab-pessoal.git
cd corelab-pessoal

# Adicione o repositório original como upstream
git remote add upstream https://github.com/corelab/corelab-pessoal.git
```

### 2. Configurar Ambiente

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

### 3. Criar Branch

```bash
# Crie uma branch para sua feature/fix
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-fix
```

## 📋 Padrões de Código

### Commit Messages

Utilizamos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Tipos:**

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Tarefas de build, configurações, etc

**Exemplos:**

```
feat(tasks): add color filter functionality
fix(api): resolve task deletion error
docs(readme): update installation instructions
test(tasks): add unit tests for TaskCard component
```

### Formatação de Código

```bash
# Verificar formatação
npm run format:check

# Corrigir formatação automaticamente
npm run format

# Verificar linting
npm run lint

# Corrigir linting automaticamente
npm run lint:fix
```

### TypeScript

- Use TypeScript sempre que possível
- Defina interfaces para objetos complexos
- Use tipos explícitos quando o tipo não for óbvio

### Componentes React

```jsx
// ✅ Bom
const TaskCard = ({ task, onUpdate, onDelete }) => {
  // Estado e lógica aqui

  return (
    <div className="...">
      {/* JSX aqui */}
    </div>
  );
};

// ✅ Com TypeScript
interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  // Implementação
};
```

### CSS/Tailwind

- Use classes utilitárias do Tailwind
- Mantenha classes organizadas (layout, spacing, colors, etc.)
- Use variáveis CSS para valores personalizados

```jsx
// ✅ Bom
<div className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] hover:border-[#404040] transition-colors">
```

## 🧪 Testes

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage
```

### Escrever Testes

- Teste funcionalidades críticas
- Use nomes descritivos para os testes
- Siga o padrão AAA (Arrange, Act, Assert)

```javascript
describe('TaskCard Component', () => {
  test('should toggle favorite status when heart button is clicked', async () => {
    // Arrange
    const mockTask = {
      /* ... */
    };
    const mockOnUpdate = jest.fn();

    render(<TaskCard task={mockTask} onUpdate={mockOnUpdate} />);

    // Act
    const favoriteButton = screen.getByRole('button', { name: /heart/i });
    fireEvent.click(favoriteButton);

    // Assert
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(mockTask._id, {
        ...mockTask,
        isFavorite: true,
      });
    });
  });
});
```

## 📁 Estrutura de Diretórios

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── (pages)/           # Páginas da aplicação
│   └── globals.css        # Estilos globais
├── components/            # Componentes React reutilizáveis
├── lib/                   # Utilitários e configurações
├── models/                # Modelos do MongoDB
├── public/                # Arquivos estáticos
├── __tests__/             # Testes
├── docs/                  # Documentação
└── types/                 # Definições de tipos TypeScript
```

## 🔄 Processo de Review

### Antes de Submeter PR

1. ✅ Testes passando
2. ✅ Lint sem erros
3. ✅ Formatação correta
4. ✅ Documentação atualizada
5. ✅ Commit messages seguem o padrão

### Template de Pull Request

```markdown
## Descrição

Breve descrição das mudanças

## Tipo de Mudança

- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar

1. Passos para reproduzir/testar

## Checklist

- [ ] Testes passando
- [ ] Lint sem erros
- [ ] Documentação atualizada
- [ ] Self-review realizado

## Screenshots (se aplicável)
```

### Critérios de Aprovação

- ✅ Funcionalidade está working
- ✅ Código está limpo e bem documentado
- ✅ Testes adequados foram adicionados
- ✅ Performance não foi impactada negativamente
- ✅ Design está consistente com o resto da aplicação

## 🐛 Reportar Bugs

### Template de Issue

```markdown
**Descrição do Bug**
Descrição clara do que está acontecendo

**Passos para Reproduzir**

1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer

**Screenshots**
Se aplicável, adicione screenshots

**Ambiente**

- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Node: [e.g. 18.17.0]
```

## 💡 Solicitar Features

### Template de Feature Request

```markdown
**Problema que Resolve**
Descrição clara do problema

**Solução Proposta**
Descrição da solução que você gostaria

**Alternativas Consideradas**
Outras soluções que você considerou

**Contexto Adicional**
Qualquer contexto adicional sobre a feature
```

## 📚 Recursos Úteis

### Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB Docs](https://docs.mongodb.com/)

### Ferramentas

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

## 💬 Comunicação

- **Issues**: Para bugs e feature requests
- **Discussions**: Para perguntas gerais e ideias
- **PR Comments**: Para feedback específico de código

## 🎯 Prioridades Atuais

1. **Autenticação de usuários**
2. **Testes automatizados**
3. **Performance otimizations**
4. **Acessibilidade (a11y)**
5. **Internacionalização (i18n)**

## 🏆 Reconhecimento

Contribuidores serão reconhecidos:

- No README do projeto
- Nas release notes
- Em comunicações oficiais

---

**Obrigado por contribuir! 🚀**

Sua ajuda torna este projeto melhor para toda a comunidade.
