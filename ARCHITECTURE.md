# FieldForce Pro - Architecture Documentation

This document provides a comprehensive overview of the FieldForce Pro application architecture, including folder structure, component hierarchy, data flow, and design patterns.

---

## Table of Contents

- [High-Level Architecture](#high-level-architecture)
- [Folder Structure](#folder-structure)
- [Component Architecture](#component-architecture)
- [Routing Architecture](#routing-architecture)
- [Design System](#design-system)
- [Data Flow](#data-flow)
- [Key Components](#key-components)
- [Styling Architecture](#styling-architecture)
- [State Management](#state-management)
- [Build & Development](#build--development)

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FieldForce Pro                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Routing   │  │    State    │  │      UI Components      │ │
│  │ React Router│  │ React Query │  │       shadcn/ui         │ │
│  └──────┬──────┘  └──────┬──────┘  └────────────┬────────────┘ │
│         │                │                      │               │
│         ▼                ▼                      ▼               │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     Page Components                         ││
│  │  Marketing │ Dashboard │ Field Ops │ Predictive Insights   ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   Dashboard Components                      ││
│  │  KPICard │ Charts │ Tables │ Filters │ AI Copilot          ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Base UI Components                       ││
│  │  Button │ Card │ Table │ Badge │ Dialog │ Tabs │ etc.      ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
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
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── select.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── toast.tsx
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
│   │   ├── Reports.tsx
│   │   ├── Revenue.tsx
│   │   ├── Scheduling.tsx
│   │   ├── Settings.tsx
│   │   ├── Technicians.tsx
│   │   └── Tracking.tsx
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
└── ARCHITECTURE.md             # This file
```

---

## Component Architecture

### Component Hierarchy

```
App.tsx
├── BrowserRouter
│   └── Routes
│       ├── Marketing (/)
│       │
│       ├── DashboardLayout (/dashboard, /field-operations, /predictive-insights)
│       │   ├── DashboardSidebar
│       │   │   └── Navigation Links
│       │   │
│       │   ├── Main Content Area
│       │   │   ├── Page Header
│       │   │   ├── Page Content (varies by route)
│       │   │   └── DashboardFooter
│       │   │
│       │   └── WAIVEChatbot (floating)
│       │
│       └── ComingSoon (placeholder routes)
│
└── Toaster (global notifications)
```

### Component Types

| Type | Location | Purpose |
|------|----------|---------|
| Page Components | `src/pages/` | Route-level components, compose layouts |
| Layout Components | `src/components/dashboard/` | Structural wrappers (DashboardLayout, Sidebar) |
| Feature Components | `src/components/dashboard/` | Business logic (Charts, Tables, AI Panels) |
| UI Components | `src/components/ui/` | Reusable primitives (Button, Card, Input) |

---

## Routing Architecture

### Route Configuration

```typescript
// src/App.tsx

Route Structure:
├── /                     → Marketing.tsx (Landing Page)
├── /dashboard           → Dashboard.tsx (Command Center)
├── /field-operations    → FieldOperations.tsx
├── /predictive-insights → PredictiveInsights.tsx
├── /analytics           → Analytics.tsx (Coming Soon)
├── /tracking            → Tracking.tsx (Coming Soon)
├── /technicians         → Technicians.tsx (Coming Soon)
├── /customers           → Customers.tsx (Coming Soon)
├── /scheduling          → Scheduling.tsx (Coming Soon)
├── /fleet               → Fleet.tsx (Coming Soon)
├── /revenue             → Revenue.tsx (Coming Soon)
├── /reports             → Reports.tsx (Coming Soon)
├── /settings            → Settings.tsx (Coming Soon)
└── /*                    → NotFound.tsx (404)
```

### Navigation Flow

```
┌──────────────┐
│   Marketing  │ ◄─── Public Entry Point
│      (/)     │
└──────┬───────┘
       │
       ▼ Login/Dashboard CTA
┌──────────────────────────────────────────────────────────────┐
│                     Dashboard Layout                          │
│  ┌────────────┐  ┌──────────────────────────────────────────┐│
│  │  Sidebar   │  │            Content Area                   ││
│  │            │  │                                           ││
│  │ ● Dashboard│  │  ┌─────────────────────────────────────┐ ││
│  │ ● Field Ops│──┼─▶│     Current Page Component          │ ││
│  │ ● Insights │  │  │                                     │ ││
│  │ ● Analytics│  │  └─────────────────────────────────────┘ ││
│  │ ● Tracking │  │                                           ││
│  │ ● ...      │  │  ┌─────────────────────────────────────┐ ││
│  │            │  │  │           Footer                     │ ││
│  │            │  │  └─────────────────────────────────────┘ ││
│  └────────────┘  └──────────────────────────────────────────┘│
│                                     ┌───────┐                 │
│                                     │ WAIVE │ ◄── AI Chatbot  │
│                                     └───────┘                 │
└──────────────────────────────────────────────────────────────┘
```

---

## Design System

### Color Tokens (HSL-based)

```css
/* Light Theme - src/index.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --muted: 210 40% 96%;
  --accent: 210 40% 96%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --success: 142.1 76.2% 36.3%;
  --warning: 45.4 93.4% 47.5%;
}
```

### Typography Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-3xl` | 30px | Page titles |
| `text-lg` | 18px | Section headers, card titles |
| `text-sm` | 14px | Body text, labels |
| `text-xs` | 12px | Metadata, badges |

### Component Variants

```typescript
// Button variants
variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

// Badge variants  
variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"

// KPICard variants
variant: "default" | "success" | "warning" | "destructive" | "accent"
```

---

## Data Flow

### Current Architecture (Static Data)

```
┌─────────────────────────────────────────────────────────────┐
│                    Component Layer                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐ │
│  │   KPICard   │    │   Charts    │    │     Tables      │ │
│  │             │    │             │    │                 │ │
│  │ Static Data │    │ Static Data │    │   Static Data   │ │
│  │   (props)   │    │   (const)   │    │    (const)      │ │
│  └─────────────┘    └─────────────┘    └─────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Future Architecture (With Backend)

```
┌─────────────────────────────────────────────────────────────┐
│                    Component Layer                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐ │
│  │   KPICard   │    │   Charts    │    │     Tables      │ │
│  └──────┬──────┘    └──────┬──────┘    └────────┬────────┘ │
│         │                  │                     │          │
│         └──────────────────┼─────────────────────┘          │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              React Query (TanStack Query)               ││
│  │                   State Management                       ││
│  └────────────────────────┬────────────────────────────────┘│
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                               │
│              (Supabase / REST / GraphQL)                     │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database Layer                            │
│                 (PostgreSQL / Supabase)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Components

### DashboardLayout

**Purpose**: Main layout wrapper for all dashboard pages

```typescript
interface DashboardLayout {
  children: React.ReactNode
}

Structure:
├── SidebarProvider
│   ├── DashboardSidebar
│   └── SidebarInset
│       ├── Header (trigger + breadcrumb)
│       ├── Main Content (children)
│       ├── DashboardFooter
│       └── WAIVEChatbot
```

### KPICard

**Purpose**: Display key performance indicators

```typescript
interface KPICardProps {
  title: string
  value: string
  change?: { value: number; period: string }
  icon: LucideIcon
  variant?: "default" | "success" | "warning" | "destructive" | "accent"
}
```

### WAIVEChatbot

**Purpose**: AI-powered conversational assistant

```typescript
Features:
├── Floating action button (always visible)
├── Chat window overlay
├── Message history
├── Context-aware responses
│   ├── Revenue queries
│   ├── Technician queries
│   ├── Customer queries
│   └── Optimization queries
└── Real-time message streaming (simulated)
```

### ExportButton

**Purpose**: Multi-format dashboard export

```typescript
Supported Formats:
├── PNG  - Dashboard snapshot
├── PDF  - Print-friendly layout
├── XLSX - Tabular data
└── PPTX - Presentation slides

File Naming: fieldforce-pro_<dashboard>_<date>.<ext>
```

---

## Styling Architecture

### Layer Stack

```
┌─────────────────────────────────────────┐
│       Component Styles (Tailwind)       │  ← Utility classes
├─────────────────────────────────────────┤
│      shadcn/ui Component Styles         │  ← Component CSS
├─────────────────────────────────────────┤
│     Design Tokens (CSS Variables)       │  ← index.css
├─────────────────────────────────────────┤
│      Tailwind Configuration             │  ← tailwind.config.ts
├─────────────────────────────────────────┤
│         Base CSS Reset                  │  ← Tailwind base
└─────────────────────────────────────────┘
```

### Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

---

## State Management

### Current Approach

- **Local State**: React useState for component-level state
- **URL State**: React Router for navigation state
- **Server State**: React Query (prepared, not yet connected)

### State Locations

| State Type | Location | Example |
|------------|----------|---------|
| UI State | useState | Modal open/close, filter selections |
| Form State | useState | Chat input, filter values |
| Navigation | React Router | Current route, params |
| Server Data | React Query | API responses (future) |

---

## Build & Development

### Scripts

```bash
npm run dev      # Start development server (Vite)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Development Server

- **Port**: 8080 (default)
- **Hot Reload**: Enabled (Vite HMR)
- **Source Maps**: Enabled in development

### Production Build

- **Output**: `dist/` directory
- **Minification**: Terser
- **Tree Shaking**: Enabled
- **Code Splitting**: Automatic per-route

---

## Future Enhancements

### Planned Technical Improvements

1. **Backend Integration**
   - Supabase/Lovable Cloud connection
   - Real-time data subscriptions
   - Authentication system

2. **State Management**
   - Connect React Query to API endpoints
   - Implement optimistic updates
   - Add caching strategies

3. **Performance**
   - Lazy loading for routes
   - Image optimization
   - Virtual scrolling for large lists

4. **Testing**
   - Unit tests with Vitest
   - Component tests with Testing Library
   - E2E tests with Playwright

---

*Architecture Document - FieldForce Pro*
*Designed and developed by Pulkit Chaudhary*
