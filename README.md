# 💰 FinDash — Personal & Business Finance Dashboard

FinDash is a **modern finance management dashboard** built with **React + Tailwind + shadcn/ui** for tracking **personal and small business income, expenses, and analytics**.  
It is currently a **frontend-only project** using **dummy data**, with plans to integrate **Express + MongoDB / SQL / PostgreSQL** in the next phase.

> 🚀 Repository: [https://github.com/Yogabut/money-tracker-management](https://github.com/Yogabut/money-tracker-management)

---

## ✨ Features

### 📊 Dashboard Overview
- Interactive KPI cards: Total Income, Total Expense, Current Balance, Daily Average Expense  
- Comparison analytics (daily, weekly, monthly, yearly)
- Income & Expense summary boxes with visual charts  
- Trend visualizations (Line, Bar, Pie, and Yearly charts)

### 💵 Income Management
- View and filter all income records  
- Add, edit, or delete income (frontend dummy mode)  
- Summary chart by month or category  

### 💸 Expense Management
- View and filter all expenses  
- Add, edit, or delete expenses (frontend dummy mode)  
- Expense breakdown by category and time period  

### 🤖 AI Chatbot (Finance Assistant)
A smart finance chatbot that helps analyze financial performance using natural language queries such as:
- “What’s my total income this month?”
- “Which category has the highest spending?”
- “How much did I spend on food this week?”
- “Compare my spending with last month.”

### 👤 Single User Mode
Each user (e.g., a family member or business owner) registers individually.  
The system is **not multi-user shared**, but instead designed for **personal or private use** — e.g., one dashboard per person or household.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | **React.js (Vite)** |
| UI Library | **shadcn/ui + TailwindCSS** |
| Charts | **ApexCharts / Recharts** |
| Routing | **React Router** |
| State Management | **Zustand / Context API** |
| Data | **Static JSON (Dummy)** |
| Deployment | **Vercel / Netlify (Recommended)** |

---

## 🗂️ Project Structure

/src
 ┣ components
 ┃ ┣ charts
 ┃ ┃ ┣ IncomeExpenseChart.jsx
 ┃ ┃ ┣ CategoryBarChart.jsx
 ┃ ┃ ┗ CategoryPieChart.jsx
 ┃ ┣ forms
 ┃ ┃ ┣ IncomeForm.jsx
 ┃ ┃ ┗ ExpenseForm.jsx
 ┃ ┣ cards
 ┃ ┃ ┣ DashboardCards.jsx
 ┃ ┃ ┣ IncomeBox.jsx
 ┃ ┃ ┗ ExpenseBox.jsx
 ┃ ┣ tables
 ┃ ┃ ┗ TransactionsTable.jsx
 ┃ ┗ Chatbot.jsx
 ┣ pages
 ┃ ┣ Auth
 ┃ ┃ ┣ Login.jsx
 ┃ ┃ ┗ Register.jsx
 ┃ ┣ Dashboard.jsx
 ┃ ┣ Income.jsx
 ┃ ┣ Expense.jsx
 ┃ ┣ Transactions.jsx
 ┃ ┣ Reports.jsx
 ┃ ┗ Settings.jsx
 ┣ data
 ┃ ┗ transactions.js
 ┣ App.jsx
 ┗ main.jsx


---

## 🧠 Future Enhancements

- 🔐 User authentication with Express + JWT  
- 🗄️ Backend integration (MongoDB / SQL / PostgreSQL)  
- 📈 Predictive analytics for expense forecasting  
- 💬 AI Assistant powered by OpenAI / LLM API  
- 📱 Mobile-responsive dashboard  

---

## 🧾 License

This project is open-source under the **MIT License**.  
Feel free to fork, modify, and contribute.

---

## 👨‍💻 Author

**Developed by [Yoga Asta](https://github.com/Yogabut)**  
---

## 🪪 Meta

**FinDash — Personal & Business Finance Dashboard**  
A modern, insight-driven dashboard for smarter money decisions.

