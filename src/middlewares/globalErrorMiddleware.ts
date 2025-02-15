import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { sendError } from "../utils/handle_response";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    return next();
  }

  console.log("Global Error Handler", err);

  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  return sendError(res, "Something went wrong", 500);
};
