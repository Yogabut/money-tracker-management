import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTransactions } from "@/hooks/useTransactions";
import { supabase } from "@/integrations/supabase/client";

const MarkdownText = ({ text }: { text: string }) => {
  const renderText = (content: string) => {
    // Add safety check
    if (!content) return <span>No content</span>;
    
    const parts = content.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="text-sm leading-relaxed whitespace-pre-line">
      {renderText(text || '')}
    </div>
  );
};

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

  const callAI = async (userMessage: string) => {
    try {
      // Format messages untuk edge function
      const conversationMessages = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      conversationMessages.push({
        role: 'user',
        content: userMessage
      });

      console.log('Calling Edge Function with:', {
        messagesCount: conversationMessages.length,
        transactionsCount: transactions?.length || 0
      });
      
      const { data, error } = await supabase.functions.invoke('chat-finance', {
        body: {
          messages: conversationMessages,
          transactions: transactions || [] // Fallback ke empty array
        }
      });

      console.log('Edge Function Response:', data);
      console.log('Edge Function Error:', error);

      if (error) {
        console.error('Supabase Function Error:', error);
        throw error;
      }

      // Safety check for response
      if (!data || !data.response) {
        console.error('Invalid response format:', data);
        return "I apologize, but I received an invalid response. Please try again.";
      }

      return data.response;
    } catch (error) {
      console.error('AI Error:', error);
      return "I apologize, but I'm having trouble processing your request. Please try again.";
    }
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
        text: aiResponse || "Sorry, I couldn't generate a response.",
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
                    <MarkdownText text={message.text} />
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground opacity-70" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
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