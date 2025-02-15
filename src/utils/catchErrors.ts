import { Request, Response, NextFunction } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const catchErrors =
  (controller: AsyncController): AsyncController =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.log("Catch Error", error, "\n end of error");
      // pass error on
      next(error);
    }
  };

export default catchErrors;
