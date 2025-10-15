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
  // JANUARY 2025
  {
    id: 1,
    date: '2025-01-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 2,
    date: '2025-01-03',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 280000,
    payment_method: 'Cash'
  },
  {
    id: 3,
    date: '2025-01-05',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 80000,
    payment_method: 'E-Wallet'
  },
  {
    id: 4,
    date: '2025-01-08',
    type: 'expense',
    category: 'Entertainment',
    description: 'Cinema',
    amount: 150000,
    payment_method: 'Credit Card'
  },
  {
    id: 5,
    date: '2025-01-10',
    type: 'expense',
    category: 'Bills',
    description: 'Internet Bill',
    amount: 450000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 6,
    date: '2025-01-12',
    type: 'income',
    category: 'Freelance',
    description: 'Logo Design',
    amount: 1500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 7,
    date: '2025-01-15',
    type: 'expense',
    category: 'Shopping',
    description: 'Electronics',
    amount: 3200000,
    payment_method: 'Credit Card'
  },
  {
    id: 8,
    date: '2025-01-18',
    type: 'expense',
    category: 'Food',
    description: 'Restaurant',
    amount: 420000,
    payment_method: 'E-Wallet'
  },
  {
    id: 9,
    date: '2025-01-20',
    type: 'expense',
    category: 'Transport',
    description: 'Grab/Taxi',
    amount: 125000,
    payment_method: 'E-Wallet'
  },
  {
    id: 10,
    date: '2025-01-22',
    type: 'expense',
    category: 'Healthcare',
    description: 'Pharmacy',
    amount: 185000,
    payment_method: 'Cash'
  },
  {
    id: 11,
    date: '2025-01-25',
    type: 'income',
    category: 'Business',
    description: 'Online Store Sales',
    amount: 2800000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 12,
    date: '2025-01-28',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 340000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 13,
    date: '2025-01-30',
    type: 'expense',
    category: 'Education',
    description: 'Books',
    amount: 350000,
    payment_method: 'Debit Card'
  },

  // FEBRUARY 2025
  {
    id: 14,
    date: '2025-02-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 15,
    date: '2025-02-02',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 310000,
    payment_method: 'Cash'
  },
  {
    id: 16,
    date: '2025-02-04',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 85000,
    payment_method: 'E-Wallet'
  },
  {
    id: 17,
    date: '2025-02-07',
    type: 'expense',
    category: 'Entertainment',
    description: 'Concert Tickets',
    amount: 650000,
    payment_method: 'Credit Card'
  },
  {
    id: 18,
    date: '2025-02-10',
    type: 'income',
    category: 'Freelance',
    description: 'Web Development',
    amount: 3500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 19,
    date: '2025-02-12',
    type: 'expense',
    category: 'Bills',
    description: 'Water Bill',
    amount: 120000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 20,
    date: '2025-02-14',
    type: 'expense',
    category: 'Shopping',
    description: 'Valentine Gift',
    amount: 580000,
    payment_method: 'Credit Card'
  },
  {
    id: 21,
    date: '2025-02-16',
    type: 'expense',
    category: 'Food',
    description: 'Dinner Date',
    amount: 495000,
    payment_method: 'E-Wallet'
  },
  {
    id: 22,
    date: '2025-02-18',
    type: 'expense',
    category: 'Healthcare',
    description: 'Dental Checkup',
    amount: 750000,
    payment_method: 'Debit Card'
  },
  {
    id: 23,
    date: '2025-02-20',
    type: 'income',
    category: 'Business',
    description: 'Product Sales',
    amount: 1900000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 24,
    date: '2025-02-23',
    type: 'expense',
    category: 'Transport',
    description: 'Car Service',
    amount: 850000,
    payment_method: 'Cash'
  },
  {
    id: 25,
    date: '2025-02-26',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 360000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 26,
    date: '2025-02-28',
    type: 'expense',
    category: 'Education',
    description: 'Online Course',
    amount: 950000,
    payment_method: 'Credit Card'
  },

  // MARCH 2025
  {
    id: 27,
    date: '2025-03-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 28,
    date: '2025-03-03',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 295000,
    payment_method: 'Cash'
  },
  {
    id: 29,
    date: '2025-03-05',
    type: 'income',
    category: 'Investment',
    description: 'Dividend',
    amount: 1250000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 30,
    date: '2025-03-07',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 90000,
    payment_method: 'E-Wallet'
  },
  {
    id: 31,
    date: '2025-03-09',
    type: 'expense',
    category: 'Shopping',
    description: 'Shoes',
    amount: 680000,
    payment_method: 'Credit Card'
  },
  {
    id: 32,
    date: '2025-03-11',
    type: 'expense',
    category: 'Bills',
    description: 'Phone Bill',
    amount: 180000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 33,
    date: '2025-03-14',
    type: 'income',
    category: 'Freelance',
    description: 'UI/UX Design',
    amount: 2800000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 34,
    date: '2025-03-16',
    type: 'expense',
    category: 'Entertainment',
    description: 'Gaming Subscription',
    amount: 250000,
    payment_method: 'Credit Card'
  },
  {
    id: 35,
    date: '2025-03-18',
    type: 'expense',
    category: 'Food',
    description: 'Restaurant',
    amount: 385000,
    payment_method: 'E-Wallet'
  },
  {
    id: 36,
    date: '2025-03-20',
    type: 'expense',
    category: 'Healthcare',
    description: 'Medical Checkup',
    amount: 620000,
    payment_method: 'Debit Card'
  },
  {
    id: 37,
    date: '2025-03-22',
    type: 'income',
    category: 'Business',
    description: 'Consulting Fee',
    amount: 4500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 38,
    date: '2025-03-25',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 375000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 39,
    date: '2025-03-28',
    type: 'expense',
    category: 'Education',
    description: 'Workshop Fee',
    amount: 1200000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 40,
    date: '2025-03-30',
    type: 'expense',
    category: 'Transport',
    description: 'Parking',
    amount: 45000,
    payment_method: 'Cash'
  },

  // APRIL 2025
  {
    id: 41,
    date: '2025-04-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 42,
    date: '2025-04-03',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 320000,
    payment_method: 'Cash'
  },
  {
    id: 43,
    date: '2025-04-05',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 95000,
    payment_method: 'E-Wallet'
  },
  {
    id: 44,
    date: '2025-04-08',
    type: 'income',
    category: 'Freelance',
    description: 'Mobile App Design',
    amount: 4200000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 45,
    date: '2025-04-10',
    type: 'expense',
    category: 'Bills',
    description: 'Internet Bill',
    amount: 450000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 46,
    date: '2025-04-12',
    type: 'expense',
    category: 'Entertainment',
    description: 'Streaming Subscription',
    amount: 189000,
    payment_method: 'Credit Card'
  },
  {
    id: 47,
    date: '2025-04-15',
    type: 'expense',
    category: 'Shopping',
    description: 'Home Decor',
    amount: 1250000,
    payment_method: 'Credit Card'
  },
  {
    id: 48,
    date: '2025-04-17',
    type: 'expense',
    category: 'Food',
    description: 'Cafe',
    amount: 285000,
    payment_method: 'E-Wallet'
  },
  {
    id: 49,
    date: '2025-04-19',
    type: 'income',
    category: 'Business',
    description: 'Online Store Sales',
    amount: 3100000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 50,
    date: '2025-04-21',
    type: 'expense',
    category: 'Healthcare',
    description: 'Vitamins',
    amount: 320000,
    payment_method: 'Cash'
  },
  {
    id: 51,
    date: '2025-04-23',
    type: 'expense',
    category: 'Transport',
    description: 'Toll Fee',
    amount: 65000,
    payment_method: 'E-Wallet'
  },
  {
    id: 52,
    date: '2025-04-26',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 395000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 53,
    date: '2025-04-28',
    type: 'expense',
    category: 'Education',
    description: 'Certification Exam',
    amount: 1850000,
    payment_method: 'Credit Card'
  },
  {
    id: 54,
    date: '2025-04-30',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 275000,
    payment_method: 'Debit Card'
  },

  // MAY 2025
  {
    id: 55,
    date: '2025-05-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 56,
    date: '2025-05-02',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 290000,
    payment_method: 'Cash'
  },
  {
    id: 57,
    date: '2025-05-04',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 88000,
    payment_method: 'E-Wallet'
  },
  {
    id: 58,
    date: '2025-05-06',
    type: 'income',
    category: 'Freelance',
    description: 'Content Writing',
    amount: 1800000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 59,
    date: '2025-05-09',
    type: 'expense',
    category: 'Entertainment',
    description: 'Theme Park',
    amount: 580000,
    payment_method: 'Credit Card'
  },
  {
    id: 60,
    date: '2025-05-11',
    type: 'expense',
    category: 'Bills',
    description: 'Water Bill',
    amount: 135000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 61,
    date: '2025-05-13',
    type: 'expense',
    category: 'Shopping',
    description: 'Clothes',
    amount: 920000,
    payment_method: 'Credit Card'
  },
  {
    id: 62,
    date: '2025-05-15',
    type: 'income',
    category: 'Business',
    description: 'Product Sales',
    amount: 2650000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 63,
    date: '2025-05-17',
    type: 'expense',
    category: 'Healthcare',
    description: 'Eye Checkup',
    amount: 480000,
    payment_method: 'Debit Card'
  },
  {
    id: 64,
    date: '2025-05-19',
    type: 'expense',
    category: 'Food',
    description: 'Restaurant',
    amount: 425000,
    payment_method: 'E-Wallet'
  },
  {
    id: 65,
    date: '2025-05-21',
    type: 'expense',
    category: 'Transport',
    description: 'Car Wash',
    amount: 75000,
    payment_method: 'Cash'
  },
  {
    id: 66,
    date: '2025-05-24',
    type: 'income',
    category: 'Investment',
    description: 'Stock Profit',
    amount: 3200000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 67,
    date: '2025-05-26',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 410000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 68,
    date: '2025-05-29',
    type: 'expense',
    category: 'Education',
    description: 'Software License',
    amount: 650000,
    payment_method: 'Credit Card'
  },
  {
    id: 69,
    date: '2025-05-31',
    type: 'expense',
    category: 'Entertainment',
    description: 'Gaming Purchase',
    amount: 380000,
    payment_method: 'E-Wallet'
  },

  // JUNE 2025
  {
    id: 70,
    date: '2025-06-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 71,
    date: '2025-06-03',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 305000,
    payment_method: 'Cash'
  },
  {
    id: 72,
    date: '2025-06-05',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 92000,
    payment_method: 'E-Wallet'
  },
  {
    id: 73,
    date: '2025-06-07',
    type: 'income',
    category: 'Freelance',
    description: 'Video Editing',
    amount: 2200000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 74,
    date: '2025-06-09',
    type: 'expense',
    category: 'Bills',
    description: 'Phone Bill',
    amount: 195000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 75,
    date: '2025-06-11',
    type: 'expense',
    category: 'Shopping',
    description: 'Gadget Accessories',
    amount: 780000,
    payment_method: 'Credit Card'
  },
  {
    id: 76,
    date: '2025-06-14',
    type: 'expense',
    category: 'Entertainment',
    description: 'Concert',
    amount: 850000,
    payment_method: 'Credit Card'
  },
  {
    id: 77,
    date: '2025-06-16',
    type: 'income',
    category: 'Business',
    description: 'Affiliate Commission',
    amount: 1550000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 78,
    date: '2025-06-18',
    type: 'expense',
    category: 'Food',
    description: 'Food Delivery',
    amount: 195000,
    payment_method: 'E-Wallet'
  },
  {
    id: 79,
    date: '2025-06-20',
    type: 'expense',
    category: 'Healthcare',
    description: 'Gym Membership',
    amount: 550000,
    payment_method: 'Debit Card'
  },
  {
    id: 80,
    date: '2025-06-22',
    type: 'expense',
    category: 'Transport',
    description: 'Grab/Taxi',
    amount: 145000,
    payment_method: 'E-Wallet'
  },
  {
    id: 81,
    date: '2025-06-25',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 425000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 82,
    date: '2025-06-27',
    type: 'expense',
    category: 'Education',
    description: 'Books',
    amount: 485000,
    payment_method: 'Cash'
  },
  {
    id: 83,
    date: '2025-06-29',
    type: 'expense',
    category: 'Food',
    description: 'Restaurant',
    amount: 520000,
    payment_method: 'Credit Card'
  },
  {
    id: 84,
    date: '2025-06-30',
    type: 'income',
    category: 'Other',
    description: 'Gift Money',
    amount: 1000000,
    payment_method: 'Cash'
  },

  // JULY 2025
  {
    id: 85,
    date: '2025-07-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 86,
    date: '2025-07-02',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 315000,
    payment_method: 'Cash'
  },
  {
    id: 87,
    date: '2025-07-04',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 97000,
    payment_method: 'E-Wallet'
  },
  {
    id: 88,
    date: '2025-07-06',
    type: 'income',
    category: 'Freelance',
    description: 'Graphic Design',
    amount: 2900000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 89,
    date: '2025-07-08',
    type: 'expense',
    category: 'Bills',
    description: 'Internet Bill',
    amount: 450000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 90,
    date: '2025-07-10',
    type: 'expense',
    category: 'Entertainment',
    description: 'Movie Tickets',
    amount: 180000,
    payment_method: 'E-Wallet'
  },
  {
    id: 91,
    date: '2025-07-13',
    type: 'expense',
    category: 'Shopping',
    description: 'Furniture',
    amount: 2850000,
    payment_method: 'Credit Card'
  },
  {
    id: 92,
    date: '2025-07-15',
    type: 'income',
    category: 'Business',
    description: 'Online Course Sales',
    amount: 5200000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 93,
    date: '2025-07-17',
    type: 'expense',
    category: 'Healthcare',
    description: 'Doctor Visit',
    amount: 450000,
    payment_method: 'Cash'
  },
  {
    id: 94,
    date: '2025-07-19',
    type: 'expense',
    category: 'Food',
    description: 'Cafe',
    amount: 235000,
    payment_method: 'E-Wallet'
  },
  {
    id: 95,
    date: '2025-07-21',
    type: 'expense',
    category: 'Transport',
    description: 'Car Maintenance',
    amount: 1250000,
    payment_method: 'Debit Card'
  },
  {
    id: 96,
    date: '2025-07-24',
    type: 'income',
    category: 'Investment',
    description: 'Dividend',
    amount: 1850000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 97,
    date: '2025-07-26',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 445000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 98,
    date: '2025-07-28',
    type: 'expense',
    category: 'Education',
    description: 'Online Course',
    amount: 1100000,
    payment_method: 'Credit Card'
  },
  {
    id: 99,
    date: '2025-07-30',
    type: 'expense',
    category: 'Entertainment',
    description: 'Hobby Supplies',
    amount: 520000,
    payment_method: 'Cash'
  },

  // AUGUST 2025
  {
    id: 100,
    date: '2025-08-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 101,
    date: '2025-08-03',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 298000,
    payment_method: 'Cash'
  },
  {
    id: 102,
    date: '2025-08-05',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 89000,
    payment_method: 'E-Wallet'
  },
  {
    id: 103,
    date: '2025-08-07',
    type: 'income',
    category: 'Freelance',
    description: 'Consulting Project',
    amount: 6500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 104,
    date: '2025-08-09',
    type: 'expense',
    category: 'Bills',
    description: 'Water Bill',
    amount: 145000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 105,
    date: '2025-08-11',
    type: 'expense',
    category: 'Shopping',
    description: 'Sportswear',
    amount: 850000,
    payment_method: 'Credit Card'
  },
  {
    id: 106,
    date: '2025-08-13',
    type: 'expense',
    category: 'Entertainment',
    description: 'Music Festival',
    amount: 1200000,
    payment_method: 'Credit Card'
  },
  {
    id: 107,
    date: '2025-08-15',
    type: 'income',
    category: 'Business',
    description: 'Product Sales',
    amount: 3800000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 108,
    date: '2025-08-17',
    type: 'expense',
    category: 'Food',
    description: 'Independence Day Meal',
    amount: 680000,
    payment_method: 'E-Wallet'
  },
  {
    id: 109,
    date: '2025-08-19',
    type: 'expense',
    category: 'Healthcare',
    description: 'Health Supplements',
    amount: 420000,
    payment_method: 'Cash'
  },
  {
    id: 110,
    date: '2025-08-21',
    type: 'expense',
    category: 'Transport',
    description: 'Parking',
    amount: 55000,
    payment_method: 'Cash'
  },
  {
    id: 111,
    date: '2025-08-24',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 460000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 112,
    date: '2025-08-26',
    type: 'expense',
    category: 'Education',
    description: 'Workshop',
    amount: 1500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 113,
    date: '2025-08-28',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 285000,
    payment_method: 'Debit Card'
  },
  {
    id: 114,
    date: '2025-08-30',
    type: 'income',
    category: 'Other',
    description: 'Bonus',
    amount: 2500000,
    payment_method: 'Bank Transfer'
  },

  // SEPTEMBER 2025
