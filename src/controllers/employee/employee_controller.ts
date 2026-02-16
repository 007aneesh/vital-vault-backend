import { Request, Response } from "express";
import employeeService from "../../services/employee-services/employee_services";
import { sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";
import { prisma } from "../../utils/db";

class EmployeeController {
  async getSSRMEmployees(req: Request, res: Response) {
    const { pageSize, sortModel, filterModel } = req.body;
    const result = await employeeService.getSSRMEmployees({
      pageSize: pageSize || 50,
      sortModel,
      filterModel,
    });
    return sendSuccess(res, "success", 200, result);
  }

  // Get employee by ID
  async getEmployeeById(req: any, res: Response) {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      throw new Error("Employee not found");
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

  /**
   * Assign Role to Employee
   */
  async assignRoleToEmployee(req: Request, res: Response) {
    const { employee_id, role_id } = req.body;

    try {
      const employee = await prisma.employee.findUnique({
        where: { id: employee_id },
      });

      if (!employee) {
        throw new Error("Employee not found");
      }

      const role = await prisma.role.findUnique({
        where: { id: role_id },
      });

      if (!role) {
        throw new Error("Role not found");
      }

      const existingRole = await prisma.employeeRole.findFirst({
        where: {
          employee_id,
          role_id,
        },
      });

      if (existingRole) {
        throw new Error("Role already assigned to this employee");
      }

      await prisma.employeeRole.create({
        data: {
          employee_id,
          role_id,
        },
      });

      return sendSuccess(
        res,
        "Role assigned to employee successfully",
        201,
        null,
      );
    } catch (error) {
      console.error("Error assigning role to employee:", error);
      throw new Error("Internal Server Error");
    }
  }

  /**
   * Set Permissions for Role
   */
  async setRolePermissions(req: Request, res: Response) {
    const { roleId, permissionIds } = req.body;

    try {
      const role = await prisma.role.findUnique({
        where: { id: roleId },
      });

      if (!role) {
        throw new Error("Role not found");
      }

      const permissions = await prisma.permission.findMany({
        where: {
          id: {
            in: permissionIds,
          },
        },
      });

      if (permissions.length !== permissionIds.length) {
        throw new Error("One or more permissions not found");
      }

      await prisma.role.update({
        where: {
          id: roleId,
        },
        data: {
          permissions: {
            connect: permissionIds.map((permissionId: string) => ({
              id: permissionId,
            })),
          },
        },
      });

      return sendSuccess(
        res,
        "Permissions set for role successfully",
        201,
        null,
      );
    } catch (error) {
      console.error("Error setting role permissions:", error);
      throw new Error("Internal Server Error");
    }
  }
}

const methods = SingletonClass(EmployeeController);
export default methods;
