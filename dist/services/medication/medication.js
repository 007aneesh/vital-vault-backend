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
class MedicationService {
    /**
     * Create a new medication record.
     * @param data - Medication data
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, dose, frequency, duration, notes, prescription_id } = data;
                if (!name || !dose || !prescription_id) {
                    throw new Error("Name, dose, and prescription_id are required fields.");
                }
                const medication = yield db_1.prisma.medication.create({
                    data: {
                        name,
                        dose,
                        frequency,
                        duration,
                        notes,
                        prescription_id,
                    },
                });
                return medication;
            }
            catch (error) {
                console.error("Error in creating medication:", error);
                throw error;
            }
        });
    }
    /**
     * Get all medications.
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.prisma.medication.findMany();
            }
            catch (error) {
                console.error("Error in fetching all medications:", error);
                throw error;
            }
        });
    }
    /**
     * Get a medication by its ID.
     * @param id - Medication ID
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const medication = yield db_1.prisma.medication.findUnique({
                    where: { id },
                });
                return medication;
            }
            catch (error) {
                console.error("Error in fetching medication by ID:", error);
                throw error;
            }
        });
    }
    /**
     * Update a medication by its ID.
     * @param id - Medication ID
     * @param data - Data to update
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedMedication = yield db_1.prisma.medication.update({
                    where: { id },
                    data,
                });
                return updatedMedication;
            }
            catch (error) {
                console.error("Error in updating medication:", error);
                throw error;
            }
        });
    }
    /**
     * Delete a medication by its ID.
     * @param id - Medication ID
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedMedication = yield db_1.prisma.medication.delete({
                    where: { id },
                });
                return deletedMedication;
            }
            catch (error) {
                console.error("Error in deleting medication:", error);
                throw error;
            }
        });
    }
}
exports.default = new MedicationService();
