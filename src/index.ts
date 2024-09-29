import { Request, Response } from "express";

import express from "express";
import cors from "cors";
import auth from "./routes/auth";

const app = express();
const PORT = Number(process.env.PORT) || 8001;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Server is Up and Running" });
});

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
