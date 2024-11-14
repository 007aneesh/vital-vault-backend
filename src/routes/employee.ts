import express from "express";
import { addPatient } from "../services/employee-services/add_patient";
import { addPatientReport } from "../services/employee-services/add_report";
import { updatePatient } from "../services/employee-services/update_patient";

const router = express.Router();

// app registration routes
router.post("/add-patient", addPatient);
router.post("/update", updatePatient);
router.post("/reports", addPatientReport);

export default router;
