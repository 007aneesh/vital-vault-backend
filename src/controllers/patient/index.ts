import PatientControllerActionMethods from "./patient_controller";
import PatientMedicalHistoryActionMethods from "./medical_history_controller";

const PatientMedicalHistoryController =
  PatientMedicalHistoryActionMethods.config;
const PatientController = PatientControllerActionMethods.config;

export { PatientMedicalHistoryController, PatientController };
