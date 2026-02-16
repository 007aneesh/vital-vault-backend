"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookies = exports.setAuthCookies = exports.getRefreshTokenCookieOptions = exports.getAccessTokenCookieOptions = exports.REFRESH_PATH = void 0;
const date_1 = require("./date");
exports.REFRESH_PATH = "/api/v1/auth";
const secure = process.env.NODE_ENV === "production";
const defaults = {
    sameSite: "none",
    httpOnly: true,
    secure,
};
const getAccessTokenCookieOptions = () => (Object.assign(Object.assign({}, defaults), { expires: (0, date_1.fifteenMinutesFromNow)() }));
exports.getAccessTokenCookieOptions = getAccessTokenCookieOptions;
const getRefreshTokenCookieOptions = () => (Object.assign(Object.assign({}, defaults), { expires: (0, date_1.thirtyDaysFromNow)() }));
exports.getRefreshTokenCookieOptions = getRefreshTokenCookieOptions;
const setAuthCookies = ({ res, accessToken, refreshToken }) => res
    .cookie("accessToken", accessToken, (0, exports.getAccessTokenCookieOptions)())
    .cookie("refreshToken", refreshToken, (0, exports.getRefreshTokenCookieOptions)());
exports.setAuthCookies = setAuthCookies;
const clearAuthCookies = (res) => res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: exports.REFRESH_PATH });
exports.clearAuthCookies = clearAuthCookies;
//# sourceMappingURL=cookies.js.map