import { useMemo, useState, useEffect } from "react";
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
  allTransactions: Transaction[];
}

export default function KPISection({
  income,
  expense,
  balance,
  transactions,
  period,
  allTransactions,
}: KPISectionProps) {
  // =============== ANIMATED VALUES ===============
  const [displayIncome, setDisplayIncome] = useState(0);
  const [displayExpense, setDisplayExpense] = useState(0);
  const [displayBalance, setDisplayBalance] = useState(0);
  const [displayAvg, setDisplayAvg] = useState(0);

  // helper animasi counter
  const animateValue = (setter: (v: number) => void, target: number, duration = 1000) => {
    const startTime = performance.now();
    const startValue = 0;
    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const current = Math.floor(startValue + (target - startValue) * progress);
      setter(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animateValue(setDisplayIncome, income);
    animateValue(setDisplayExpense, expense);
    animateValue(setDisplayBalance, balance);
  }, [income, expense, balance]);

  // =================================================

  const daysCount = useMemo(() => {
    if (transactions.length === 0) return 1;
    const dates = transactions.map((t) => new Date(t.date).toDateString());
    const uniqueDates = new Set(dates);
    return uniqueDates.size || 1;
  }, [transactions]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  // === Periode Sebelumnya ===
  const previousPeriodData = useMemo(() => {
    const now = new Date();
    let previousTransactions: Transaction[] = [];

    switch (period) {
      case "daily": {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        previousTransactions = allTransactions.filter((t) => {
          const date = new Date(t.date);
          return (
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
          );
        });
        break;
      }
      case "weekly": {
        const twoWeeksAgo = new Date(now);
        twoWeeksAgo.setDate(now.getDate() - 14);
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        previousTransactions = allTransactions.filter((t) => {
          const date = new Date(t.date);
          return date >= twoWeeksAgo && date < oneWeekAgo;
        });
        break;
      }
      case "monthly": {
        const lastMonth = new Date(now);
        lastMonth.setMonth(now.getMonth() - 1);
        previousTransactions = allTransactions.filter((t) => {
          const date = new Date(t.date);
          return (
            date.getMonth() === lastMonth.getMonth() &&
            date.getFullYear() === lastMonth.getFullYear()
          );
        });
        break;
      }
      case "yearly": {
        const lastYear = now.getFullYear() - 1;
        previousTransactions = allTransactions.filter((t) => {
          const date = new Date(t.date);
          return date.getFullYear() === lastYear;
        });
        break;
      }
    }

    const prevIncome = previousTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const prevExpense = previousTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return { prevIncome, prevExpense };
  }, [allTransactions, period]);

  // === Perubahan Income ===
  const incomeChangeData = useMemo(() => {
    const { prevIncome } = previousPeriodData;
    if (prevIncome === 0) {
      return {
        text: income > 0 ? "+100% from last period" : "No data from last period",
        isPositive: income > 0,
      };
    }
    const changeAmount = income - prevIncome;
    const changePercent = (changeAmount / prevIncome) * 100;
    const sign = changePercent >= 0 ? "+" : "";
    return {
      text: `${sign}${changePercent.toFixed(1)}% from last period`,
      isPositive: changeAmount >= 0,
    };
  }, [income, previousPeriodData]);

  // === Perubahan Expense ===
  const expenseChangeData = useMemo(() => {
    const { prevExpense } = previousPeriodData;
    if (prevExpense === 0) {
      return {
        text: expense > 0 ? "+100% from last period" : "No data from last period",
        isPositive: expense === 0,
      };
    }
    const changeAmount = expense - prevExpense;
    const changePercent = (changeAmount / prevExpense) * 100;
    const sign = changePercent >= 0 ? "+" : "";
    return {
      text: `${sign}${changePercent.toFixed(1)}% from last period`,
      isPositive: changeAmount < 0,
    };
  }, [expense, previousPeriodData]);

  // === Average Label & Nilai ===
  const avgLabel = useMemo(() => {
    switch (period) {
      case "daily":
        return "Avg Hourly Expense";
      case "weekly":
      case "monthly":
        return "Avg Daily Expense";
      case "yearly":
        return "Avg Monthly Expense";
      default:
        return "Avg Daily Expense";
    }
  }, [period]);

  const avgExpense = useMemo(() => {
    if (expense === 0) return 0;
    switch (period) {
      case "daily":
        return Math.round(expense / 24);
      case "weekly":
      case "monthly":
        return Math.round(expense / daysCount);
      case "yearly":
        return Math.round(expense / 12);
      default:
        return Math.round(expense / daysCount);
    }
  }, [expense, daysCount, period]);

  // Jalankan animasi untuk avg juga
  useEffect(() => {
    animateValue(setDisplayAvg, avgExpense);
  }, [avgExpense]);

  // === Render ===
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Current Balance" value={formatCurrency(displayBalance)} icon={Wallet} />
        <KPICard
          title="Total Income"
          value={formatCurrency(displayIncome)}
          change={incomeChangeData.text}
          changeType={incomeChangeData.isPositive ? "positive" : "negative"}
          icon={TrendingUp}
          variant="success"
        />
        <KPICard
          title="Total Expense"
          value={formatCurrency(displayExpense)}
          change={expenseChangeData.text}
          changeType={expenseChangeData.isPositive ? "positive" : "negative"}
          icon={TrendingDown}
          variant="destructive"
        />
        <KPICard title={avgLabel} value={formatCurrency(displayAvg)} icon={Calendar} />
      </div>
    </div>
  );
}
