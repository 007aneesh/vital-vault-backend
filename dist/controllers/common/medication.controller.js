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
const appErrorCode_1 = require("../../utils/appErrorCode");
class MedicationController {
    /**
     * Create a new medication.
     */
    createMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body || Object.keys(req.body).length === 0) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.UNPROCESSABLE_CONTENT, 422);
            }
            const medication = yield medication_1.default.create(req.body);
            return (0, handle_response_1.sendSuccess)(res, "Medication created successfully", 201, medication);
        });
    }
    /**
     * Get all medications.
     */
    getAllMedications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const medications = yield medication_1.default.getAll();
            return (0, handle_response_1.sendSuccess)(res, "Fetched all medications", 200, medications);
        });
    }
    /**
     * Get a medication by ID.
     */
    getMedicationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
            }
            const medication = yield medication_1.default.getById(id);
            if (!medication) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.NOT_FOUND, 404);
            }
            return (0, handle_response_1.sendSuccess)(res, "Medication found", 200, medication);
        });
    }
    /**
     * Update a medication by ID.
     */
    updateMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id || !req.body || Object.keys(req.body).length === 0) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
            }
            const updatedMedication = yield medication_1.default.update(id, req.body);
            if (!updatedMedication) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.NOT_FOUND, 404);
            }
            return (0, handle_response_1.sendSuccess)(res, "Medication updated successfully", 200, updatedMedication);
        });
    }
    /**
     * Delete a medication by ID.
     */
    deleteMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
            }
            const deletedMedication = yield medication_1.default.delete(id);
            if (!deletedMedication) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.NOT_FOUND, 404);
            }
            return (0, handle_response_1.sendSuccess)(res, "Medication deleted successfully", 200);
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(MedicationController);
exports.default = methods;
//# sourceMappingURL=medication.controller.js.map