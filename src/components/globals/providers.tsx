"use client";

import React from "react";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      {children}
      <Toaster position="top-right" richColors />
    </SidebarProvider>
  );
};

export default Providers;
