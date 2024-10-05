import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";
import { registerSchema } from "../../validations/auth_validation";
import { checkUniqueFields } from "../../middlewares/schema_vaidation";

export const register = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return sendError(res, error, 500);
    }

    const {
      userName,
      email,
      contactNo,
      secContact,
      password,
      orgName,
      address,
      pinCode,
      city,
      state,
      planSelected,
    } = result.data;

    const uniqueErrors = await checkUniqueFields("organisation", {
      userName,
      email,
      contactNo,
      orgName,
    });

    if (uniqueErrors) {
      return sendError(res, uniqueErrors.join(", "), 400);
    }

    const hash_password = await bcrypt.hash(password, 10);

    const newOrganisation = await prisma.organisation.create({
      data: {
        userName,
        email,
        contactNo,
        secContact,
        password: hash_password,
        orgName,
        address,
        pinCode,
        city,
        state,
        planSelected,
      },
    });

    const accessTokenPromise = signAccessToken(newOrganisation.id);
    const refreshTokenPromise = signRefreshToken(newOrganisation.id);

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return sendSuccess(
      res,
      {
        message: "Organization registered successfully",
        accessToken,
      },
      201
    );
  } catch (error) {
    return sendError(res, "Internal server error", 500);
  }
};
