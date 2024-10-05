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
const express_1 = __importDefault(require("express"));
const register_1 = require("../services/auth-services/register");
const admin_login_1 = require("../services/auth-services/admin_login");
const refresh_token_1 = require("../services/auth-services/refresh_token");
const user_login_1 = require("../services/auth-services/user_login");
const employee_login_1 = require("../services/auth-services/employee_login");
const router = express_1.default.Router();
// registration routes
router.post("/register", register_1.register);
// login routes
router.post("/admin-login-v1", admin_login_1.adminLogin);
router.post("/user-login-v1", user_login_1.patientLogin);
router.post("/employee-login-v1", employee_login_1.employeeLogin);
// refresh token route
router.post("/refresh-token", refresh_token_1.refreshToken);
//logout route
router.delete("/logout", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("logout route");
}));
exports.default = router;
