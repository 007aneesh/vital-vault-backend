import { Request, Response } from "express";
import PrescriptionService from "../../services/prescription/prescription.services";
import { sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";
import AppError from "../../utils/appError";

class PrescriptionController {
  /**
   * Create a new prescription.
   */
  async createPrescription(req: Request, res: Response) {
    const data = req.body;
    const prescription = await PrescriptionService.create(data);
    return sendSuccess(
      res,
      "Prescription created successfully",
      201,
      prescription,
    );
  }

  /**
   * Get all prescriptions.
   */
  async getAllPrescriptions(req: Request, res: Response) {
    const prescriptions = await PrescriptionService.getAll();
    return sendSuccess(res, "Fetched all prescriptions", 200, prescriptions);
  }

  /**
   * Get a prescription by ID.
   */
  async getPrescriptionById(req: Request, res: Response) {
    const { id } = req.params;
    const prescription = await PrescriptionService.getById(id);

    if (!prescription) {
      throw new AppError(404, "Prescription not found");
    }

    return sendSuccess(res, "Prescription found", 200, prescription);
  }

  /**
   * Update a prescription by ID.
   */
  async updatePrescription(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const updatedPrescription = await PrescriptionService.update(id, data);

    if (!updatedPrescription) {
      throw new AppError(404, "Prescription not found");
    }

    return sendSuccess(
      res,
      "Prescription updated successfully",
      200,
      updatedPrescription,
    );
  }

  /**
   * Delete a prescription by ID.
   */
  async deletePrescription(req: Request, res: Response) {
    const { id } = req.params;
    const deletedPrescription = await PrescriptionService.delete(id);

    if (!deletedPrescription) {
      throw new AppError(404, "Prescription not found");
    }

    return sendSuccess(res, "Prescription deleted successfully", 200);
  }
}

const methods = SingletonClass(PrescriptionController);
export default methods;
