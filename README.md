# FieldForce Pro

**Intelligent Field Service Management Platform**

FieldForce Pro is a comprehensive, AI-powered dashboard application designed for field service companies to monitor operations, track technicians, analyze revenue, and leverage predictive insights for business optimization.

---

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Modules & Features](#modules--features)
  - [Marketing Landing Page](#marketing-landing-page)
  - [Command Center Dashboard](#command-center-dashboard)
  - [Field Operations Dashboard](#field-operations-dashboard)
  - [Predictive Insights & AI Copilot](#predictive-insights--ai-copilot)
  - [Analytics](#analytics)
  - [Tracking](#tracking)
  - [Technicians](#technicians)
  - [Customers](#customers)
  - [Scheduling](#scheduling)
  - [Fleet](#fleet)
  - [Revenue](#revenue)
  - [Reports](#reports)
  - [Settings](#settings)
- [WAIVE AI Copilot](#waive-ai-copilot)
- [Export Functionality](#export-functionality)
- [Technical Documentation](#technical-documentation)
- [Project Links](#project-links)
- [Credits](#credits)

---

## Overview

FieldForce Pro provides field service businesses with a unified platform to:

- **Monitor Real-Time Operations**: Track technician locations, job statuses, and daily performance
- **Analyze Business Metrics**: View revenue trends, KPIs, and operational efficiency
- **Leverage AI Insights**: Get predictive analytics, churn risk analysis, and smart recommendations
- **Optimize Workforce**: Monitor technician burnout, route efficiency, and resource allocation
- **Improve Customer Retention**: Identify at-risk customers with AI-powered churn prediction

---

## Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| React | Frontend Framework | 18.3.1 |
| TypeScript | Type Safety | 5.x |
| Vite | Build Tool | 5.x |
| Tailwind CSS | Styling | 3.x |
| shadcn/ui | UI Components | Latest |
| Recharts | Data Visualization | 3.1.2 |
| React Router DOM | Client-side Routing | 6.26.2 |
| TanStack Query | Server State Management | 5.56.2 |
| date-fns | Date Utilities | 3.6.0 |
| Sonner | Toast Notifications | 1.5.0 |
| Lucide React | Icon Library | 0.462.0 |

---

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd fieldforce-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build
```

---

## Modules & Features

### Marketing Landing Page

**Route**: `/` (Default landing page)

#### How It Was Built

The marketing page is a standalone React component (`src/pages/Marketing.tsx`) using Tailwind CSS for styling. It follows a section-based architecture with responsive design patterns.

#### Architecture

```
Marketing.tsx
├── Header Section (Navigation + Logo)
├── Hero Section
│   ├── Headline + Subheadline
│   └── CTA Buttons (Dashboard, Learn More)
├── Features Grid (3-column responsive)
├── Statistics Section
└── Footer (Credits)
```

#### How It Functions

| Section | Implementation | Functionality |
|---------|----------------|---------------|
| **Hero Section** | Gradient background with `bg-gradient-to-br` | Full-width banner with primary headline and two CTAs |
| **CTA Buttons** | `Link` component from react-router-dom | "Get Started" navigates to `/dashboard` |
| **Features Grid** | CSS Grid with `grid-cols-1 md:grid-cols-3` | Responsive 1→3 column layout |
| **Statistics** | Animated counters with `useState` | Display key platform metrics |
| **Footer** | Fixed position with designer credit | Shows "Designed by Pulkit Chaudhary" |

#### Key Code Patterns

```typescript
// Hero gradient background
<div className="bg-gradient-to-br from-primary/10 via-background to-accent/10">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// CTA navigation
<Link to="/dashboard">
  <Button size="lg" className="px-8">Get Started</Button>
</Link>
```

---

### Command Center Dashboard

**Route**: `/dashboard`

#### How It Was Built

The dashboard uses a composite component architecture wrapped in `DashboardLayout`. Each metric and visualization is a separate component, promoting reusability and maintainability.

#### Architecture

```
Dashboard.tsx
├── DashboardLayout
│   ├── DashboardSidebar (collapsible navigation)
│   ├── Main Content
│   │   ├── Header (Page title + Export button)
│   │   ├── HorizontalFilterPanel
│   │   │   ├── DateRangePicker (Calendar component)
│   │   │   ├── BranchSelect
│   │   │   ├── TechnicianSelect
│   │   │   └── ServiceTypeSelect
│   │   ├── KPICard Grid (8 cards, 4x2 grid)
│   │   └── RevenueChart
│   └── DashboardFooter
└── WAIVEChatbot (floating)
```

#### How It Functions

**KPI Cards System**

| Component | Props | Functionality |
|-----------|-------|---------------|
| `KPICard` | `title, value, change, trend, icon, variant` | Displays metric with trend indicator |

```typescript
// KPICard implementation pattern
<KPICard
  title="Revenue (MTD)"
  value="$847,250"
  change={12.5}
  trend="up"
  icon={DollarSign}
  variant="success"
/>

// Trend indicator logic
const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
const trendColor = trend === "up" ? "text-green-600" : "text-red-600";
```

**KPI Metrics (8 Total)**

| Metric | Description | Trend Source | Variant |
|--------|-------------|--------------|---------|
| Revenue (MTD) | Month-to-date revenue | vs last month | `success` |
| Job Completion Rate | % completed jobs | vs last week | `default` |
| Avg. Time per Job | Hours per job | vs last month | `warning` |
| Customer Satisfaction | Rating /5 | vs last quarter | `accent` |
| Active Technicians | Current count | N/A | `default` |
| Missed Appointments | Count | vs yesterday | `destructive` |
| Revenue Growth | Growth % | vs target | `success` |
| Routes Optimized | Count | N/A | `default` |

**Filter System**

```typescript
// Filter state management
const [dateRange, setDateRange] = useState<DateRange>();
const [selectedBranch, setSelectedBranch] = useState<string>();
const [selectedTechnician, setSelectedTechnician] = useState<string>();
const [selectedServiceType, setSelectedServiceType] = useState<string>();

// Filter options
const branches = ["Downtown", "Westside", "Northtown", "Eastside"];
const serviceTypes = ["Residential Pest Control", "Commercial Services", 
                      "Termite Inspection", "Rodent Control"];
```

**Revenue Chart**

Built with Recharts `LineChart`:

```typescript
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={revenueData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
    <Line 
      type="monotone" 
      dataKey="revenue" 
      stroke="hsl(var(--primary))" 
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
```

---

### Field Operations Dashboard

**Route**: `/field-operations`

#### How It Was Built

The Field Operations dashboard combines real-time data visualization with operational metrics. It uses Recharts for pie and bar charts, and a custom map placeholder component for technician tracking.

#### Architecture

```
FieldOperations.tsx
├── DashboardLayout
│   ├── JobMetrics Component
│   │   ├── PieChart (Job Status Distribution)
│   │   └── BarChart (Weekly Performance)
│   └── TechnicianMap Component
│       ├── Map Placeholder
│       └── Technician Status List
```

#### How It Functions

**Job Metrics Component** (`src/components/dashboard/JobMetrics.tsx`)

```typescript
// Job status data structure
const jobStatusData = [
  { name: 'Completed', value: 45, fill: 'hsl(var(--success))' },
  { name: 'In Progress', value: 12, fill: 'hsl(var(--warning))' },
  { name: 'Scheduled', value: 28, fill: 'hsl(var(--primary))' },
  { name: 'Cancelled', value: 3, fill: 'hsl(var(--destructive))' }
];

// Weekly performance data
const weeklyData = [
  { day: 'Mon', completed: 42, scheduled: 45 },
  { day: 'Tue', completed: 38, scheduled: 40 },
  // ... rest of week
];
```

**Pie Chart (Job Status)**

| Status | Color Token | Description |
|--------|-------------|-------------|
| Completed | `--success` | Green - finished jobs |
| In Progress | `--warning` | Yellow - active jobs |
| Scheduled | `--primary` | Blue - upcoming jobs |
| Cancelled | `--destructive` | Red - cancelled jobs |

**Bar Chart (Weekly Performance)**

Compares completed vs scheduled jobs per day using grouped bars:

```typescript
<BarChart data={weeklyData}>
  <Bar dataKey="scheduled" fill="hsl(var(--muted))" name="Scheduled" />
  <Bar dataKey="completed" fill="hsl(var(--primary))" name="Completed" />
</BarChart>
```

**Technician Map Component** (`src/components/dashboard/TechnicianMap.tsx`)

```typescript
// Technician data structure
interface Technician {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'delayed' | 'break';
  jobsCompleted: number;
  jobsTotal: number;
}

// Status badge rendering
const statusColors = {
  active: 'bg-green-500',
  delayed: 'bg-red-500',
  break: 'bg-yellow-500'
};
```

| Status | Indicator | Meaning |
|--------|-----------|---------|
| 🟢 Active | Green dot | Currently working |
| 🔴 Delayed | Red dot | Behind schedule |
| 🟡 Break | Yellow dot | On scheduled break |

---

### Predictive Insights & AI Copilot

**Route**: `/predictive-insights`

#### How It Was Built

This module combines AI-powered analytics with interactive data visualizations. It uses a tab-based interface for different insight categories and integrates multiple chart types for forecasting.

#### Architecture

```
PredictiveInsights.tsx
├── DashboardLayout
│   ├── AIInsightsPanel (Tabs component)
│   │   ├── Tab: Weekly Summary
│   │   ├── Tab: Smart Recommendations
│   │   ├── Tab: Ask Questions (Chat)
│   │   └── Tab: Customer Outreach
│   ├── RevenueForecastChart
│   │   ├── Period Selector (30/60/90 days)
│   │   └── Dual-line Chart (Actual vs Predicted)
│   ├── ChurnRiskTable
│   ├── JobRiskHeatmap
│   └── TechnicianBurnoutWarnings
```

#### How It Functions

**AI Insights Panel** (`src/components/dashboard/AIInsightsPanel.tsx`)

Uses shadcn/ui `Tabs` component:

```typescript
<Tabs defaultValue="summary">
  <TabsList>
    <TabsTrigger value="summary">Weekly Summary</TabsTrigger>
    <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
    <TabsTrigger value="questions">Ask Questions</TabsTrigger>
    <TabsTrigger value="outreach">Customer Outreach</TabsTrigger>
  </TabsList>
  
  <TabsContent value="summary">
    {/* Summary metrics and trends */}
  </TabsContent>
  {/* ... other tabs */}
</Tabs>
```

**Tab Content Details**

| Tab | Component | Functionality |
|-----|-----------|---------------|
| Weekly Summary | Metrics grid + trend list | Executive overview with KPIs |
| Recommendations | Priority-sorted cards | Actionable AI suggestions |
| Ask Questions | Chat interface | Natural language queries |
| Customer Outreach | Message templates | AI-generated outreach |

**Smart Recommendations Structure**

```typescript
interface Recommendation {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  action: string;
}

// Priority badge styling
const priorityColors = {
  critical: 'bg-red-500 text-white',
  high: 'bg-orange-500 text-white',
  medium: 'bg-yellow-500 text-black',
  low: 'bg-blue-500 text-white'
};
```

**Revenue Forecast Chart** (`src/components/dashboard/RevenueForecastChart.tsx`)

```typescript
// Forecast period selection
const [forecastPeriod, setForecastPeriod] = useState<'30' | '60' | '90'>('30');

// Dual-line chart with actual vs predicted
<LineChart data={forecastData}>
  <Line dataKey="actual" stroke="hsl(var(--primary))" name="Actual" />
  <Line dataKey="predicted" stroke="hsl(var(--muted))" strokeDasharray="5 5" name="Forecast" />
</LineChart>

// Service line forecasts
const serviceForecasts = [
  { service: 'Residential', forecast: '$520K', growth: '+12.5%' },
  { service: 'Commercial', forecast: '$420K', growth: '+8.3%' },
  { service: 'Termite', forecast: '$155K', growth: '+15.7%' }
];
```

**Churn Risk Table** (`src/components/dashboard/ChurnRiskTable.tsx`)

```typescript
interface ChurnRiskCustomer {
  customer: string;
  riskScore: number;      // 0-100
  topDriver: string;
  lastService: number;    // days ago
  annualValue: number;
  recommendation: string;
}

// Risk score color coding
const getRiskColor = (score: number) => {
  if (score >= 80) return 'text-red-600 bg-red-100';    // Critical
  if (score >= 60) return 'text-yellow-600 bg-yellow-100'; // Elevated
  return 'text-green-600 bg-green-100';                 // Moderate
};
```

| Risk Level | Score Range | Color | Action Priority |
|------------|-------------|-------|-----------------|
| Critical | 80-100% | 🔴 Red | Immediate intervention |
| Elevated | 60-79% | 🟡 Yellow | Schedule follow-up |
| Moderate | <60% | 🟢 Green | Standard monitoring |

**Technician Burnout Warnings** (`src/components/dashboard/TechnicianBurnoutWarnings.tsx`)

```typescript
interface BurnoutWarning {
  technician: string;
  workloadScore: number;  // 0-100
  hoursThisWeek: number;
  jobsThisWeek: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}
```

---

### Analytics

**Route**: `/analytics`  
**Status**: 🚧 Development in Progress

#### Planned Architecture

```
Analytics.tsx
├── DateRange Selector
├── Metrics Overview Grid
├── Custom Chart Builder
├── Trend Analysis Panel
└── Export Options
```

#### Planned Features

- Advanced business analytics dashboards
- Custom report builder with drag-and-drop
- Multi-dimensional data visualization
- Trend analysis with historical comparison
- Benchmark comparisons

---

### Tracking

**Route**: `/tracking`  
**Status**: 🚧 Development in Progress

#### Planned Architecture

```
Tracking.tsx
├── Live Map Component (Mapbox/Google Maps)
├── Technician List Sidebar
├── Route Playback Controls
├── Geofence Configuration
└── Location History Timeline
```

#### Planned Features

- GPS-based real-time tracking
- Route history and playback
- Geofencing alerts with notifications
- Location-based analytics
- ETA calculations

---

### Technicians

**Route**: `/technicians`  
**Status**: 🚧 Development in Progress

#### Planned Features

- Technician profiles and certifications management
- Performance scorecards with KPIs
- Schedule management interface
- Skills matrix and training tracking
- Availability calendar

---

### Customers

**Route**: `/customers`  
**Status**: 🚧 Development in Progress

#### Planned Features

- Customer database with search and filters
- Complete service history
- Communication logs (calls, emails, notes)
- Preference tracking
- Contract and billing management

---

### Scheduling

**Route**: `/scheduling`  
**Status**: 🚧 Development in Progress

#### Planned Features

- Drag-and-drop scheduling interface
- Automated route optimization
- Capacity planning tools
- Conflict detection and resolution
- Recurring appointment management

---

### Fleet

**Route**: `/fleet`  
**Status**: 🚧 Development in Progress

#### Planned Features

- Vehicle tracking and management
- Maintenance schedules with alerts
- Fuel consumption tracking
- Asset utilization reports
- Vehicle assignment optimization

---

### Revenue

**Route**: `/revenue`  
**Status**: 🚧 Development in Progress

#### Planned Features

- Detailed revenue breakdown by service/region
- Invoice management system
- Payment tracking and reconciliation
- Financial forecasting
- Revenue attribution analysis

---

### Reports

**Route**: `/reports`  
**Status**: 🚧 Development in Progress

#### Planned Features

- Pre-built report templates
- Custom report generation wizard
- Scheduled report delivery via email
- Export to PDF, Excel, PowerPoint
- Report sharing and permissions

---

### Settings

**Route**: `/settings`  
**Status**: 🚧 Development in Progress

#### Planned Features

- User management and invitations
- Role-based permissions (RBAC)
- System configuration
- Integration settings (CRM, ERP, etc.)
- Notification preferences
- Branding customization

---

## WAIVE AI Copilot

**Global Feature** - Available on all dashboard pages

WAIVE (Workforce AI Virtual Expert) is the intelligent assistant built into FieldForce Pro.

### How It Was Built

WAIVE is implemented as a floating component (`src/components/dashboard/WAIVEChatbot.tsx`) using shadcn/ui Dialog and custom chat interface components.

### Architecture

```
WAIVEChatbot.tsx
├── Floating Button (fixed position)
├── Dialog Component
│   ├── Header (title + close button)
│   ├── Message List (ScrollArea)
│   │   ├── User Messages
│   │   └── AI Responses
│   └── Input Area
│       ├── Text Input
│       └── Send Button
```

### How It Functions

```typescript
// Message structure
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Intent detection
const detectIntent = (message: string): 'revenue' | 'technician' | 'customer' | 'general' => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('revenue') || lowerMessage.includes('money')) return 'revenue';
  if (lowerMessage.includes('technician') || lowerMessage.includes('worker')) return 'technician';
  if (lowerMessage.includes('customer') || lowerMessage.includes('client')) return 'customer';
  return 'general';
};

// Response generation based on intent
const generateResponse = (intent: string): string => {
  switch (intent) {
    case 'revenue':
      return 'Revenue is up 12.5% this month. Top performers are...';
    case 'technician':
      return 'Currently 8 technicians active. Mike Chen has the highest...';
    // ... other cases
  }
};
```

### Query Categories

| Query Type | Keywords | Response Type |
|------------|----------|---------------|
| Revenue | "revenue", "money", "earnings", "profit" | Financial analysis, trends, recommendations |
| Technicians | "technician", "worker", "staff", "team" | Performance data, workload, availability |
| Customers | "customer", "client", "satisfaction", "churn" | Customer insights, risk analysis |
| Operations | "efficiency", "route", "schedule", "optimize" | Operational suggestions |
| General | Any other query | Contextual help and guidance |

---

## Export Functionality

**Available on all dashboards**

### How It Was Built

The export functionality is implemented in `src/components/dashboard/ExportButton.tsx` using html2canvas for screenshots and custom formatters for each export type.

### Architecture

```
ExportButton.tsx
├── Dropdown Menu
│   ├── Export as PNG
│   ├── Export as PDF
│   ├── Export as Excel
│   └── Export as PowerPoint
└── Export Handlers
    ├── captureScreenshot()
    ├── generatePDF()
    ├── generateExcel()
    └── generatePowerPoint()
```

### Supported Formats

| Format | Extension | Library | Description |
|--------|-----------|---------|-------------|
| Image | `.png` | html2canvas | Full dashboard snapshot |
| PDF | `.pdf` | jsPDF + html2canvas | Print-friendly A4 landscape |
| Excel | `.xlsx` | Custom formatter | Tabular data in sheets |
| PowerPoint | `.pptx` | Custom formatter | One chart per slide |

### File Naming Convention

```
fieldforce-pro_<dashboard-name>_<yyyy-mm-dd>.<extension>
```

Example: `fieldforce-pro_dashboard_2024-12-07.pdf`

### Implementation Details

```typescript
// Export function signature
const exportDashboard = async (
  format: 'png' | 'pdf' | 'xlsx' | 'pptx',
  dashboardRef: RefObject<HTMLDivElement>,
  dashboardName: string,
  dateRange?: DateRange
) => {
  const filename = `fieldforce-pro_${dashboardName}_${format(new Date(), 'yyyy-MM-dd')}`;
  
  switch (format) {
    case 'png':
      const canvas = await html2canvas(dashboardRef.current);
      // Download as PNG
      break;
    case 'pdf':
      // Generate PDF with proper margins
      break;
    // ... other formats
  }
};
```

---

## Technical Documentation

For detailed technical documentation, see:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Component architecture, data flow diagrams, and system design with Mermaid visualizations
- **[API.md](./API.md)** - Complete API reference for utility functions, hooks, and component props

---

## Project Links

- **Lovable Project**: https://lovable.dev/projects/2240c8da-b18b-4775-8d41-8e8a22561c60
- **Live App**: https://fieldforcepro.lovable.app

---

## Credits

Designed and developed by **Pulkit Chaudhary**

---

*FieldForce Pro - Empowering Field Service Excellence*
