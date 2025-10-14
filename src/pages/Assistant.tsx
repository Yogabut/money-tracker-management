import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

  const getDummyResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('income') && lowerMessage.includes('month')) {
      return "Your total income this month is Rp11,000,000. This is 12.5% higher than last month!";
    }
    if (lowerMessage.includes('spend') || lowerMessage.includes('expense')) {
      if (lowerMessage.includes('today')) {
        return "You've spent approximately Rp150,000 today on Food and Transport categories.";
      }
      if (lowerMessage.includes('month')) {
        return "Your total expenses this month are Rp2,565,000. Food is your highest expense category at Rp250,000.";
      }
      if (lowerMessage.includes('year')) {
        return "This year, you've spent approximately Rp52,000,000 across all categories. Your average monthly expense is Rp5,200,000.";
      }
    }
    if (lowerMessage.includes('balance')) {
      return "Your current balance is Rp8,435,000 (Total Income: Rp11,000,000 - Total Expense: Rp2,565,000). You're doing great!";
    }
    if (lowerMessage.includes('category') || lowerMessage.includes('highest')) {
      return "Your highest spending category this month is Education at Rp800,000, followed by Healthcare at Rp550,000.";
    }
    if (lowerMessage.includes('saving')) {
      return "Your savings ratio this month is 76.7%. You're saving Rp8,435,000 out of Rp11,000,000 income. Excellent job!";
    }
    if (lowerMessage.includes('predict') || lowerMessage.includes('next')) {
      return "Based on current trends, your expenses next month are predicted to be around Rp2,700,000, with a potential increase of 5%.";
    }
    if (lowerMessage.includes('compare')) {
      return "Compared to last month, your spending increased by 8.2%. However, your income also increased by 12.5%, so your overall savings improved!";
    }
    if (lowerMessage.includes('food')) {
      return "You spent Rp250,000 on Food this month. This is 9.7% of your total expenses.";
    }
    if (lowerMessage.includes('transport')) {
      return "Your Transport expenses this month are Rp75,000, which is reasonable and 2.9% of total expenses.";
    }

    return "I can help you with questions about your income, expenses, balance, savings, categories, and predictions. Try asking about your monthly income or spending patterns!";
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

      <Card className="h-[calc(100vh-12rem)] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Chat with Finance Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6">
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
                    <p className="text-sm leading-relaxed">{message.text}</p>
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
          </ScrollArea>
          <div className="p-6 border-t bg-background">
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
