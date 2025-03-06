"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employee_schema = void 0;
const zod_1 = require("zod");
exports.employee_schema = zod_1.z.object({
    username: zod_1.z.string().min(6, "Username must be at least 6 characters long"),
    email: zod_1.z.string().email("Invalid email address"),
    first_name: zod_1.z.string().min(1, "First Name cannot be empty"),
    last_name: zod_1.z.string().min(1, "Last Name cannot be empty"),
    image: zod_1.z.string().optional(),
    contact_number: zod_1.z
        .string()
        .length(10, "Contact number must be exactly 10 digits")
        .regex(/^\d+$/, "Contact number must be numeric"),
    organisationId: zod_1.z.string(),
    access_level: zod_1.z.enum(["READ", "WRITE", "MODIFY", "NONE"]),
    aadhar_number: zod_1.z
        .string()
        .length(12, "Invalid Aadhar number")
        .regex(/^\d+$/, "Aadhar number must be numeric"),
    date_of_birth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    age: zod_1.z.number().min(0, "Age must be a positive number"),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]),
    blood_group: zod_1.z.enum([
        "A_POSITIVE",
        "A_NEGATIVE",
        "B_POSITIVE",
        "B_NEGATIVE",
        "AB_POSITIVE",
        "AB_NEGATIVE",
        "O_POSITIVE",
        "O_NEGATIVE",
    ]),
    emergency_contact: zod_1.z
        .string()
        .length(10, "Contact number must be exactly 10 digits")
        .regex(/^\d+$/, "Contact number must be numeric"),
    employment_details: zod_1.z.object({
        employee_code: zod_1.z.string().min(1, "Employee code cannot be empty"),
        department: zod_1.z.enum([
            "cardiology",
            "orthopedics",
            "pediatrics",
            "general medicine",
            "administration",
        ]),
        role: zod_1.z.enum(["doctor", "nurse", "technician", "admin"]),
        access_level: zod_1.z.enum(["READ", "WRITE", "MODIFY"]),
        date_of_joining: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format for date of joining",
        }),
        experience_years: zod_1.z
            .number()
            .min(1, "Experience years must be at least 1")
            .max(30, "Experience years cannot exceed 30"),
        status: zod_1.z.enum(["active", "on_leave", "retired"]),
    }),
});
//# sourceMappingURL=employee_validations.js.map