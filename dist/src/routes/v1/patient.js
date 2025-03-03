"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_1 = require("../../controllers/patient");
const common_1 = require("../../controllers/common");
const router = (0, express_1.Router)();
// patient routes
router.get("/all", patient_1.PatientController.getAllPatients);
router.get("/:id", patient_1.PatientController.getPatientById);
router.put("/:id", patient_1.PatientController.updatePatient);
router.delete("/:id", patient_1.PatientController.deletePatient);
// medical history routes
router.post("/medical-history/create", patient_1.PatientMedicalHistoryController.create);
router.get("/medical-history/:id", patient_1.PatientMedicalHistoryController.getById);
router.put("/medical-history/:id", patient_1.PatientMedicalHistoryController.update);
router.delete("/medical-history/:id", patient_1.PatientMedicalHistoryController.delete);
// visit history routes
router.post("/visit/create", common_1.VisitHistoryController.createVisit);
router.get("/all", common_1.VisitHistoryController.getAllByPatientId);
router.get("/:id", common_1.VisitHistoryController.getById);
router.get("/date", common_1.VisitHistoryController.getByDate);
router.put("/:id", common_1.VisitHistoryController.update);
exports.default = router;
//# sourceMappingURL=patient.js.map