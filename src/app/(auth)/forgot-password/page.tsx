"use client";

import { Button } from "@/components/ui/button";
import { SITE_ROUTES } from "@/config/site-routes";
import { authService } from "@/services/auth";
import Link from "next/link";

const ForgotPassword = () => {
  const isSupported = authService.supportsPasswordRecovery();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">
            Password recovery is not exposed by the current Auth API contract.
          </p>
        </div>

        <Button disabled={!isSupported} className="w-full">
          Password recovery unavailable
        </Button>

        <Link
          className="block text-sm text-primary underline-offset-4 hover:underline"
          href={SITE_ROUTES.LOGIN}
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
