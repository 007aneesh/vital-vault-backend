import { z } from "zod";

export const patient_schema = z.object({
  aadhar_number: z
    .number({ required_error: "Aadhar number is required" })
    .min(100000000000, { message: "Aadhar number must be at least 12 digits" })
    .max(999999999999, { message: "Aadhar number cannot exceed 12 digits" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  username: z.string(),
  guardian_name: z.string().optional(),
  image: z.string().optional(),
  emergency_contact: z
    .number({ required_error: "Emergency contact number is required" })
    .min(1000000000, { message: "Invalid emergency contact number" })
    .max(9999999999, { message: "Emergency contact cannot exceed 10 digits" }),
  first_name: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name cannot be empty" }),
  last_name: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name cannot be empty" }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender is required",
  }),
  contact_number: z
    .number({ required_error: "Contact number is required" })
    .min(1000000000, { message: "Invalid contact number" })
    .max(9999999999, { message: "Contact number cannot exceed 10 digits" }),
  profile: z.string().optional(),
  added_by: z.string({ required_error: "Employee name is missing" }),
  organisation_id: z.string({ required_error: "Organisation Id is missing" }),
  date_of_birth: z
    .string({ required_error: "Date of birth is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
  age: z
    .number({ required_error: "Age is required" })
    .min(0, { message: "Age must be a positive number" }),
  blood_group: z.enum(
    [
      "A_POSITIVE",
      "A_NEGATIVE",
      "B_POSITIVE",
      "B_NEGATIVE",
      "AB_POSITIVE",
      "AB_NEGATIVE",
      "O_POSITIVE",
      "O_NEGATIVE",
    ],
    { required_error: "Blood group is required" },
  ),
  settings: z.object({}).optional(),
});
