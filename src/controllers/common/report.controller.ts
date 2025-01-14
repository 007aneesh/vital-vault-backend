import { Request, Response } from "express";
import ReportService from "../../services/reports/report.service";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class ReportController {
  // Create a new report
  async createReport(req: Request, res: Response) {
    try {
      const data = req.body;
      const report = ReportService.createReport(data);
      return sendSuccess(res, report, 201);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  // Get all reports
  async getAllReports(req: Request, res: Response) {
    try {
      const reports = await ReportService.getAllReports();
      return sendSuccess(res, reports, 200);
    } catch (error: any) {
      return sendError(res, `Failed to fetch reports: ${error.message}`, 500);
    }
  }

  // Get report by ID
  async getReportById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const report = await ReportService.getReportById(id);

      if (!report) {
        return sendError(res, "Report not found", 404);
      }

      return sendSuccess(res, report, 200);
    } catch (error: any) {
      return sendError(res, `Failed to fetch report:  ${error.message}`, 500);
    }
  }

  // Update a report
  async updateReport(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedReport = await ReportService.updateReport(id, data);

      if (!updatedReport) {
        return sendError(res, "Report not found", 404);
      }

      return sendSuccess(res, updatedReport);
    } catch (error: any) {
      return sendError(res, `Failed to update report:  ${error.message}`, 500);
    }
  }

  // Delete a report
  async deleteReport(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedReport = await ReportService.deleteReport(id);

      if (!deletedReport) {
        return sendError(res, "Report not found", 404);
      }

      return sendSuccess(res, deletedReport);
    } catch (error: any) {
      return sendError(res, `Failed to delete report:  ${error.message}`, 500);
    }
  }
}

const methods = SingletonClass(ReportController);
export default methods;
