import { useMemo } from "react";
import { Wallet, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { Transaction } from "@/data/transactions";
import { Period } from "@/components/PeriodFilter";

interface KPISectionProps {
  income: number;
  expense: number;
  balance: number;
  transactions: Transaction[];
  period: Period;
  allTransactions: Transaction[]; // Untuk menghitung perubahan dari periode sebelumnya
}

export default function KPISection({ income, expense, balance, transactions, period, allTransactions }: KPISectionProps) {
    // Hitung jumlah hari dari transaksi yang difilter
    const daysCount = useMemo(() => {
      if (transactions.length === 0) return 1;
      
      const dates = transactions.map(t => new Date(t.date).toDateString());
      const uniqueDates = new Set(dates);
      return uniqueDates.size || 1; // minimal 1 untuk avoid division by zero
    }, [transactions]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Hitung data periode sebelumnya
    const previousPeriodData = useMemo(() => {
      const now = new Date();
      let previousTransactions: Transaction[] = [];

      switch (period) {
        case 'daily':
          // Kemarin
          { const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          previousTransactions = allTransactions.filter(t => {
            const date = new Date(t.date);
            return (
              date.getDate() === yesterday.getDate() &&
              date.getMonth() === yesterday.getMonth() &&
              date.getFullYear() === yesterday.getFullYear()
            );
          });
          break; }

        case 'weekly':
          // 7 hari sebelumnya (hari ke-8 sampai ke-14)
          { const twoWeeksAgo = new Date(now);
          twoWeeksAgo.setDate(now.getDate() - 14);
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          previousTransactions = allTransactions.filter(t => {
            const date = new Date(t.date);
            return date >= twoWeeksAgo && date < oneWeekAgo;
          });
          break; }

        case 'monthly':
          // Bulan lalu
          { const lastMonth = new Date(now);
          lastMonth.setMonth(now.getMonth() - 1);
          previousTransactions = allTransactions.filter(t => {
            const date = new Date(t.date);
            return (
              date.getMonth() === lastMonth.getMonth() &&
              date.getFullYear() === lastMonth.getFullYear()
            );
          });
          break; }

        case 'yearly':
          // Tahun lalu
          { const lastYear = now.getFullYear() - 1;
          previousTransactions = allTransactions.filter(t => {
            const date = new Date(t.date);
            return date.getFullYear() === lastYear;
          });
          break; }
      }

      const prevIncome = previousTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const prevExpense = previousTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return { prevIncome, prevExpense };
    }, [allTransactions, period]);

    // Hitung persentase perubahan income dan determine trend
    const incomeChangeData = useMemo(() => {
      const { prevIncome } = previousPeriodData;
      
      if (prevIncome === 0) {
        return { 
          text: income > 0 ? "+100% from last period" : "No data from last period",
          isPositive: income > 0
        };
      }

      const changeAmount = income - prevIncome;
      const changePercent = (changeAmount / prevIncome) * 100;
      const sign = changePercent >= 0 ? "+" : "";
      
      return {
        text: `${sign}${changePercent.toFixed(1)}% from last period`,
        isPositive: changeAmount >= 0
      };
    }, [income, previousPeriodData]);

    // Hitung persentase perubahan expense dan determine trend
    const expenseChangeData = useMemo(() => {
      const { prevExpense } = previousPeriodData;
      
      if (prevExpense === 0) {
        return { 
          text: expense > 0 ? "+100% from last period" : "No data from last period",
          isPositive: expense === 0 // Untuk expense, tidak naik adalah positif
        };
      }

      const changeAmount = expense - prevExpense;
      const changePercent = (changeAmount / prevExpense) * 100;
      const sign = changePercent >= 0 ? "+" : "";
      
      return {
        text: `${sign}${changePercent.toFixed(1)}% from last period`,
        isPositive: changeAmount < 0 // Untuk expense, turun adalah positif (bagus)
      };
    }, [expense, previousPeriodData]);

    // Label periode untuk average daily expense
    const avgLabel = useMemo(() => {
      switch (period) {
        case 'daily':
          return 'Avg Hourly Expense';
        case 'weekly':
        case 'monthly':
          return 'Avg Daily Expense';
        case 'yearly':
          return 'Avg Monthly Expense';
        default:
          return 'Avg Daily Expense';
      }
    }, [period]);

    // Hitung average berdasarkan periode
    const avgExpense = useMemo(() => {
      if (expense === 0) return 0;

      switch (period) {
        case 'daily':
          // Average per jam (24 jam)
          return Math.round(expense / 24);
        case 'weekly':
        case 'monthly':
          // Average per hari
          return Math.round(expense / daysCount);
        case 'yearly':
          // Average per bulan (12 bulan)
          return Math.round(expense / 12);
        default:
          return Math.round(expense / daysCount);
      }
    }, [expense, daysCount, period]);

    return (
        <div>
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KPICard
                    title="Current Balance"
                    value={formatCurrency(balance)}
                    icon={Wallet}
                    variant="default"
                />
                <KPICard
                    title="Total Income"
                    value={formatCurrency(income)}
                    change={incomeChangeData.text}
                    changeType={incomeChangeData.isPositive ? "positive" : "negative"}
                    icon={TrendingUp}
                    variant="success"
                />
                <KPICard
                    title="Total Expense"
                    value={formatCurrency(expense)}
                    change={expenseChangeData.text}
                    changeType={expenseChangeData.isPositive ? "positive" : "negative"}
                    icon={TrendingDown}
                    variant="destructive"
                />
                <KPICard
                    title={avgLabel}
                    value={formatCurrency(avgExpense)}
                    icon={Calendar}
                />
            </div>
        </div>
    );
}