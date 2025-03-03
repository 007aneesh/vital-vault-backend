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
exports.VisitHistoryService = void 0;
const db_1 = require("../../utils/db");
class VisitHistoryService {
    createVisitData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { visit_date, reason_for_visit, doctor_name, department, hospital_name, notes, patient_id, } = data;
                if (!visit_date || !patient_id) {
                    throw new Error("visit_date and patient_id are required fields.");
                }
                const visit = yield db_1.prisma.visitHistory.create({
                    data: {
                        visit_date: new Date(visit_date),
                        reason_for_visit,
                        doctor_name,
                        department,
                        hospital_name,
                        notes,
                        patient_id,
                    },
                });
                return visit;
            }
            catch (error) {
                console.error("Error in createVisitData:", error);
                throw error;
            }
        });
    }
    getAllByPatientId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.visitHistory.findMany({
                where: { patient_id: id },
                include: {
                    prescriptions: true,
                },
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.visitHistory.findUnique({
                where: { id },
                include: {
                    prescriptions: true,
                },
            });
        });
    }
    getByDate(date, patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedDate = new Date(date);
            return yield db_1.prisma.visitHistory.findMany({
                where: {
                    patient_id,
                    visit_date: {
                        gte: parsedDate,
                        lt: new Date(parsedDate.getTime() + 24 * 60 * 60 * 1000),
                    },
                },
                include: {
                    prescriptions: true,
                },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.visitHistory.update({
                where: { id },
                data,
            });
        });
    }
}
exports.VisitHistoryService = VisitHistoryService;
//# sourceMappingURL=patient.js.map