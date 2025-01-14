import { Request, Response } from "express";
import insuranceService from "../../services/settings/insurance_services";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class InsuranceController {
  /**
   * Create a new insurance policy.
   * @param req - Express request object
   * @param res - Express response object
   */
  async createInsurance(req: Request, res: Response) {
    try {
      const data = req.body;
      const insurance = await insuranceService.createInsurance(data);
      return sendSuccess(res, insurance, 201);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  /**
   * Get all insurance policies.
   * @param req - Express request object
   * @param res - Express response object
   */
  async getAllInsurance(req: Request, res: Response) {
    try {
      const insuranceDetails = await insuranceService.getAllInsuranceDetails();
      return sendSuccess(res, insuranceDetails);
    } catch (error) {
      console.error("Error in getAllInsuranceDetails:", error);
      return sendError(res, "Failed to fetch insurance details", 500);
    }
  }

  /**
   * Get an insurance policy by its ID.
   * @param req - Express request object
   * @param res - Express response object
   */
  async getInsuranceById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const insurance = await insuranceService.getInsuranceById(id);
      if (!insurance) {
        return sendError(res, "Insurance not found", 404);
      }
      return sendSuccess(res, insurance);
    } catch (error) {
      console.error("Error in getInsuranceById:", error);
      return sendError(res, "Failed to fetch insurance", 500);
    }
  }

  /**
   * Update an insurance policy by its ID.
   * @param req - Express request object
   * @param res - Express response object
   */
  async updateInsurance(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedInsurance = await insuranceService.updateInsurance(id, data);
      return sendSuccess(res, updatedInsurance);
    } catch (error) {
      console.error("Error in updateInsurance:", error);
      return sendError(res, "Failed to update insurance", 500);
    }
  }

  /**
   * Delete an insurance policy by its ID.
   * @param req - Express request object
   * @param res - Express response object
   */
  async deleteInsurance(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedInsurance = await insuranceService.deleteInsurance(id);
      return sendSuccess(res, deletedInsurance);
    } catch (error) {
      console.error("Error in deleteInsurance:", error);
      return sendError(res, "Failed to delete insurance", 500);
    }
  }
}

const methods = SingletonClass(InsuranceController);
export default methods;
