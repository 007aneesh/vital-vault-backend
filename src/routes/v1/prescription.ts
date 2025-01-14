import { Router } from "express";
import { PrescriptionController } from "../../controllers/common";

const router = Router();

router.post("/add", PrescriptionController.createPrescription);
router.get("/", PrescriptionController.getAllPrescriptions);
router.get("/:id", PrescriptionController.getPrescriptionById);
router.put("/:id", PrescriptionController.updatePrescription);
router.delete("/:id", PrescriptionController.deletePrescription);

export default router;
