import { Router } from "express";
import { MedicationController } from "../../controllers/common";

const router = Router();

router.post("/add", MedicationController.createMedication);
router.get("/", MedicationController.getAllMedications);
router.get("/:id", MedicationController.getMedicationById);
router.put("/:id", MedicationController.updateMedication);
router.delete("/:id", MedicationController.deleteMedication);

export default router;
