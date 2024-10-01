import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { isValidPassword } from "../../utils/password_validate";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";

export const patientLogin = async (req: Request, res: Response) => {

  const { aadharNumber, password } = req.body;
  const existingUser = await prisma.patient.findFirst({
    where: {
      aadharNumber,
    },
  });

  if (!existingUser) {
    return sendError(res, "Patient not registered!!");
  }

  if (await isValidPassword(password, existingUser?.password!)) {
    const accessTokenPromise = signAccessToken(existingUser?.id);
    const refreshTokenPromise = signRefreshToken(existingUser?.id);

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return sendSuccess(res, { accessToken, refreshToken });
  }
  
  sendError(res, "Invalid Credentials", 401);

};
