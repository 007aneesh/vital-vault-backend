import { Request, Response } from "express";
import { VisitHistoryService } from "../../services/visit_services/patient";
import { sendSuccess, sendError } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class VisitHistoryController {
  private visitHistoryService: VisitHistoryService;

  constructor() {
    this.visitHistoryService = new VisitHistoryService();
    this.createVisit = this.createVisit.bind(this);
    this.getAllByPatientId = this.getAllByPatientId.bind(this);
    this.getById = this.getById.bind(this);
    this.getByDate = this.getByDate.bind(this);
    this.update = this.update.bind(this);
  }

  async createVisit(req: Request, res: Response) {
    try {
      const data = req.body;
      const visit = await this.visitHistoryService.createVisitData(data);
      return sendSuccess(res, "Visit created successfully", 201, visit);
    } catch (error: any) {
      return sendError(res, error.message || "Failed to create visit", 500);
    }
  }

  async getAllByPatientId(req: any, res: Response) {
    try {
      const id = req?.payload?.user_id;
      const visits = await this.visitHistoryService.getAllByPatientId(id);

      if (!visits.length) {
        return sendError(res, "No visit histories found", 404);
      }

      return sendSuccess(
        res,
        "Visit histories retrieved successfully",
        200,
        visits,
      );
    } catch (error: any) {
      return sendError(
        res,
        error.message || "Failed to fetch visit histories",
        500,
      );
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const visit = await this.visitHistoryService.getById(id);

      if (!visit) {
        return sendError(res, "Visit history not found", 404);
      }

      return sendSuccess(res, "Visit retrieved successfully", 200, visit);
    } catch (error: any) {
      return sendError(
        res,
        error.message || "Failed to fetch visit history",
        500,
      );
    }
  }

  async getByDate(req: any, res: Response) {
    try {
      const id = req?.payload?.user_id;
      const { date } = req.query;
      const visits = await this.visitHistoryService.getByDate(
        date as string,
        id as string,
      );

      if (!visits.length) {
        return sendError(res, "No visits found for the given date", 404);
      }

      return sendSuccess(res, "Visits retrieved successfully", 200, visits);
    } catch (error: any) {
      return sendError(
        res,
        error.message || "Failed to fetch visits by date",
        500,
      );
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedVisit = await this.visitHistoryService.update(id, data);

      if (!updatedVisit) {
        return sendError(res, "Failed to update visit history", 400);
      }

      return sendSuccess(
        res,
        "Visit history updated successfully",
        200,
        updatedVisit,
      );
    } catch (error: any) {
      return sendError(
        res,
        error.message || "Failed to update visit history",
        500,
      );
    }
  }
}

const methods = SingletonClass(VisitHistoryController);
export default methods;
