// src/components/RecentTransactions.tsx
import { useMemo, useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Transaction } from "@/data/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);

    // recent income & expense (most recent first, max 5)
    const recentIncome = useMemo(
        () =>
        transactions
            .filter((t) => t.type === "income")
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5),
        [transactions]
    );

    const recentExpense = useMemo(
        () =>
        transactions
            .filter((t) => t.type === "expense")
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5),
        [transactions]
    );

    const formatDate = (dateString: string) =>
        new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(dateString));


    function AnimatedAmount({ value, duration = 800 }: { value: number; duration?: number }) {
        const [display, setDisplay] = useState(0);

        useEffect(() => {
            let rafId: number;
            const startTime = performance.now();
            const start = 0;
            const diff = value - start;

            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

            const step = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOutCubic(progress);
                const current = Math.round(start + diff * eased);
                setDisplay(current);

                if (progress < 1) {
                rafId = requestAnimationFrame(step);
                } else {
                setDisplay(value); // ensure exact final value
                }
            };

            // start animation
            rafId = requestAnimationFrame(step);

            return () => {
                cancelAnimationFrame(rafId);
            };
            }, [value, duration]);

            return <span>{formatCurrency(display)}</span>;
        }


    return (
        <div>
        <div className="grid gap-4 md:grid-cols-2">
            {/* INCOME */}
            <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Recent Income
                </CardTitle>
            </CardHeader>
            <CardContent>
                <AnimatePresence>
                {recentIncome.length > 0 ? (
                    <div className="space-y-3">
                    {recentIncome.map((transaction, i) => (
                        <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ delay: i * 0.04, duration: 0.35 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200"
                        >
                        <div className="flex-1">
                            <p className="font-medium">{transaction.description}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{transaction.category}</span>
                            <span>•</span>
                            <span>{formatDate(transaction.date)}</span>
                            </div>
                        </div>

                        <p className="font-semibold text-green-600 ml-2">
                            <AnimatedAmount value={transaction.amount} />
                        </p>
                        </motion.div>
                    ))}
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-muted-foreground">
                    No income transactions in this period
                    </motion.div>
                )}
                </AnimatePresence>
            </CardContent>
            </Card>

            {/* EXPENSE */}
            <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                Recent Expenses
                </CardTitle>
            </CardHeader>
            <CardContent>
                <AnimatePresence>
                {recentExpense.length > 0 ? (
                    <div className="space-y-3">
                    {recentExpense.map((transaction, i) => (
                        <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ delay: i * 0.04, duration: 0.35 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200"
                        >
                        <div className="flex-1">
                            <p className="font-medium">{transaction.description}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{transaction.category}</span>
                            <span>•</span>
                            <span>{formatDate(transaction.date)}</span>
                            </div>
                        </div>

                        <p className="font-semibold text-red-600 ml-2">
                            <AnimatedAmount value={transaction.amount} />
                        </p>
                        </motion.div>
                    ))}
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-muted-foreground">
                    No expense transactions in this period
                    </motion.div>
                )}
                </AnimatePresence>
            </CardContent>
            </Card>
        </div>
        </div>
    );
}
