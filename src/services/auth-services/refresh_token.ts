import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { verifyRefreshToken } from "../../middlewares/verify_refresh_token";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return sendError(res, "Bad Request", 400);

  try {
    const userId = await verifyRefreshToken(refreshToken);

    const accessTokenPromise = signAccessToken(userId);
    const refreshTokenPromise = signRefreshToken(userId);

    const [accessToken, newRefreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    sendSuccess(res, { accessToken });
  } catch (error) {
    sendError(res, `Invalid Refresh Token: ${error}`, 403);
  }
};
