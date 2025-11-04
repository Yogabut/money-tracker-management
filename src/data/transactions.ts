export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  payment_method: string;
}

export const incomeCategories = ['Salary', 'Freelance', 'Business', 'Investment', 'Other'];
export const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other'];
export const paymentMethods = ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'E-Wallet'];
