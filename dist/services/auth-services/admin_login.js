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
exports.adminLogin = void 0;
const db_1 = require("../../utils/db");
const handle_response_1 = require("../../utils/handle_response");
const password_validate_1 = require("../../utils/password_validate");
const jwt_helper_1 = require("../../utils/jwt_helper");
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const existingAdmin = yield db_1.prisma.organisation.findFirst({
            where: {
                userName,
            },
        });
        if (!existingAdmin) {
            return (0, handle_response_1.sendError)(res, "Organisation not registered!!");
        }
        if (yield (0, password_validate_1.isValidPassword)(password, existingAdmin === null || existingAdmin === void 0 ? void 0 : existingAdmin.password)) {
            const accessTokenPromise = (0, jwt_helper_1.signAccessToken)(existingAdmin === null || existingAdmin === void 0 ? void 0 : existingAdmin.id);
            const refreshTokenPromise = (0, jwt_helper_1.signRefreshToken)(existingAdmin === null || existingAdmin === void 0 ? void 0 : existingAdmin.id);
            const [accessToken, refreshToken] = yield Promise.all([
                accessTokenPromise,
                refreshTokenPromise,
            ]);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            return (0, handle_response_1.sendSuccess)(res, { accessToken });
        }
        else {
            return (0, handle_response_1.sendError)(res, "Invalid Credentials", 401);
        }
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, "Internal server error", 500);
    }
});
exports.adminLogin = adminLogin;