// SEPTEMBER 2025
  {
    id: 115,
    date: '2025-09-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 116,
    date: '2025-09-02',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 302000,
    payment_method: 'Cash'
  },
  {
    id: 117,
    date: '2025-09-04',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 93000,
    payment_method: 'E-Wallet'
  },
  {
    id: 118,
    date: '2025-09-06',
    type: 'income',
    category: 'Freelance',
    description: 'Brand Identity Design',
    amount: 3800000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 119,
    date: '2025-09-08',
    type: 'expense',
    category: 'Bills',
    description: 'Phone Bill',
    amount: 210000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 120,
    date: '2025-09-10',
    type: 'expense',
    category: 'Shopping',
    description: 'Electronics',
    amount: 4500000,
    payment_method: 'Credit Card'
  },
  {
    id: 121,
    date: '2025-09-12',
    type: 'expense',
    category: 'Entertainment',
    description: 'Spa & Wellness',
    amount: 680000,
    payment_method: 'Debit Card'
  },
  {
    id: 122,
    date: '2025-09-14',
    type: 'income',
    category: 'Business',
    description: 'Consulting Fee',
    amount: 4200000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 123,
    date: '2025-09-16',
    type: 'expense',
    category: 'Food',
    description: 'Restaurant',
    amount: 485000,
    payment_method: 'E-Wallet'
  },
  {
    id: 124,
    date: '2025-09-18',
    type: 'expense',
    category: 'Healthcare',
    description: 'Medical Checkup',
    amount: 720000,
    payment_method: 'Credit Card'
  },
  {
    id: 125,
    date: '2025-09-20',
    type: 'expense',
    category: 'Transport',
    description: 'Toll Fee',
    amount: 78000,
    payment_method: 'E-Wallet'
  },
  {
    id: 126,
    date: '2025-09-22',
    type: 'income',
    category: 'Investment',
    description: 'Mutual Fund Profit',
    amount: 2400000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 127,
    date: '2025-09-24',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 435000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 128,
    date: '2025-09-26',
    type: 'expense',
    category: 'Education',
    description: 'Professional Certification',
    amount: 2200000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 129,
    date: '2025-09-28',
    type: 'expense',
    category: 'Food',
    description: 'Cafe',
    amount: 265000,
    payment_method: 'E-Wallet'
  },
  {
    id: 130,
    date: '2025-09-30',
    type: 'expense',
    category: 'Entertainment',
    description: 'Movie & Dinner',
    amount: 380000,
    payment_method: 'Credit Card'
  },

  // OCTOBER 2025
  {
    id: 131,
    date: '2025-10-01',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 8500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 132,
    date: '2025-10-03',
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
    amount: 250000,
    payment_method: 'Cash'
  },
  {
    id: 133,
    date: '2025-10-04',
    type: 'expense',
    category: 'Transport',
    description: 'Fuel',
    amount: 75000,
    payment_method: 'E-Wallet'
  },
  {
    id: 134,
    date: '2025-10-05',
    type: 'income',
    category: 'Freelance',
    description: 'Website Project',
    amount: 2500000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 135,
    date: '2025-10-06',
    type: 'expense',
    category: 'Shopping',
    description: 'Clothes',
    amount: 450000,
    payment_method: 'Credit Card'
  },
  {
    id: 136,
    date: '2025-10-07',
    type: 'expense',
    category: 'Bills',
    description: 'Electricity Bill',
    amount: 320000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 137,
    date: '2025-10-08',
    type: 'expense',
    category: 'Entertainment',
    description: 'Movie Tickets',
    amount: 120000,
    payment_method: 'E-Wallet'
  },
  {
    id: 138,
    date: '2025-10-09',
    type: 'income',
    category: 'Business',
    description: 'Online Store Sales',
    amount: 1200000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 139,
    date: '2025-10-10',
    type: 'expense',
    category: 'Healthcare',
    description: 'Medical Checkup',
    amount: 550000,
    payment_method: 'Credit Card'
  },
  {
    id: 140,
    date: '2025-10-11',
    type: 'expense',
    category: 'Education',
    description: 'Course Fee',
    amount: 800000,
    payment_method: 'Bank Transfer'
  },
  {
    id: 140,
    date: '2025-10-15',
    type: 'income',
    category: 'Freelance',
    description: 'Web Project',
    amount: 8000000,
    payment_method: 'Bank Transfer'
  },
];

export const incomeCategories = ['Salary', 'Freelance', 'Business', 'Investment', 'Other'];
export const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other'];
export const paymentMethods = ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'E-Wallet'];