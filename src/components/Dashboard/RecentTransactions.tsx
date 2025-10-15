import { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { transactions } from "@/data/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentTransactions() {


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
    const recentIncome = transactions.filter(t => t.type === 'income').slice(0, 5);
    const recentExpense = transactions.filter(t => t.type === 'expense').slice(0, 5);

    return (
        <div>
            {/* Recent Transactions */}
            <div className="grid gap-4 md:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Recent Income
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                {recentIncome.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
                    <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category}</p>
                    </div>
                    <p className="font-semibold text-success">{formatCurrency(transaction.amount)}</p>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                Recent Expenses
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                {recentExpense.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category}</p>
                    </div>
                    <p className="font-semibold text-destructive">{formatCurrency(transaction.amount)}</p>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
            </div>
        </div>
    );
}
