import { Request, Response } from "express";
import PrescriptionService from "../../services/prescription/prescription.services";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class PrescriptionController {
  /**
   * Create a new prescription.
   */
  async createPrescription(req: Request, res: Response) {
    try {
      const data = req.body;
      const prescription = await PrescriptionService.create(data);
      return sendSuccess(res, prescription, 201);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  /**
   * Get all prescriptions.
   */
  async getAllPrescriptions(req: Request, res: Response) {
    try {
      const prescriptions = await PrescriptionService.getAll();
      return sendSuccess(res, prescriptions);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  /**
   * Get a prescription by ID.
   */
  async getPrescriptionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const prescription = await PrescriptionService.getById(id);

      if (!prescription) {
        return sendError(res, "Prescription not found", 404);
      }

      return sendSuccess(res, prescription);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  /**
   * Update a prescription by ID.
   */
  async updatePrescription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedPrescription = await PrescriptionService.update(id, data);

      if (!updatedPrescription) {
        return sendError(res, "Prescription not found", 404);
      }

      return sendSuccess(res, updatedPrescription);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  /**
   * Delete a prescription by ID.
   */
  async deletePrescription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedPrescription = await PrescriptionService.delete(id);

      if (!deletedPrescription) {
        return sendError(res, "Prescription not found", 404);
      }

      return sendSuccess(res, deletedPrescription);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

const methods = SingletonClass(PrescriptionController);
export default methods;
