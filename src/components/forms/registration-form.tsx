"use client";

import { Button } from "@/components/ui/button";
import { registrationSchema, type RegistrationFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/globals/forms";

interface RegistrationFormProps {
  onSubmit?: (data: RegistrationFormData) => Promise<void> | void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmitHandler = async (data: RegistrationFormData) => {
    try {
      setIsLoading(true);
      if (onSubmit) {
        await onSubmit(data);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4 w-full">
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="firstName"
          control={control}
          label="First Name"
          placeholder="John"
          error={errors.firstName?.message}
        />
        <FormInput
          name="lastName"
          control={control}
          label="Last Name"
          placeholder="Doe"
          error={errors.lastName?.message}
        />
      </div>

      <FormInput
        name="userName"
        control={control}
        label="Username"
        placeholder="johndoe"
        error={errors.userName?.message}
      />

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
        placeholder="••••••••"
        error={errors.password?.message}
      />

      <FormInput
        name="phone"
        control={control}
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        description="Optional"
        error={errors.phone?.message}
      />

      <Button type="submit" disabled={isLoading} className="w-full mt-6">
        {isLoading ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
}
