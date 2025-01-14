"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = exports.PatientMedicalHistoryController = void 0;
const patient_controller_1 = __importDefault(require("./patient_controller"));
const medical_history_controller_1 = __importDefault(require("./medical_history_controller"));
const PatientMedicalHistoryController = medical_history_controller_1.default.config;
exports.PatientMedicalHistoryController = PatientMedicalHistoryController;
const PatientController = patient_controller_1.default.config;
exports.PatientController = PatientController;
