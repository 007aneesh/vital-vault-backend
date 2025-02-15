import { z } from "zod";

const CreateAppointmentSchema = z.object({
  appointment_date: z.coerce
    .date()
    .min(new Date(), "Appointment date must be in the future")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      "Appointment date cannot be more than one year from today",
    ),
  reason_for_visit: z
    .string()
    .trim()
    .min(5, "Reason for visit must be at least 5 characters long")
    .max(1000, "Reason for visit cannot exceed 1000 characters"),
  patient_id: z.string(),
  employee_id: z.string(),
  status: z
    .enum(["PENDING", "SCHEDULED", "COMPLETED", "CANCELED"])
    .default("SCHEDULED")
    .optional(),
});

const UpdateAppointmentSchema = CreateAppointmentSchema.extend({
  id: z.string(),
}).partial();

export { CreateAppointmentSchema, UpdateAppointmentSchema };
