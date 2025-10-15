import { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Transaction } from "@/data/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Get recent income transactions (sorted by date, most recent first)
    const recentIncome = useMemo(() => {
        return transactions
            .filter(t => t.type === 'income')
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
    }, [transactions]);

    // Get recent expense transactions (sorted by date, most recent first)
    const recentExpense = useMemo(() => {
        return transactions
            .filter(t => t.type === 'expense')
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
    }, [transactions]);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

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
                        {recentIncome.length > 0 ? (
                            <div className="space-y-3">
                                {recentIncome.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
                                        <div className="flex-1">
                                            <p className="font-medium">{transaction.description}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>{transaction.category}</span>
                                                <span>•</span>
                                                <span>{formatDate(transaction.date)}</span>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-success ml-2">
                                            {formatCurrency(transaction.amount)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No income transactions in this period
                            </div>
                        )}
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
                        {recentExpense.length > 0 ? (
                            <div className="space-y-3">
                                {recentExpense.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                                        <div className="flex-1">
                                            <p className="font-medium">{transaction.description}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>{transaction.category}</span>
                                                <span>•</span>
                                                <span>{formatDate(transaction.date)}</span>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-destructive ml-2">
                                            {formatCurrency(transaction.amount)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No expense transactions in this period
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}