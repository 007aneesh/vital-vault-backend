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
class EmployeeController {
    changeEmployeeDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.id;
                const data = req.body;
                const updatedEmployee = yield employee_services_1.default.updateDetails(id, data);
                if (!updatedEmployee) {
                    res.status(404).json({ error: "Employee not found" });
                }
                else {
                    res.json(updatedEmployee);
                }
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update employee details" });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.id;
                const { new_password } = req.body;
                const updatedEmployee = yield employee_services_1.default.changePassword(id, new_password);
                if (!updatedEmployee) {
                    res.status(404).json({ error: "Employee not found" });
                }
                else {
                    res.json({ message: "Password updated successfully" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update password" });
            }
        });
    }
}
exports.default = new EmployeeController();
