import express from "express";
import { addPatient } from "../../services/employee-services/add_patient";
import {
  EmployeeController,
  EmployeeMedicalHistoryController,
} from "../../controllers/employee";
import { verifyAccessToken } from "../../middlewares/verify_access_token";

const router = express.Router();

// patient registration route
router.post("/add-patient", verifyAccessToken, addPatient);

router.patch(
  "/update",
  verifyAccessToken,
  EmployeeController.changeEmployeeDetails,
);
router.post(
  "/change-password",
  verifyAccessToken,
  EmployeeController.changePassword,
);
router.get("/all", verifyAccessToken, EmployeeController.getAllEmployees);
router.get("/:id", verifyAccessToken, EmployeeController.getEmployeeById);

router.post("/medical-history/create", EmployeeMedicalHistoryController.create);
router.get("/medical-history/:id", EmployeeMedicalHistoryController.getById);
router.patch("/medical-history/:id", EmployeeMedicalHistoryController.update);
router.delete("/medical-history/:id", EmployeeMedicalHistoryController.delete);

export default router;
