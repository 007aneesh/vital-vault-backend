"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const common_1 = require("../../controllers/common");
const router = (0, express_1.Router)();
router.post("/add", common_1.ReportController.createReport);
router.get("/", common_1.ReportController.getAllReports);
router.get("/:id", common_1.ReportController.getReportById);
router.put("/:id", common_1.ReportController.updateReport);
router.delete("/:id", common_1.ReportController.deleteReport);
exports.default = router;
//# sourceMappingURL=report.js.map