import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 45000, target: 40000, recurring: 32000 },
  { month: "Feb", revenue: 52000, target: 45000, recurring: 38000 },
  { month: "Mar", revenue: 48000, target: 50000, recurring: 35000 },
  { month: "Apr", revenue: 61000, target: 55000, recurring: 42000 },
  { month: "May", revenue: 58000, target: 60000, recurring: 45000 },
  { month: "Jun", revenue: 67000, target: 65000, recurring: 48000 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Revenue Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-xs"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
              labelClassName="font-medium"
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px"
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              name="Actual Revenue"
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--muted-foreground))", strokeWidth: 2, r: 3 }}
              name="Target"
            />
            <Line 
              type="monotone" 
              dataKey="recurring" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 3 }}
              name="Recurring Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}