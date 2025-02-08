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
exports.resetPassword = exports.sendPasswordResetEmail = exports.verifyEmail = exports.register = exports.userLogin = exports.login = void 0;
const db_1 = require("../../utils/db");
const handle_response_1 = require("../../utils/handle_response");
const password_validate_1 = require("../../utils/password_validate");
const jwt_helper_1 = require("../../utils/jwt_helper");
const date_1 = require("../../utils/date");
const cookies_1 = require("../../utils/cookies");
const auth_validation_1 = require("../../validations/auth_validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const send_mail_1 = require("../../utils/send_mail");
const email_template_1 = require("../../utils/email_template");
const appAssert_1 = __importDefault(require("../../utils/appAssert"));
const http_1 = require("../../utils/http");
const clientInfo_1 = __importDefault(require("../../utils/clientInfo"));
const login = (req, res, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const identifierValue = req.body[params.identifier];
        const user_agent = (0, clientInfo_1.default)(req);
        if (!identifierValue) {
            return (0, handle_response_1.sendError)(res, `${params.identifier} is required`, 400);
        }
        const existingUser = yield db_1.prisma.entity_Mapping.findFirst({
            where: { [params.identifier]: identifierValue },
        });
        if (!existingUser) {
            return (0, handle_response_1.sendError)(res, params.notRegisteredError);
        }
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.password) &&
            (yield (0, password_validate_1.isValidPassword)(password, existingUser.password))) {
            const session = yield db_1.prisma.session.create({
                data: {
                    user_id: existingUser.id,
                    user_agent: user_agent,
                    expires_at: (0, date_1.thirtyDaysFromNow)(),
                },
            });
            const [accessToken, refreshToken] = yield Promise.all([
                (0, jwt_helper_1.signAccessToken)(existingUser.id, session.id),
                (0, jwt_helper_1.signRefreshToken)(existingUser.id, session.id),
            ]);
            (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken });
            return (0, handle_response_1.sendSuccess)(res, { message: "Login Successful" });
        }
        else {
            return (0, handle_response_1.sendError)(res, "Invalid Credentials", 401);
        }
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, `Internal server error: ${error}`, 500);
    }
});
exports.login = login;
const userLogin = (req, res, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const identifierValue = req.body[params.identifier];
        const user_agent = (0, clientInfo_1.default)(req);
        if (!identifierValue) {
            return (0, handle_response_1.sendError)(res, `${params.identifier} is required`, 400);
        }
        const existingUser = yield db_1.prisma.patient.findFirst({
            where: { [params.identifier]: identifierValue },
        });
        if (!existingUser) {
            return (0, handle_response_1.sendError)(res, params.notRegisteredError);
        }
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.password) &&
            (yield (0, password_validate_1.isValidPassword)(password, existingUser.password))) {
            const session = yield db_1.prisma.session.create({
                data: {
                    user_id: existingUser.id,
                    user_agent: user_agent,
                    expires_at: (0, date_1.thirtyDaysFromNow)(),
                },
            });
            const [accessToken, refreshToken] = yield Promise.all([
                (0, jwt_helper_1.signAccessToken)(existingUser.id, session.id),
                (0, jwt_helper_1.signRefreshToken)(existingUser.id, session.id),
            ]);
            (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken });
            return (0, handle_response_1.sendSuccess)(res, { message: "Login Successful" });
        }
        else {
            return (0, handle_response_1.sendError)(res, "Invalid Credentials", 401);
        }
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, `Internal server error: ${error}`, 500);
    }
});
exports.userLogin = userLogin;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_agent = (0, clientInfo_1.default)(req);
        const result = auth_validation_1.registerSchema.safeParse(Object.assign(Object.assign({}, req.body), { userAgent: user_agent }));
        if (!result.success) {
            const error = result.error.issues
                .map((issue) => issue.message)
                .join(", ");
            return (0, handle_response_1.sendError)(res, error, 422);
        }
        const { username, email, contact, secondary_contact, password, name, address, state, city, pincode, plan, access_level = "ADMIN" /* AccessLevel.ADMIN */, userAgent, } = result.data;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const existing = yield db_1.prisma.entity_Mapping.findFirst({
            where: {
                username,
            },
        });
        if (existing) {
            return (0, handle_response_1.sendError)(res, "Organisation already registered!!");
        }
        const newOrganisation = yield db_1.prisma.organisation.create({
            data: {
                name,
                contact,
                secondary_contact,
                address,
                state,
                city,
                pincode,
                plan,
                access_level,
            },
        });
        yield db_1.prisma.entity_Mapping.create({
            data: {
                ref_id: newOrganisation.id,
                type: "organisation" /* UserType.ORGANISATION */,
                username,
                email,
                password: hashedPassword,
            },
        });
        const verificationCode = yield db_1.prisma.verificationCode.create({
            data: {
                user_id: newOrganisation.id,
                type: "email_verfication" /* VerificationCodeType.EMAIL_VERIFICATION */,
                expires_at: (0, date_1.oneHourFromNow)(),
            },
        });
        console.log("verificationCode", verificationCode);
        const url = `${process.env.APP_ORIGIN}/api/v1/auth/email/verify/${verificationCode.user_id}`;
        const { error } = yield (0, send_mail_1.sendMail)(Object.assign({ to: email }, (0, email_template_1.getVerifyEmailTemplate)(url)));
        if (error) {
            return (0, handle_response_1.sendError)(res, "Failed to send verification email", 500);
        }
        const session = yield db_1.prisma.session.create({
            data: {
                user_id: newOrganisation.id,
                user_agent: userAgent,
                expires_at: (0, date_1.thirtyDaysFromNow)(),
            },
        });
        const [accessToken, refreshToken] = yield Promise.all([
            (0, jwt_helper_1.signAccessToken)(newOrganisation.id, session.id),
            (0, jwt_helper_1.signRefreshToken)(newOrganisation.id, session.id),
        ]);
        (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken });
        return (0, handle_response_1.sendSuccess)(res, {
            message: "Registration Successfull!!",
        }, 201);
    }
    catch (error) {
        console.error(error);
        return (0, handle_response_1.sendError)(res, "Internal server error", 500);
    }
});
exports.register = register;
const verifyEmail = (req, res, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validCode = yield db_1.prisma.verificationCode.findFirst({
            where: {
                user_id: code,
                type: "email_verfication" /* VerificationCodeType.EMAIL_VERIFICATION */,
                expires_at: {
                    gt: new Date(),
                },
            },
        });
        if (!validCode) {
            return (0, handle_response_1.sendError)(res, "Invalid or expired verification code", 400);
        }
        yield db_1.prisma.entity_Mapping.updateMany({
            where: { ref_id: validCode.user_id, type: "organisation" /* UserType.ORGANISATION */ },
            data: {
                verified: true,
            },
        });
        yield db_1.prisma.verificationCode.delete({
            where: { id: validCode.id },
        });
        return res.redirect(`${process.env.FRONTEND_ORIGIN}/verify/email/success`);
    }
    catch (error) {
        console.log(error);
        return (0, handle_response_1.sendError)(res, error, 500);
    }
});
exports.verifyEmail = verifyEmail;
const sendPasswordResetEmail = (req, res, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.prisma.entity_Mapping.findFirst({
            where: { email: email },
        });
        if (!user) {
            return (0, handle_response_1.sendError)(res, "Not Found", 404);
        }
        // check for max password reset requests (2 emails in 5min)
        const fiveMinAgo = (0, date_1.fiveMinutesAgo)();
        const count = yield db_1.prisma.verificationCode.count({
            where: {
                user_id: user.id,
                type: "password_reset" /* VerificationCodeType.PASSWORD_RESET */,
                created_at: { gt: fiveMinAgo },
            },
        });
        if (count > 1) {
            return (0, handle_response_1.sendError)(res, "Too many requests, please try again in 5 minutes.", 429);
        }
        const expiresAt = (0, date_1.oneHourFromNow)();
        const verificationCode = yield db_1.prisma.verificationCode.create({
            data: {
                user_id: user.ref_id,
                type: "password_reset" /* VerificationCodeType.PASSWORD_RESET */,
                expires_at: expiresAt,
            },
        });
        const url = `${process.env.FRONTEND_ORIGIN}/reset-password?code=${verificationCode.id}&exp=${expiresAt.getTime()}`;
        const { data, error } = yield (0, send_mail_1.sendMail)(Object.assign({ to: user.email }, (0, email_template_1.getPasswordResetTemplate)(url)));
        (0, appAssert_1.default)(data === null || data === void 0 ? void 0 : data.id, http_1.INTERNAL_SERVER_ERROR, `${error === null || error === void 0 ? void 0 : error.name} - ${error === null || error === void 0 ? void 0 : error.message}`);
        return (0, handle_response_1.sendSuccess)(res, {
            message: "Email sent successfully",
            data: {
                url,
                email_id: data.id,
            },
        }, 200);
    }
    catch (error) {
        console.log("SendPasswordResetError:", error.message);
        return (0, handle_response_1.sendError)(res, "Internal server error", 500);
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const resetPassword = (req, res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validCode = yield db_1.prisma.verificationCode.findFirst({
            where: {
                id: payload.code,
                type: "password_reset" /* VerificationCodeType.PASSWORD_RESET */,
                expires_at: { gt: new Date() },
            },
        });
        if (!validCode) {
            return (0, handle_response_1.sendError)(res, "Invalid or expired verification code", 400);
        }
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
        yield db_1.prisma.entity_Mapping.updateMany({
            where: { ref_id: validCode.user_id },
            data: { password: hashedPassword },
        });
        yield db_1.prisma.verificationCode.deleteMany({
            where: { user_id: validCode.user_id },
        });
        yield db_1.prisma.session.deleteMany({ where: { user_id: validCode.user_id } });
        (0, cookies_1.clearAuthCookies)(res);
        return (0, handle_response_1.sendSuccess)(res, {
            message: "Password reset successful",
            data: {
                redirect_url: `${process.env.FRONTEND_ORIGIN}/verify/password-reset/success`,
            },
        }, 200);
    }
    catch (error) {
        console.error("ResetPasswordError:", error.message);
        return (0, handle_response_1.sendError)(res, "Internal server error", 500);
    }
});
exports.resetPassword = resetPassword;
