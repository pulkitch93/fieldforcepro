import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const technicianData = [
  { id: 1, name: "Mike Johnson", location: "Downtown", status: "active", jobsToday: 6, completed: 4 },
  { id: 2, name: "Sarah Chen", location: "Westside", status: "active", jobsToday: 5, completed: 5 },
  { id: 3, name: "David Miller", location: "Northtown", status: "delayed", jobsToday: 7, completed: 3 },
  { id: 4, name: "Lisa Wong", location: "Eastside", status: "active", jobsToday: 4, completed: 4 },
  { id: 5, name: "James Brown", location: "Southside", status: "break", jobsToday: 5, completed: 2 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "success";
    case "delayed": return "destructive";
    case "break": return "warning";
    default: return "default";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active": return CheckCircle;
    case "delayed": return AlertTriangle;
    case "break": return Clock;
    default: return MapPin;
  }
};

export function TechnicianMap() {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Live Technician Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simulated map area */}
        <div className="relative bg-muted/30 rounded-lg h-48 mb-4 flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
          <p className="text-muted-foreground text-sm">Interactive Map View</p>
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="text-xs">Live Updates</Badge>
          </div>
        </div>
        
        {/* Technician list */}
        <div className="space-y-3">
          {technicianData.map((tech) => {
            const StatusIcon = getStatusIcon(tech.status);
            return (
              <div key={tech.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <StatusIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{tech.name}</p>
                    <p className="text-xs text-muted-foreground">{tech.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(tech.status) as any} className="text-xs">
                    {tech.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {tech.completed}/{tech.jobsToday}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}