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
const prescription_services_1 = __importDefault(require("../../services/prescription/prescription.services"));
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
const appError_1 = __importDefault(require("../../utils/appError"));
class PrescriptionController {
    /**
     * Create a new prescription.
     */
    createPrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const prescription = yield prescription_services_1.default.create(data);
            return (0, handle_response_1.sendSuccess)(res, "Prescription created successfully", 201, prescription);
        });
    }
    /**
     * Get all prescriptions.
     */
    getAllPrescriptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prescriptions = yield prescription_services_1.default.getAll();
            return (0, handle_response_1.sendSuccess)(res, "Fetched all prescriptions", 200, prescriptions);
        });
    }
    /**
     * Get a prescription by ID.
     */
    getPrescriptionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const prescription = yield prescription_services_1.default.getById(id);
            if (!prescription) {
                throw new appError_1.default(404, "Prescription not found");
            }
            return (0, handle_response_1.sendSuccess)(res, "Prescription found", 200, prescription);
        });
    }
    /**
     * Update a prescription by ID.
     */
    updatePrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const updatedPrescription = yield prescription_services_1.default.update(id, data);
            if (!updatedPrescription) {
                throw new appError_1.default(404, "Prescription not found");
            }
            return (0, handle_response_1.sendSuccess)(res, "Prescription updated successfully", 200, updatedPrescription);
        });
    }
    /**
     * Delete a prescription by ID.
     */
    deletePrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deletedPrescription = yield prescription_services_1.default.delete(id);
            if (!deletedPrescription) {
                throw new appError_1.default(404, "Prescription not found");
            }
            return (0, handle_response_1.sendSuccess)(res, "Prescription deleted successfully", 200);
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(PrescriptionController);
exports.default = methods;
//# sourceMappingURL=prescription.controller.js.map