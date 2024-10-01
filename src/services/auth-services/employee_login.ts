import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { isValidPassword } from "../../utils/password_validate";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";

export const employeeLogin = async (req: Request, res: Response) => {

  const { username, password } = req.body;
  const existingEmployee = await prisma.employee.findFirst({
    where: {
      username,
    },
  });

  if (!existingEmployee) {
    sendError(res, "Employee not registered with organisation!!");
    return;
  }

  if (await isValidPassword(password, existingEmployee?.password!)) {
    const accessTokenPromise = signAccessToken(existingEmployee?.id);
    const refreshTokenPromise = signRefreshToken(existingEmployee?.id);

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return sendSuccess(res, { accessToken, refreshToken });
  } else {
    return sendError(res, "Invalid Credentials", 401);
  }
};
