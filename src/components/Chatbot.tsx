import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
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

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
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
        return "Your total expenses this month are Rp5,795,000. Food is your highest expense category at Rp250,000.";
      }
      if (lowerMessage.includes('year')) {
        return "This year, you've spent approximately Rp52,000,000 across all categories. Your average monthly expense is Rp5,200,000.";
      }
    }
    if (lowerMessage.includes('balance')) {
      return "Your current balance is Rp5,205,000 (Total Income: Rp11,000,000 - Total Expense: Rp5,795,000). You're doing great!";
    }
    if (lowerMessage.includes('category') || lowerMessage.includes('highest')) {
      return "Your highest spending category this month is Healthcare at Rp550,000, followed by Education at Rp800,000.";
    }
    if (lowerMessage.includes('saving')) {
      return "Your savings ratio this month is 47.3%. You're saving Rp5,205,000 out of Rp11,000,000 income. Excellent job!";
    }
    if (lowerMessage.includes('predict') || lowerMessage.includes('next')) {
      return "Based on current trends, your expenses next month are predicted to be around Rp6,000,000, with a potential increase of 3.5%.";
    }
    if (lowerMessage.includes('compare')) {
      return "Compared to last month, your spending increased by 8.2%. However, your income also increased by 12.5%, so your overall savings improved!";
    }
    if (lowerMessage.includes('food')) {
      return "You spent Rp250,000 on Food this month. This is 4.3% of your total expenses.";
    }
    if (lowerMessage.includes('transport')) {
      return "Your Transport expenses this month are Rp75,000, which is reasonable and 1.3% of total expenses.";
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

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Finance Assistant</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
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
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about your finances..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
