"use client";

import { RegistrationForm } from "@/components/forms/registration-form";
import { authService } from "@/services/auth";

const Register = () => {
  const handleRegistration = async (data: any) => {
    try {
      const response = await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
        phone: data.phone,
      });

      console.log("Registration successful", response.data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-muted-foreground">Join us to get started</p>
          </div>
          <RegistrationForm onSubmit={handleRegistration} />
        </div>
      </div>
    </div>
  );
};

export default Register;
