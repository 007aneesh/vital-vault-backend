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
     */
    createInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body) {
                return (0, handle_response_1.sendError)(res, "Request body is required", 400);
            }
            const insurance = yield insurance_services_1.default.createInsurance(req.body);
            return (0, handle_response_1.sendSuccess)(res, "Insurance created successfully", 201, insurance);
        });
    }
    /**
     * Get all insurance policies.
     */
    getAllInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const insuranceDetails = yield insurance_services_1.default.getAllInsuranceDetails();
            return (0, handle_response_1.sendSuccess)(res, "Fetched insurance details", 200, insuranceDetails);
        });
    }
    /**
     * Get an insurance policy by its ID.
     */
    getInsuranceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return (0, handle_response_1.sendError)(res, "Insurance ID is required", 400);
            }
            const insurance = yield insurance_services_1.default.getInsuranceById(id);
            if (!insurance) {
                return (0, handle_response_1.sendError)(res, "Insurance not found", 404);
            }
            return (0, handle_response_1.sendSuccess)(res, "Insurance found", 200, insurance);
        });
    }
    /**
     * Update an insurance policy by its ID.
     */
    updateInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return (0, handle_response_1.sendError)(res, "Insurance ID is required", 400);
            }
            if (!req.body) {
                return (0, handle_response_1.sendError)(res, "Request body is required", 400);
            }
            const updatedInsurance = yield insurance_services_1.default.updateInsurance(id, req.body);
            if (!updatedInsurance) {
                return (0, handle_response_1.sendError)(res, "Insurance not found", 404);
            }
            return (0, handle_response_1.sendSuccess)(res, "Insurance updated successfully", 200, updatedInsurance);
        });
    }
    /**
     * Delete an insurance policy by its ID.
     */
    deleteInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return (0, handle_response_1.sendError)(res, "Insurance ID is required", 400);
            }
            const deletedInsurance = yield insurance_services_1.default.deleteInsurance(id);
            if (!deletedInsurance) {
                return (0, handle_response_1.sendError)(res, "Insurance not found", 404);
            }
            return (0, handle_response_1.sendSuccess)(res, "Insurance deleted successfully", 200);
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(InsuranceController);
exports.default = methods;
//# sourceMappingURL=insurance.controller.js.map