import { Request, Response } from "express";
import MedicalHistoryService from "../../services/medical/medical_history_service";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { prisma } from "../../utils/db";
import { SingletonClass } from "../../utils/singleton_class";

const employee_medical_history = new MedicalHistoryService(
  prisma.employeeMedicalHistory,
);

class EmployeeMedicalHistoryController {
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await employee_medical_history.getById(id);
      return sendSuccess(res, data);
    } catch (error: any) {
      return sendError(res, error.message, 404);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newRecord = await employee_medical_history.create(req.body);
      return sendSuccess(res, newRecord, 201);
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedRecord = await employee_medical_history.update(id, req.body);
      return sendSuccess(res, updatedRecord);
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await employee_medical_history.delete(id);
      return sendSuccess(res, "Record deleted successfully");
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  }
}

const methods = SingletonClass(EmployeeMedicalHistoryController);
export default methods;
