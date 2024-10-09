"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    userName: zod_1.z.string().min(5, "Username required"),
    email: zod_1.z.string().email("Invalid email"),
    contactNo: zod_1.z.number().min(1000000000, "Invalid contact number"),
    secContact: zod_1.z.number().min(1000000000, "Invalid contact number").optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    orgName: zod_1.z
        .string()
        .min(1, "Organization name required"),
    address: zod_1.z.string().min(5, "Address required"),
    pinCode: zod_1.z.number().min(100000, "Invalid pin code"),
    city: zod_1.z.string().min(2, "City name required"),
    state: zod_1.z.string().min(2, "State required"),
    planSelected: zod_1.z.string(),
});
