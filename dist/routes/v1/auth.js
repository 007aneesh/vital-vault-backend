"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../../services/auth-services/auth.service");
const refresh_token_1 = require("../../services/auth-services/refresh_token");
const auth_1 = require("../../controllers/auth");
const verify_controller_1 = require("../../controllers/auth/verify.controller");
const logout_controller_1 = require("../../controllers/auth/logout_controller");
const verify_access_token_1 = require("../../middlewares/verify_access_token");
const router = express_1.default.Router();
// registration routes
router.post("/register", auth_service_1.register);
// login routes
router.post("/login", auth_1.LoginController.adminLogin);
router.post("/user-login", auth_1.LoginController.patientLogin);
// router.post("/employee-login", LoginController.employeeLogin);
router.post("/email/verify/:code", verify_controller_1.verify);
router.post("/password/forgot", verify_controller_1.sendPasswordResetHandler);
router.post("/password/reset", verify_controller_1.resetPasswordHandler);
// refresh token route
router.post("/refresh", refresh_token_1.refreshToken);
//logout route
router.delete("/logout", verify_access_token_1.verifyAccessToken, logout_controller_1.logoutHandler);
exports.default = router;
