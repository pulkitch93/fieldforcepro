import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Lightbulb, MessageSquare, FileText, Send, ExternalLink } from "lucide-react";
import { useState } from "react";

const weeklyInsights = {
  summary: "This week showed strong performance with 12.5% revenue growth and improved job completion rates. However, Downtown region is experiencing higher-than-normal no-show rates (22% vs 8% average), primarily affecting Sarah Chen's routes.",
  keyMetrics: [
    { metric: "Revenue", value: "$67,430", change: "+12.5%", status: "up" },
    { metric: "Job Completion", value: "94.2%", change: "+3.1%", status: "up" },
    { metric: "Customer Satisfaction", value: "4.7/5", change: "+2.1%", status: "up" },
    { metric: "No-Show Rate", value: "7%", change: "+2.3%", status: "down" }
  ],
  trends: [
    "Residential pest control showing strongest growth (+15.7%)",
    "Downtown appointments having delivery issues",
    "Technician utilization rates improving across all regions",
    "Customer response times decreased by 18 minutes on average"
  ]
};

const smartRecommendations = [
  {
    category: "Scheduling Optimization",
    priority: "High",
    insight: "Mike Johnson's route efficiency could improve by 23% with adjusted scheduling. Recommend shifting 3 afternoon appointments to morning slots.",
    action: "View Route Optimization",
    link: "#route-optimizer"
  },
  {
    category: "Customer Retention", 
    priority: "Critical",
    insight: "Green Valley Properties shows 89% churn risk. Last missed appointment and price sensitivity detected. Immediate intervention needed.",
    action: "View Customer Details",
    link: "#customer-details"
  },
  {
    category: "Resource Management",
    priority: "Medium", 
    insight: "Termite inspection demand surging in Westside region (+35%). Consider reallocating specialist technicians from Northtown.",
    action: "View Demand Analysis",
    link: "#demand-analysis"
  },
  {
    category: "Quality Assurance",
    priority: "Medium",
    insight: "Service quality scores declining for commercial accounts. Pattern indicates training opportunity for customer communication.",
    action: "View Quality Metrics",
    link: "#quality-metrics"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical": return "destructive";
    case "High": return "warning";
    case "Medium": return "default";
    default: return "default";
  }
};

export function AIInsightsPanel() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "assistant",
      message: "Hi! I'm your PestPac AI assistant. Ask me about your dashboard data, trends, or get recommendations for improving operations."
    }
  ]);

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    // Add user question
    const newHistory = [...chatHistory, { type: "user", message: question }];
    
    // Generate mock AI response based on question
    let response = "Based on your current dashboard data, ";
    if (question.toLowerCase().includes("revenue")) {
      response += "your revenue is trending positively at +12.5% growth this month. The strongest performers are residential services (+15.7%) and termite inspections (+15.7%). I recommend focusing marketing efforts on these high-growth segments.";
    } else if (question.toLowerCase().includes("technician")) {
      response += "your technicians show varying performance levels. David Miller needs immediate attention due to burnout risk (89%), while Lisa Rodriguez maintains optimal performance. Consider redistributing workload and optimizing routes.";
    } else if (question.toLowerCase().includes("customer")) {
      response += "customer satisfaction remains strong at 4.7/5, but watch for churn risks. Green Valley Properties (89% churn risk) needs immediate outreach. Review the Customer Churn Risk table for detailed action items.";
    } else {
      response += "I can help analyze any aspect of your dashboard. Try asking about revenue trends, technician performance, customer satisfaction, or operational efficiency.";
    }
    
    newHistory.push({ type: "assistant", message: response });
    setChatHistory(newHistory);
    setQuestion("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI-Powered Business Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Weekly Summary</TabsTrigger>
            <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
            <TabsTrigger value="chat">Ask Questions</TabsTrigger>
            <TabsTrigger value="outreach">Customer Outreach</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/20 border">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Executive Summary</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {weeklyInsights.summary}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {weeklyInsights.keyMetrics.map((metric, index) => (
                <div key={index} className="p-3 rounded-lg border bg-card">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <Badge variant={metric.status === "up" ? "success" : "destructive"} className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold mt-1">{metric.value}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Key Trends Detected</h4>
              <ul className="space-y-2">
                {weeklyInsights.trends.map((trend, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            {smartRecommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{rec.category}</span>
                  </div>
                  <Badge variant={getPriorityColor(rec.priority)} className="text-xs">
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rec.insight}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {rec.action}
                </Button>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-4">
            <div className="h-64 p-4 rounded-lg border bg-muted/10 overflow-y-auto space-y-3">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted border"
                  }`}>
                    {message.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about your dashboard data, trends, or get recommendations..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleAskQuestion())}
                className="flex-1"
                rows={2}
              />
              <Button onClick={handleAskQuestion} disabled={!question.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="outreach" className="space-y-4">
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Customer Outreach Suggestions</h4>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/20 border">
                  <div className="font-medium text-sm">Green Valley Properties</div>
                  <div className="text-xs text-muted-foreground mb-2">High Churn Risk - Last Contact: 15 days ago</div>
                  <div className="text-sm leading-relaxed">
                    "Hi [Customer], We noticed we missed your recent appointment and want to make it right. 
                    We're offering a 15% service credit for the inconvenience and would like to schedule a senior technician 
                    for your next visit. When would be a good time to discuss your pest control needs?"
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Send Message
                  </Button>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/20 border">
                  <div className="font-medium text-sm">Riverside Medical Center</div>
                  <div className="text-xs text-muted-foreground mb-2">Communication Issues - Last Contact: 12 days ago</div>
                  <div className="text-sm leading-relaxed">
                    "Dear [Customer], We want to ensure clear communication for all your pest control needs. 
                    We're assigning a dedicated account manager to your account and implementing weekly check-ins. 
                    Please let us know your preferred communication method and timing."
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}