"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patient_schema = void 0;
const zod_1 = require("zod");
exports.patient_schema = zod_1.z.object({
    aadharNumber: zod_1.z
        .number()
        .min(100000000000, "Aadhar number must be at least 12 digits")
        .max(999999999999, "Aadhar number cannot exceed 12 digits"),
    email: zod_1.z.string().email("Invalid email address"),
    guardianName: zod_1.z.string().optional(),
    emergencyContact: zod_1.z
        .number()
        .min(1000000000, "Invalid emergency contact number")
        .max(9999999999, "Emergency contact cannot exceed 10 digits"),
    name: zod_1.z.string().min(1, "Name cannot be empty"),
    gender: zod_1.z
        .enum(["Male", "Female", "Other"])
        .refine((val) => val, { message: "Invalid gender selection" }),
    contact: zod_1.z
        .number()
        .min(1000000000, "Invalid contact number")
        .max(9999999999, "Contact number cannot exceed 10 digits"),
    image: zod_1.z.string().optional(),
    addedBy: zod_1.z.string({ required_error: "Employee name is missing" }),
    organisationId: zod_1.z.string({ required_error: "Organisation Id is missing" }),
    verified: zod_1.z.boolean().optional(),
});
