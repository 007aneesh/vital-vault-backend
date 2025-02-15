import { Request, Response } from "express";
import MedicationService from "../../services/medication/medication";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";
import { ERROR_MESSAGES } from "../../utils/appErrorCode";

class MedicationController {
  /**
   * Create a new medication.
   */
  async createMedication(req: Request, res: Response) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return sendError(res, ERROR_MESSAGES.UNPROCESSABLE_CONTENT, 422);
    }

    const medication = await MedicationService.create(req.body);
    return sendSuccess(res, "Medication created successfully", 201, medication);
  }

  /**
   * Get all medications.
   */
  async getAllMedications(req: Request, res: Response) {
    const medications = await MedicationService.getAll();
    return sendSuccess(res, "Fetched all medications", 200, medications);
  }

  /**
   * Get a medication by ID.
   */
  async getMedicationById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return sendError(res, ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
    }

    const medication = await MedicationService.getById(id);
    if (!medication) {
      return sendError(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    return sendSuccess(res, "Medication found", 200, medication);
  }

  /**
   * Update a medication by ID.
   */
  async updateMedication(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || !req.body || Object.keys(req.body).length === 0) {
      return sendError(res, ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
    }

    const updatedMedication = await MedicationService.update(id, req.body);
    if (!updatedMedication) {
      return sendError(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    return sendSuccess(
      res,
      "Medication updated successfully",
      200,
      updatedMedication,
    );
  }

  /**
   * Delete a medication by ID.
   */
  async deleteMedication(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return sendError(res, ERROR_MESSAGES.UNPROCESSABLE_ENTITY, 422);
    }

    const deletedMedication = await MedicationService.delete(id);
    if (!deletedMedication) {
      return sendError(res, ERROR_MESSAGES.NOT_FOUND, 404);
    }

    return sendSuccess(res, "Medication deleted successfully", 200);
  }
}

const methods = SingletonClass(MedicationController);
export default methods;
