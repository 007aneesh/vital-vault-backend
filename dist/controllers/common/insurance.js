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
exports.deleteInsuranceHandler = exports.updateInsuranceHandler = exports.getInsuranceByIdHandler = exports.getAllInsuranceHandler = exports.createInsuranceHandler = void 0;
const insurance_services_1 = require("../../services/settings/insurance_services");
const handle_response_1 = require("../../utils/handle_response");
// Function to create insurance
const createInsuranceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const insurance = yield (0, insurance_services_1.createInsurance)(data);
        return (0, handle_response_1.sendSuccess)(res, insurance, 201);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, error.message, 500);
    }
});
exports.createInsuranceHandler = createInsuranceHandler;
// Function to get all insurance details
const getAllInsuranceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insuranceDetails = yield (0, insurance_services_1.getAllInsuranceDetails)();
        return (0, handle_response_1.sendSuccess)(res, insuranceDetails);
    }
    catch (error) {
        console.error("Error in getAllInsuranceDetails:", error);
        return (0, handle_response_1.sendError)(res, "Failed to fetch insurance details", 500);
    }
});
exports.getAllInsuranceHandler = getAllInsuranceHandler;
// Function to get insurance by policy number
const getInsuranceByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const insurance = yield (0, insurance_services_1.getInsuranceById)(id);
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
exports.getInsuranceByIdHandler = getInsuranceByIdHandler;
// Function to update insurance details
const updateInsuranceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedInsurance = yield (0, insurance_services_1.updateInsurance)(id, data);
        return (0, handle_response_1.sendSuccess)(res, updatedInsurance);
    }
    catch (error) {
        console.error("Error in updateInsurance:", error);
        return (0, handle_response_1.sendError)(res, "Failed to update insurance", 500);
    }
});
exports.updateInsuranceHandler = updateInsuranceHandler;
// Function to delete insurance
const deleteInsuranceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedInsurance = yield (0, insurance_services_1.deleteInsurance)(id);
        return (0, handle_response_1.sendSuccess)(res, deletedInsurance);
    }
    catch (error) {
        console.error("Error in deleteInsurance:", error);
        return (0, handle_response_1.sendError)(res, "Failed to delete insurance", 500);
    }
});
exports.deleteInsuranceHandler = deleteInsuranceHandler;
exports.default = {
    createInsuranceHandler: exports.createInsuranceHandler,
    getAllInsuranceHandler: exports.getAllInsuranceHandler,
    getInsuranceByIdHandler: exports.getInsuranceByIdHandler,
    updateInsuranceHandler: exports.updateInsuranceHandler,
    deleteInsuranceHandler: exports.deleteInsuranceHandler,
};
