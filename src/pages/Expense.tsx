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
import { toast } from "sonner";
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

const expenseCategories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];

export default function Expense() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<any>(null);
  const { transactions, isLoading, deleteTransaction } = useTransactions();

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
  }, [transactions, dateRange, selectedCategories]);

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

  const handleEditClick = (transaction: any) => {
    console.log('=== EDIT CLICKED (EXPENSE) ===');
    console.log('Full transaction object:', JSON.stringify(transaction, null, 2));
    console.log('Transaction ID:', transaction.id);
    console.log('All keys:', Object.keys(transaction));
    
    if (transaction && transaction.id) {
      setEditingTransaction(transaction);
    } else {
      console.error('❌ Transaction ID is missing!');
      toast.error('Cannot edit: Transaction ID is missing');
    }
  };

  const handleDeleteClick = (transaction: any) => {
    console.log('=== DELETE CLICKED (EXPENSE) ===');
    console.log('Full transaction object:', JSON.stringify(transaction, null, 2));
    console.log('Transaction ID:', transaction.id);
    
    if (transaction && transaction.id) {
      setTransactionToDelete(transaction);
      setDeleteDialogOpen(true);
    } else {
      console.error('❌ Transaction ID is missing!');
      toast.error('Cannot delete: Transaction ID is missing');
    }
  };

  const handleDeleteConfirm = async () => {
    console.log('=== DELETE CONFIRM (EXPENSE) ===');
    console.log('Transaction to delete:', transactionToDelete);
    console.log('ID being sent:', transactionToDelete?.id);
    
    if (transactionToDelete && transactionToDelete.id) {
      try {
        await deleteTransaction(transactionToDelete.id);
        setDeleteDialogOpen(false);
        setTransactionToDelete(null);
      } catch (error) {
        console.error('❌ Error deleting transaction:', error);
        toast.error('Failed to delete transaction');
      }
    } else {
      console.error('❌ No transaction ID to delete');
      toast.error('Cannot delete: No transaction ID');
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
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">Track and manage all your expenses</p>
        </div>
        <TransactionDialog type="expense" />
      </div>

      {editingTransaction && (
        <TransactionDialog
          type="expense"
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}

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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No expense transactions found
                  </TableCell>
                </TableRow>
              ) : (
                expenseTransactions.map((transaction, index) => {
                  // Debug: Log the transaction to see its structure
                  if (index === 0) {
                    console.log('Sample expense transaction object:', transaction);
                    console.log('Expense transaction keys:', Object.keys(transaction));
                  }
                  
                  return (
                    <TableRow key={transaction.id || transaction.id || index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.description || '-'}</TableCell>
                      <TableCell>{transaction.payment_method}</TableCell>
                      <TableCell className="text-right font-semibold text-destructive">
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              console.log('Edit clicked for expense:', transaction);
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
                              console.log('Delete clicked for expense:', transaction);
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
              Are you sure you want to delete this expense transaction? This action cannot be undone.
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