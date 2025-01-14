import { Request, Response } from "express";
import MedicationService from "../../services/medication/medication";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class MedicationController {
  /**
   * Create a new medication.
   */
  async createMedication(req: Request, res: Response) {
    try {
      const data = req.body;
      const medication = await MedicationService.create(data);
      return sendSuccess(res, medication, 201);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  /**
   * Get all medications.
   */
  async getAllMedications(req: Request, res: Response) {
    try {
      const medications = await MedicationService.getAll();
      return sendSuccess(res, medications);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  /**
   * Get a medication by ID.
   */
  async getMedicationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const medication = await MedicationService.getById(id);

      if (!medication) {
        return sendError(res, "Medication not found", 404);
      }

      return sendSuccess(res, medication);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  /**
   * Update a medication by ID.
   */
  async updateMedication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedMedication = await MedicationService.update(id, data);

      if (!updatedMedication) {
        return sendError(res, "Medication not found", 404);
      }

      return sendSuccess(res, updatedMedication);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  /**
   * Delete a medication by ID.
   */
  async deleteMedication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedMedication = await MedicationService.delete(id);

      if (!deletedMedication) {
        return sendError(res, "Medication not found", 404);
      }

      return sendSuccess(res, deletedMedication);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

const methods = SingletonClass(MedicationController);
export default methods;
