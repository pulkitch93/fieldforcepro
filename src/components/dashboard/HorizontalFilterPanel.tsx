import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export function HorizontalFilterPanel() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");

  const activeFilters = [
    selectedBranch && selectedBranch !== "all" && { type: "branch", value: selectedBranch },
    selectedTechnician && selectedTechnician !== "all" && { type: "technician", value: selectedTechnician },
    selectedServiceType && selectedServiceType !== "all" && { type: "service", value: selectedServiceType },
    dateRange?.from && { type: "date", value: `${format(dateRange.from, "MMM dd")} - ${dateRange.to ? format(dateRange.to, "MMM dd") : "..."}` },
  ].filter(Boolean);

  const clearFilter = (filterType: string) => {
    switch (filterType) {
      case "branch":
        setSelectedBranch("all");
        break;
      case "technician":
        setSelectedTechnician("all");
        break;
      case "service":
        setSelectedServiceType("all");
        break;
      case "date":
        setDateRange(undefined);
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedBranch("all");
    setSelectedTechnician("all");
    setSelectedServiceType("all");
    setDateRange(undefined);
  };

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Filters & Controls</h3>
      </div>

      {/* Horizontal Filter Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM dd")
                  )
                ) : (
                  <span>Pick dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Branch Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Branch</label>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger>
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="westside">Westside</SelectItem>
              <SelectItem value="northtown">Northtown</SelectItem>
              <SelectItem value="eastside">Eastside</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Technician Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Technician</label>
          <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
            <SelectTrigger>
              <SelectValue placeholder="All Technicians" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Technicians</SelectItem>
              <SelectItem value="mike">Mike Johnson</SelectItem>
              <SelectItem value="sarah">Sarah Chen</SelectItem>
              <SelectItem value="david">David Miller</SelectItem>
              <SelectItem value="lisa">Lisa Wong</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Service Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Service Type</label>
          <Select value={selectedServiceType} onValueChange={setSelectedServiceType}>
            <SelectTrigger>
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="residential">Residential Pest Control</SelectItem>
              <SelectItem value="commercial">Commercial Services</SelectItem>
              <SelectItem value="termite">Termite Inspection</SelectItem>
              <SelectItem value="rodent">Rodent Control</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Filters</span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter.type} variant="secondary" className="flex items-center gap-1">
                {filter.value}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => clearFilter(filter.type)} 
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}