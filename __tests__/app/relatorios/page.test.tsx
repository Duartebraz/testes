import { render, screen } from '@testing-library/react'
import RelatoriosPage from '@/app/relatorios/page'
import { DashboardProvider } from '@/contexts/dashboard-context'
import * as api from '@/services/api'

jest.mock('@/services/api', () => ({
  dashboardService: {
    getDashboardSummary: jest.fn(),
    getCurrentBalance: jest.fn(),
    sendChatMessage: jest.fn(),
  },
}))

const mockApi = api.dashboardService as jest.Mocked<typeof api.dashboardService>

describe('Relatorios Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
  })

  it('renders relatorios page title', () => {
    render(
      <DashboardProvider>
        <RelatoriosPage />
      </DashboardProvider>
    )

    expect(screen.getByText('Relatórios')).toBeInTheDocument()
  })
})