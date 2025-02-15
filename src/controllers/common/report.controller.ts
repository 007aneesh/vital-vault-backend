import { Request, Response } from "express";
import ReportService from "../../services/reports/report.service";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";
import { ERROR_MESSAGES } from "../../utils/appErrorCode";

class ReportController {
  /**
   * Create a new report.
   */
  async createReport(req: Request, res: Response) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return sendError(res, ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
    }

    const report = await ReportService.createReport(req.body);
    return sendSuccess(res, "Report created successfully", 201, report);
  }

  /**
   * Get all reports.
   */
  async getAllReports(req: Request, res: Response) {
    const reports = await ReportService.getAllReports();
    return sendSuccess(res, "Fetched all reports", 200, reports);
  }

  /**
   * Get a report by ID.
   */
  async getReportById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return sendError(res, ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
    }

    const report = await ReportService.getReportById(id);
    if (!report) {
      return sendError(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    return sendSuccess(res, "Report found", 200, report);
  }

  /**
   * Update a report by ID.
   */
  async updateReport(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || !req.body || Object.keys(req.body).length === 0) {
      return sendError(res, ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
    }

    const updatedReport = await ReportService.updateReport(id, req.body);
    if (!updatedReport) {
      return sendError(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    return sendSuccess(res, "Report updated successfully", 200, updatedReport);
  }

  /**
   * Delete a report by ID.
   */
  async deleteReport(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return sendError(res, ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
    }

    const deletedReport = await ReportService.deleteReport(id);
    if (!deletedReport) {
      return sendError(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    return sendSuccess(res, "Report deleted successfully", 200);
  }
}

const methods = SingletonClass(ReportController);
export default methods;
