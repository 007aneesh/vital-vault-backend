"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employee_schema = void 0;
const zod_1 = require("zod");
exports.employee_schema = zod_1.z.object({
    username: zod_1.z.string().min(6, "Username must be at least 6 characters long"),
    email: zod_1.z.string().email("Invalid email address"),
    name: zod_1.z.string().min(1, "Name cannot be empty"),
    contactNo: zod_1.z
        .number()
        .min(1000000000, "Invalid contact number")
        .max(9999999999, "Contact number cannot exceed 10 digits"),
    // password: z.string().min(4, "Password must be at least 4 characters long"),
    position: zod_1.z.string(),
    organisationId: zod_1.z.string(),
    accessLevel: zod_1.z.string(),
});
