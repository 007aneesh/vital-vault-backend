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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../utils/db");
class PatientService {
    getAllPatients() {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = yield db_1.prisma.patient.findMany();
            return patients;
        });
    }
    getPatientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield db_1.prisma.patient.findUnique({
                where: { id },
                include: {
                    medical_history: true,
                    visits: true,
                    insurance_details: true,
                },
            });
            if (!patient) {
                throw { message: "Patient not found", status: 404 };
            }
            return patient;
        });
    }
    updatePatient(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPatient = yield db_1.prisma.patient.update({
                where: { id },
                data: updatedData,
            });
            return updatedPatient;
        });
    }
    deletePatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingPatient = yield db_1.prisma.patient.findUnique({
                where: { id },
            });
            if (!existingPatient) {
                throw { message: "Patient not found", status: 404 };
            }
            yield db_1.prisma.patient.delete({
                where: { id },
            });
        });
    }
}
exports.default = new PatientService();
//# sourceMappingURL=patient_services.js.map