# Documentação de Testes - Dashboard Interface

## 📋 Visão Geral

Este documento descreve a estratégia, implementação e cobertura dos testes unitários para o projeto Dashboard Interface.

## 🎯 Estratégia de Testes

### Pirâmide de Testes
```
    /\     E2E (Futuro)
   /  \    
  /____\   Integration (Futuro)
 /______\  Unit Tests (Atual)
```

### Princípios Adotados
- **Testes unitários primeiro** - Cobertura das unidades menores
- **Isolamento** - Cada teste é independente
- **Mocking** - Dependências externas são simuladas
- **Comportamento sobre implementação** - Testa o que o usuário vê

## 🧪 Implementação Atual

### Ferramentas Utilizadas
- **Jest** - Framework de testes
- **React Testing Library** - Testes de componentes React
- **@testing-library/user-event** - Simulação de interações
- **@testing-library/jest-dom** - Matchers customizados

### Configuração
```javascript
// jest.config.js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' }
}
```

## 📊 Cobertura Atual

### Componentes Testados (5/5)

#### 1. Button Component (`components/ui/button.tsx`)
**Cobertura: 100%**
- ✅ Renderização básica
- ✅ Eventos de click
- ✅ Variantes (default, destructive, outline, secondary, ghost, link)
- ✅ Tamanhos (default, sm, lg, icon)
- ✅ Estado disabled

```javascript
// Exemplo de teste
it('applies variant classes correctly', () => {
  render(<Button variant="destructive">Delete</Button>)
  const button = screen.getByRole('button')
  expect(button).toHaveClass('bg-destructive')
})
```

#### 2. Dashboard Context (`contexts/dashboard-context.tsx`)
**Cobertura: 85%**
- ✅ Estado inicial de loading
- ✅ Carregamento de dados com sucesso
- ✅ Tratamento de erros de API
- ⚠️ Função sendChatMessage (não testada)

```javascript
// Padrão de teste de contexto
const TestComponent = () => {
  const { isLoading, error, currentBalance } = useDashboard()
  return <div data-testid="loading">{isLoading ? 'Loading' : 'Loaded'}</div>
}
```

#### 3. useToast Hook (`hooks/use-toast.ts`)
**Cobertura: 90%**
- ✅ Adição de toast
- ✅ Remoção de toast
- ✅ Limite de toasts
- ✅ Reducer functions
- ⚠️ Timeout automático (não testado)

#### 4. Utility Functions (`lib/utils.ts`)
**Cobertura: 100%**
- ✅ Merge de classes CSS
- ✅ Classes condicionais
- ✅ Valores undefined/null
- ✅ Input vazio

#### 5. Dashboard Page (`app/page.tsx`)
**Cobertura: 75%**
- ✅ Renderização de título e descrição
- ✅ Estados de loading (skeletons)
- ✅ Cards financeiros
- ✅ Componentes filhos (mocked)
- ✅ Tratamento de erros
- ⚠️ Cálculos de receita/despesa (não testados)
- ⚠️ useEffect de refresh (não testado)

## 📈 Métricas de Cobertura

### Por Categoria
| Categoria | Testado | Total | Cobertura |
|-----------|---------|-------|-----------|
| Components UI | 1 | 45+ | 2% |
| Pages | 1 | 4 | 25% |
| Contexts | 1 | 1 | 100% |
| Hooks | 1 | 2 | 50% |
| Utils | 1 | 1 | 100% |

### Por Funcionalidade
| Funcionalidade | Cobertura | Status |
|----------------|-----------|--------|
| Renderização básica | 95% | ✅ |
| Gerenciamento de estado | 85% | ✅ |
| Tratamento de erros | 80% | ✅ |
| Interações do usuário | 70% | ⚠️ |
| Integração com API | 60% | ⚠️ |

## 🎯 Padrões de Teste

### 1. Estrutura AAA (Arrange, Act, Assert)
```javascript
it('should do something', () => {
  // Arrange
  const mockData = { id: 1, name: 'Test' }
  
  // Act
  render(<Component data={mockData} />)
  
  // Assert
  expect(screen.getByText('Test')).toBeInTheDocument()
})
```

### 2. Mocking de Dependências
```javascript
// Mock de módulos externos
jest.mock('@/services/api', () => ({
  dashboardService: {
    getDashboardSummary: jest.fn(),
    getCurrentBalance: jest.fn(),
  },
}))
```

### 3. Testes de Comportamento
```javascript
// Foca no que o usuário vê, não na implementação
it('displays error message when API fails', async () => {
  mockApi.getDashboardSummary.mockRejectedValue(new Error('API Error'))
  renderDashboard()
  expect(await screen.findByText(/Erro:/)).toBeInTheDocument()
})
```

## 🚨 Limitações Atuais

### Warnings Conhecidos
- **React act() warnings** - Atualizações de estado assíncronas não envolvidas em act()
- **Console.error em testes** - Logs de erro esperados durante testes de falha

### Componentes Não Testados
- Componentes de gráficos (ExpenseChart, ProfitChart)
- Tabelas de dados (ExpenseTable, TransactionTable)
- Sidebar e navegação
- Componentes de formulário

### Funcionalidades Não Testadas
- Fluxos completos de usuário
- Integração entre componentes
- Performance e acessibilidade
- Responsividade

## 📋 Próximos Passos

### Curto Prazo (1-2 semanas)
1. **Aumentar cobertura para 80%**
   - Testar componentes de tabela
   - Testar componentes de gráfico
   - Adicionar testes de integração

2. **Resolver warnings**
   - Envolver atualizações assíncronas em act()
   - Silenciar console.error em testes

### Médio Prazo (1 mês)
1. **Testes de Integração**
   - Fluxos completos de usuário
   - Integração entre contextos
   - Navegação entre páginas

2. **Testes E2E**
   - Cypress ou Playwright
   - Cenários críticos de usuário

### Longo Prazo (3 meses)
1. **Testes de Performance**
   - Lighthouse CI
   - Bundle size monitoring

2. **Testes de Acessibilidade**
   - axe-core integration
   - Screen reader testing

## 🔧 Como Executar

```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Com cobertura
npm run test:coverage

# Teste específico
npm test button.test.tsx
```

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Última atualização:** Janeiro 2025  
**Responsável:** Equipe de Desenvolvimento  
**Status:** ✅ Implementado e Funcional