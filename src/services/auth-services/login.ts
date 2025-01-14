import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { isValidPassword } from "../../utils/password_validate";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";
import { ModelType, LoginParams } from "../../utils/types";

const modelMapping: Record<ModelType, any> = {
  organisation: prisma.organisation,
  employee: prisma.employee,
  patient: prisma.patient,
};

export const login = async (
  req: Request,
  res: Response,
  params: LoginParams,
) => {
  try {
    const { password } = req.body;
    const identifierValue = req.body[params.identifier];

    if (!identifierValue) {
      return sendError(res, `${params.identifier} is required`, 400);
    }

    const model = modelMapping[params.model];

    const existingUser = await model.findFirst({
      where: { [params.identifier]: identifierValue },
    });

    if (!existingUser) {
      return sendError(res, params.notRegisteredError);
    }

    if (
      existingUser?.password &&
      (await isValidPassword(password, existingUser.password))
    ) {
      const accessTokenPromise = signAccessToken(existingUser?.id);
      const refreshTokenPromise = signRefreshToken(existingUser?.id);

      const [accessToken, refreshToken] = await Promise.all([
        accessTokenPromise,
        refreshTokenPromise,
      ]);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return sendSuccess(res, { accessToken });
    } else {
      return sendError(res, "Invalid Credentials", 401);
    }
  } catch (error) {
    return sendError(res, `Internal server error: ${error}`, 500);
  }
};
