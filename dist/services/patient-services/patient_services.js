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
    buildWhereClause(filterModel) {
        if (!filterModel)
            return {};
        const where = {};
        for (const [key, value] of Object.entries(filterModel)) {
            if (value === null || value === undefined || value === "")
                continue;
            if (typeof value === "string") {
                where[key] = { contains: value, mode: "insensitive" };
            }
            else if (typeof value === "object" &&
                "min" in value &&
                "max" in value) {
                where[key] = { gte: value.min, lte: value.max };
            }
            else if (typeof value === "object" && "min" in value) {
                where[key] = { gte: value.min };
            }
            else if (typeof value === "object" && "max" in value) {
                where[key] = { lte: value.max };
            }
            else {
                where[key] = value;
            }
        }
        return where;
    }
    getSSRMPatients(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageSize, sortModel, filterModel } = params;
            const where = this.buildWhereClause(filterModel);
            const orderBy = sortModel
                ? { [sortModel.sort_by]: sortModel.type }
                : undefined;
            const [data, totalCount] = yield Promise.all([
                db_1.prisma.patient.findMany({
                    skip: 0,
                    take: pageSize,
                    where,
                    orderBy,
                }),
                db_1.prisma.patient.count({ where }),
            ]);
            return { rows: data, totalRows: totalCount };
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