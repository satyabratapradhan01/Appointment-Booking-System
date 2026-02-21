import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8),
  role: z.enum(["USER", "SERVICE_PROVIDER"]).default("USER"),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
});