import { z } from "zod";

export const registrationSchema = z.object({
  role: z.enum(["customer", "staff"]),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less"),
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be 30 characters or less"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be 100 characters or less"),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{0,15}$/, "Please enter a valid phone number")
    .max(15, "Phone number must be 15 characters or less")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(255, "Address must be 255 characters or less")
    .optional()
    .or(z.literal("")),
  vehicleNumber: z
    .string()
    .max(50, "Vehicle number must be 50 characters or less")
    .optional()
    .or(z.literal("")),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
