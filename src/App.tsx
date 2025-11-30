import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Marketing from "./pages/Marketing";
import PredictiveInsights from "./pages/PredictiveInsights";
import FieldOperations from "./pages/FieldOperations";
import Analytics from "./pages/Analytics";
import Tracking from "./pages/Tracking";
import Technicians from "./pages/Technicians";
import Customers from "./pages/Customers";
import Scheduling from "./pages/Scheduling";
import Fleet from "./pages/Fleet";
import Revenue from "./pages/Revenue";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Marketing />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/field-operations" element={<FieldOperations />} />
          <Route path="/predictive-insights" element={<PredictiveInsights />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/technicians" element={<Technicians />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
