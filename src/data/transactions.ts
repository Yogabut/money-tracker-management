export interface Transaction {
  id: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  payment_method: string;
}

export const transactions: Transaction[] = [
  {
    id: 1,
    date: '2025-10-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 2,
    date: '2025-10-03',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 250000,
    payment_method: 'Cash'
  },
  {
    id: 3,
    date: '2025-10-04',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 75000,
    payment_method: 'E-Wallet'
  },
  {
    id: 4,
    date: '2025-10-05',
    type: 'income',
    category: 'Freelance',
    description: 'Website Project',
    amount: 2500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 5,
    date: '2025-10-06',
    type: 'expense',
    category: 'Shopping',
    description: 'Clothes',
    amount: 450000,
    payment_method: 'Credit Card'
  },
  {
    id: 6,
    date: '2025-10-07',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 320000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 7,
    date: '2025-10-08',
    type: 'expense',
    category: 'Entertainment',
    description: 'Movie Tickets',
    amount: 120000,
    payment_method: 'E-Wallet'
  },
  {
    id: 8,
    date: '2025-10-09',
    type: 'income',
    category: 'Business',
    description: 'Online Store Sales',
    amount: 1200000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 9,
    date: '2025-10-10',
    type: 'expense',
    category: 'Healthcare',
    description: 'Medical Checkup',
    amount: 550000,
    payment_method: 'Credit Card'
  },
  {
    id: 10,
    date: '2025-10-11',
    type: 'expense',
    category: 'Education',
    description: 'Course Fee',
    amount: 800000,
    payment_method: 'Bank Transfer'
  }
];

export const incomeCategories = ['Salary', 'Freelance', 'Business', 'Investment', 'Other'];
export const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other'];
export const paymentMethods = ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'E-Wallet'];
