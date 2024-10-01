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
    orgName,
    address,
    pinCode,
    city,
    state,
    planSelected,
  } = req.body;

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

  const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);


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
