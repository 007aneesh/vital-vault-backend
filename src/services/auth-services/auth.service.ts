import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { isValidPassword } from "../../utils/password_validate";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";
import { ResetPasswordParams } from "../../utils/types";
import {
  fiveMinutesAgo,
  oneHourFromNow,
  thirtyDaysFromNow,
} from "../../utils/date";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookies";
import { registerSchema } from "../../validations/auth_validation";
import bcrypt from "bcrypt";
import {
  AccessLevel,
  UserType,
  VerificationCodeType,
} from "../../utils/constant";
import { sendMail } from "../../utils/send_mail";
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "../../utils/email_template";
import appAssert from "../../utils/appAssert";
import { INTERNAL_SERVER_ERROR } from "../../utils/http";
import getClientInfo from "../../utils/clientInfo";
import { Prisma } from "@prisma/client";

export const login = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const user_agent = getClientInfo(req);

    const is_existing = await prisma.entity_Mapping.findFirst({
      where: { username: req.body.username },
    });

    if (!is_existing) {
      return sendError(res, "User not found", 404);
    }

    if (
      is_existing?.password &&
      (await isValidPassword(password, is_existing.password))
    ) {
      const session = await prisma.session.create({
        data: {
          user_id: is_existing.id,
          user_agent: user_agent as unknown as Prisma.JsonValue,
          expires_at: thirtyDaysFromNow(),
        },
      });

      await prisma.entity_Mapping.update({
        where: { id: is_existing.id },
        data: {
          last_login_at: new Date(),
        },
      });

      const [accessToken, refreshToken] = await Promise.all([
        signAccessToken(is_existing.ref_id, session.id),
        signRefreshToken(is_existing.ref_id, session.id),
      ]);

      setAuthCookies({ res, accessToken, refreshToken });

      return sendSuccess(res, { message: "Login Successful" });
    } else {
      return sendError(res, "Invalid Credentials", 401);
    }
  } catch (error) {
    return sendError(res, `Internal server error: ${error}`, 500);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user_agent = getClientInfo(req);
    const result = registerSchema.safeParse({
      ...req.body,
      userAgent: user_agent,
    });

    if (!result.success) {
      const error = result.error.issues.reduce(
        (acc, issue) => {
          acc[issue.path.join(".")] = issue.message;
          return acc;
        },
        {} as Record<string, string>,
      );
      return sendError(res, error, 422);
    }

    console.log("here");

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
      access_level = AccessLevel.ADMIN,
      userAgent,
    } = result.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await prisma.entity_Mapping.findFirst({
      where: {
        username,
      },
    });

    if (existing) {
      return sendError(res, "Organisation already registered!!");
    }

    const newOrganisation = await prisma.organisation.create({
      data: {
        name,
        contact,
        secondary_contact,
        address,
        state,
        city,
        pincode,
        plan,
        access_level,
      },
    });

    await prisma.entity_Mapping.create({
      data: {
        ref_id: newOrganisation.id,
        type: UserType.ORGANISATION,
        username,
        email,
        password: hashedPassword,
      },
    });

    const verificationCode = await prisma.verificationCode.create({
      data: {
        user_id: newOrganisation.id,
        type: VerificationCodeType.EMAIL_VERIFICATION,
        expires_at: oneHourFromNow(),
      },
    });

    console.log("verificationCode", verificationCode);

    const url = `${process.env.APP_ORIGIN}/api/v1/auth/email/verify/${verificationCode.user_id}`;

    const { error } = await sendMail({
      to: email,
      ...getVerifyEmailTemplate(url),
    });

    if (error) {
      return sendError(res, "Failed to send verification email", 500);
    }

    const session = await prisma.session.create({
      data: {
        user_id: newOrganisation.id,
        user_agent: userAgent,
        expires_at: thirtyDaysFromNow(),
      },
    });

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(newOrganisation.id, session.id),
      signRefreshToken(newOrganisation.id, session.id),
    ]);

    setAuthCookies({ res, accessToken, refreshToken });

    return sendSuccess(
      res,
      {
        message: "Registration Successfull!!",
      },
      201,
    );
  } catch (error) {
    console.error(error);
    return sendError(res, "Internal server error", 500);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  code: string,
) => {
  try {
    const validCode = await prisma.verificationCode.findFirst({
      where: {
        user_id: code,
        type: VerificationCodeType.EMAIL_VERIFICATION,
        expires_at: {
          gt: new Date(),
        },
      },
    });

    if (!validCode) {
      return sendError(res, "Invalid or expired verification code", 400);
    }

    await prisma.entity_Mapping.updateMany({
      where: { ref_id: validCode.user_id, type: UserType.ORGANISATION },
      data: {
        verified: true,
      },
    });

    await prisma.verificationCode.delete({
      where: { id: validCode.id },
    });

    return res.redirect(`${process.env.FRONTEND_ORIGIN}/verify/email/success`);
  } catch (error) {
    console.log(error);
    return sendError(res, error, 500);
  }
};

export const sendPasswordResetEmail = async (
  req: Request,
  res: Response,
  email: string,
) => {
  try {
    const user = await prisma.entity_Mapping.findFirst({
      where: { email: email },
    });

    if (!user) {
      return sendError(res, "Not Found", 404);
    }

    // check for max password reset requests (2 emails in 5min)
    const fiveMinAgo = fiveMinutesAgo();
    const count = await prisma.verificationCode.count({
      where: {
        user_id: user.id,
        type: VerificationCodeType.PASSWORD_RESET,
        created_at: { gt: fiveMinAgo },
      },
    });

    if (count > 1) {
      return sendError(
        res,
        "Too many requests, please try again in 5 minutes.",
        429,
      );
    }

    const expiresAt = oneHourFromNow();

    const verificationCode = await prisma.verificationCode.create({
      data: {
        user_id: user.ref_id,
        type: VerificationCodeType.PASSWORD_RESET,
        expires_at: expiresAt,
      },
    });

    const url = `${process.env.FRONTEND_ORIGIN}/reset-password?code=${
      verificationCode.id
    }&exp=${expiresAt.getTime()}`;

    const { data, error } = await sendMail({
      to: user.email,
      ...getPasswordResetTemplate(url),
    });

    appAssert(
      data?.id,
      INTERNAL_SERVER_ERROR,
      `${error?.name} - ${error?.message}`,
    );

    return sendSuccess(
      res,
      {
        message: "Email sent successfully",
        data: {
          url,
          email_id: data.id,
        },
      },
      200,
    );
  } catch (error: any) {
    console.log("SendPasswordResetError:", error.message);
    return sendError(res, "Internal server error", 500);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  payload: ResetPasswordParams,
) => {
  try {
    const validCode = await prisma.verificationCode.findFirst({
      where: {
        id: payload.code,
        type: VerificationCodeType.PASSWORD_RESET,
        expires_at: { gt: new Date() },
      },
    });

    if (!validCode) {
      return sendError(res, "Invalid or expired verification code", 400);
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    await prisma.entity_Mapping.updateMany({
      where: { ref_id: validCode.user_id },
      data: { password: hashedPassword },
    });

    await prisma.verificationCode.deleteMany({
      where: { user_id: validCode.user_id },
    });
    await prisma.session.deleteMany({ where: { user_id: validCode.user_id } });

    clearAuthCookies(res);
    return sendSuccess(
      res,
      {
        message: "Password reset successful",
        data: {
          redirect_url: `${process.env.FRONTEND_ORIGIN}/verify/password-reset/success`,
        },
      },
      200,
    );
  } catch (error: any) {
    console.error("ResetPasswordError:", error.message);
    return sendError(res, "Internal server error", 500);
  }
};
