import { z } from "zod";

export const employee_schema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name cannot be empty"),
  contactNo: z
    .number()
    .min(1000000000, "Invalid contact number")
    .max(9999999999, "Contact number cannot exceed 10 digits"),
  // password: z.string().min(4, "Password must be at least 4 characters long"),
  position: z.string(),
  organisationId: z.string(),
  accessLevel: z.string(),
});
