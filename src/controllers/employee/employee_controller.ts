import { Response } from "express";
import employeeService from "../../services/employee-services/employee_services";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class EmployeeController {
  // Get all employees
  async getAllEmployees(req: any, res: any) {
    try {
      const employees = await employeeService.getAllEmployees();
      return sendSuccess(res, employees, 200);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  // Get employee by ID
  async getEmployeeById(req: any, res: Response) {
    try {
      const id = req?.payload?.id;
      const employee = await employeeService.getEmployeeById(id);

      if (!employee) {
        return sendError(res, "Employee not found", 404);
      }

      return sendSuccess(res, employee);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
  async changeEmployeeDetails(req: any, res: Response) {
    try {
      const id = req?.payload?.id;
      const data = req.body;
      const updatedEmployee = await employeeService.updateDetails(id, data);

      if (!updatedEmployee) {
        res.status(404).json({ message: "Employee not found" });
      } else {
        res.json(updatedEmployee);
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ error, message: "Failed to update employee details" });
    }
  }

  async changePassword(req: any, res: Response) {
    try {
      const id = req?.payload?.id;
      const { new_password } = req.body;
      const updatedEmployee = await employeeService.changePassword(
        id,
        new_password,
      );

      if (!updatedEmployee) {
        res.status(404).json({ message: "Employee not found" });
      } else {
        res.json({ message: "Password updated successfully" });
      }
    } catch (error) {
      res.status(500).json({ error, message: "Failed to update password" });
    }
  }
}

const methods = SingletonClass(EmployeeController);
export default methods;
