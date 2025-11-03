import { useMemo, useState } from "react";
import KPISection from "@/components/Dashboard/KPI"
import ChartSection from "@/components/Dashboard/Chart";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import HeaderSection from "@/components/Dashboard/Header";
import { PredictiveAnalytics } from "@/components/PredictiveAnalytics";
import { PeriodFilter, Period } from "@/components/PeriodFilter";
import { useTransactions } from "@/hooks/useTransactions";

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>('monthly');
  const { transactions, isLoading } = useTransactions();

  // Filter transactions based on selected period
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      
      switch (period) {
        case 'daily':
          return (
            transactionDate.getDate() === now.getDate() &&
            transactionDate.getMonth() === now.getMonth() &&
            transactionDate.getFullYear() === now.getFullYear()
          );
          
        case 'weekly':
          { const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          return transactionDate >= weekAgo && transactionDate <= now; }
          
        case 'monthly':
          return (
            transactionDate.getMonth() === now.getMonth() &&
            transactionDate.getFullYear() === now.getFullYear()
          );
          
        case 'yearly':
          return transactionDate.getFullYear() === now.getFullYear();
          
        default:
          return true;
      }
    });
  }, [period, transactions]);

  // Calculate stats from filtered transactions
  const stats = useMemo(() => {
    const income = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    return { income, expense, balance };
  }, [filteredTransactions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <HeaderSection />

      {/* Period Filter */}
      <div className="flex justify-end">
        <PeriodFilter period={period} onChange={setPeriod} />
      </div>

      {/* KPI Cards */}
      <KPISection 
        income={stats.income} 
        expense={stats.expense} 
        balance={stats.balance}
        transactions={filteredTransactions}
        period={period}
        allTransactions={transactions} // Pass semua transaksi untuk perbandingan
      />

      {/* Predictive Analytics */}
      <PredictiveAnalytics 
        totalIncome={stats.income} 
        totalExpense={stats.expense} 
      />

      {/* Charts Grid */}
      <ChartSection 
        transactions={filteredTransactions}
        period={period}
      />

      {/* Recent Transactions */}
      <RecentTransactions 
        transactions={filteredTransactions}
      />
    </div>
  );
}