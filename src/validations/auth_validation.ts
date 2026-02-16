import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(10, "Contact is required"),
  image: z.string().optional(),
  secondary_contact: z.string().min(10, "Contact is required").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z
    .string()
    .min(6, "Organization name must be at least 6 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  pincode: z.string().min(6, "Invalid pin code"),
  city: z.string().min(2, "City must be at least 3 characters long"),
  state: z.string().min(2, "State must be at least 4 characters long"),
  plan: z.string(),
  access_level: z.enum(["GOD", "ADMIN", "READ", "WRITE", "MODIFY"]).optional(),
  userAgent: z.record(z.any()).optional(),
});
