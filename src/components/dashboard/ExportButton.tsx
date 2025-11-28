import { useState } from "react";
import { Download, FileImage, FileText, FileSpreadsheet, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface ExportButtonProps {
  dashboardName: string;
}

export function ExportButton({ dashboardName }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const generateFileName = (format: string) => {
    const date = getCurrentDate();
    return `fieldforce-pro_${dashboardName}_${date}.${format}`;
  };

  const handleExport = async (format: 'png' | 'pdf' | 'xlsx' | 'pptx') => {
    setIsExporting(true);
    
    try {
      const fileName = generateFileName(format);
      
      // Log export action (simulated)
      console.log(`Export action: ${format.toUpperCase()} - ${fileName} - ${new Date().toISOString()}`);
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Export Successful",
        description: `Dashboard exported as ${fileName}`,
      });
      
      // In a real implementation, this would trigger the actual export
      // For now, we'll just show a success message
      
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the dashboard. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportOptions = [
    {
      icon: FileImage,
      label: "Image (.png)",
      description: "Snapshot of the full dashboard",
      format: "png" as const,
    },
    {
      icon: FileText,
      label: "PDF",
      description: "Print-friendly layout",
      format: "pdf" as const,
    },
    {
      icon: FileSpreadsheet,
      label: "Excel (.xlsx)",
      description: "Tabular data export",
      format: "xlsx" as const,
    },
    {
      icon: Presentation,
      label: "PowerPoint (.pptx)",
      description: "Presentation-ready slides",
      format: "pptx" as const,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2"
          disabled={isExporting}
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {exportOptions.map((option) => (
          <DropdownMenuItem
            key={option.format}
            onClick={() => handleExport(option.format)}
            className="flex items-start gap-3 p-3 cursor-pointer"
            disabled={isExporting}
          >
            <option.icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}