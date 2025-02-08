import { NextFunction, Response } from "express";
import jwt, { VerifyOptions } from "jsonwebtoken";
import { sendError } from "../utils/handle_response";
import { ACCESS_TOKEN_SECRET } from "../utils/env";

export const verifyAccessToken = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers["authorization"]) return sendError(res, "Unauthorised", 401);

  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  if (bearerToken.length !== 2) {
    return sendError(res, "Unauthorized: Malformed token", 401);
  }
  const token = bearerToken[1];
  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.payload = payload;
    next();
  } catch (err: any) {
    if (err.name === "JsonWebTokenError") {
      return sendError(res, "Unauthorized: Invalid token", 401);
    } else if (err.name === "TokenExpiredError") {
      return sendError(res, "Unauthorized: Token expired", 401);
    } else {
      return sendError(res, `Unauthorized: ${err.message}`, 401);
    }
  }
};

export const verifyToken = <TPayload extends object = any>(
  token: string,
  options?: VerifyOptions & {
    secret?: string;
  },
) => {
  const { secret = ACCESS_TOKEN_SECRET, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...verifyOpts,
    }) as TPayload;
    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
