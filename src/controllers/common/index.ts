import VisitHistoryMethods from "./vistit_history.controller";
import InsuranceMethods from "./insurance.controller";
import MedicationMethods from "./medication.controller";
import PrescriptionMethods from "./prescription.controller";
import ReportMethods from "./report.controller";
import UserMethods from "./users.controller";

const InsuranceController = InsuranceMethods.config;
const MedicationController = MedicationMethods.config;
const VisitHistoryController = VisitHistoryMethods.config;
const PrescriptionController = PrescriptionMethods.config;
const ReportController = ReportMethods.config;
const UserController = UserMethods.config;

export {
  VisitHistoryController,
  InsuranceController,
  PrescriptionController,
  MedicationController,
  ReportController,
  UserController,
};
