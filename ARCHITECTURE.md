# FieldForce Pro - Architecture Documentation

Comprehensive technical documentation of the FieldForce Pro application architecture, including interactive diagrams, component relationships, and data flow patterns.

---

## Table of Contents

- [High-Level Architecture](#high-level-architecture)
- [System Architecture Diagram](#system-architecture-diagram)
- [Folder Structure](#folder-structure)
- [Component Architecture](#component-architecture)
- [Routing Architecture](#routing-architecture)
- [Data Flow Patterns](#data-flow-patterns)
- [Design System](#design-system)
- [Module Interactions](#module-interactions)
- [State Management](#state-management)
- [Build & Deployment](#build--deployment)

---

## High-Level Architecture

FieldForce Pro is built as a modern single-page application (SPA) using React with TypeScript. The architecture follows a component-based design pattern with clear separation of concerns.

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Browser/Client]
    end
    
    subgraph "Application Layer"
        Router[React Router]
        State[State Management]
        UI[UI Components]
    end
    
    subgraph "Component Layer"
        Pages[Page Components]
        Dashboard[Dashboard Components]
        BaseUI[Base UI Components]
    end
    
    Browser --> Router
    Router --> Pages
    Pages --> Dashboard
    Dashboard --> BaseUI
    State --> Pages
    State --> Dashboard
    UI --> BaseUI
```

---

## System Architecture Diagram

```mermaid
flowchart TB
    subgraph Frontend["FieldForce Pro Frontend"]
        subgraph Routing["Routing Layer"]
            RR[React Router DOM]
            Routes[Route Definitions]
        end
        
        subgraph StateLayer["State Management"]
            RQ[React Query]
            LocalState[Local State]
            Context[React Context]
        end
        
        subgraph ComponentsLayer["Component Architecture"]
            direction TB
            PageComps[Page Components]
            LayoutComps[Layout Components]
            FeatureComps[Feature Components]
            UIComps[UI Components]
        end
        
        subgraph Styling["Styling System"]
            Tailwind[Tailwind CSS]
            DesignTokens[Design Tokens]
            ShadcnUI[shadcn/ui]
        end
    end
    
    subgraph ExternalServices["External Services (Future)"]
        Supabase[(Supabase)]
        Auth[Authentication]
        Storage[File Storage]
    end
    
    RR --> Routes
    Routes --> PageComps
    PageComps --> LayoutComps
    LayoutComps --> FeatureComps
    FeatureComps --> UIComps
    
    RQ --> PageComps
    LocalState --> FeatureComps
    Context --> ComponentsLayer
    
    Tailwind --> UIComps
    DesignTokens --> Tailwind
    ShadcnUI --> UIComps
    
    RQ -.-> Supabase
    Auth -.-> Supabase
    Storage -.-> Supabase
```

---

## Folder Structure

```
fieldforce-pro/
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── assets/                 # Project assets (images, fonts)
│   │
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── AIInsightsPanel.tsx
│   │   │   ├── ChurnRiskTable.tsx
│   │   │   ├── DashboardFooter.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── ExportButton.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── HorizontalFilterPanel.tsx
│   │   │   ├── JobMetrics.tsx
│   │   │   ├── JobRiskHeatmap.tsx
│   │   │   ├── KPICard.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── RevenueForecastChart.tsx
│   │   │   ├── TechnicianBurnoutWarnings.tsx
│   │   │   ├── TechnicianMap.tsx
│   │   │   └── WAIVEChatbot.tsx
│   │   │
│   │   └── ui/                 # Base UI components (shadcn/ui)
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       └── ... (40+ components)
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/                    # Utility functions
│   │   └── utils.ts
│   │
│   ├── pages/                  # Page components (routes)
│   │   ├── Analytics.tsx
│   │   ├── ComingSoon.tsx
│   │   ├── Customers.tsx
│   │   ├── Dashboard.tsx
│   │   ├── FieldOperations.tsx
│   │   ├── Fleet.tsx
│   │   ├── Index.tsx
│   │   ├── Marketing.tsx
│   │   ├── NotFound.tsx
│   │   ├── PredictiveInsights.tsx
│   │   └── ... more pages
│   │
│   ├── App.tsx                 # Root application component
│   ├── App.css                 # Application styles
│   ├── index.css               # Global styles & design tokens
│   ├── main.tsx                # Application entry point
│   └── vite-env.d.ts           # Vite type definitions
│
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── README.md                   # Project documentation
├── API.md                      # API reference
└── ARCHITECTURE.md             # This file
```

---

## Component Architecture

### Component Hierarchy

```mermaid
graph TD
    App[App.tsx]
    
    App --> Router[BrowserRouter]
    Router --> Routes[Routes]
    
    Routes --> Marketing[Marketing Page]
    Routes --> DashboardLayout[DashboardLayout]
    Routes --> ComingSoon[ComingSoon Pages]
    Routes --> NotFound[404 Page]
    
    DashboardLayout --> Sidebar[DashboardSidebar]
    DashboardLayout --> MainContent[Main Content]
    DashboardLayout --> WAIVE[WAIVEChatbot]
    
    Sidebar --> NavLinks[Navigation Links]
    Sidebar --> Logo[FP Logo]
    
    MainContent --> Header[Page Header]
    MainContent --> PageContent[Page Content]
    MainContent --> Footer[DashboardFooter]
    
    subgraph "Dashboard Page"
        PageContent --> Filters[HorizontalFilterPanel]
        PageContent --> KPIGrid[KPI Cards Grid]
        PageContent --> Charts[Revenue Chart]
    end
```

### Component Types

```mermaid
graph LR
    subgraph "Page Components"
        PC1[Dashboard.tsx]
        PC2[FieldOperations.tsx]
        PC3[PredictiveInsights.tsx]
        PC4[Marketing.tsx]
    end
    
    subgraph "Layout Components"
        LC1[DashboardLayout]
        LC2[DashboardSidebar]
        LC3[DashboardHeader]
        LC4[DashboardFooter]
    end
    
    subgraph "Feature Components"
        FC1[KPICard]
        FC2[RevenueChart]
        FC3[JobMetrics]
        FC4[ChurnRiskTable]
        FC5[AIInsightsPanel]
        FC6[WAIVEChatbot]
    end
    
    subgraph "UI Components"
        UI1[Button]
        UI2[Card]
        UI3[Table]
        UI4[Tabs]
        UI5[Badge]
        UI6[Dialog]
    end
    
    PC1 --> LC1
    LC1 --> FC1
    FC1 --> UI1
    FC1 --> UI2
```

### Component Relationships

| Type | Location | Purpose | Examples |
|------|----------|---------|----------|
| Page Components | `src/pages/` | Route-level containers | Dashboard, FieldOperations, Marketing |
| Layout Components | `src/components/dashboard/` | Structural wrappers | DashboardLayout, DashboardSidebar |
| Feature Components | `src/components/dashboard/` | Business logic & visualization | KPICard, RevenueChart, ChurnRiskTable |
| UI Components | `src/components/ui/` | Reusable primitives | Button, Card, Input, Dialog |

---

## Routing Architecture

### Route Configuration

```mermaid
graph TB
    Root["/"] --> Marketing[Marketing.tsx]
    
    subgraph "Protected Dashboard Routes"
        Dashboard["/dashboard"] --> DashboardPage[Dashboard.tsx]
        FieldOps["/field-operations"] --> FieldOpsPage[FieldOperations.tsx]
        Insights["/predictive-insights"] --> InsightsPage[PredictiveInsights.tsx]
    end
    
    subgraph "Coming Soon Routes"
        Analytics["/analytics"] --> AnalyticsPage[Analytics.tsx]
        Tracking["/tracking"] --> TrackingPage[Tracking.tsx]
        Technicians["/technicians"] --> TechPage[Technicians.tsx]
        Customers["/customers"] --> CustPage[Customers.tsx]
        Scheduling["/scheduling"] --> SchedPage[Scheduling.tsx]
        Fleet["/fleet"] --> FleetPage[Fleet.tsx]
        Revenue["/revenue"] --> RevPage[Revenue.tsx]
        Reports["/reports"] --> ReportsPage[Reports.tsx]
        Settings["/settings"] --> SettingsPage[Settings.tsx]
    end
    
    Wildcard["/*"] --> NotFound[NotFound.tsx]
```

### Navigation Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Router
    participant Layout
    participant Page
    
    User->>Browser: Visit URL
    Browser->>Router: Route matching
    Router->>Layout: Render DashboardLayout
    Layout->>Page: Render page component
    Page->>Layout: Page content
    Layout->>Browser: Complete render
    Browser->>User: Display page
```

---

## Data Flow Patterns

### Current Architecture (Static Data)

```mermaid
flowchart LR
    subgraph "Component Layer"
        PC[Page Component]
        FC[Feature Component]
        UI[UI Component]
    end
    
    subgraph "Data Sources"
        Static[Static Data<br/>const arrays]
        Props[Component Props]
        State[Local State]
    end
    
    Static --> PC
    PC --> |props| FC
    FC --> |props| UI
    State --> FC
    Props --> FC
```

### Filter Data Flow

```mermaid
sequenceDiagram
    participant User
    participant FilterPanel
    participant Dashboard
    participant Charts
    participant Tables
    
    User->>FilterPanel: Select date range
    FilterPanel->>Dashboard: onDateRangeChange(range)
    Dashboard->>Dashboard: Update state
    Dashboard->>Charts: Pass filtered data
    Dashboard->>Tables: Pass filtered data
    Charts->>User: Re-render with filters
    Tables->>User: Re-render with filters
```

### Future Architecture (With Backend)

```mermaid
flowchart TB
    subgraph "Frontend"
        Components[React Components]
        RQ[React Query]
        Cache[Query Cache]
    end
    
    subgraph "API Layer"
        REST[REST Endpoints]
        RPC[Supabase RPC]
        Realtime[Realtime Subscriptions]
    end
    
    subgraph "Backend"
        Supabase[(Supabase)]
        Auth[Authentication]
        DB[(PostgreSQL)]
        Storage[File Storage]
    end
    
    Components --> RQ
    RQ --> Cache
    RQ --> REST
    RQ --> RPC
    Realtime --> Components
    
    REST --> Supabase
    RPC --> DB
    Auth --> Supabase
    Storage --> Supabase
```

---

## Design System

### Color Token System

```mermaid
graph TD
    subgraph "CSS Variables"
        Root[":root"]
        Dark[".dark"]
    end
    
    subgraph "Semantic Tokens"
        BG[--background]
        FG[--foreground]
        Primary[--primary]
        Secondary[--secondary]
        Muted[--muted]
        Accent[--accent]
        Destructive[--destructive]
    end
    
    subgraph "Usage"
        Components[Tailwind Classes]
        Custom[Custom CSS]
    end
    
    Root --> BG
    Root --> FG
    Root --> Primary
    Dark --> BG
    Dark --> FG
    
    BG --> Components
    Primary --> Components
    Custom --> Components
```

### Color Token Values

```css
/* Light Theme */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96%;
  --muted: 210 40% 96%;
  --accent: 210 40% 96%;
  --destructive: 0 84.2% 60.2%;
  --success: 142.1 76.2% 36.3%;
  --warning: 45.4 93.4% 47.5%;
}

/* Dark Theme */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### Component Variant System

```mermaid
graph LR
    subgraph "Button Variants"
        BD[default]
        BO[outline]
        BS[secondary]
        BG[ghost]
        BL[link]
        BDe[destructive]
    end
    
    subgraph "Badge Variants"
        BaD[default]
        BaS[secondary]
        BaSu[success]
        BaW[warning]
        BaDe[destructive]
    end
    
    subgraph "KPICard Variants"
        KD[default]
        KS[success]
        KW[warning]
        KDe[destructive]
        KA[accent]
    end
```

---

## Module Interactions

### Dashboard Module Interaction

```mermaid
graph TB
    subgraph "Dashboard Module"
        DashPage[Dashboard Page]
        
        subgraph "Filter System"
            HFilter[HorizontalFilterPanel]
            DatePicker[Date Range Picker]
            BranchFilter[Branch Select]
            TechFilter[Technician Select]
        end
        
        subgraph "Metrics Display"
            KPI1[KPICard - Revenue]
            KPI2[KPICard - Completion]
            KPI3[KPICard - Time/Job]
            KPI4[KPICard - CSAT]
            RevChart[RevenueChart]
        end
        
        subgraph "Export"
            ExportBtn[ExportButton]
            PNG[PNG Export]
            PDF[PDF Export]
            Excel[Excel Export]
            PPTX[PPTX Export]
        end
    end
    
    DashPage --> HFilter
    HFilter --> DatePicker
    HFilter --> BranchFilter
    HFilter --> TechFilter
    
    DashPage --> KPI1
    DashPage --> KPI2
    DashPage --> KPI3
    DashPage --> KPI4
    DashPage --> RevChart
    
    DashPage --> ExportBtn
    ExportBtn --> PNG
    ExportBtn --> PDF
    ExportBtn --> Excel
    ExportBtn --> PPTX
```

### Predictive Insights Module

```mermaid
graph TB
    subgraph "Predictive Insights Module"
        InsightsPage[PredictiveInsights Page]
        
        subgraph "AI Analysis"
            AIPanel[AIInsightsPanel]
            Summary[Weekly Summary Tab]
            Recommendations[Smart Recommendations Tab]
            QA[Ask Questions Tab]
            Outreach[Customer Outreach Tab]
        end
        
        subgraph "Forecasting"
            RevForecast[RevenueForecastChart]
            F30[30-Day Forecast]
            F60[60-Day Forecast]
            F90[90-Day Forecast]
        end
        
        subgraph "Risk Analysis"
            ChurnTable[ChurnRiskTable]
            Heatmap[JobRiskHeatmap]
            Burnout[TechnicianBurnoutWarnings]
        end
    end
    
    InsightsPage --> AIPanel
    AIPanel --> Summary
    AIPanel --> Recommendations
    AIPanel --> QA
    AIPanel --> Outreach
    
    InsightsPage --> RevForecast
    RevForecast --> F30
    RevForecast --> F60
    RevForecast --> F90
    
    InsightsPage --> ChurnTable
    InsightsPage --> Heatmap
    InsightsPage --> Burnout
```

### WAIVE Chatbot Interaction Flow

```mermaid
sequenceDiagram
    participant User
    participant ChatButton
    participant ChatDialog
    participant MessageHandler
    participant ResponseGen
    
    User->>ChatButton: Click to open
    ChatButton->>ChatDialog: Open dialog
    User->>ChatDialog: Type message
    ChatDialog->>MessageHandler: Process message
    MessageHandler->>MessageHandler: Detect intent
    
    alt Revenue Query
        MessageHandler->>ResponseGen: Generate revenue response
    else Technician Query
        MessageHandler->>ResponseGen: Generate tech response
    else Customer Query
        MessageHandler->>ResponseGen: Generate customer response
    else General Query
        MessageHandler->>ResponseGen: Generate help response
    end
    
    ResponseGen->>ChatDialog: Display response
    ChatDialog->>User: Show AI message
```

---

## State Management

### State Architecture

```mermaid
graph TB
    subgraph "Global State"
        Theme[Theme Context]
        Sidebar[Sidebar Context]
        Toast[Toast State]
    end
    
    subgraph "Page State"
        Filters[Filter State]
        DateRange[Date Range]
        Selections[Selected Items]
    end
    
    subgraph "Component State"
        UIState[UI State]
        FormState[Form State]
        DialogState[Dialog Open/Close]
    end
    
    subgraph "Server State (Future)"
        RQ[React Query]
        Cache[Query Cache]
        Mutations[Mutations]
    end
    
    Theme --> Page[Page Components]
    Sidebar --> Layout[Layout Components]
    Toast --> Any[Any Component]
    
    Filters --> Dashboard
    DateRange --> Filters
    
    UIState --> Feature[Feature Components]
    FormState --> Feature
```

### State Flow Pattern

```typescript
// Page-level state management
function Dashboard() {
  // Filter state
  const [dateRange, setDateRange] = useState<DateRange>();
  const [selectedBranch, setSelectedBranch] = useState<string>();
  
  // Computed/filtered data
  const filteredData = useMemo(() => {
    return data.filter(/* filter logic */);
  }, [data, dateRange, selectedBranch]);
  
  return (
    <HorizontalFilterPanel 
      onDateRangeChange={setDateRange}
      onBranchChange={setSelectedBranch}
    />
    <KPICards data={filteredData} />
    <Charts data={filteredData} />
  );
}
```

---

## Build & Deployment

### Build Pipeline

```mermaid
flowchart LR
    subgraph "Development"
        Source[Source Code]
        Vite[Vite Dev Server]
        HMR[Hot Module Reload]
    end
    
    subgraph "Build Process"
        TS[TypeScript Compile]
        Bundle[Rollup Bundle]
        CSS[Tailwind CSS Build]
        Optimize[Tree Shaking & Minification]
    end
    
    subgraph "Output"
        Dist[dist/ folder]
        Assets[Static Assets]
        HTML[index.html]
    end
    
    Source --> Vite
    Vite --> HMR
    
    Source --> TS
    TS --> Bundle
    Bundle --> CSS
    CSS --> Optimize
    Optimize --> Dist
    Dist --> Assets
    Dist --> HTML
```

### Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Environment Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
});
```

---

## Performance Considerations

### Code Splitting Strategy

```mermaid
graph TD
    Entry[main.tsx]
    
    Entry --> Core[Core Bundle]
    Entry --> Routes[Route-based Splitting]
    
    Routes --> Marketing[Marketing Chunk]
    Routes --> Dashboard[Dashboard Chunk]
    Routes --> FieldOps[FieldOps Chunk]
    Routes --> Insights[Insights Chunk]
    
    subgraph "Lazy Loaded"
        Marketing
        Dashboard
        FieldOps
        Insights
    end
```

### Optimization Techniques

1. **Component Lazy Loading**
   ```typescript
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   ```

2. **Memoization**
   ```typescript
   const filteredData = useMemo(() => /* ... */, [deps]);
   const handleClick = useCallback(() => /* ... */, [deps]);
   ```

3. **Virtual Scrolling** (for large lists)
4. **Image Optimization** (lazy loading, proper sizing)

---

## Security Architecture

```mermaid
graph TB
    subgraph "Frontend Security"
        XSS[XSS Prevention]
        CSRF[CSRF Protection]
        Sanitize[Input Sanitization]
    end
    
    subgraph "Future Auth Layer"
        JWT[JWT Tokens]
        Session[Session Management]
        RBAC[Role-Based Access]
    end
    
    subgraph "API Security"
        HTTPS[HTTPS Only]
        RLS[Row Level Security]
        Validation[Request Validation]
    end
    
    XSS --> React[React Auto-escaping]
    CSRF --> SameSite[SameSite Cookies]
    JWT --> Supabase[Supabase Auth]
    RLS --> DB[(Database)]
```

---

*FieldForce Pro Architecture Documentation v1.0*

*Designed and developed by Pulkit Chaudhary*
