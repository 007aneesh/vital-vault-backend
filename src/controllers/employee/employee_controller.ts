import { Response } from "express";
import employeeService from "../../services/employee-services/employee_services";

class EmployeeController {
  async changeEmployeeDetails(req: any, res: Response) {
    try {
      const id = req?.payload?.id;
      const data = req.body;
      const updatedEmployee = await employeeService.updateDetails(id, data);

      if (!updatedEmployee) {
        res.status(404).json({ error: "Employee not found" });
      } else {
        res.json(updatedEmployee);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update employee details" });
    }
  }

  async changePassword(req: any, res: Response) {
    try {
      const id = req?.payload?.id;
      const { new_password } = req.body;
      const updatedEmployee = await employeeService.changePassword(
        id,
        new_password
      );

      if (!updatedEmployee) {
        res.status(404).json({ error: "Employee not found" });
      } else {
        res.json({ message: "Password updated successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update password" });
    }
  }
}

export default new EmployeeController();
