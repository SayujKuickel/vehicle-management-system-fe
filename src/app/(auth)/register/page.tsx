"use client";

import { RegistrationForm } from "@/components/forms/registration-form";
import { SITE_ROUTES } from "@/config/site-routes";
import { type RegistrationFormData } from "@/schemas/auth";
import { authService } from "@/services/auth";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object" && "message" in data) {
      return String(data.message);
    }
  }

  return error instanceof Error ? error.message : "Registration failed";
}

const Register = () => {
  const router = useRouter();

  const handleRegistration = async (data: RegistrationFormData) => {
    try {
      await authService.register(data.role, {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        password: data.password,
        phone: data.phone || undefined,
        address: data.address || undefined,
        vehicleNumber: data.vehicleNumber || undefined,
      });

      toast.success("Account created");
      router.push(SITE_ROUTES.LOGIN);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Register as customer or staff</p>
        </div>
        <RegistrationForm onSubmit={handleRegistration} />
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            className="text-primary underline-offset-4 hover:underline"
            href={SITE_ROUTES.LOGIN}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
