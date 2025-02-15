import { Request, Response } from "express";
import insuranceService from "../../services/settings/insurance_services";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class InsuranceController {
  /**
   * Create a new insurance policy.
   */
  async createInsurance(req: Request, res: Response) {
    if (!req.body) {
      return sendError(res, "Request body is required", 400);
    }
    const insurance = await insuranceService.createInsurance(req.body);
    return sendSuccess(res, "Insurance created successfully", 201, insurance);
  }

  /**
   * Get all insurance policies.
   */
  async getAllInsurance(req: Request, res: Response) {
    const insuranceDetails = await insuranceService.getAllInsuranceDetails();
    return sendSuccess(res, "Fetched insurance details", 200, insuranceDetails);
  }

  /**
   * Get an insurance policy by its ID.
   */
  async getInsuranceById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return sendError(res, "Insurance ID is required", 400);
    }

    const insurance = await insuranceService.getInsuranceById(id);
    if (!insurance) {
      return sendError(res, "Insurance not found", 404);
    }

    return sendSuccess(res, "Insurance found", 200, insurance);
  }

  /**
   * Update an insurance policy by its ID.
   */
  async updateInsurance(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return sendError(res, "Insurance ID is required", 400);
    }
    if (!req.body) {
      return sendError(res, "Request body is required", 400);
    }

    const updatedInsurance = await insuranceService.updateInsurance(
      id,
      req.body,
    );
    if (!updatedInsurance) {
      return sendError(res, "Insurance not found", 404);
    }

    return sendSuccess(
      res,
      "Insurance updated successfully",
      200,
      updatedInsurance,
    );
  }

  /**
   * Delete an insurance policy by its ID.
   */
  async deleteInsurance(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return sendError(res, "Insurance ID is required", 400);
    }

    const deletedInsurance = await insuranceService.deleteInsurance(id);
    if (!deletedInsurance) {
      return sendError(res, "Insurance not found", 404);
    }

    return sendSuccess(res, "Insurance deleted successfully", 200);
  }
}

const methods = SingletonClass(InsuranceController);
export default methods;
