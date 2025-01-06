import { z } from "zod";

export const employee_schema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First Name cannot be empty"),
  last_name: z.string().min(1, "Last Name cannot be empty"),
  contact_number: z
    .string() // Kept as string to accommodate 10-digit format
    .length(10, "Contact number must be exactly 10 digits")
    .regex(/^\d+$/, "Contact number must be numeric"),
  // password: z.string().min(4, "Password must be at least 4 characters long"),
  organisationId: z.string(),
  access_level: z.enum(["READ", "WRITE", "MODIFY", "NONE"]), // Kept as enum for better validation
  aadhar_number: z
    .string() // Kept as string to accommodate 12-digit format
    .length(12, "Invalid Aadhar number")
    .regex(/^\d+$/, "Aadhar number must be numeric"),
  date_of_birth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  age: z.number().min(0, "Age must be a positive number"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]), // Kept as enum for better validation
  blood_group: z.enum([
    "A_POSITIVE",
    "A_NEGATIVE",
    "B_POSITIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE",
  ]), // Added enum for blood group
  emergency_contact: z
    .string() // Kept as string to accommodate 10-digit format
    .length(10, "Contact number must be exactly 10 digits")
    .regex(/^\d+$/, "Contact number must be numeric"),
  employment_details: z.object({
    // Updated employment_details structure
    employee_code: z.string().min(1, "Employee code cannot be empty"),
    department: z.enum([
      "cardiology",
      "orthopedics",
      "pediatrics",
      "general medicine",
      "administration",
    ]),
    role: z.enum(["doctor", "nurse", "technician", "admin"]),
    access_level: z.enum(["READ", "WRITE", "MODIFY"]),
    date_of_joining: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format for date of joining",
    }),
    experience_years: z
      .number()
      .min(1, "Experience years must be at least 1")
      .max(30, "Experience years cannot exceed 30"),
    status: z.enum(["active", "on_leave", "retired"]),
  }),
});
