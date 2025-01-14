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
const medication_1 = __importDefault(require("../../services/medication/medication"));
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
class MedicationController {
    /**
     * Create a new medication.
     */
    createMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const medication = yield medication_1.default.create(data);
                return (0, handle_response_1.sendSuccess)(res, medication, 201);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    /**
     * Get all medications.
     */
    getAllMedications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const medications = yield medication_1.default.getAll();
                return (0, handle_response_1.sendSuccess)(res, medications);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    /**
     * Get a medication by ID.
     */
    getMedicationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const medication = yield medication_1.default.getById(id);
                if (!medication) {
                    return (0, handle_response_1.sendError)(res, "Medication not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, medication);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    /**
     * Update a medication by ID.
     */
    updateMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatedMedication = yield medication_1.default.update(id, data);
                if (!updatedMedication) {
                    return (0, handle_response_1.sendError)(res, "Medication not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, updatedMedication);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    /**
     * Delete a medication by ID.
     */
    deleteMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedMedication = yield medication_1.default.delete(id);
                if (!deletedMedication) {
                    return (0, handle_response_1.sendError)(res, "Medication not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, deletedMedication);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(MedicationController);
exports.default = methods;
