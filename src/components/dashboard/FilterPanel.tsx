import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function FilterPanel() {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filters & Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Range Picker */}
        <div>
          <label className="text-sm font-medium mb-2 block">Date Range</label>
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
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
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
        <div>
          <label className="text-sm font-medium mb-2 block">Branch</label>
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
        <div>
          <label className="text-sm font-medium mb-2 block">Technician</label>
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
        <div>
          <label className="text-sm font-medium mb-2 block">Service Type</label>
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

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
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
      </CardContent>
    </Card>
  );
}