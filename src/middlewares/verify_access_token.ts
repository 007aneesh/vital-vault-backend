import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { sendError } from "../utils/handle_response";

export const verifyAccessToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"])
    return sendError(res, "Unauthorised", 401);

  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(
    token,
    String(process.env.ACCESS_TOKEN_SECRET),
    (err: any, payload: any) => {
      if (err){
        if(err.name === 'JsonWebTokenError'){
            return sendError(res, "Unauthorised", 401);
        }else{
            return sendError(res, err.message, 401);
        }
      }
      req.payload = payload;
      next();
    }
  );
};
