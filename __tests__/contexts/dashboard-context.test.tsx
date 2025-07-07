import { render, screen, waitFor } from '@testing-library/react'
import { DashboardProvider, useDashboard } from '@/contexts/dashboard-context'
import * as api from '@/services/api'

// Mock do serviço API
jest.mock('@/services/api', () => ({
  dashboardService: {
    getDashboardSummary: jest.fn(),
    getCurrentBalance: jest.fn(),
    sendChatMessage: jest.fn(),
  },
}))

const mockApi = api.dashboardService as jest.Mocked<typeof api.dashboardService>

// Componente de teste para usar o hook
const TestComponent = () => {
  const { isLoading, error, currentBalance, summary } = useDashboard()
  
  return (
    <div>
      <div data-testid="loading">{isLoading ? 'Loading' : 'Loaded'}</div>
      <div data-testid="error">{error || 'No error'}</div>
      <div data-testid="balance">{currentBalance}</div>
      <div data-testid="summary">{summary ? 'Has summary' : 'No summary'}</div>
    </div>
  )
}

describe('DashboardContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('provides initial loading state', () => {
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

    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('Loading')
  })

  it('loads dashboard data successfully', async () => {
    const mockSummary = {
      totalIncome: 5000,
      totalExpenses: 3000,
      currentBalance: 2000,
      recentTransactions: [],
      topCategories: [],
      monthlyStats: [],
      financialHealth: null
    }

    mockApi.getDashboardSummary.mockResolvedValue(mockSummary)
    mockApi.getCurrentBalance.mockResolvedValue('R$ 2.000,00')

    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Loaded')
    })

    expect(screen.getByTestId('balance')).toHaveTextContent('R$ 2.000,00')
    expect(screen.getByTestId('summary')).toHaveTextContent('Has summary')
    expect(screen.getByTestId('error')).toHaveTextContent('No error')
  })

  it('handles API errors', async () => {
    mockApi.getDashboardSummary.mockRejectedValue(new Error('API Error'))
    mockApi.getCurrentBalance.mockRejectedValue(new Error('API Error'))

    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Loaded')
    })

    expect(screen.getByTestId('error')).toHaveTextContent('Failed to load dashboard data')
  })
})