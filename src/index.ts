import { Request, Response } from "express";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./routes/auth";
import admin from "./routes/admin";

import { verifyAccessToken } from "./middlewares/verify_access_token";

const app = express();
const PORT = Number(process.env.PORT) || 8001;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", verifyAccessToken, (req: Request, res: Response) => {
  res.send({ message: "Server is Up and Running" });
});

app.use("/auth", auth);
app.use("/adm/v1", admin);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
