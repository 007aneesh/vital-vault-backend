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
const jwt_helper_1 = require("../../utils/jwt_helper");
const verify_access_token_1 = require("../../middlewares/verify_access_token");
const db_1 = require("../../utils/db");
const cookies_1 = require("../../utils/cookies");
const date_1 = require("../../utils/date");
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req === null || req === void 0 ? void 0 : req.cookies;
    if (!refreshToken)
        return (0, handle_response_1.sendError)(res, "Bad Request - Unauthorised", 400);
    try {
        const { payload } = (0, verify_access_token_1.verifyToken)(refreshToken, {
            secret: process.env.REFRESH_TOKEN_SECRET,
        });
        const session = yield db_1.prisma.session.findFirst({
            where: {
                id: payload.session_id,
            },
        });
        if (!session) {
            (0, handle_response_1.sendError)(res, "Session expired", 400);
        }
        else {
            const sessionNeedsRefresh = session.expires_at.getTime() - Date.now() <= date_1.ONE_DAY_MS;
            if (sessionNeedsRefresh) {
                yield db_1.prisma.session.update({
                    where: {
                        id: session.id,
                    },
                    data: {
                        expires_at: (0, date_1.thirtyDaysFromNow)(),
                    },
                });
            }
            let newRefreshToken = undefined;
            if (sessionNeedsRefresh) {
                newRefreshToken = yield (0, jwt_helper_1.signRefreshToken)(session.user_id, session.id);
            }
            const accessToken = yield (0, jwt_helper_1.signAccessToken)(session.user_id, session.id);
            res.cookie("accessToken", accessToken, (0, cookies_1.getAccessTokenCookieOptions)());
            if (newRefreshToken)
                res.cookie("refreshToken", newRefreshToken, (0, cookies_1.getRefreshTokenCookieOptions)());
            (0, handle_response_1.sendSuccess)(res, "Access token refreshed", 200, accessToken);
        }
    }
    catch (error) {
        (0, handle_response_1.sendError)(res, `Invalid Refresh Token: ${error}`, 403);
    }
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=refresh_token.js.map