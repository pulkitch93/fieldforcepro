# FieldForce Pro - API Reference

Comprehensive documentation of all utility functions, hooks, and module methods available in FieldForce Pro.

---

## Table of Contents

- [Utility Functions](#utility-functions)
- [Custom Hooks](#custom-hooks)
- [Toast System](#toast-system)
- [Component APIs](#component-apis)
- [Export Module](#export-module)
- [Filter System](#filter-system)

---

## Utility Functions

### `cn(...inputs: ClassValue[]): string`

**Location**: `src/lib/utils.ts`

Combines and merges Tailwind CSS classes intelligently, handling conflicts and duplicates.

**Parameters**:
| Name | Type | Description |
|------|------|-------------|
| `inputs` | `ClassValue[]` | Any number of class values (strings, arrays, objects) |

**Returns**: `string` - Merged class string

**Example Usage**:

```typescript
import { cn } from "@/lib/utils";

// Basic usage
cn("px-4 py-2", "bg-primary")
// Output: "px-4 py-2 bg-primary"

// Conditional classes
cn("base-class", isActive && "active-class")
// Output: "base-class active-class" (if isActive is true)

// Object syntax
cn("base", { "text-red-500": hasError, "text-green-500": !hasError })

// Handling conflicts (last value wins)
cn("text-sm", "text-lg")
// Output: "text-lg"

// Complex example with variants
cn(
  "inline-flex items-center justify-center",
  variant === "primary" && "bg-primary text-primary-foreground",
  variant === "secondary" && "bg-secondary text-secondary-foreground",
  disabled && "opacity-50 pointer-events-none"
)
```

---

## Custom Hooks

### `useIsMobile(): boolean`

**Location**: `src/hooks/use-mobile.tsx`

Detects if the current viewport is mobile-sized (< 768px).

**Returns**: `boolean` - `true` if viewport width is less than 768px

**Behavior**:
- Uses `window.matchMedia` for efficient resize detection
- Updates on viewport resize
- Returns `undefined` briefly during SSR/hydration

**Example Usage**:

```typescript
import { useIsMobile } from "@/hooks/use-mobile";

function ResponsiveComponent() {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? "flex-col" : "flex-row"}>
      {isMobile ? (
        <MobileNavigation />
      ) : (
        <DesktopNavigation />
      )}
    </div>
  );
}
```

---

### `useToast(): ToastAPI`

**Location**: `src/hooks/use-toast.ts`

Provides toast notification functionality with queue management.

**Returns**: `ToastAPI`

```typescript
interface ToastAPI {
  toasts: ToasterToast[];           // Current toast queue
  toast: (props: Toast) => ToastReturn;  // Create new toast
  dismiss: (toastId?: string) => void;   // Dismiss toast(s)
}

interface ToastReturn {
  id: string;                       // Unique toast identifier
  dismiss: () => void;              // Dismiss this toast
  update: (props: ToasterToast) => void;  // Update toast content
}
```

---

## Toast System

### `toast(props: Toast): ToastReturn`

**Location**: `src/hooks/use-toast.ts`

Creates and displays a toast notification.

**Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `ReactNode` | No | Toast title text |
| `description` | `ReactNode` | No | Toast body content |
| `action` | `ToastActionElement` | No | Action button component |
| `variant` | `"default" \| "destructive"` | No | Toast style variant |
| `duration` | `number` | No | Auto-dismiss time (ms) |

**Example Usage**:

```typescript
import { toast } from "@/hooks/use-toast";

// Basic toast
toast({
  title: "Success!",
  description: "Your changes have been saved.",
});

// Error toast
toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong. Please try again.",
});

// Toast with action
toast({
  title: "File uploaded",
  description: "report.pdf has been uploaded.",
  action: (
    <ToastAction altText="View file" onClick={() => viewFile()}>
      View
    </ToastAction>
  ),
});

// Update existing toast
const { update, dismiss } = toast({ title: "Loading..." });

// Later...
update({ title: "Complete!", description: "Data loaded successfully." });

// Or dismiss
dismiss();
```

### Toast Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `TOAST_LIMIT` | `1` | Maximum simultaneous toasts |
| `TOAST_REMOVE_DELAY` | `1000000` | Delay before removal (ms) |

---

## Component APIs

### KPICard

**Location**: `src/components/dashboard/KPICard.tsx`

Displays key performance indicator with trend visualization.

**Props**:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | KPI metric name |
| `value` | `string \| number` | Yes | Current value |
| `change` | `number` | No | Percentage change |
| `trend` | `"up" \| "down" \| "neutral"` | No | Trend direction |
| `icon` | `LucideIcon` | No | Icon component |
| `variant` | `"default" \| "success" \| "warning" \| "destructive" \| "accent"` | No | Color variant |

**Example**:

```tsx
<KPICard
  title="Revenue (MTD)"
  value="$847,250"
  change={12.5}
  trend="up"
  icon={DollarSign}
  variant="success"
/>
```

---

### HorizontalFilterPanel

**Location**: `src/components/dashboard/HorizontalFilterPanel.tsx`

Provides filtering controls for dashboard data.

**Props**:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onDateRangeChange` | `(range: DateRange) => void` | No | Date selection callback |
| `onBranchChange` | `(branch: string) => void` | No | Branch filter callback |
| `onTechnicianChange` | `(tech: string) => void` | No | Technician filter callback |
| `onServiceTypeChange` | `(type: string) => void` | No | Service type callback |

**Filter Options**:

```typescript
// Branch options
const branches = ["Downtown", "Westside", "Northtown", "Eastside"];

// Service types
const serviceTypes = [
  "Residential Pest Control",
  "Commercial Services",
  "Termite Inspection",
  "Rodent Control"
];
```

---

### WAIVEChatbot

**Location**: `src/components/dashboard/WAIVEChatbot.tsx`

AI-powered chatbot interface for natural language queries.

**Features**:
- Floating button positioned in bottom-right
- Expandable chat dialog
- Context-aware responses about dashboard data
- Message history within session

**Query Categories**:

| Category | Keywords | Response Type |
|----------|----------|---------------|
| Revenue | "revenue", "money", "earnings" | Financial analysis |
| Technicians | "technician", "worker", "staff" | Performance data |
| Customers | "customer", "client", "satisfaction" | Customer insights |
| General | Any other query | Contextual help |

---

### ExportButton

**Location**: `src/components/dashboard/ExportButton.tsx`

Multi-format export functionality for dashboard content.

**Props**:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `dashboardRef` | `RefObject<HTMLDivElement>` | Yes | Reference to exportable content |
| `dashboardName` | `string` | Yes | Name for exported file |
| `dateRange` | `DateRange \| undefined` | No | Current date filter |

**Supported Formats**:

| Format | Extension | Method |
|--------|-----------|--------|
| PNG | `.png` | `html2canvas` |
| PDF | `.pdf` | `jsPDF` + `html2canvas` |
| Excel | `.xlsx` | Table data extraction |
| PowerPoint | `.pptx` | Slide generation |

**File Naming**:

```
fieldforce-pro_<dashboard-name>_<yyyy-mm-dd>.<extension>
```

---

## Export Module

### Export Methods

#### `exportToPNG(element: HTMLElement, filename: string): Promise<void>`

Captures the specified element as a PNG image.

```typescript
// Usage
await exportToPNG(dashboardRef.current, "dashboard-snapshot");
```

#### `exportToPDF(element: HTMLElement, filename: string): Promise<void>`

Generates a print-ready PDF document.

**Features**:
- A4 landscape orientation
- 20mm margins
- White background
- Optimized for printing

```typescript
// Usage
await exportToPDF(dashboardRef.current, "dashboard-report");
```

#### `exportToExcel(data: TableData[], filename: string): void`

Exports tabular data to Excel format.

```typescript
interface TableData {
  sheetName: string;
  headers: string[];
  rows: any[][];
}

// Usage
exportToExcel([
  {
    sheetName: "KPIs",
    headers: ["Metric", "Value", "Change"],
    rows: [
      ["Revenue", "$847,250", "+12.5%"],
      ["Completion Rate", "94.2%", "+2.1%"]
    ]
  }
], "dashboard-data");
```

#### `exportToPowerPoint(charts: ChartData[], filename: string): void`

Creates a presentation with one chart per slide.

```typescript
interface ChartData {
  title: string;
  imageData: string;  // Base64 encoded image
}
```

---

## Filter System

### DateRange Interface

```typescript
interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}
```

### Filter State Management

Filters are managed at the page level and passed down to components:

```typescript
// Dashboard.tsx
const [dateRange, setDateRange] = useState<DateRange>();
const [selectedBranch, setSelectedBranch] = useState<string>();
const [selectedTechnician, setSelectedTechnician] = useState<string>();
const [selectedServiceType, setSelectedServiceType] = useState<string>();

// Filter application
const filteredData = useMemo(() => {
  return data.filter(item => {
    if (dateRange?.from && item.date < dateRange.from) return false;
    if (dateRange?.to && item.date > dateRange.to) return false;
    if (selectedBranch && item.branch !== selectedBranch) return false;
    // ... additional filters
    return true;
  });
}, [data, dateRange, selectedBranch, selectedTechnician, selectedServiceType]);
```

### Active Filter Tags

The filter panel displays active filters as removable tags:

```typescript
interface ActiveFilter {
  type: "dateRange" | "branch" | "technician" | "serviceType";
  label: string;
  value: any;
  onClear: () => void;
}
```

---

## Type Definitions

### Common Types

```typescript
// Trend direction
type TrendDirection = "up" | "down" | "neutral";

// Risk levels
type RiskLevel = "low" | "medium" | "high" | "critical";

// Status indicators
type Status = "active" | "delayed" | "break" | "offline";

// Chart data point
interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

// Technician data
interface Technician {
  id: string;
  name: string;
  location: string;
  status: Status;
  jobsCompleted: number;
  jobsTotal: number;
}

// Customer churn data
interface ChurnRiskCustomer {
  customer: string;
  riskScore: number;
  topDriver: string;
  lastService: number;
  annualValue: number;
  recommendation: string;
}
```

---

## Best Practices

### Using the cn() Utility

```typescript
// ✅ Good - Use for dynamic classes
className={cn("base-styles", condition && "conditional-styles")}

// ✅ Good - Override conflicts intentionally
className={cn("p-4", customPadding && "p-8")}

// ❌ Avoid - Static classes don't need cn()
className={cn("static-class")} // Just use "static-class"
```

### Toast Usage

```typescript
// ✅ Good - Use for user feedback
toast({ title: "Saved", description: "Changes saved successfully." });

// ✅ Good - Use destructive for errors
toast({ variant: "destructive", title: "Error", description: errorMessage });

// ❌ Avoid - Don't overuse for trivial actions
toast({ title: "Clicked" }); // Too noisy
```

### Hook Dependencies

```typescript
// ✅ Good - Include all dependencies
useEffect(() => {
  fetchData(filter);
}, [filter, fetchData]);

// ✅ Good - Use callback for stable references
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

---

*FieldForce Pro API Reference v1.0*
