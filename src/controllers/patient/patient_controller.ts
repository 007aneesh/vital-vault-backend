import { Request, Response } from "express";
import PatientService from "../../services/patient-services/patient_services";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class PatientController {
  async getAllPatients(req: Request, res: Response) {
    try {
      const patients = await PatientService.getAllPatients();
      return sendSuccess(res, patients);
    } catch (error: any) {
      return sendError(res, error.message, error.status || 500);
    }
  }

  async getPatientById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const patient = await PatientService.getPatientById(id);
      return sendSuccess(res, patient);
    } catch (error: any) {
      return sendError(res, error.message, error.status || 500);
    }
  }

  async updatePatient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedPatient = await PatientService.updatePatient(
        id,
        updatedData,
      );
      return sendSuccess(res, updatedPatient);
    } catch (error: any) {
      return sendError(res, error.message, error.status || 500);
    }
  }

  async deletePatient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await PatientService.deletePatient(id);
      return sendSuccess(res, "Patient deleted successfully");
    } catch (error: any) {
      return sendError(res, error.message, error.status || 500);
    }
  }
}

const methods = SingletonClass(PatientController);
export default methods;
