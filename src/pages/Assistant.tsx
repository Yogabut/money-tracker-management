import { useState, useEffect, useRef } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { transactions } from "@/data/transactions";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your personal finance assistant. Ask me anything about your finances!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
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

  const calculateStats = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpense;
    const savingsRatio = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const sortedCategories = Object.entries(expensesByCategory)
      .sort(([, a], [, b]) => b - a);

    return {
      totalIncome,
      totalExpense,
      balance,
      savingsRatio,
      expensesByCategory,
      sortedCategories,
      transactionCount: transactions.length,
    };
  };

  const getDummyResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const stats = calculateStats();

    if (lowerMessage.includes('income')) {
      const incomeTransactions = transactions.filter(t => t.type === 'income');
      const incomeList = incomeTransactions
        .map(t => `${t.category}: ${formatCurrency(t.amount)} (${t.description})`)
        .join('\n');
      return `Your total income is ${formatCurrency(stats.totalIncome)}.\n\nIncome breakdown:\n${incomeList}`;
    }

    if (lowerMessage.includes('expense') || lowerMessage.includes('spend')) {
      if (lowerMessage.includes('category') || lowerMessage.includes('breakdown')) {
        const categoryBreakdown = stats.sortedCategories
          .map(([cat, amount]) => {
            const percentage = (amount / stats.totalExpense) * 100;
            return `${cat}: ${formatCurrency(amount)} (${percentage.toFixed(1)}%)`;
          })
          .join('\n');
        return `Your total expenses are ${formatCurrency(stats.totalExpense)}.\n\nExpense by category:\n${categoryBreakdown}`;
      }
      return `Your total expenses are ${formatCurrency(stats.totalExpense)}. Your highest spending category is ${stats.sortedCategories[0][0]} with ${formatCurrency(stats.sortedCategories[0][1])}.`;
    }

    if (lowerMessage.includes('balance')) {
      return `Your current balance is ${formatCurrency(stats.balance)}.\n\nTotal Income: ${formatCurrency(stats.totalIncome)}\nTotal Expense: ${formatCurrency(stats.totalExpense)}\nSavings Ratio: ${stats.savingsRatio.toFixed(1)}%`;
    }

    if (lowerMessage.includes('saving')) {
      return `Your savings ratio is ${stats.savingsRatio.toFixed(1)}%. You're saving ${formatCurrency(stats.balance)} out of ${formatCurrency(stats.totalIncome)} income. ${stats.savingsRatio > 50 ? 'Excellent job!' : 'Consider reducing expenses to save more.'}`;
    }

    if (lowerMessage.includes('highest') || lowerMessage.includes('most')) {
      const [category, amount] = stats.sortedCategories[0];
      const percentage = (amount / stats.totalExpense) * 100;
      return `Your highest spending category is ${category} with ${formatCurrency(amount)}, which is ${percentage.toFixed(1)}% of your total expenses.`;
    }

    if (lowerMessage.includes('food')) {
      const foodExpense = stats.expensesByCategory['Food'] || 0;
      const percentage = foodExpense > 0 ? (foodExpense / stats.totalExpense) * 100 : 0;
      return `You spent ${formatCurrency(foodExpense)} on Food. This is ${percentage.toFixed(1)}% of your total expenses.`;
    }

    if (lowerMessage.includes('transport')) {
      const transportExpense = stats.expensesByCategory['Transport'] || 0;
      const percentage = transportExpense > 0 ? (transportExpense / stats.totalExpense) * 100 : 0;
      return `Your Transport expenses are ${formatCurrency(transportExpense)}, which is ${percentage.toFixed(1)}% of total expenses.`;
    }

    if (lowerMessage.includes('transaction') || lowerMessage.includes('recent')) {
      const recent = transactions.slice(-5).reverse();
      const list = recent
        .map(t => `${t.date} - ${t.type === 'income' ? '💰' : '💸'} ${t.category}: ${formatCurrency(t.amount)}`)
        .join('\n');
      return `Your 5 most recent transactions:\n\n${list}`;
    }

    if (lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
      return `Financial Summary:\n\n💰 Total Income: ${formatCurrency(stats.totalIncome)}\n💸 Total Expense: ${formatCurrency(stats.totalExpense)}\n💵 Balance: ${formatCurrency(stats.balance)}\n📊 Savings Ratio: ${stats.savingsRatio.toFixed(1)}%\n📈 Total Transactions: ${stats.transactionCount}\n\nTop Expense: ${stats.sortedCategories[0][0]} (${formatCurrency(stats.sortedCategories[0][1])})`;
    }

    return "I can help you with questions about your income, expenses, balance, savings, categories, and recent transactions. Try asking:\n- What's my income?\n- Show my expense breakdown\n- What's my balance?\n- What's my highest spending category?\n- Show recent transactions\n- Give me a summary";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getDummyResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">Your personal finance advisor</p>
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
                    "flex",
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-3",
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
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
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}