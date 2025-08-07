import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { JobMetrics } from "@/components/dashboard/JobMetrics";
import { TechnicianMap } from "@/components/dashboard/TechnicianMap";
import { ExportButton } from "@/components/dashboard/ExportButton";

export default function FieldOperations() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Field Operations Dashboard</h1>
            <p className="text-muted-foreground">Monitor technician activities, job performance, and real-time field operations</p>
          </div>
          <ExportButton dashboardName="field-operations-dashboard" />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Job Metrics - Stacked Layout */}
          <JobMetrics />
          
          {/* Live Technician Tracking - Full Width */}
          <TechnicianMap />
        </div>
      </div>
    </DashboardLayout>
  );
}