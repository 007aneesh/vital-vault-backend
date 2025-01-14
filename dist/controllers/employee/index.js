"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeMedicalHistoryController = exports.EmployeeController = void 0;
const employee_controller_1 = __importDefault(require("./employee_controller"));
const medical_history_controller_1 = __importDefault(require("./medical_history_controller"));
const EmployeeController = employee_controller_1.default.config;
exports.EmployeeController = EmployeeController;
const EmployeeMedicalHistoryController = medical_history_controller_1.default.config;
exports.EmployeeMedicalHistoryController = EmployeeMedicalHistoryController;
