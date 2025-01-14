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
const patient_services_1 = __importDefault(require("../../services/patient-services/patient_services"));
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
class PatientController {
    getAllPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patients = yield patient_services_1.default.getAllPatients();
                return (0, handle_response_1.sendSuccess)(res, patients);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, error.status || 500);
            }
        });
    }
    getPatientById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const patient = yield patient_services_1.default.getPatientById(id);
                return (0, handle_response_1.sendSuccess)(res, patient);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, error.status || 500);
            }
        });
    }
    updatePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedData = req.body;
                const updatedPatient = yield patient_services_1.default.updatePatient(id, updatedData);
                return (0, handle_response_1.sendSuccess)(res, updatedPatient);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, error.status || 500);
            }
        });
    }
    deletePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield patient_services_1.default.deletePatient(id);
                return (0, handle_response_1.sendSuccess)(res, "Patient deleted successfully");
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, error.status || 500);
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(PatientController);
exports.default = methods;
