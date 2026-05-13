"use client";

import { FormInput, FormSelect } from "@/components/globals/forms";
import { Button } from "@/components/ui/button";
import { registrationSchema, type RegistrationFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
    defaultValues: {
      role: "customer",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      vehicleNumber: "",
    },
  });

  const onSubmitHandler = async (data: RegistrationFormData) => {
    try {
      setIsLoading(true);
      await onSubmit?.(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4 w-full">
      <FormSelect
        name="role"
        control={control}
        label="Account Type"
        options={[
          { value: "customer", label: "Customer" },
          { value: "staff", label: "Staff" },
        ]}
        error={errors.role?.message}
      />

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
        placeholder="Password"
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

      <FormInput
        name="address"
        control={control}
        label="Address"
        placeholder="Street address"
        description="Optional"
        error={errors.address?.message}
      />

      <FormInput
        name="vehicleNumber"
        control={control}
        label="Vehicle Number"
        placeholder="ABC-1234"
        description="Optional"
        error={errors.vehicleNumber?.message}
      />

      <Button type="submit" disabled={isLoading} className="w-full mt-6">
        {isLoading ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
}
