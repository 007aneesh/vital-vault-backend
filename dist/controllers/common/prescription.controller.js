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
class PrescriptionController {
    /**
     * Create a new prescription.
     */
    createPrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const prescription = yield prescription_services_1.default.create(data);
                return (0, handle_response_1.sendSuccess)(res, prescription, 201);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    /**
     * Get all prescriptions.
     */
    getAllPrescriptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prescriptions = yield prescription_services_1.default.getAll();
                return (0, handle_response_1.sendSuccess)(res, prescriptions);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    /**
     * Get a prescription by ID.
     */
    getPrescriptionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const prescription = yield prescription_services_1.default.getById(id);
                if (!prescription) {
                    return (0, handle_response_1.sendError)(res, "Prescription not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, prescription);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    /**
     * Update a prescription by ID.
     */
    updatePrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatedPrescription = yield prescription_services_1.default.update(id, data);
                if (!updatedPrescription) {
                    return (0, handle_response_1.sendError)(res, "Prescription not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, updatedPrescription);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    /**
     * Delete a prescription by ID.
     */
    deletePrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedPrescription = yield prescription_services_1.default.delete(id);
                if (!deletedPrescription) {
                    return (0, handle_response_1.sendError)(res, "Prescription not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, deletedPrescription);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(PrescriptionController);
exports.default = methods;
