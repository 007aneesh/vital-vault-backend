import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { isValidPassword } from "../../utils/password_validate";
import { signAccessToken } from "../../utils/jwt_helper";

export const adminLogin = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const existingAdmin = await prisma.organisation.findFirst({
    where: {
      userName,
    },
  });

  if (!existingAdmin) {
    sendError(res, "Organisation not registered!!");
    return;
  }

  if (await isValidPassword(password, existingAdmin?.password!)) {
    const accessToken = await signAccessToken(existingAdmin?.id);
    sendSuccess(res, { accessToken });
    return;
  } else {
    sendError(res, "Invalid Credentials", 401);
    return;
  }
};
