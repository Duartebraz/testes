# Testes Unitários com Jest

Este projeto utiliza Jest e React Testing Library para testes unitários.

## Instalação das Dependências

```bash
npm install
```

## Executar Testes

### Executar todos os testes uma vez
```bash
npm test
```

### Executar testes em modo watch (reexecuta quando arquivos mudam)
```bash
npm run test:watch
```

### Executar testes com relatório de cobertura
```bash
npm run test:coverage
```

## Estrutura dos Testes

```
__tests__/
├── components/
│   └── ui/
│       └── button.test.tsx
├── contexts/
│   └── dashboard-context.test.tsx
├── hooks/
│   └── use-toast.test.tsx
├── lib/
│   └── utils.test.ts
├── app/
│   └── page.test.tsx
└── setup.ts
```

## Tipos de Testes Implementados

### 1. Componentes UI
- **Button**: Testa renderização, eventos de click, variantes e estados
- **Dashboard Page**: Testa renderização de cards, loading states e tratamento de erros

### 2. Contextos
- **DashboardContext**: Testa carregamento de dados, estados de loading e tratamento de erros

### 3. Hooks
- **useToast**: Testa adição, remoção e limitação de toasts

### 4. Utilitários
- **cn function**: Testa merge de classes CSS com Tailwind

## Configuração

- **jest.config.js**: Configuração principal do Jest
- **jest.setup.js**: Setup do Testing Library
- **__tests__/setup.ts**: Mocks globais para Next.js

## Mocks Implementados

- Next.js Router
- Next.js Image
- API Services
- ResizeObserver
- matchMedia

## Cobertura de Código

Os testes cobrem:
- Componentes em `components/`
- Contextos em `contexts/`
- Hooks em `hooks/`
- Utilitários em `lib/`
- Serviços em `services/`

Execute `npm run test:coverage` para ver o relatório detalhado de cobertura.