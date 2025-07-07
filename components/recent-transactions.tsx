'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDashboard } from "@/contexts/dashboard-context"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function RecentTransactions() {
  const { transactions, isLoading } = useDashboard();

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="ml-4 space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="ml-auto">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If no transactions, show message
  if (!transactions || transactions.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        Nenhuma transação encontrada
      </div>
    );
  }

  // Format relative time
  const formatRelativeDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  // Show most recent transactions first
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5); // Show only 5 most recent

  return (
    <div className="space-y-8">
      {sortedTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>{transaction.category.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-sm text-muted-foreground">
              {transaction.category} • {formatRelativeDate(transaction.date)}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
              {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
