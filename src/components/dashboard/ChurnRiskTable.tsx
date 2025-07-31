import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, TrendingDown, Clock } from "lucide-react";

const churnRiskData = [
  {
    customer: "Green Valley Properties",
    riskScore: 0.89,
    topDriver: "Missed Appointments",
    lastService: "15 days ago",
    value: "$2,400",
    recommendation: "Schedule immediate check-in call"
  },
  {
    customer: "Downtown Restaurant Group", 
    riskScore: 0.76,
    topDriver: "Service Quality Issues",
    lastService: "8 days ago",
    value: "$1,800",
    recommendation: "Send senior technician for next visit"
  },
  {
    customer: "Maple Heights HOA",
    riskScore: 0.68,
    topDriver: "Price Sensitivity",
    lastService: "3 days ago", 
    value: "$3,200",
    recommendation: "Offer loyalty discount program"
  },
  {
    customer: "Riverside Medical Center",
    riskScore: 0.61,
    topDriver: "Communication Issues",
    lastService: "12 days ago",
    value: "$4,100",
    recommendation: "Assign dedicated account manager"
  },
  {
    customer: "Sunset Shopping Plaza",
    riskScore: 0.58,
    topDriver: "Scheduling Conflicts",
    lastService: "6 days ago",
    value: "$2,900",
    recommendation: "Increase scheduling flexibility"
  }
];

const getRiskColor = (score: number) => {
  if (score >= 0.8) return "destructive";
  if (score >= 0.6) return "warning";
  return "default";
};

const getRiskIcon = (score: number) => {
  if (score >= 0.8) return AlertTriangle;
  if (score >= 0.6) return TrendingDown;
  return Clock;
};

export function ChurnRiskTable() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Customer Churn Risk Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Top Driver</TableHead>
              <TableHead>Last Service</TableHead>
              <TableHead>Annual Value</TableHead>
              <TableHead>Recommendation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {churnRiskData.map((customer, index) => {
              const RiskIcon = getRiskIcon(customer.riskScore);
              return (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{customer.customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <RiskIcon className="h-4 w-4" />
                      <Badge variant={getRiskColor(customer.riskScore)}>
                        {(customer.riskScore * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.topDriver}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.lastService}</TableCell>
                  <TableCell className="font-medium">{customer.value}</TableCell>
                  <TableCell className="text-sm">{customer.recommendation}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}