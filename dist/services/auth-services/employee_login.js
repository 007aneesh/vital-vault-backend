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
exports.employeeLogin = void 0;
const db_1 = require("../../utils/db");
const handle_response_1 = require("../../utils/handle_response");
const password_validate_1 = require("../../utils/password_validate");
const jwt_helper_1 = require("../../utils/jwt_helper");
const employeeLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existingEmployee = yield db_1.prisma.employee.findFirst({
            where: {
                username,
            },
        });
        if (!existingEmployee) {
            (0, handle_response_1.sendError)(res, "Employee not registered with organisation!!");
            return;
        }
        if (yield (0, password_validate_1.isValidPassword)(password, existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.password)) {
            const accessTokenPromise = (0, jwt_helper_1.signAccessToken)(existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.id);
            const refreshTokenPromise = (0, jwt_helper_1.signRefreshToken)(existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.id);
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
exports.employeeLogin = employeeLogin;
