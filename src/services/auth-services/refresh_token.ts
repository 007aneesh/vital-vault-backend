import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";
import { verifyToken } from "../../middlewares/verify_access_token";
import { prisma } from "../../utils/db";
import {
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from "../../utils/cookies";
import { ONE_DAY_MS, thirtyDaysFromNow } from "../../utils/date";

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req?.cookies;

  if (!refreshToken) return sendError(res, "Bad Request - Unauthorised", 400);

  try {
    const { payload } = verifyToken(refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    const session = await prisma.session.findFirst({
      where: {
        id: payload.session_id,
      },
    });

    if (!session) {
      sendError(res, "Session expired", 400);
    } else {
      const sessionNeedsRefresh =
        session.expires_at.getTime() - Date.now() <= ONE_DAY_MS;

      if (sessionNeedsRefresh) {
        await prisma.session.update({
          where: {
            id: session.id,
          },
          data: {
            expires_at: thirtyDaysFromNow(),
          },
        });
      }
      let newRefreshToken: string | undefined = undefined;

      if (sessionNeedsRefresh) {
        newRefreshToken = await signRefreshToken(session.user_id, session.id);
      }

      const accessToken = await signAccessToken(session.user_id, session.id);

      res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
      if (newRefreshToken)
        res.cookie(
          "refreshToken",
          newRefreshToken,
          getRefreshTokenCookieOptions(),
        );

      sendSuccess(res, "Access token refreshed");
    }
  } catch (error) {
    sendError(res, `Invalid Refresh Token: ${error}`, 403);
  }
};
