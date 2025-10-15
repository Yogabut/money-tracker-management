import { useMemo } from "react";
import { Transaction } from "@/data/transactions";
import { Period } from "@/components/PeriodFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from "recharts";

interface ChartSectionProps {
  transactions: Transaction[];
  period: Period;
}

export default function ChartSection({ transactions, period }: ChartSectionProps) {

    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const balance = income - expense;

        return { income, expense, balance };
    }, [transactions]);

    // Income vs Expense trend data - calculated based on period
    const trendData = useMemo(() => {
        const groupedData: { [key: string]: { income: number, expense: number, label: string, sortKey: string } } = {};

        transactions.forEach(t => {
            const date = new Date(t.date);
            let key: string;
            let label: string;
            let sortKey: string;

            switch (period) {
                case 'daily':
                    // Group by hour
                    key = `${date.getHours()}`;
                    label = `${String(date.getHours()).padStart(2, '0')}:00`;
                    sortKey = key.padStart(2, '0');
                    break;
                    
                case 'weekly':
                    // Group by day of week
                    { const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    const dayIndex = date.getDay();
                    key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                    label = days[dayIndex];
                    sortKey = key;
                    break; }
                    
                case 'monthly':
                    // Group by day
                    key = `${date.getDate()}`;
                    label = String(date.getDate());
                    sortKey = key.padStart(2, '0');
                    break;
                    
                case 'yearly':
                    // Group by month
                    // eslint-disable-next-line no-case-declarations
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    // eslint-disable-next-line no-case-declarations
                    const monthIndex = date.getMonth();
                    key = `${monthIndex}`;
                    label = months[monthIndex];
                    sortKey = key.padStart(2, '0');
                    break;
                    
                default:
                    key = '';
                    label = '';
                    sortKey = '';
            }

            if (!groupedData[key]) {
                groupedData[key] = { income: 0, expense: 0, label, sortKey };
            }

            if (t.type === 'income') {
                groupedData[key].income += t.amount;
            } else {
                groupedData[key].expense += t.amount;
            }
        });

        // Convert to array and sort
        return Object.entries(groupedData)
            .sort(([, a], [, b]) => {
                if (period === 'weekly') {
                    return a.sortKey.localeCompare(b.sortKey);
                }
                return a.sortKey.localeCompare(b.sortKey);
            })
            .map(([, data]) => ({
                month: data.label,
                income: data.income,
                expense: data.expense
            }));
    }, [transactions, period]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Category expense data
    const categoryData = useMemo(() => {
        const categories: { [key: string]: number } = {};
        transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                categories[t.category] = (categories[t.category] || 0) + t.amount;
            });
        
        return Object.entries(categories)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value); // Sort by value descending
    }, [transactions]);

    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

    // Dynamic chart title based on period
    const getPeriodLabel = () => {
        switch (period) {
            case 'daily': return 'Today';
            case 'weekly': return 'Last 7 Days';
            case 'monthly': return 'This Month';
            case 'yearly': return 'This Year';
            default: return '';
        }
    };

    return (
        <div>
            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Income vs Expense Trend - {getPeriodLabel()}</CardTitle>
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
                        <CardTitle>Expense by Category - {getPeriodLabel()}</CardTitle>
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
                        <CardTitle>Category Distribution - {getPeriodLabel()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => stats.expense > 0 ? `${entry.name}: ${((entry.value / stats.expense) * 100).toFixed(1)}%` : entry.name}
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
                        <CardTitle>Overview - {getPeriodLabel()}</CardTitle>
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