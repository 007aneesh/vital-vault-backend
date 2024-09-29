import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";

export const register = async (req: Request, res: Response) => {
  let {
    userName,
    email,
    contactNo,
    secContact,
    password,
    cpassword,
    orgName,
    address,
    pinCode,
    city,
    state,
    planSelected,
  } = req.body;

  const existingOrganisation = await prisma.organisation.findFirst({
    where: {
      OR: [{ email }, { userName }, { contactNo }, { orgName }],
    },
  });

  if (existingOrganisation) {
    return sendError(res, "Organization already exists!", 400);
  }

  if (password.trim() !== cpassword.trim()) {
    return sendError(res, "Confirm password and password don't match");
  }

  password = await bcrypt.hash(password, 10);

  const newOrganisation = await prisma.organisation.create({
    data: {
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
    },
  });

  const accessToken = await signAccessToken(newOrganisation.id);
  const refreshToken = await signRefreshToken(newOrganisation.id);

  sendSuccess(
    res,
    {
      message: "Organization registered successfully",
      accessToken,
      refreshToken,
    },
    201
  );
};
