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
class PrescriptionService {
    /**
     * Create a new prescription.
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { prescribed_by, prescription_date, notes, visit_id } = data;
                if (!prescribed_by || !prescription_date || !visit_id) {
                    throw new Error("Prescribed_by, prescription_date, and visit_id are required fields.");
                }
                const prescription = yield db_1.prisma.prescription.create({
                    data: {
                        prescribed_by,
                        prescription_date: new Date(prescription_date),
                        notes,
                        visit_id,
                    },
                });
                return prescription;
            }
            catch (error) {
                console.error("Error in creating prescription:", error);
                throw error;
            }
        });
    }
    /**
     * Get all prescriptions.
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.prisma.prescription.findMany({
                    include: { medications: true, visit: true },
                });
            }
            catch (error) {
                console.error("Error in fetching all prescriptions:", error);
                throw error;
            }
        });
    }
    /**
     * Get a prescription by ID.
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prescription = yield db_1.prisma.prescription.findUnique({
                    where: { id },
                    include: { medications: true, visit: true },
                });
                return prescription;
            }
            catch (error) {
                console.error("Error in fetching prescription by ID:", error);
                throw error;
            }
        });
    }
    /**
     * Update a prescription by ID.
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPrescription = yield db_1.prisma.prescription.update({
                    where: { id },
                    data,
                });
                return updatedPrescription;
            }
            catch (error) {
                console.error("Error in updating prescription:", error);
                throw error;
            }
        });
    }
    /**
     * Delete a prescription by ID.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPrescription = yield db_1.prisma.prescription.delete({
                    where: { id },
                });
                return deletedPrescription;
            }
            catch (error) {
                console.error("Error in deleting prescription:", error);
                throw error;
            }
        });
    }
}
exports.default = new PrescriptionService();
