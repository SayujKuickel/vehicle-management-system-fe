"use client";

import { SITE_ROUTES } from "@/config/site-routes";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    authService.logout();
    router.replace(SITE_ROUTES.LOGIN);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">Logging out...</p>
    </div>
  );
};

export default Logout;
