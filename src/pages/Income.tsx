/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/DateRangePicker";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionDialog } from "@/components/TransactionDialog";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const incomeCategories = ["Salary", "Freelance", "Investment", "Business", "Other Income"];

export default function Income() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<any>(null);
  const { transactions, isLoading, deleteTransaction } = useTransactions();

  const incomeTransactions = useMemo(() => {
    let filtered = transactions.filter(t => t.type === 'income');

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
  }, [transactions, dateRange, selectedCategories]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  
  const handleEditClick = (transaction: any) => {
    console.log('Editing transaction:', transaction); // Debug log
    if (transaction && transaction.id) {
      setEditingTransaction(transaction);
    } else {
      console.error('Transaction ID is missing:', transaction);
    }
  };

  const handleDeleteClick = (transaction: any) => {
    console.log('Deleting transaction:', transaction); // Debug log
    if (transaction && transaction.id) {
      setTransactionToDelete(transaction);
      setDeleteDialogOpen(true);
    } else {
      console.error('Transaction ID is missing:', transaction);
    }
  };

  const handleDeleteConfirm = async () => {
    if (transactionToDelete && transactionToDelete.id) {
      try {
        await deleteTransaction(transactionToDelete.id);
        setDeleteDialogOpen(false);
        setTransactionToDelete(null);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
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
          <h1 className="text-3xl font-bold">Income</h1>
          <p className="text-muted-foreground">Manage and track all your income sources</p>
        </div>
        <TransactionDialog type="income" />
      </div>

      {editingTransaction && (
        <TransactionDialog
          type="income"
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          <CategoryFilter
            categories={incomeCategories}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            onClearAll={() => setSelectedCategories([])}
          />
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-success">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-success">{formatCurrency(totalIncome)}</p>
        </CardContent>
      </Card>

      {/* Income Table */}
      <Card>
        <CardHeader>
          <CardTitle>Income History</CardTitle>
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No income transactions found
                  </TableCell>
                </TableRow>
              ) : (
                incomeTransactions.map((transaction, index) => {
                  // Debug: Log the transaction to see its structure
                  if (index === 0) {
                    console.log('Sample transaction object:', transaction);
                    console.log('Transaction keys:', Object.keys(transaction));
                  }
                  
                  return (
                    <TableRow key={transaction.id || transaction.id || index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.description || '-'}</TableCell>
                      <TableCell>{transaction.payment_method}</TableCell>
                      <TableCell className="text-right font-semibold text-success">
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              console.log('Edit clicked for:', transaction);
                              handleEditClick(transaction);
                            }}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              console.log('Delete clicked for:', transaction);
                              handleDeleteClick(transaction);
                            }}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this income transaction? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}