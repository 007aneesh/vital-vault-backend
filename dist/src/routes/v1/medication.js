"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const common_1 = require("../../controllers/common");
const router = (0, express_1.Router)();
router.post("/add", common_1.MedicationController.createMedication);
router.get("/", common_1.MedicationController.getAllMedications);
router.get("/:id", common_1.MedicationController.getMedicationById);
router.put("/:id", common_1.MedicationController.updateMedication);
router.delete("/:id", common_1.MedicationController.deleteMedication);
exports.default = router;
//# sourceMappingURL=medication.js.map