import { Request, Response } from "express";

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import { verifyAccessToken } from "./middlewares/verify_access_token";

import routes from "./routes";
import AppError from "./utils/appError";
import { globalErrorHandler } from "./middlewares/globalErrorMiddleware";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://vital-vault-plus.vercel.app"],
    credentials: true,
  }),
);

app.use(cookieParser());

app.get("/", verifyAccessToken, (req: Request, res: Response) => {
  res.send({ message: "Server is Up and Running" });
});

app.get("/status", (req: Request, res: Response) => {
  res.status(200).send({ message: "Server is Up and Running" });
});

app.use("/api", routes);

app.all("*", (req, res, next) => {
  next(new AppError(404, "Can't find ${req.originalUrl} on this server!"));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
