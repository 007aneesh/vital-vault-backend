import { Request, Response } from "express";
import employeeService from "../../services/employee-services/employee_services";
import { sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class EmployeeController {
  // Get all employees
  async getAllEmployees(req: Request, res: Response) {
    const employees = await employeeService.getAllEmployees();
    return sendSuccess(res, "success", 200, employees);
  }

  // Get employee by ID
  async getEmployeeById(req: any, res: Response) {
    const id = req?.payload?.user_id;
    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      throw new Error("Employee not found"); // Global error handler will catch this
    }

    return sendSuccess(res, "success", 200, employee);
  }

  async changeEmployeeDetails(req: any, res: Response) {
    const id = req?.payload?.user_id;
    const data = req.body;
    const updatedEmployee = await employeeService.updateDetails(id, data);

    if (!updatedEmployee) {
      throw new Error("Employee not found");
    }

    return sendSuccess(res, "success", 200, updatedEmployee);
  }

  async changePassword(req: any, res: Response) {
    const id = req?.payload?.user_id;
    const { new_password } = req.body;
    const updatedEmployee = await employeeService.changePassword(
      id,
      new_password,
    );

    if (!updatedEmployee) {
      throw new Error("Employee not found");
    }

    return sendSuccess(
      res,
      "Password updated successfully",
      200,
      updatedEmployee,
    );
  }
}

const methods = SingletonClass(EmployeeController);
export default methods;
