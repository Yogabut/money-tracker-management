import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTransactions } from "@/hooks/useTransactions";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Assistant() {
  const { transactions, isLoading: transactionsLoading } = useTransactions();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your personal finance assistant. I can analyze your transactions and provide insights. Ask me anything about your finances!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const prepareTransactionContext = () => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    
    return {
      totalTransactions: transactions.length,
      totalIncome: income,
      totalExpense: expense,
      balance,
      recentTransactions: transactions.slice(0, 10)
    };
  };

  const calculateStats = (filterMonth?: number) => {
    let filteredTransactions = [...transactions];
    
    // Filter by month if specified
    if (filterMonth !== undefined) {
      filteredTransactions = transactions.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === filterMonth;
      });
    }

    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpense;
    const savingsRatio = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

    const expensesByCategory = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const incomeByCategory = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const sortedExpenseCategories = Object.entries(expensesByCategory)
      .sort(([, a], [, b]) => b - a);

    const sortedIncomeCategories = Object.entries(incomeByCategory)
      .sort(([, a], [, b]) => b - a);

    // Monthly breakdown
    const monthlyData: Record<string, { income: number; expense: number }> = {};
    filteredTransactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        monthlyData[monthKey].income += t.amount;
      } else {
        monthlyData[monthKey].expense += t.amount;
      }
    });

    return {
      totalIncome,
      totalExpense,
      balance,
      savingsRatio,
      expensesByCategory,
      incomeByCategory,
      sortedExpenseCategories,
      sortedIncomeCategories,
      transactionCount: filteredTransactions.length,
      monthlyData,
      transactions: filteredTransactions,
    };
  };

  const getMonthNumber = (monthName: string): number | undefined => {
    const months: Record<string, number> = {
      'january': 0, 'januari': 0, 'jan': 0,
      'february': 1, 'februari': 1, 'feb': 1,
      'march': 2, 'maret': 2, 'mar': 2,
      'april': 3, 'apr': 3,
      'may': 4, 'mei': 4,
      'june': 5, 'juni': 5, 'jun': 5,
      'july': 6, 'juli': 6, 'jul': 6,
      'august': 7, 'agustus': 7, 'aug': 7, 'agu': 7,
      'september': 8, 'sep': 8,
      'october': 9, 'oktober': 9, 'oct': 9, 'okt': 9,
    };
    return months[monthName.toLowerCase()];
  };

  const callAI = async (userMessage: string) => {
    try {
      const context = prepareTransactionContext();
      
      const { data, error } = await supabase.functions.invoke('chat-finance', {
        body: {
          message: userMessage,
          context: context
        }
      });

      if (error) throw error;
      return data.response;
    } catch (error) {
      console.error('AI Error:', error);
      return "I apologize, but I'm having trouble processing your request. Please try again.";
    }
  };

  const getDummyResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if asking about specific month
    let monthFilter: number | undefined;
    const monthMatch = lowerMessage.match(/\b(january|januari|february|februari|march|maret|april|may|mei|june|juni|july|juli|august|agustus|september|october|oktober|jan|feb|mar|apr|jun|jul|aug|agu|sep|oct|okt)\b/i);
    if (monthMatch) {
      monthFilter = getMonthNumber(monthMatch[0]);
    }

    const stats = calculateStats(monthFilter);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
    const periodText = monthFilter !== undefined ? ` for ${monthNames[monthFilter]} 2025` : ' (January - October 2025)';

    // Income queries
    if (lowerMessage.includes('income') || lowerMessage.includes('pendapatan')) {
      if (lowerMessage.includes('highest') || lowerMessage.includes('terbesar')) {
        const [category, amount] = stats.sortedIncomeCategories[0] || ['N/A', 0];
        return `Your highest income source${periodText} is ${category} with ${formatCurrency(amount)}.`;
      }
      
      if (lowerMessage.includes('category') || lowerMessage.includes('breakdown') || lowerMessage.includes('detail')) {
        const incomeBreakdown = stats.sortedIncomeCategories
          .map(([cat, amount]) => {
            const percentage = (amount / stats.totalIncome) * 100;
            return `• ${cat}: ${formatCurrency(amount)} (${percentage.toFixed(1)}%)`;
          })
          .join('\n');
        return `Your total income${periodText} is ${formatCurrency(stats.totalIncome)}.\n\nIncome breakdown:\n${incomeBreakdown}`;
      }

      return `Your total income${periodText} is ${formatCurrency(stats.totalIncome)}.`;
    }

    // Expense queries
    if (lowerMessage.includes('expense') || lowerMessage.includes('spend') || lowerMessage.includes('pengeluaran')) {
      if (lowerMessage.includes('category') || lowerMessage.includes('breakdown') || lowerMessage.includes('detail')) {
        const categoryBreakdown = stats.sortedExpenseCategories
          .map(([cat, amount]) => {
            const percentage = (amount / stats.totalExpense) * 100;
            return `• ${cat}: ${formatCurrency(amount)} (${percentage.toFixed(1)}%)`;
          })
          .join('\n');
        return `Your total expenses${periodText} are ${formatCurrency(stats.totalExpense)}.\n\nExpense by category:\n${categoryBreakdown}`;
      }
      
      if (stats.sortedExpenseCategories.length > 0) {
        return `Your total expenses${periodText} are ${formatCurrency(stats.totalExpense)}. Your highest spending category is ${stats.sortedExpenseCategories[0][0]} with ${formatCurrency(stats.sortedExpenseCategories[0][1])}.`;
      }
      
      return `Your total expenses${periodText} are ${formatCurrency(stats.totalExpense)}.`;
    }

    // Balance queries
    if (lowerMessage.includes('balance') || lowerMessage.includes('saldo')) {
      const advice = stats.balance > 0 
        ? `Great job! You're managing your finances well.` 
        : `You're spending more than earning. Consider reducing expenses.`;
      return `Your balance${periodText} is ${formatCurrency(stats.balance)}.\n\n💰 Total Income: ${formatCurrency(stats.totalIncome)}\n💸 Total Expense: ${formatCurrency(stats.totalExpense)}\n📊 Savings Ratio: ${stats.savingsRatio.toFixed(1)}%\n\n${advice}`;
    }

    // Savings queries
    if (lowerMessage.includes('saving') || lowerMessage.includes('tabungan')) {
      const advice = stats.savingsRatio > 50 
        ? 'Excellent job! You\'re saving more than half your income.' 
        : stats.savingsRatio > 30 
        ? 'Good job! Keep maintaining this savings rate.' 
        : stats.savingsRatio > 10 
        ? 'Consider reducing expenses to save more.' 
        : 'Warning: Your savings rate is very low. Review your expenses.';
      
      return `Your savings ratio${periodText} is ${stats.savingsRatio.toFixed(1)}%.\n\nYou're saving ${formatCurrency(stats.balance)} out of ${formatCurrency(stats.totalIncome)} income.\n\n${advice}`;
    }

    // Highest/Most queries
    if (lowerMessage.includes('highest') || lowerMessage.includes('most') || lowerMessage.includes('terbesar')) {
      if (stats.sortedExpenseCategories.length > 0) {
        const [category, amount] = stats.sortedExpenseCategories[0];
        const percentage = (amount / stats.totalExpense) * 100;
        return `Your highest spending category${periodText} is ${category} with ${formatCurrency(amount)}, which is ${percentage.toFixed(1)}% of your total expenses.`;
      }
    }

    // Specific category queries
    const categoryMatch = lowerMessage.match(/\b(food|transport|shopping|bills|entertainment|healthcare|education|salary|freelance|business|investment)\b/i);
    if (categoryMatch) {
      const category = categoryMatch[0].charAt(0).toUpperCase() + categoryMatch[0].slice(1);
      const expenseAmount = stats.expensesByCategory[category] || 0;
      const incomeAmount = stats.incomeByCategory[category] || 0;
      
      if (expenseAmount > 0) {
        const percentage = (expenseAmount / stats.totalExpense) * 100;
        return `You spent ${formatCurrency(expenseAmount)} on ${category}${periodText}. This is ${percentage.toFixed(1)}% of your total expenses.`;
      } else if (incomeAmount > 0) {
        const percentage = (incomeAmount / stats.totalIncome) * 100;
        return `You earned ${formatCurrency(incomeAmount)} from ${category}${periodText}. This is ${percentage.toFixed(1)}% of your total income.`;
      } else {
        return `You have no transactions in the ${category} category${periodText}.`;
      }
    }

    // Recent transactions
    if (lowerMessage.includes('transaction') || lowerMessage.includes('recent') || lowerMessage.includes('latest') || lowerMessage.includes('terakhir')) {
      const recent = stats.transactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
      const list = recent
        .map(t => `${t.date} - ${t.type === 'income' ? '💰' : '💸'} ${t.category}: ${formatCurrency(t.amount)} (${t.description})`)
        .join('\n');
      return `Your 5 most recent transactions${periodText}:\n\n${list}`;
    }

    // Monthly comparison
    if (lowerMessage.includes('compare') || lowerMessage.includes('comparison') || lowerMessage.includes('month')) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
      const monthlyBreakdown = Object.entries(stats.monthlyData)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, data]) => {
          const [, monthNum] = month.split('-');
          const monthName = months[parseInt(monthNum) - 1];
          const balance = data.income - data.expense;
          return `${monthName}: Income ${formatCurrency(data.income)}, Expense ${formatCurrency(data.expense)}, Balance ${formatCurrency(balance)}`;
        })
        .join('\n');
      
      return `Monthly breakdown:\n\n${monthlyBreakdown}`;
    }

    // Summary
    if (lowerMessage.includes('summary') || lowerMessage.includes('overview') || lowerMessage.includes('ringkasan')) {
      const topExpense = stats.sortedExpenseCategories[0] || ['N/A', 0];
      const topIncome = stats.sortedIncomeCategories[0] || ['N/A', 0];
      
      return `Financial Summary${periodText}:\n\n💰 Total Income: ${formatCurrency(stats.totalIncome)}\n💸 Total Expense: ${formatCurrency(stats.totalExpense)}\n💵 Balance: ${formatCurrency(stats.balance)}\n📊 Savings Ratio: ${stats.savingsRatio.toFixed(1)}%\n📈 Total Transactions: ${stats.transactionCount}\n\n🔝 Top Income: ${topIncome[0]} (${formatCurrency(topIncome[1])})\n🔝 Top Expense: ${topExpense[0]} (${formatCurrency(topExpense[1])})`;
    }

    // Help/Default response
    return "I can help you with questions about your finances (Jan-Oct 2025). Try asking:\n\n• What's my income?\n• Show my expense breakdown\n• What's my balance?\n• What's my highest spending category?\n• Show recent transactions\n• Give me a summary\n• Compare monthly data\n• How much did I spend on [category]?\n• What's my income in [month]?";
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await callAI(messageText);
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  if (transactionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">Your personal finance advisor (Jan-Oct 2025)</p>
        </div>
      </div>

      <Card className="flex flex-col" style={{ height: 'calc(110vh - 16rem)' }}>
        <CardHeader className="border-b flex-shrink-0">
          <CardTitle className="text-lg">Chat with Finance Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-6"
          >
            <div className="space-y-4 py-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-3",
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold">
                        {message.sender === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-foreground"><User className="opacity-70"/></span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border-t bg-background flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about your finances..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={handleSend} size="icon" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}