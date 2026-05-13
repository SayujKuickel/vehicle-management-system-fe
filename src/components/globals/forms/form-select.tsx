"use client";

import {
  useController,
  FieldPath,
  FieldValues,
  Control,
} from "react-hook-form";
import { SelectHTMLAttributes } from "react";

interface Option {
  value: string | number;
  label: string;
}

export interface FormSelectProps<
  T extends FieldValues,
> extends SelectHTMLAttributes<HTMLSelectElement> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  description?: string;
  error?: string;
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  description,
  error,
  ...selectProps
}: FormSelectProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select
        id={name}
        {...field}
        {...selectProps}
        aria-invalid={error ? "true" : "false"}
        className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
