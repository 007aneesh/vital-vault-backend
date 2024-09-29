import { Response } from "express";

export const sendError = (res: Response, error: any, status : number = 500): void => {
  res.status(status).send({ error });
};

export const sendSuccess = (
  res: Response,
  success: any,
  status: number = 200
): void => {
  res.status(status).send(success);
};