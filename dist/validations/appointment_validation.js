"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentSchema = exports.CreateAppointmentSchema = void 0;
const zod_1 = require("zod");
const CreateAppointmentSchema = zod_1.z.object({
    appointment_date: zod_1.z.coerce
        .date()
        .min(new Date(), "Appointment date must be in the future")
        .max(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), "Appointment date cannot be more than one year from today"),
    reason_for_visit: zod_1.z
        .string()
        .trim()
        .min(5, "Reason for visit must be at least 5 characters long")
        .max(1000, "Reason for visit cannot exceed 1000 characters"),
    patient_id: zod_1.z.string(),
    employee_id: zod_1.z.string(),
    status: zod_1.z
        .enum(["PENDING", "SCHEDULED", "COMPLETED", "CANCELED"])
        .default("SCHEDULED")
        .optional(),
});
exports.CreateAppointmentSchema = CreateAppointmentSchema;
const UpdateAppointmentSchema = CreateAppointmentSchema.extend({
    id: zod_1.z.string(),
}).partial();
exports.UpdateAppointmentSchema = UpdateAppointmentSchema;
//# sourceMappingURL=appointment_validation.js.map