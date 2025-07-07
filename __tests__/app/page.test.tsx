import { render, screen } from '@testing-library/react'
import Dashboard from '@/app/page'
import { DashboardProvider } from '@/contexts/dashboard-context'
import * as api from '@/services/api'

// Mock dos componentes
jest.mock('@/components/expense-chart', () => ({
  ExpenseChart: () => <div data-testid="expense-chart">Expense Chart</div>
}))

jest.mock('@/components/recent-transactions', () => ({
  RecentTransactions: () => <div data-testid="recent-transactions">Recent Transactions</div>
}))

// Mock do serviço API
jest.mock('@/services/api', () => ({
  dashboardService: {
    getDashboardSummary: jest.fn(),
    getCurrentBalance: jest.fn(),
    sendChatMessage: jest.fn(),
  },
}))

const mockApi = api.dashboardService as jest.Mocked<typeof api.dashboardService>

const renderDashboard = () => {
  return render(
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  )
}

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders dashboard title and description', () => {
    mockApi.getDashboardSummary.mockResolvedValue({
      totalIncome: 5000,
      totalExpenses: 3000,
      currentBalance: 2000,
      recentTransactions: [],
      topCategories: [],
      monthlyStats: [],
      financialHealth: null
    })
    mockApi.getCurrentBalance.mockResolvedValue('R$ 2.000,00')

    renderDashboard()

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Visão geral dos seus gastos e lucros')).toBeInTheDocument()
  })

  it('displays loading skeletons when loading', () => {
    mockApi.getDashboardSummary.mockImplementation(() => new Promise(() => {}))
    mockApi.getCurrentBalance.mockImplementation(() => new Promise(() => {}))

    renderDashboard()

    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons).toHaveLength(5) // 4 cards + 1 description
  })

  it('displays financial cards with correct titles', () => {
    mockApi.getDashboardSummary.mockResolvedValue({
      totalIncome: 5000,
      totalExpenses: 3000,
      currentBalance: 2000,
      recentTransactions: [],
      topCategories: [],
      monthlyStats: [],
      financialHealth: null
    })
    mockApi.getCurrentBalance.mockResolvedValue('R$ 2.000,00')

    renderDashboard()

    expect(screen.getByText('Receita Total')).toBeInTheDocument()
    expect(screen.getByText('Gastos Totais')).toBeInTheDocument()
    expect(screen.getByText('Lucro Líquido')).toBeInTheDocument()
    expect(screen.getByText('Transações')).toBeInTheDocument()
  })

  it('renders expense chart and recent transactions components', () => {
    mockApi.getDashboardSummary.mockResolvedValue({
      totalIncome: 5000,
      totalExpenses: 3000,
      currentBalance: 2000,
      recentTransactions: [],
      topCategories: [],
      monthlyStats: [],
      financialHealth: null
    })
    mockApi.getCurrentBalance.mockResolvedValue('R$ 2.000,00')

    renderDashboard()

    expect(screen.getByTestId('expense-chart')).toBeInTheDocument()
    expect(screen.getByTestId('recent-transactions')).toBeInTheDocument()
  })

  it('displays error message when there is an error', async () => {
    mockApi.getDashboardSummary.mockRejectedValue(new Error('API Error'))
    mockApi.getCurrentBalance.mockRejectedValue(new Error('API Error'))

    renderDashboard()

    expect(await screen.findByText(/Erro:/)).toBeInTheDocument()
  })
})