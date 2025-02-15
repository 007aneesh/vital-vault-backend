// src/routes/appointment.ts
import express from "express";
import { AppointmentController } from "../../controllers/appointment";

const router = express.Router();

router.post("/add", AppointmentController.createAppointment);
router.get("/", AppointmentController.getAllAppointments);
router.get("/:id", AppointmentController.getAppointmentById);
router.put("/:id", AppointmentController.updateAppointment);
router.delete("/:id", AppointmentController.deleteAppointment);

export default router;
