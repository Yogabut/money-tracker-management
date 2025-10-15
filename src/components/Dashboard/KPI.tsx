import { useMemo } from "react";
import { Wallet, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { transactions } from "@/data/transactions";

export default function KPISection() {
    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const balance = income - expense;

        return { income, expense, balance };
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            }).format(amount);
    };

    return (
        <div>
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard
            title="Current Balance"
            value={formatCurrency(stats.balance)}
            icon={Wallet}
            variant="default"
            />
            <KPICard
            title="Total Income"
            value={formatCurrency(stats.income)}
            change="+12.5% from last month"
            icon={TrendingUp}
            variant="success"
            />
            <KPICard
            title="Total Expense"
            value={formatCurrency(stats.expense)}
            change="+8.2% from last month"
            icon={TrendingDown}
            variant="destructive"
            />
            <KPICard
            title="Avg Daily Expense"
            value={formatCurrency(Math.round(stats.expense / 30))}
            icon={Calendar}
            />
            </div>
        </div>
    );
}
