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
exports.refreshToken = void 0;
const handle_response_1 = require("../../utils/handle_response");
const verify_refresh_token_1 = require("../../middlewares/verify_refresh_token");
const jwt_helper_1 = require("../../utils/jwt_helper");
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
        return (0, handle_response_1.sendError)(res, "Bad Request", 400);
    try {
        const userId = yield (0, verify_refresh_token_1.verifyRefreshToken)(refreshToken);
        const accessTokenPromise = (0, jwt_helper_1.signAccessToken)(userId);
        const refreshTokenPromise = (0, jwt_helper_1.signRefreshToken)(userId);
        const [accessToken, newRefreshToken] = yield Promise.all([
            accessTokenPromise,
            refreshTokenPromise,
        ]);
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        (0, handle_response_1.sendSuccess)(res, { accessToken });
    }
    catch (error) {
        (0, handle_response_1.sendError)(res, "Invalid Refresh Token", 403);
    }
});
exports.refreshToken = refreshToken;
