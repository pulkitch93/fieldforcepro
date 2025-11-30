import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, Clock } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Construction className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">{title}</CardTitle>
            <CardDescription className="text-lg mt-2">
              {description || "This module is currently under development"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <p className="text-lg">Development work is in progress. Stay tuned!</p>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              We're working hard to bring you this feature. Check back soon for updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
