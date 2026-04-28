"use client";

import {
  useController,
  FieldPath,
  FieldValues,
  Control,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

interface FormInputProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  description?: string;
  error?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  description,
  error,
  ...inputProps
}: FormInputProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <Input
        id={name}
        {...field}
        {...inputProps}
        aria-invalid={error ? "true" : "false"}
      />
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
