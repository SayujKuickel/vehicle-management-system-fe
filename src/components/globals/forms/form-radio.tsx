"use client";

import {
  useController,
  FieldPath,
  FieldValues,
  Control,
} from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface FormRadioProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  description?: string;
  error?: string;
  orientation?: "vertical" | "horizontal";
}

export function FormRadio<T extends FieldValues>({
  name,
  control,
  label,
  options,
  description,
  error,
  orientation = "vertical",
}: FormRadioProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div
        className={`flex ${
          orientation === "horizontal" ? "flex-row gap-4" : "flex-col gap-2"
        }`}
        role="group"
        aria-labelledby={name}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              value={option.value}
              checked={field.value === option.value}
              onChange={() => field.onChange(option.value)}
              aria-invalid={error ? "true" : "false"}
              className="h-4 w-4 cursor-pointer rounded border border-input accent-primary"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 text-sm cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
