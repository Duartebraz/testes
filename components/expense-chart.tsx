"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { useDashboard } from "@/contexts/dashboard-context"
import { Skeleton } from "@/components/ui/skeleton"

// Map month numbers to names
const monthNames: Record<string, string> = {
  '01': 'Jan',
  '02': 'Fev',
  '03': 'Mar',
  '04': 'Abr',
  '05': 'Mai',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Ago',
  '09': 'Set',
  '10': 'Out',
  '11': 'Nov',
  '12': 'Dez'
};

export function ExpenseChart() {
  const { monthlyStats, isLoading } = useDashboard();

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <Skeleton className="w-full h-[300px]" />
      </div>
    );
  }

  // If no data, show message
  if (!monthlyStats || monthlyStats.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px] text-muted-foreground">
        Nenhum dado disponível para exibição
      </div>
    );
  }

  // Format data for the chart
  const formattedData = monthlyStats.map(stat => {
    // Extract month from date (format: YYYY-MM)
    const monthKey = stat.month.split('-')[1];
    const monthName = monthNames[monthKey as keyof typeof monthNames] || monthKey;
    
    return {
      name: monthName,
      receita: stat.income,
      despesa: stat.spending
    };
  });

  // Custom tooltip formatter
  const formatTooltipValue = (value: number): string => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={formattedData}>
        <XAxis 
          dataKey="name" 
          stroke="#888888" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip 
          formatter={formatTooltipValue}
          labelFormatter={(label) => `Mês: ${label}`}
        />
        <Legend />
        <Bar name="Receita" dataKey="receita" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar name="Despesa" dataKey="despesa" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
