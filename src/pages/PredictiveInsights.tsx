import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChurnRiskTable } from "@/components/dashboard/ChurnRiskTable";
import { RevenueForecastChart } from "@/components/dashboard/RevenueForecastChart";
import { JobRiskHeatmap } from "@/components/dashboard/JobRiskHeatmap";
import { TechnicianBurnoutWarnings } from "@/components/dashboard/TechnicianBurnoutWarnings";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { ExportButton } from "@/components/dashboard/ExportButton";

export default function PredictiveInsights() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Predictive Insights & AI Copilot</h1>
            <p className="text-muted-foreground">AI-powered analytics and intelligent recommendations for business optimization</p>
          </div>
          <ExportButton dashboardName="predictive-insights" />
        </div>

        {/* AI Insights Panel - Full Width */}
        <AIInsightsPanel />
        
        {/* Predictive Analytics Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueForecastChart />
          <ChurnRiskTable />
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <JobRiskHeatmap />
          <TechnicianBurnoutWarnings />
        </div>
      </div>
    </DashboardLayout>
  );
}