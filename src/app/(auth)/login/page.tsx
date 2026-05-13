"use client";

import { FormInput } from "@/components/globals/forms";
import { Button } from "@/components/ui/button";
import { SITE_ROUTES } from "@/config/site-routes";
import { saveAuthToken } from "@/lib/auth";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { authService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object" && "message" in data) {
      return String(data.message);
    }
  }

  return error instanceof Error ? error.message : "Login failed";
}

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await authService.login(data);

      saveAuthToken(response.data.token);

      toast.success(response.data.message);
      router.push(SITE_ROUTES.DASHBOARD.ROOT);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-muted-foreground">
            Access the vehicle parts inventory system
          </p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <FormInput
            name="email"
            control={control}
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
          />

          <FormInput
            name="password"
            control={control}
            label="Password"
            type="password"
            placeholder="Password"
            error={errors.password?.message}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="flex items-center justify-between text-sm">
          <Link className="text-primary underline-offset-4 hover:underline" href={SITE_ROUTES.REGISTER}>
            Create account
          </Link>
          <Link
            className="text-primary underline-offset-4 hover:underline"
            href={SITE_ROUTES.FORGOT_PASSWORD}
          >
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
