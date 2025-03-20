import { Request, Response, Router } from "express";

import { verifyAccessToken } from "../../middlewares/verify_access_token";

import AuthRoutes from "./auth";
import AdminRoutes from "./admin";
import EmployeeRoutes from "./employee";
import PatientRoutes from "./patient";
import MedicationRoutes from "./medication";
import PresciptionRoutes from "./prescription";
import ReportRoutes from "./report";
import SessionRoutes from "./session";
import UserRoutes from "./users";
import UploadRoutes from "./upload";
import AppointmentRoutes from "./appointment";
import AIAudioRoutes from "./audio";

import { sendSuccess } from "../../utils/handle_response";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admin", verifyAccessToken, AdminRoutes);
router.use("/employee", verifyAccessToken, EmployeeRoutes);
router.use("/patient", verifyAccessToken, PatientRoutes);
router.use("/medication", verifyAccessToken, MedicationRoutes);
router.use("/prescription", verifyAccessToken, PresciptionRoutes);
router.use("/report", verifyAccessToken, ReportRoutes);
router.use("/session", verifyAccessToken, SessionRoutes);
router.use("/user", verifyAccessToken, UserRoutes);
router.use("/upload", verifyAccessToken, UploadRoutes);
router.use("/appointment", verifyAccessToken, AppointmentRoutes);
router.use("/audio", verifyAccessToken, AIAudioRoutes);

router.get("/status", (req: Request, res: Response) => {
  return sendSuccess(res, "The API route is working fine");
});

export default router;
