import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

const forecastData30 = [
  { period: "Week 1", actual: 85000, forecast: 88000, confidence: "high" },
  { period: "Week 2", actual: 92000, forecast: 91000, confidence: "high" },
  { period: "Week 3", actual: null, forecast: 94000, confidence: "medium" },
  { period: "Week 4", actual: null, forecast: 96000, confidence: "medium" },
];

const forecastData60 = [
  { period: "Month 1", actual: 340000, forecast: 345000, confidence: "high" },
  { period: "Month 2", actual: null, forecast: 365000, confidence: "medium" },
];

const forecastData90 = [
  { period: "Q1", actual: 1020000, forecast: 1035000, confidence: "high" },
  { period: "Q2", actual: null, forecast: 1095000, confidence: "low" },
];

const serviceLineData = [
  { service: "Residential", forecast: 520000, growth: 12.5 },
  { service: "Commercial", forecast: 420000, growth: 8.3 },
  { service: "Termite", forecast: 155000, growth: 15.7 },
];

export function RevenueForecastChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-success" />
          Revenue Forecast & Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="30day" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="30day">30 Days</TabsTrigger>
            <TabsTrigger value="60day">60 Days</TabsTrigger>
            <TabsTrigger value="90day">90 Days</TabsTrigger>
          </TabsList>
          
          <TabsContent value="30day" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData30}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Actual Revenue"
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="60day" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData60}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Actual Revenue"
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="90day" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData90}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Actual Revenue"
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Service Line Forecasts</h4>
          <div className="grid grid-cols-3 gap-4">
            {serviceLineData.map((service, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/20 border">
                <div className="text-sm font-medium">{service.service}</div>
                <div className="text-lg font-bold">${(service.forecast / 1000).toFixed(0)}K</div>
                <Badge variant={service.growth > 10 ? "success" : "default"} className="text-xs">
                  +{service.growth}%
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}