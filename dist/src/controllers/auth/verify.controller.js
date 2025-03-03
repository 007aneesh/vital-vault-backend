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
exports.resetPasswordHandler = exports.sendPasswordResetHandler = exports.verify = void 0;
const zod_1 = require("zod");
const auth_service_1 = require("../../services/auth-services/auth.service");
const handle_response_1 = require("../../utils/handle_response");
const verificationCodeSchema = zod_1.z.string().min(1).max(24);
const emailSchema = zod_1.z.string().email().min(1).max(255);
const resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(6).max(255),
    code: zod_1.z.string(),
});
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verificationCode = verificationCodeSchema.parse(req.params.code);
        yield (0, auth_service_1.verifyEmail)(req, res, verificationCode);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, `Invalid verification code: ${error}`, 400);
    }
});
exports.verify = verify;
const sendPasswordResetHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = emailSchema.parse(req.body.email);
        yield (0, auth_service_1.sendPasswordResetEmail)(req, res, email);
        console.log("Email sent successfully");
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, `Invalid email: ${error}`, 400);
    }
});
exports.sendPasswordResetHandler = sendPasswordResetHandler;
const resetPasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            password: req.body.password,
            code: req.params.code,
        };
        const request = resetPasswordSchema.parse(payload);
        yield (0, auth_service_1.resetPassword)(req, res, request);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, `Internal Server Error: ${error}`, 400);
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
//# sourceMappingURL=verify.controller.js.map