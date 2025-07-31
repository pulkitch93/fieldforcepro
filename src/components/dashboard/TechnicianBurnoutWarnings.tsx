import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock, Calendar, TrendingUp } from "lucide-react";

const burnoutData = [
  {
    technician: "David Miller",
    hoursThisWeek: 52,
    avgHoursPerDay: 10.4,
    consecutiveDays: 12,
    jobDensity: 0.85,
    burnoutRisk: 0.89,
    warning: "Critical - Exceeding 50hrs/week for 3 weeks",
    recommendation: "Reduce schedule by 20% next week"
  },
  {
    technician: "Sarah Chen",
    hoursThisWeek: 48,
    avgHoursPerDay: 9.6,
    consecutiveDays: 8,
    jobDensity: 0.78,
    burnoutRisk: 0.72,
    warning: "High workload - approaching limits",
    recommendation: "Monitor closely, consider backup support"
  },
  {
    technician: "Mike Johnson",
    hoursThisWeek: 45,
    avgHoursPerDay: 9.0,
    consecutiveDays: 6,
    jobDensity: 0.65,
    burnoutRisk: 0.58,
    warning: "Moderate risk - schedule density increasing",
    recommendation: "Optimize routing to reduce travel time"
  },
  {
    technician: "Lisa Rodriguez",
    hoursThisWeek: 42,
    avgHoursPerDay: 8.4,
    consecutiveDays: 5,
    jobDensity: 0.62,
    burnoutRisk: 0.35,
    warning: "Healthy workload - good performance",
    recommendation: "Maintain current schedule"
  }
];

const getRiskColor = (risk: number) => {
  if (risk >= 0.8) return "destructive";
  if (risk >= 0.6) return "warning";
  return "success";
};

const getRiskLevel = (risk: number) => {
  if (risk >= 0.8) return "CRITICAL";
  if (risk >= 0.6) return "HIGH";
  return "NORMAL";
};

export function TechnicianBurnoutWarnings() {
  const criticalCount = burnoutData.filter(t => t.burnoutRisk >= 0.8).length;
  const highRiskCount = burnoutData.filter(t => t.burnoutRisk >= 0.6 && t.burnoutRisk < 0.8).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Technician Burnout Monitoring
          </div>
          <div className="flex gap-2">
            {criticalCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {criticalCount} Critical
              </Badge>
            )}
            {highRiskCount > 0 && (
              <Badge variant="warning" className="text-xs">
                {highRiskCount} High Risk
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {burnoutData.map((tech, index) => (
            <div key={index} className="p-4 rounded-lg border bg-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{tech.technician}</h4>
                  <p className="text-sm text-muted-foreground">{tech.warning}</p>
                </div>
                <Badge variant={getRiskColor(tech.burnoutRisk)} className="text-xs">
                  {getRiskLevel(tech.burnoutRisk)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Weekly Hours
                  </div>
                  <div className="text-lg font-semibold">{tech.hoursThisWeek}h</div>
                  <Progress value={(tech.hoursThisWeek / 60) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    Avg. Daily Hours
                  </div>
                  <div className="text-lg font-semibold">{tech.avgHoursPerDay}h</div>
                  <Progress value={(tech.avgHoursPerDay / 12) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Consecutive Days
                  </div>
                  <div className="text-lg font-semibold">{tech.consecutiveDays}</div>
                  <Progress value={(tech.consecutiveDays / 14) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Job Density</div>
                  <div className="text-lg font-semibold">{(tech.jobDensity * 100).toFixed(0)}%</div>
                  <Progress value={tech.jobDensity * 100} className="h-2" />
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <div className="text-sm">
                  <span className="font-medium text-primary">Recommendation:</span>{" "}
                  <span className="text-muted-foreground">{tech.recommendation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}