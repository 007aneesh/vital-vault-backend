import { Router } from "express";
import {
  PatientController,
  PatientMedicalHistoryController,
} from "../../controllers/patient";
import { VisitHistoryController } from "../../controllers/common";
import { verifyAccessToken } from "../../middlewares/verify_access_token";

const router = Router();

// patient routes
router.get("/all", PatientController.getAllPatients);
router.get("/:id", PatientController.getPatientById);
router.put("/:id", PatientController.updatePatient);
router.delete("/:id", PatientController.deletePatient);

// medical history routes
router.post("/medical-history/create", PatientMedicalHistoryController.create);
router.get("/medical-history/:id", PatientMedicalHistoryController.getById);
router.put("/medical-history/:id", PatientMedicalHistoryController.update);
router.delete("/medical-history/:id", PatientMedicalHistoryController.delete);

// visit history routes
router.post("/visit/create", VisitHistoryController.createVisit);
router.get("/all", verifyAccessToken, VisitHistoryController.getAllByPatientId);
router.get("/:id", VisitHistoryController.getById);
router.get("/date", verifyAccessToken, VisitHistoryController.getByDate);
router.put("/:id", VisitHistoryController.update);

export default router;
