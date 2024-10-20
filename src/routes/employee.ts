import express from "express";
import { addPatient } from "../services/employee-services/add_patient";

const router = express.Router();

// app registration routes
router.post("/add-patient", addPatient);

export default router;
