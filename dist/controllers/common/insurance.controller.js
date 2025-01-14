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
const insurance_services_1 = __importDefault(require("../../services/settings/insurance_services"));
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
class InsuranceController {
    /**
     * Create a new insurance policy.
     * @param req - Express request object
     * @param res - Express response object
     */
    createInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const insurance = yield insurance_services_1.default.createInsurance(data);
                return (0, handle_response_1.sendSuccess)(res, insurance, 201);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    /**
     * Get all insurance policies.
     * @param req - Express request object
     * @param res - Express response object
     */
    getAllInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insuranceDetails = yield insurance_services_1.default.getAllInsuranceDetails();
                return (0, handle_response_1.sendSuccess)(res, insuranceDetails);
            }
            catch (error) {
                console.error("Error in getAllInsuranceDetails:", error);
                return (0, handle_response_1.sendError)(res, "Failed to fetch insurance details", 500);
            }
        });
    }
    /**
     * Get an insurance policy by its ID.
     * @param req - Express request object
     * @param res - Express response object
     */
    getInsuranceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const insurance = yield insurance_services_1.default.getInsuranceById(id);
                if (!insurance) {
                    return (0, handle_response_1.sendError)(res, "Insurance not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, insurance);
            }
            catch (error) {
                console.error("Error in getInsuranceById:", error);
                return (0, handle_response_1.sendError)(res, "Failed to fetch insurance", 500);
            }
        });
    }
    /**
     * Update an insurance policy by its ID.
     * @param req - Express request object
     * @param res - Express response object
     */
    updateInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatedInsurance = yield insurance_services_1.default.updateInsurance(id, data);
                return (0, handle_response_1.sendSuccess)(res, updatedInsurance);
            }
            catch (error) {
                console.error("Error in updateInsurance:", error);
                return (0, handle_response_1.sendError)(res, "Failed to update insurance", 500);
            }
        });
    }
    /**
     * Delete an insurance policy by its ID.
     * @param req - Express request object
     * @param res - Express response object
     */
    deleteInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedInsurance = yield insurance_services_1.default.deleteInsurance(id);
                return (0, handle_response_1.sendSuccess)(res, deletedInsurance);
            }
            catch (error) {
                console.error("Error in deleteInsurance:", error);
                return (0, handle_response_1.sendError)(res, "Failed to delete insurance", 500);
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(InsuranceController);
exports.default = methods;
