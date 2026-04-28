"use client";

import {
  useController,
  FieldPath,
  FieldValues,
  Control,
} from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface FormCheckboxProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  description?: string;
  error?: string;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  description,
  error,
  ...checkboxProps
}: FormCheckboxProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          {...field}
          {...checkboxProps}
          checked={field.value || false}
          aria-invalid={error ? "true" : "false"}
          className="h-4 w-4 cursor-pointer rounded border border-input accent-primary"
        />
        <label
          htmlFor={name}
          className="ml-2 text-sm font-medium cursor-pointer"
        >
          {label}
        </label>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
