import { Router } from "express";
import { ReportController } from "../../controllers/common";

const router = Router();

router.post("/add", ReportController.createReport);
router.get("/", ReportController.getAllReports);
router.get("/:id", ReportController.getReportById);
router.put("/:id", ReportController.updateReport);
router.delete("/:id", ReportController.deleteReport);

export default router;
