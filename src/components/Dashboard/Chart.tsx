import { useMemo } from "react";
import { transactions } from "@/data/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from "recharts";

export default function ChartSection() {

    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const balance = income - expense;

        return { income, expense, balance };
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        }).format(amount);
    };

  // Income vs Expense trend data
    const trendData = [
        { month: 'Jan', income: 8500000, expense: 4200000 },
        { month: 'Feb', income: 9000000, expense: 4800000 },
        { month: 'Mar', income: 8700000, expense: 4500000 },
        { month: 'Apr', income: 9200000, expense: 5100000 },
        { month: 'May', income: 8900000, expense: 4700000 },
        { month: 'Oct', income: stats.income, expense: stats.expense },
    ];

  // Category expense data
    const categoryData = useMemo(() => {
        const categories: { [key: string]: number } = {};
        transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            categories[t.category] = (categories[t.category] || 0) + t.amount;
        });
        
        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    }, []);

    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

    return (
        <div>
            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2">
            <Card className="shadow-lg">
                <CardHeader>
                <CardTitle>Income vs Expense Trend</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData}>
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-income))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-income))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-expense))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-expense))" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="income" stroke="hsl(var(--chart-income))" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} name="Income" />
                    <Area type="monotone" dataKey="expense" stroke="hsl(var(--chart-expense))" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} name="Expense" />
                    </AreaChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                <CardTitle>Expense by Category</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1}/>
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Bar dataKey="value" fill="url(#barGradient)" name="Amount" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${((entry.value / stats.expense) * 100).toFixed(1)}%`}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                    >
                        {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    />
                    </PieChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Legend />
                    <Bar dataKey="income" fill="hsl(var(--chart-income))" name="Income" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="expense" fill="hsl(var(--chart-expense))" name="Expense" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </div>
        </div>
    );
}
