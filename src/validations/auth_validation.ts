import { z } from "zod";

export const registerSchema = z.object({
  userName: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email("Invalid email"),
  contactNo: z.number().min(1000000000, "Invalid contact number"),
  secContact: z.number().min(1000000000, "Invalid contact number").optional(),
  password: z.string().min(4, "Password must be at least 6 characters long"),
  orgName: z
    .string()
    .min(6, "Organization name must be at least 6 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  pinCode: z.number().min(100000, "Invalid pin code"),
  city: z.string().min(2, "City must be at least 3 characters long"),
  state: z.string().min(2, "State must be at least 4 characters long"),
  planSelected: z.string(),
});
