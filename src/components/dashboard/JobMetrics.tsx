import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

const jobStatusData = [
  { name: "Completed", value: 156, color: "hsl(var(--success))" },
  { name: "In Progress", value: 23, color: "hsl(var(--primary))" },
  { name: "Scheduled", value: 89, color: "hsl(var(--accent))" },
  { name: "Cancelled", value: 12, color: "hsl(var(--destructive))" },
];

const dailyJobsData = [
  { day: "Mon", completed: 32, scheduled: 38 },
  { day: "Tue", completed: 28, scheduled: 35 },
  { day: "Wed", completed: 45, scheduled: 42 },
  { day: "Thu", completed: 38, scheduled: 45 },
  { day: "Fri", completed: 52, scheduled: 48 },
  { day: "Sat", completed: 41, scheduled: 38 },
  { day: "Sun", completed: 35, scheduled: 32 },
];

export function JobMetrics() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Job Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Job Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={jobStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {jobStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value, name]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {jobStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Job Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Weekly Job Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyJobsData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Bar 
                dataKey="completed" 
                fill="hsl(var(--success))" 
                radius={[2, 2, 0, 0]}
                name="Completed"
              />
              <Bar 
                dataKey="scheduled" 
                fill="hsl(var(--primary))" 
                radius={[2, 2, 0, 0]}
                name="Scheduled"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}