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
const employee_services_1 = __importDefault(require("../../services/employee-services/employee_services"));
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
class EmployeeController {
    // Get all employees
    getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield employee_services_1.default.getAllEmployees();
                return (0, handle_response_1.sendSuccess)(res, employees, 200);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    // Get employee by ID
    getEmployeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.user_id;
                const employee = yield employee_services_1.default.getEmployeeById(id);
                if (!employee) {
                    return (0, handle_response_1.sendError)(res, "Employee not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, employee);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    changeEmployeeDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.user_id;
                const data = req.body;
                const updatedEmployee = yield employee_services_1.default.updateDetails(id, data);
                if (!updatedEmployee) {
                    res.status(404).json({ message: "Employee not found" });
                }
                else {
                    res.json(updatedEmployee);
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error, message: "Failed to update employee details" });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.user_id;
                const { new_password } = req.body;
                const updatedEmployee = yield employee_services_1.default.changePassword(id, new_password);
                if (!updatedEmployee) {
                    res.status(404).json({ message: "Employee not found" });
                }
                else {
                    res.json({ message: "Password updated successfully" });
                }
            }
            catch (error) {
                res.status(500).json({ error, message: "Failed to update password" });
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(EmployeeController);
exports.default = methods;
