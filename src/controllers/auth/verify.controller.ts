import { Request, Response } from "express";
import { z } from "zod";
import {
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
} from "../../services/auth-services/auth.service";
import { sendError } from "../../utils/handle_response";

const verificationCodeSchema = z.string().min(1).max(24);
const emailSchema = z.string().email().min(1).max(255);
const resetPasswordSchema = z.object({
  password: z.string().min(6).max(255),
  code: z.string(),
});

export const verify = async (req: Request, res: Response) => {
  try {
    const verificationCode = verificationCodeSchema.parse(req.params.code);
    await verifyEmail(req, res, verificationCode);
  } catch (error) {
    return sendError(res, `Invalid verification code: ${error}`, 400);
  }
};

export const sendPasswordResetHandler = async (req: Request, res: Response) => {
  try {
    const email = emailSchema.parse(req.body.email);
    await sendPasswordResetEmail(req, res, email);
    console.log("Email sent successfully");
  } catch (error) {
    return sendError(res, `Invalid email: ${error}`, 400);
  }
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  try {
    const payload = {
      password: req.body.password,
      code: req.params.code,
    };
    const request = resetPasswordSchema.parse(payload);
    await resetPassword(req, res, request);
  } catch (error) {
    return sendError(res, `Internal Server Error: ${error}`, 400);
  }
};
