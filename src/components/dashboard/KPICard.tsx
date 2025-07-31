import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
  };
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive" | "accent";
  className?: string;
}

const variantStyles = {
  default: "border-border",
  success: "border-success/20 bg-success/5",
  warning: "border-warning/20 bg-warning/5", 
  destructive: "border-destructive/20 bg-destructive/5",
  accent: "border-accent/20 bg-accent/5"
};

const iconStyles = {
  default: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive", 
  accent: "text-accent"
};

export function KPICard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = "default",
  className 
}: KPICardProps) {
  const isPositiveChange = change && change.value > 0;
  const changeColor = isPositiveChange ? "text-success" : "text-destructive";

  return (
    <Card className={cn("transition-all hover:shadow-lg", variantStyles[variant], className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className={cn("h-4 w-4", iconStyles[variant])} />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {change && (
              <div className="flex items-center gap-1 mt-1">
                <Badge 
                  variant={isPositiveChange ? "default" : "destructive"}
                  className="text-xs"
                >
                  {isPositiveChange ? "+" : ""}{change.value}%
                </Badge>
                <span className="text-xs text-muted-foreground">vs {change.period}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}