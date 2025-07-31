import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AlertCircle, MapPin } from "lucide-react";
import { useState } from "react";

const heatmapData = [
  { technician: "Mike Johnson", location: "Downtown", noShowRisk: 0.15, lateRisk: 0.25, totalJobs: 8 },
  { technician: "Mike Johnson", location: "Westside", noShowRisk: 0.08, lateRisk: 0.12, totalJobs: 6 },
  { technician: "Sarah Chen", location: "Downtown", noShowRisk: 0.22, lateRisk: 0.18, totalJobs: 9 },
  { technician: "Sarah Chen", location: "Northtown", noShowRisk: 0.05, lateRisk: 0.08, totalJobs: 7 },
  { technician: "David Miller", location: "Westside", noShowRisk: 0.12, lateRisk: 0.28, totalJobs: 5 },
  { technician: "David Miller", location: "Eastside", noShowRisk: 0.19, lateRisk: 0.15, totalJobs: 8 },
  { technician: "Lisa Rodriguez", location: "Northtown", noShowRisk: 0.03, lateRisk: 0.06, totalJobs: 10 },
  { technician: "Lisa Rodriguez", location: "Eastside", noShowRisk: 0.14, lateRisk: 0.11, totalJobs: 6 },
];

const locations = ["all", "Downtown", "Westside", "Northtown", "Eastside"];
const technicians = ["all", "Mike Johnson", "Sarah Chen", "David Miller", "Lisa Rodriguez"];

const getRiskColor = (risk: number, type: "background" | "text" = "background") => {
  if (risk >= 0.2) {
    return type === "background" ? "bg-destructive/20 border-destructive/40" : "text-destructive";
  }
  if (risk >= 0.1) {
    return type === "background" ? "bg-warning/20 border-warning/40" : "text-warning";
  }
  return type === "background" ? "bg-success/20 border-success/40" : "text-success";
};

const getRiskLevel = (risk: number) => {
  if (risk >= 0.2) return "HIGH";
  if (risk >= 0.1) return "MED";
  return "LOW";
};

export function JobRiskHeatmap() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedTechnician, setSelectedTechnician] = useState("all");

  const filteredData = heatmapData.filter(item => {
    return (selectedLocation === "all" || item.location === selectedLocation) &&
           (selectedTechnician === "all" || item.technician === selectedTechnician);
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          Job Risk Heatmap
        </CardTitle>
        <div className="flex gap-4 pt-2">
          <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Technician" />
            </SelectTrigger>
            <SelectContent>
              {technicians.map(tech => (
                <SelectItem key={tech} value={tech}>
                  {tech === "all" ? "All Technicians" : tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location === "all" ? "All Locations" : location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-success/20 border border-success/40"></div>
              <span>Low Risk (0-10%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-warning/20 border border-warning/40"></div>
              <span>Medium Risk (10-20%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-destructive/20 border border-destructive/40"></div>
              <span>High Risk (20%+)</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium truncate">{item.technician}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">No-Show Risk</span>
                    <div className="flex items-center gap-2">
                      <div className={cn("px-2 py-1 rounded text-xs border", getRiskColor(item.noShowRisk))}>
                        {(item.noShowRisk * 100).toFixed(0)}%
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getRiskLevel(item.noShowRisk)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Late Risk</span>
                    <div className="flex items-center gap-2">
                      <div className={cn("px-2 py-1 rounded text-xs border", getRiskColor(item.lateRisk))}>
                        {(item.lateRisk * 100).toFixed(0)}%
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getRiskLevel(item.lateRisk)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t text-xs text-muted-foreground">
                    {item.totalJobs} scheduled jobs today
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}