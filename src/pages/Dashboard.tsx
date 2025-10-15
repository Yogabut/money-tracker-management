import { useMemo } from "react";
import KPISection from "@/components/Dashboard/KPI"
import ChartSection from "@/components/Dashboard/Chart";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import HeaderSection from "@/components/Dashboard/Header";
import { PredictiveAnalytics } from "@/components/PredictiveAnalytics";
import { transactions } from "@/data/transactions";

export default function Dashboard() {
  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    return { income, expense, balance };
  }, []);

  return (
    <div className="space-y-6">
      <HeaderSection />

      {/* KPI Cards */}
      <KPISection />

      {/* Predictive Analytics */}
      <PredictiveAnalytics totalIncome={stats.income} totalExpense={stats.expense} />

      {/* Charts Grid */}
      <ChartSection />

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}
