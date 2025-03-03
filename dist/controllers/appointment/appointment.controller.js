"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointment_validation_1 = require("../../validations/appointment_validation");
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
const appError_1 = __importDefault(require("../../utils/appError"));
const db_1 = require("../../utils/db");
class AppointmentController {
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = appointment_validation_1.CreateAppointmentSchema.safeParse(req.body);
            if (!data.success) {
                // const errors = data.error.issues.reduce(
                //   (acc, issue) => {
                //     acc[issue.path.join(".")] = issue.message;
                //     return acc;
                //   },
                //   {} as Record<string, string>,
                // );
                return (0, handle_response_1.sendError)(res, data.error, 422);
            }
            const { appointment_date, reason_for_visit, patient_id, employee_id, status, } = data.data;
            const newAppointment = yield db_1.prisma.appointment.create({
                data: {
                    appointment_date,
                    reason_for_visit,
                    patient_id,
                    employee_id,
                    status: status || "PENDING",
                },
                include: {
                    patient: true,
                    employee: true,
                },
            });
            return (0, handle_response_1.sendSuccess)(res, "Appointment created successfully", 201, newAppointment);
        });
    }
    getAllAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { patientId } = req.query;
            const appointments = yield db_1.prisma.appointment.findMany({
                where: Object.assign({}, (patientId ? { patient_id: patientId } : {})),
                include: {
                    patient: true,
                    employee: true,
                },
                orderBy: { appointment_date: "asc" },
            });
            return (0, handle_response_1.sendSuccess)(res, "Fetched all appointments", 200, appointments);
        });
    }
    getAppointmentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const appointment = yield db_1.prisma.appointment.findUnique({
                where: { id },
                include: { patient: true, employee: true },
            });
            if (!appointment) {
                return next(new appError_1.default(404, "Appointment not found"));
            }
            return (0, handle_response_1.sendSuccess)(res, "Appointment found", 200, appointment);
        });
    }
    updateAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { appointment_date, reason_for_visit, status } = req.body;
            const updateData = {};
            if (appointment_date)
                updateData.appointment_date = new Date(appointment_date);
            if (reason_for_visit)
                updateData.reason_for_visit = reason_for_visit;
            if (status)
                updateData.status = status;
            if (Object.keys(updateData).length === 0) {
                return next(new appError_1.default(400, "No valid fields provided for update"));
            }
            const updatedAppointment = yield db_1.prisma.appointment.update({
                where: { id },
                data: updateData,
            });
            return (0, handle_response_1.sendSuccess)(res, "Appointment updated successfully", 200, updatedAppointment);
        });
    }
    deleteAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deletedAppointment = yield db_1.prisma.appointment
                .delete({
                where: { id },
            })
                .catch(() => null);
            if (!deletedAppointment) {
                return next(new appError_1.default(404, "Appointment not found"));
            }
            return (0, handle_response_1.sendSuccess)(res, "Appointment deleted successfully", 200);
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(AppointmentController);
exports.default = methods;
//# sourceMappingURL=appointment.controller.js.map