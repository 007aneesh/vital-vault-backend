import { CookieOptions } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

export const REFRESH_PATH = "/api/v1/auth";
const secure = process.env.NODE_ENV === "production";

const defaults: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  secure,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
});

type Params = {
  res: any;
  accessToken: string;
  refreshToken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res: any) =>
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });
