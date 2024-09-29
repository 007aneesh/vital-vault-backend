import { NextFunction, Request, Response } from "express";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { verifyRefreshToken } from "../../middlewares/verify_refresh_token";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    if(!refreshToken) return sendError(res, "Bad Request", 400);

    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);

    sendSuccess(res, { accessToken, refreshToken: newRefreshToken });
}