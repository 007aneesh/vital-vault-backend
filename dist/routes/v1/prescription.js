"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const common_1 = require("../../controllers/common");
const router = (0, express_1.Router)();
router.post("/add", common_1.PrescriptionController.createPrescription);
router.get("/", common_1.PrescriptionController.getAllPrescriptions);
router.get("/:id", common_1.PrescriptionController.getPrescriptionById);
router.put("/:id", common_1.PrescriptionController.updatePrescription);
router.delete("/:id", common_1.PrescriptionController.deletePrescription);
exports.default = router;
//# sourceMappingURL=prescription.js.map