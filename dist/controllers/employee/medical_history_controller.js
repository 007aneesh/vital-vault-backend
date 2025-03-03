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
const medical_history_service_1 = __importDefault(require("../../services/medical/medical_history_service"));
const handle_response_1 = require("../../utils/handle_response");
const db_1 = require("../../utils/db");
const singleton_class_1 = require("../../utils/singleton_class");
const employee_medical_history = new medical_history_service_1.default(db_1.prisma.employeeMedicalHistory);
class EmployeeMedicalHistoryController {
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield employee_medical_history.getById(id);
                return (0, handle_response_1.sendSuccess)(res, data);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 404);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRecord = yield employee_medical_history.create(req.body);
                return (0, handle_response_1.sendSuccess)(res, newRecord, 201);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 400);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedRecord = yield employee_medical_history.update(id, req.body);
                return (0, handle_response_1.sendSuccess)(res, updatedRecord);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 400);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield employee_medical_history.delete(id);
                return (0, handle_response_1.sendSuccess)(res, "Record deleted successfully");
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 400);
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(EmployeeMedicalHistoryController);
exports.default = methods;
//# sourceMappingURL=medical_history_controller.js.map