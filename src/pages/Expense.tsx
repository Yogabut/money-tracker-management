import { useMemo } from "react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/DateRangePicker";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionDialog } from "@/components/TransactionDialog";
import { useState } from "react";

const expenseCategories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];

export default function Expense() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { transactions, isLoading } = useTransactions();

  const expenseTransactions = useMemo(() => {
    let filtered = transactions.filter(t => t.type === 'expense');

    if (dateRange?.from) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date);
        const from = dateRange.from!;
        const to = dateRange.to || from;
        return transactionDate >= from && transactionDate <= to;
      });
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(t => selectedCategories.includes(t.category));
    }

    return filtered;
  }, [dateRange, selectedCategories]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">Track and manage all your expenses</p>
        </div>
        <TransactionDialog type="expense" />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          <CategoryFilter
            categories={expenseCategories}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            onClearAll={() => setSelectedCategories([])}
          />
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-destructive">{formatCurrency(totalExpense)}</p>
        </CardContent>
      </Card>

      {/* Expense Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.payment_method}</TableCell>
                  <TableCell className="text-right font-semibold text-destructive">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
