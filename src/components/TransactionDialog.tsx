import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";

interface TransactionDialogProps {
  type: 'income' | 'expense';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transaction?: any;
  onClose?: () => void;
}

const incomeCategories = ["Salary", "Freelance", "Investment", "Business", "Other Income"];
const expenseCategories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];
const paymentMethods = ["Cash", "Bank Transfer", "E-Wallet", "Credit Card", "Debit Card"];

export function TransactionDialog({ type, transaction, onClose }: TransactionDialogProps) {
  const { addTransaction, updateTransaction, isAdding, isUpdating } = useTransactions();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: "",
    description: "",
    amount: "",
    payment_method: "",
  });

  const categories = type === 'income' ? incomeCategories : expenseCategories;
  const isEditMode = !!transaction;

  // If transaction prop is provided, open dialog and populate form
  useEffect(() => {
    if (transaction) {
      console.log('📝 Loading transaction for edit:', transaction);
      console.log('Transaction ID:', transaction.id);
      
      setFormData({
        date: transaction.date,
        category: transaction.category,
        description: transaction.description || "",
        amount: transaction.amount.toString(),
        payment_method: transaction.payment_method,
      });
      setOpen(true);
    }
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount || !formData.payment_method) {
      console.error('❌ Missing required fields');
      return;
    }

    const transactionData = {
      date: formData.date,
      type,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      payment_method: formData.payment_method,
    };

    try {
      if (isEditMode) {
        console.log('🔄 Updating transaction:', transaction.id);
        console.log('Update data:', transactionData);
        
        // Make sure we have the ID
        if (!transaction.id) {
          console.error('❌ Cannot update: Transaction ID is missing');
          return;
        }
        
        await updateTransaction({
          id: transaction.id,
          ...transactionData,
        });
      } else {
        console.log('➕ Adding new transaction');
        await addTransaction(transactionData);
      }

      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        category: "",
        description: "",
        amount: "",
        payment_method: "",
      });
      setOpen(false);
      if (onClose) onClose();
    } catch (error) {
      console.error('❌ Error saving transaction:', error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form when closing
      setFormData({
        date: new Date().toISOString().split('T')[0],
        category: "",
        description: "",
        amount: "",
        payment_method: "",
      });
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add {type === 'income' ? 'Income' : 'Expense'}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit' : 'Add'} {type === 'income' ? 'Income' : 'Expense'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (IDR)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="1000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment_method">Payment Method</Label>
            <Select value={formData.payment_method} onValueChange={(value) => setFormData({ ...formData, payment_method: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>{method}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isAdding || isUpdating}>
              {(isAdding || isUpdating) ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Update Transaction" : "Add Transaction")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}