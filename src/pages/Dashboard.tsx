import { 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Star,
  MapPin
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { HorizontalFilterPanel } from "@/components/dashboard/HorizontalFilterPanel";
import { ExportButton } from "@/components/dashboard/ExportButton";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">PestPac Command Center</h1>
            <p className="text-muted-foreground">Monitor performance, optimize operations, and drive growth</p>
          </div>
          <ExportButton dashboardName="dashboard" />
        </div>

        {/* Horizontal Filter Panel */}
        <HorizontalFilterPanel />

        {/* Main Content */}
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard
              title="Revenue (MTD)"
              value="$67,430"
              change={{ value: 12.5, period: "last month" }}
              icon={DollarSign}
              variant="success"
            />
            <KPICard
              title="Job Completion Rate"
              value="94.2%"
              change={{ value: 3.1, period: "last week" }}
              icon={CheckCircle}
              variant="success"
            />
            <KPICard
              title="Avg. Time per Job"
              value="1.8 hrs"
              change={{ value: -8.3, period: "last month" }}
              icon={Clock}
              variant="accent"
            />
            <KPICard
              title="Customer Satisfaction"
              value="4.7/5"
              change={{ value: 2.1, period: "last quarter" }}
              icon={Star}
              variant="warning"
            />
            <KPICard
              title="Active Technicians"
              value="23"
              icon={Users}
              variant="default"
            />
            <KPICard
              title="Missed Appointments"
              value="7"
              change={{ value: -12.0, period: "yesterday" }}
              icon={AlertTriangle}
              variant="destructive"
            />
            <KPICard
              title="Revenue Growth"
              value="+18.4%"
              change={{ value: 5.2, period: "vs target" }}
              icon={TrendingUp}
              variant="success"
            />
            <KPICard
              title="Routes Optimized"
              value="15"
              icon={MapPin}
              variant="accent"
            />
          </div>

          {/* Revenue Chart - Full Width */}
          <RevenueChart />
        </div>
      </div>
    </DashboardLayout>
  );
}