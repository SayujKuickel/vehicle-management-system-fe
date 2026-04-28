"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  sidebarConfig,
  type SidebarMenuItem as SidebarMenuItemType,
} from "@/config/sidebar";
import { cn } from "@/lib/utils";
import { ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface DashSidebarProps {
  className?: string;
}

export function DashSidebar({ className }: DashSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (url?: string) => {
    if (!url) return false;
    return pathname === url || pathname.startsWith(url + "/");
  };

  const renderMenuItem = (item: SidebarMenuItemType, index: number) => {
    const hasSubmenu = item.items && item.items.length > 0;
    const isItemExpanded = expandedItems[item.title];
    const Icon = item.icon;

    if (hasSubmenu) {
      return (
        <SidebarMenuItem key={`${item.title}-${index}`}>
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span className="flex-1 text-left">{item.title}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isItemExpanded && "rotate-180",
              )}
            />
          </button>

          {isItemExpanded && (
            <SidebarMenuSub>
              {item.items?.map((subitem, subindex) => (
                <SidebarMenuSubItem key={`${subitem.title}-${subindex}`}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isActive(subitem.url)}
                  >
                    <Link href={subitem.url || "#"} className="text-xs">
                      {subitem.title}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem key={`${item.title}-${index}`}>
        <SidebarMenuButton asChild isActive={isActive(item.url)}>
          <Link href={item.url || "#"}>
            {Icon && <Icon className="h-4 w-4" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className={className}>
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <span className="font-semibold">Vehicle IMS</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarConfig.map((item, index) => renderMenuItem(item, index))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
