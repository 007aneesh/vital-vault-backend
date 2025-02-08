import { Request, Response } from "express";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { verifyAccessToken } from "./middlewares/verify_access_token";

import routes from "./routes";
import { PORT } from "./utils/env";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
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

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
