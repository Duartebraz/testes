'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  dashboardService, 
  DashboardSummary, 
  Transaction, 
  CategoryBreakdown, 
  MonthlyStat, 
  FinancialHealth 
} from '@/services/api';

// Define the context type
interface DashboardContextType {
  isLoading: boolean;
  error: string | null;
  summary: DashboardSummary | null;
  transactions: Transaction[];
  categories: CategoryBreakdown[];
  monthlyStats: MonthlyStat[];
  financialHealth: FinancialHealth | null;
  currentBalance: string;
  refreshData: () => Promise<void>;
  sendChatMessage: (message: string) => Promise<string>;
}

// Create context with default values
export const DashboardContext = createContext<DashboardContextType>({
  isLoading: true,
  error: null,
  summary: null,
  transactions: [],
  categories: [],
  monthlyStats: [],
  financialHealth: null,
  currentBalance: 'R$ 0,00',
  refreshData: async () => {},
  sendChatMessage: async () => '',
});

// Context provider component
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<CategoryBreakdown[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStat[]>([]);
  const [financialHealth, setFinancialHealth] = useState<FinancialHealth | null>(null);
  const [currentBalance, setCurrentBalance] = useState('R$ 0,00');

  // Function to load all dashboard data
  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get dashboard summary
      const summaryData = await dashboardService.getDashboardSummary();
      setSummary(summaryData);
      
      // Set individual data states
      if (summaryData.recentTransactions) setTransactions(summaryData.recentTransactions);
      if (summaryData.topCategories) setCategories(summaryData.topCategories);
      if (summaryData.monthlyStats) setMonthlyStats(summaryData.monthlyStats);
      if (summaryData.financialHealth) setFinancialHealth(summaryData.financialHealth);
      
      // Get current balance
      const balance = await dashboardService.getCurrentBalance();
      setCurrentBalance(balance);
      
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Dashboard data loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to send chat message
  const sendChatMessage = async (message: string): Promise<string> => {
    try {
      const response = await dashboardService.sendChatMessage(message);
      // Refresh data after sending message to get updated state
      await loadDashboardData();
      return response.resposta;
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Send message error:', err);
      return 'Error: Failed to send message';
    }
  };

  // Load data on initial render
  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        isLoading,
        error,
        summary,
        transactions,
        categories,
        monthlyStats,
        financialHealth,
        currentBalance,
        refreshData: loadDashboardData,
        sendChatMessage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the dashboard context
export const useDashboard = () => useContext(DashboardContext);
