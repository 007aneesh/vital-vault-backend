"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutesV1 = exports.PresciptionRoutesV1 = exports.MedicationRoutesV1 = exports.PatientRoutesV1 = exports.EmployeeRoutesV1 = exports.AdminRoutesV1 = exports.AuthRoutesV1 = void 0;
const auth_1 = __importDefault(require("./v1/auth"));
exports.AuthRoutesV1 = auth_1.default;
const admin_1 = __importDefault(require("./v1/admin"));
exports.AdminRoutesV1 = admin_1.default;
const employee_1 = __importDefault(require("./v1/employee"));
exports.EmployeeRoutesV1 = employee_1.default;
const patient_1 = __importDefault(require("./v1/patient"));
exports.PatientRoutesV1 = patient_1.default;
const medication_1 = __importDefault(require("./v1/medication"));
exports.MedicationRoutesV1 = medication_1.default;
const prescription_1 = __importDefault(require("./v1/prescription"));
exports.PresciptionRoutesV1 = prescription_1.default;
const report_1 = __importDefault(require("./v1/report"));
exports.ReportRoutesV1 = report_1.default;
