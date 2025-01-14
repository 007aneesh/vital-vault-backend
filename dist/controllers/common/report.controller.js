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
class ReportController {
    // Create a new report
    createReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const report = report_service_1.default.createReport(data);
                return (0, handle_response_1.sendSuccess)(res, report, 201);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    // Get all reports
    getAllReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield report_service_1.default.getAllReports();
                return (0, handle_response_1.sendSuccess)(res, reports, 200);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, `Failed to fetch reports: ${error.message}`, 500);
            }
        });
    }
    // Get report by ID
    getReportById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const report = yield report_service_1.default.getReportById(id);
                if (!report) {
                    return (0, handle_response_1.sendError)(res, "Report not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, report, 200);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, `Failed to fetch report:  ${error.message}`, 500);
            }
        });
    }
    // Update a report
    updateReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatedReport = yield report_service_1.default.updateReport(id, data);
                if (!updatedReport) {
                    return (0, handle_response_1.sendError)(res, "Report not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, updatedReport);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, `Failed to update report:  ${error.message}`, 500);
            }
        });
    }
    // Delete a report
    deleteReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedReport = yield report_service_1.default.deleteReport(id);
                if (!deletedReport) {
                    return (0, handle_response_1.sendError)(res, "Report not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, deletedReport);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, `Failed to delete report:  ${error.message}`, 500);
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(ReportController);
exports.default = methods;
