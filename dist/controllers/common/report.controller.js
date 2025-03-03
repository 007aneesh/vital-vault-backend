"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const report_service_1 = __importDefault(require("../../services/reports/report.service"));
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
const appErrorCode_1 = require("../../utils/appErrorCode");
class ReportController {
    /**
     * Create a new report.
     */
    createReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body || Object.keys(req.body).length === 0) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
            }
            const report = yield report_service_1.default.createReport(req.body);
            return (0, handle_response_1.sendSuccess)(res, "Report created successfully", 201, report);
        });
    }
    /**
     * Get all reports.
     */
    getAllReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield report_service_1.default.getAllReports();
            return (0, handle_response_1.sendSuccess)(res, "Fetched all reports", 200, reports);
        });
    }
    /**
     * Get a report by ID.
     */
    getReportById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
            }
            const report = yield report_service_1.default.getReportById(id);
            if (!report) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.NOT_FOUND, 404);
            }
            return (0, handle_response_1.sendSuccess)(res, "Report found", 200, report);
        });
    }
    /**
     * Update a report by ID.
     */
    updateReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id || !req.body || Object.keys(req.body).length === 0) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
            }
            const updatedReport = yield report_service_1.default.updateReport(id, req.body);
            if (!updatedReport) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.NOT_FOUND, 404);
            }
            return (0, handle_response_1.sendSuccess)(res, "Report updated successfully", 200, updatedReport);
        });
    }
    /**
     * Delete a report by ID.
     */
    deleteReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
            }
            const deletedReport = yield report_service_1.default.deleteReport(id);
            if (!deletedReport) {
                return (0, handle_response_1.sendError)(res, appErrorCode_1.ERROR_MESSAGES.NOT_FOUND, 404);
            }
            return (0, handle_response_1.sendSuccess)(res, "Report deleted successfully", 200);
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(ReportController);
exports.default = methods;
//# sourceMappingURL=report.controller.js.map