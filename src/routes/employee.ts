import express from "express";
import { addPatient } from "../services/employee-services/add_patient";
import { changePassword, updateDetails } from "../controllers/employee";
import { verifyAccessToken } from "../middlewares/verify_access_token";

const router = express.Router();

// app registration routes
router.post("/add-patient", verifyAccessToken, addPatient);

router.patch("/update", verifyAccessToken, updateDetails);
router.post("/change-password", verifyAccessToken, changePassword);

export default router;
