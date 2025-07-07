'use client'

// API base URL - change this based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

// Type definitions for API responses
export interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  color?: string;
}

export interface MonthlyStat {
  month: string;
  income: number;
  spending: number;
  transactions: number;
}

export interface FinancialHealth {
  score: number;
  status: string;
  incomeToExpenseRatio: number;
}

export interface DashboardSummary {
  monthlyStats: MonthlyStat[];
  topCategories: CategoryBreakdown[];
  recentTransactions: Transaction[];
  financialHealth: FinancialHealth;
}

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// API service for dashboard data
export const dashboardService = {
  // Get dashboard summary (combined data)
  async getDashboardSummary(): Promise<DashboardSummary> {
    const response = await fetchAPI<{ 
      monthlyStats: MonthlyStat[],
      topCategories: CategoryBreakdown[],
      recentTransactions: Transaction[],
      financialHealth: FinancialHealth
    }>('/dashboard/summary');
    
    return response;
  },

  // Get monthly stats
  async getMonthlyStats(): Promise<MonthlyStat[]> {
    const response = await fetchAPI<{ data: MonthlyStat[] }>('/dashboard/monthly-stats');
    return response.data;
  },

  // Get category breakdown
  async getCategoryBreakdown(): Promise<CategoryBreakdown[]> {
    const response = await fetchAPI<{ data: CategoryBreakdown[] }>('/dashboard/category-breakdown');
    
    // Add colors to categories
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#a4de6c'];
    
    return response.data.map((category, index) => ({
      ...category,
      color: colors[index % colors.length]
    }));
  },

  // Get recent transactions
  async getRecentTransactions(limit: number = 10): Promise<Transaction[]> {
    const response = await fetchAPI<{ data: Transaction[] }>(`/dashboard/recent-transactions?limit=${limit}`);
    return response.data;
  },

  // Get financial health score
  async getFinancialHealth(): Promise<FinancialHealth> {
    const response = await fetchAPI<{ data: FinancialHealth }>('/dashboard/financial-health');
    return response.data;
  },

  // Send message to chat API
  async sendChatMessage(message: string): Promise<{ resposta: string }> {
    const response = await fetchAPI<{ resposta: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ mensagem: message }),
    });
    
    return response;
  },

  // Get current balance
  async getCurrentBalance(): Promise<string> {
    const response = await fetchAPI<{ saldo: string }>('/chat/saldo');
    return response.saldo;
  },

  // Get categories
  async getCategories(): Promise<string[]> {
    const response = await fetchAPI<{ categorias: string[] }>('/chat/categorias');
    return response.categorias;
  },

  // Clear chat history
  async clearChatHistory(): Promise<{ mensagem: string }> {
    const response = await fetchAPI<{ mensagem: string }>('/chat/historico', {
      method: 'DELETE',
    });
    
    return response;
  }
};
