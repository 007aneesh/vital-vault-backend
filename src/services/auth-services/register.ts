import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";
import { registerSchema } from "../../validations/auth_validation";

export const register = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return sendError(res, error, 422);
    }

    const {
      username,
      email,
      contact,
      secondary_contact,
      password,
      name,
      address,
      state,
      city,
      pincode,
      plan,
      access_level = "ADMIN",
    } = result.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await prisma.organisation.findFirst({
      where: {
        username,
      },
    });

    if (existingAdmin) {
      return sendError(res, "Organisation already registered!!");
    }

    const newOrganisation = await prisma.organisation.create({
      data: {
        username,
        name,
        email,
        contact,
        secondary_contact,
        password: hashedPassword,
        address,
        state,
        city,
        pincode,
        plan,
        access_level,
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
        accessToken,
      },
      201,
    );
  } catch (error) {
    console.error(error);
    return sendError(res, "Internal server error", 500);
  }
};
