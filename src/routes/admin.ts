import express from "express";
import { addEmployee } from "../services/settings/add_employee";
import {
  removeEmployee,
  toggleEmployeeStatus,
  updateEmployeeDetails,
  getAllEmployees,
  getEmployeeDetails,
  modifyEmployeeAccess,
} from "../services/settings/employee_handler";

const router = express.Router();

// employee registration routes
router.post("/add-employee", addEmployee);
router.put("/access", modifyEmployeeAccess);

router.put("/update/:id", updateEmployeeDetails);
router.put("/update/:id/status", toggleEmployeeStatus);
router.delete("/update/:id", removeEmployee);
router.get("/update", getAllEmployees);
router.get("/update/:id", getEmployeeDetails);

export default router;
