"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(6, "Username must be at least 6 characters long"),
    email: zod_1.z.string().email("Invalid email"),
    contact: zod_1.z.number().min(1000000000, "Invalid contact number"),
    secondary_contact: zod_1.z
        .number()
        .min(1000000000, "Invalid contact number")
        .optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    name: zod_1.z
        .string()
        .min(6, "Organization name must be at least 6 characters long"),
    address: zod_1.z.string().min(5, "Address must be at least 5 characters long"),
    pincode: zod_1.z.number().min(100000, "Invalid pin code"),
    city: zod_1.z.string().min(2, "City must be at least 3 characters long"),
    state: zod_1.z.string().min(2, "State must be at least 4 characters long"),
    plan: zod_1.z.string(),
    access_level: zod_1.z.enum(["GOD", "ADMIN", "READ", "WRITE", "MODIFY"]),
    userAgent: zod_1.z.string().optional(),
});
