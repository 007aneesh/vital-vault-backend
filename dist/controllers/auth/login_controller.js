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
const login_1 = require("../../services/auth-services/login");
const constant_1 = require("../../utils/constant");
const singleton_class_1 = require("../../utils/singleton_class");
class LoginController {
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, login_1.login)(req, res, {
                model: constant_1.Models.ORGANISATION,
                identifier: "username",
                notRegisteredError: "Organisation not registered!!",
            });
        });
    }
    employeeLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, login_1.login)(req, res, {
                model: constant_1.Models.EMPLOYEE,
                identifier: "username",
                notRegisteredError: "Employee not registered with organisation!!",
            });
        });
    }
    patientLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, login_1.login)(req, res, {
                model: constant_1.Models.PATIENT,
                identifier: "aadhar_number",
                notRegisteredError: "Patient not registered!!",
            });
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(LoginController);
exports.default = methods;
