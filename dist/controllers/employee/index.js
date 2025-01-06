"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateDetails = void 0;
const employee_controller_1 = __importDefault(require("./employee_controller"));
exports.updateDetails = employee_controller_1.default.changeEmployeeDetails;
exports.changePassword = employee_controller_1.default.changePassword;
