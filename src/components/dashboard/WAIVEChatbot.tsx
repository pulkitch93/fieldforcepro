import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "waive";
  timestamp: Date;
}

export function WAIVEChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm WAIVE, your AI business intelligence assistant. I can help you analyze your data, identify trends, and provide actionable insights. What would you like to know about your business performance?",
      sender: "waive",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: "waive",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("revenue") || lowerQuery.includes("sales")) {
      return "Based on your current data, revenue is up 12.5% this month at $67,430. The strongest performing service lines are residential pest control (+18%) and commercial contracts (+15%). I recommend focusing on upselling commercial clients and expanding residential services in high-performance areas.";
    }
    
    if (lowerQuery.includes("technician") || lowerQuery.includes("staff")) {
      return "Your technician performance shows 94.2% job completion rate. Mike Johnson and Sarah Chen are top performers with 100% completion rates. David Miller in Northtown may need route optimization - he's currently delayed with only 43% completion today. Consider redistributing jobs or providing additional support.";
    }
    
    if (lowerQuery.includes("customer") || lowerQuery.includes("satisfaction")) {
      return "Customer satisfaction is strong at 4.7/5 stars. Recent feedback indicates customers appreciate punctual service and thorough explanations. The main complaint areas are scheduling flexibility and follow-up communication. I suggest implementing automated appointment reminders and post-service surveys.";
    }
    
    if (lowerQuery.includes("optimize") || lowerQuery.includes("efficiency")) {
      return "I've identified several optimization opportunities: 1) Route efficiency can be improved by 12% in the Northtown area, 2) Average job time of 1.8 hours is 8.3% better than last month - maintain this trend, 3) Consider consolidating morning appointments to reduce travel time between jobs.";
    }

    return "I can help you analyze revenue trends, technician performance, customer satisfaction, route optimization, and operational efficiency. Try asking about specific metrics or areas you'd like to improve. For example: 'How can I increase revenue?' or 'Which technicians need support?'";
  };

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 z-50"
          size="icon"
        >
          <div className="relative">
            <Bot className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-success rounded-full animate-pulse" />
          </div>
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-96 shadow-2xl z-50 bg-background border">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-lg">WAIVE</CardTitle>
              <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                AI Assistant
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask WAIVE about your business data..."
                  className="min-h-[40px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="h-10 w-10"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}