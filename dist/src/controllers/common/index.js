"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.ReportController = exports.MedicationController = exports.PrescriptionController = exports.InsuranceController = exports.VisitHistoryController = void 0;
const vistit_history_controller_1 = __importDefault(require("./vistit_history.controller"));
const insurance_controller_1 = __importDefault(require("./insurance.controller"));
const medication_controller_1 = __importDefault(require("./medication.controller"));
const prescription_controller_1 = __importDefault(require("./prescription.controller"));
const report_controller_1 = __importDefault(require("./report.controller"));
const users_controller_1 = __importDefault(require("./users.controller"));
const InsuranceController = insurance_controller_1.default.config;
exports.InsuranceController = InsuranceController;
const MedicationController = medication_controller_1.default.config;
exports.MedicationController = MedicationController;
const VisitHistoryController = vistit_history_controller_1.default.config;
exports.VisitHistoryController = VisitHistoryController;
const PrescriptionController = prescription_controller_1.default.config;
exports.PrescriptionController = PrescriptionController;
const ReportController = report_controller_1.default.config;
exports.ReportController = ReportController;
const UserController = users_controller_1.default.config;
exports.UserController = UserController;
//# sourceMappingURL=index.js.map