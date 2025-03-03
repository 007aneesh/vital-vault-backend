"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/appointment.ts
const express_1 = __importDefault(require("express"));
const appointment_1 = require("../../controllers/appointment");
const router = express_1.default.Router();
router.post("/add", appointment_1.AppointmentController.createAppointment);
router.get("/", appointment_1.AppointmentController.getAllAppointments);
router.get("/:id", appointment_1.AppointmentController.getAppointmentById);
router.put("/:id", appointment_1.AppointmentController.updateAppointment);
router.delete("/:id", appointment_1.AppointmentController.deleteAppointment);
exports.default = router;
//# sourceMappingURL=appointment.js.map