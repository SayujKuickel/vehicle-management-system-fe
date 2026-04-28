import {
  LayoutDashboard,
  LucideIcon,
  Package,
  Truck,
  LogOut,
} from "lucide-react";
import { SITE_ROUTES } from "./site-routes";

export interface SidebarMenuItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: SidebarMenuItem[];
  isActive?: boolean;
}

export const sidebarConfig: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    url: SITE_ROUTES.DASHBOARD.ROOT,
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Inventory",
    icon: Package,
    items: [
      {
        title: "Parts",
        url: SITE_ROUTES.DASHBOARD.PARTS.ROOT,
      },
      {
        title: "Add Part",
        url: SITE_ROUTES.DASHBOARD.PARTS.ADD,
      },
    ],
  },
  {
    title: "Vendors",
    icon: Truck,
    items: [
      {
        title: "Vendors",
        url: SITE_ROUTES.DASHBOARD.VENDOR.ROOT,
      },
      {
        title: "Add Vendor",
        url: SITE_ROUTES.DASHBOARD.VENDOR.ADD,
      },
    ],
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];
