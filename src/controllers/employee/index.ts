import EmployeeActionMethods from "./employee_controller";
import EmployeeMedicalHistoryActionMethods from "./medical_history_controller";

const EmployeeController = EmployeeActionMethods.config;
const EmployeeMedicalHistoryController =
  EmployeeMedicalHistoryActionMethods.config;

export { EmployeeController, EmployeeMedicalHistoryController };
