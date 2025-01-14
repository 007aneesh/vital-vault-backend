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
exports.login = void 0;
const db_1 = require("../../utils/db");
const handle_response_1 = require("../../utils/handle_response");
const password_validate_1 = require("../../utils/password_validate");
const jwt_helper_1 = require("../../utils/jwt_helper");
const modelMapping = {
    organisation: db_1.prisma.organisation,
    employee: db_1.prisma.employee,
    patient: db_1.prisma.patient,
};
const login = (req, res, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const identifierValue = req.body[params.identifier];
        if (!identifierValue) {
            return (0, handle_response_1.sendError)(res, `${params.identifier} is required`, 400);
        }
        const model = modelMapping[params.model];
        const existingUser = yield model.findFirst({
            where: { [params.identifier]: identifierValue },
        });
        if (!existingUser) {
            return (0, handle_response_1.sendError)(res, params.notRegisteredError);
        }
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.password) &&
            (yield (0, password_validate_1.isValidPassword)(password, existingUser.password))) {
            const accessTokenPromise = (0, jwt_helper_1.signAccessToken)(existingUser === null || existingUser === void 0 ? void 0 : existingUser.id);
            const refreshTokenPromise = (0, jwt_helper_1.signRefreshToken)(existingUser === null || existingUser === void 0 ? void 0 : existingUser.id);
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
        return (0, handle_response_1.sendError)(res, `Internal server error: ${error}`, 500);
    }
});
exports.login = login;
