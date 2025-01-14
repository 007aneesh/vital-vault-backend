"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_patient_1 = require("../../services/employee-services/add_patient");
const employee_1 = require("../../controllers/employee");
const verify_access_token_1 = require("../../middlewares/verify_access_token");
const router = express_1.default.Router();
// patient registration route
router.post("/add-patient", verify_access_token_1.verifyAccessToken, add_patient_1.addPatient);
router.patch("/update", verify_access_token_1.verifyAccessToken, employee_1.EmployeeController.changeEmployeeDetails);
router.post("/change-password", verify_access_token_1.verifyAccessToken, employee_1.EmployeeController.changePassword);
router.get("/all", verify_access_token_1.verifyAccessToken, employee_1.EmployeeController.getAllEmployees);
router.get("/:id", verify_access_token_1.verifyAccessToken, employee_1.EmployeeController.getEmployeeById);
router.post("/medical-history/create", employee_1.EmployeeMedicalHistoryController.create);
router.get("/medical-history/:id", employee_1.EmployeeMedicalHistoryController.getById);
router.patch("/medical-history/:id", employee_1.EmployeeMedicalHistoryController.update);
router.delete("/medical-history/:id", employee_1.EmployeeMedicalHistoryController.delete);
exports.default = router;
