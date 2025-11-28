import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  MapPin, 
  Calendar,
  DollarSign,
  TrendingUp,
  Settings,
  Home,
  Truck,
  UserCheck,
  Brain
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Field Operations", url: "/field-operations", icon: UserCheck },
  { title: "Predictive Insights & AI", url: "/predictive-insights", icon: Brain },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Live Tracking", url: "/tracking", icon: MapPin },
  { title: "Technicians", url: "/technicians", icon: UserCheck },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Scheduling", url: "/scheduling", icon: Calendar },
  { title: "Fleet Management", url: "/fleet", icon: Truck },
  { title: "Revenue", url: "/revenue", icon: DollarSign },
  { title: "Reports", url: "/reports", icon: TrendingUp },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-card border-r`} collapsible="icon">
      <SidebarContent>
        {/* Logo and Title */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PP</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-primary">FieldForce Pro</h2>
                <p className="text-xs text-muted-foreground">Command Center</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
            {collapsed ? "" : "MAIN MENU"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${getNavClasses({ isActive })}`
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}