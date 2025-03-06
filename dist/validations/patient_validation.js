"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patient_schema = void 0;
const zod_1 = require("zod");
exports.patient_schema = zod_1.z.object({
    aadhar_number: zod_1.z
        .number({ required_error: "Aadhar number is required" })
        .min(100000000000, { message: "Aadhar number must be at least 12 digits" })
        .max(999999999999, { message: "Aadhar number cannot exceed 12 digits" }),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
    username: zod_1.z.string(),
    guardian_name: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    emergency_contact: zod_1.z
        .number({ required_error: "Emergency contact number is required" })
        .min(1000000000, { message: "Invalid emergency contact number" })
        .max(9999999999, { message: "Emergency contact cannot exceed 10 digits" }),
    first_name: zod_1.z
        .string({ required_error: "First Name is required" })
        .min(1, { message: "First Name cannot be empty" }),
    last_name: zod_1.z
        .string({ required_error: "Last Name is required" })
        .min(1, { message: "Last Name cannot be empty" }),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"], {
        required_error: "Gender is required",
    }),
    contact_number: zod_1.z
        .number({ required_error: "Contact number is required" })
        .min(1000000000, { message: "Invalid contact number" })
        .max(9999999999, { message: "Contact number cannot exceed 10 digits" }),
    profile: zod_1.z.string().optional(),
    added_by: zod_1.z.string({ required_error: "Employee name is missing" }),
    organisation_id: zod_1.z.string({ required_error: "Organisation Id is missing" }),
    date_of_birth: zod_1.z
        .string({ required_error: "Date of birth is required" })
        .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    age: zod_1.z
        .number({ required_error: "Age is required" })
        .min(0, { message: "Age must be a positive number" }),
    blood_group: zod_1.z.enum([
        "A_POSITIVE",
        "A_NEGATIVE",
        "B_POSITIVE",
        "B_NEGATIVE",
        "AB_POSITIVE",
        "AB_NEGATIVE",
        "O_POSITIVE",
        "O_NEGATIVE",
    ], { required_error: "Blood group is required" }),
    settings: zod_1.z.object({}).optional(),
});
//# sourceMappingURL=patient_validation.js.map