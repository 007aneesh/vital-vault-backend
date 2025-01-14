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
exports.deleteMedicationHandler = exports.updateMedicationHandler = exports.getMedicationByIdHandler = exports.getAllMedicationsHandler = exports.createMedicationHandler = void 0;
const medication_1 = require("../../services/medication/medication");
const handle_response_1 = require("../../utils/handle_response");
const createMedicationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const medication = yield (0, medication_1.createMedication)(data);
        return (0, handle_response_1.sendSuccess)(res, medication, 201);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, error.message, 500);
    }
});
exports.createMedicationHandler = createMedicationHandler;
const getAllMedicationsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medications = yield (0, medication_1.getAllMedications)();
        return (0, handle_response_1.sendSuccess)(res, medications);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, "Failed to fetch medications", 500);
    }
});
exports.getAllMedicationsHandler = getAllMedicationsHandler;
const getMedicationByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const medication = yield (0, medication_1.getMedicationById)(id);
        if (!medication) {
            return (0, handle_response_1.sendError)(res, "Medication not found", 404);
        }
        return (0, handle_response_1.sendSuccess)(res, medication);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, "Failed to fetch medication", 500);
    }
});
exports.getMedicationByIdHandler = getMedicationByIdHandler;
const updateMedicationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedMedication = yield (0, medication_1.updateMedication)(id, data);
        if (!updatedMedication) {
            return (0, handle_response_1.sendError)(res, "Medication not found", 404);
        }
        return (0, handle_response_1.sendSuccess)(res, updatedMedication);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, "Failed to update medication", 500);
    }
});
exports.updateMedicationHandler = updateMedicationHandler;
const deleteMedicationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedMedication = yield (0, medication_1.deleteMedication)(id);
        if (!deletedMedication) {
            return (0, handle_response_1.sendError)(res, "Medication not found", 404);
        }
        return (0, handle_response_1.sendSuccess)(res, deletedMedication);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, "Failed to delete medication", 500);
    }
});
exports.deleteMedicationHandler = deleteMedicationHandler;
