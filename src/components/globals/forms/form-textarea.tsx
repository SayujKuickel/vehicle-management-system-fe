"use client";

import {
  useController,
  FieldPath,
  FieldValues,
  Control,
} from "react-hook-form";
import { TextareaHTMLAttributes } from "react";

interface FormTextareaProps<
  T extends FieldValues,
> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  description?: string;
  error?: string;
}

export function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  description,
  error,
  ...textareaProps
}: FormTextareaProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <textarea
        id={name}
        {...field}
        {...textareaProps}
        aria-invalid={error ? "true" : "false"}
        className="w-full min-h-[100px] rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
      />
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
