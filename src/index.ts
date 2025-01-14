import { Request, Response } from "express";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import {
  AuthRoutesV1,
  AdminRoutesV1,
  EmployeeRoutesV1,
  PatientRoutesV1,
  MedicationRoutesV1,
  PresciptionRoutesV1,
  ReportRoutesV1,
} from "./routes";

import { verifyAccessToken } from "./middlewares/verify_access_token";

const app = express();
const PORT = Number(process.env.PORT) || 8001;

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

app.use("/v1/auth", AuthRoutesV1);
app.use("/v1/admin", AdminRoutesV1);
app.use("/v1/employee", EmployeeRoutesV1);
app.use("/v1/patient", PatientRoutesV1);
app.use("/v1/medication", MedicationRoutesV1);
app.use("/v1/prescription", PresciptionRoutesV1);
app.use("/v1/report", ReportRoutesV1);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
