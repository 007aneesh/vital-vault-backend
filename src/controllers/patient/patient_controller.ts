import { Request, Response } from "express";
import PatientService from "../../services/patient-services/patient_services";
import { sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class PatientController {
  async getSSRMPatients(req: Request, res: Response) {
    const { pageSize, sortModel, filterModel } = req.body;
    const result = await PatientService.getSSRMPatients({
      pageSize: pageSize || 50,
      sortModel,
      filterModel,
    });
    return sendSuccess(res, "success", 200, result);
  }

  async getPatientById(req: Request, res: Response) {
    const { id } = req.params;
    const patient = await PatientService.getPatientById(id);
    return sendSuccess(res, "success", 200, patient);
  }

  async updatePatient(req: Request, res: Response) {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedPatient = await PatientService.updatePatient(id, updatedData);
    return sendSuccess(res, "success", 200, updatedPatient);
  }

  async deletePatient(req: Request, res: Response) {
    const { id } = req.params;
    await PatientService.deletePatient(id);
    return sendSuccess(res, "Patient deleted successfully");
  }
}

const methods = SingletonClass(PatientController);
export default methods;
