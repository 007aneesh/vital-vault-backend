import { Request, Response } from "express";
import { prisma, AccessLevel } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";

export const modifyEmployeeAccess = async (req: Request, res: Response) => {
  try {
    const { employeeId, accessLevel } = req.body;

    // Validate that accessLevel is a valid enum value
    if (!Object.values(AccessLevel).includes(accessLevel)) {
      return sendError(res, "Invalid access level provided", 422);
    }

    // Find employee by ID
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      return sendError(res, "Employee not found", 404);
    }

    // Update access level
    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: { accessLevel },
    });

    return sendSuccess(
      res,
      {
        message: "Employee access level updated successfully",
        employee: updatedEmployee,
      },
      200
    );
  } catch (error) {
    return sendError(res, "Failed to update employee access level", 500);
  }
};

export const toggleEmployeeStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const obj = req.body;

  try {
    const employee = await prisma.employee.update({
      where: { id },
      data: { ...obj },
    });

    return sendSuccess(res, {
      message: `Employee ${
        obj?.status ? "activated" : "deactivated"
      } successfully`,
      employee,
    });
  } catch (error) {
    return sendError(res, "Failed to update employee status", 404);
  }
};

export const removeEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: { id },
    });

    return sendSuccess(res, {
      message: "Employee removed successfully",
    });
  } catch (error) {
    return sendError(res, "Failed to remove employee", 404);
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  const { status, accessLevel } = req.query;

  try {
    const employees = await prisma.employee.findMany({
      where: {
        accessLevel: accessLevel
          ? AccessLevel[accessLevel as keyof typeof AccessLevel]
          : undefined,
      },
    });

    return sendSuccess(res, {
      employees,
    });
  } catch (error) {
    return sendError(res, "Failed to retrieve employees", 404);
  }
};

export const getEmployeeDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      return sendError(res, "Employee not found", 404);
    }

    return sendSuccess(res, {
      employee,
    });
  } catch (error) {
    return sendError(res, "Failed to retrieve employee details", 404);
  }
};

export const updateEmployeeDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { contactNo, position, name } = req.body;

  try {
    const employee = await prisma.employee.update({
      where: { id },
      data: { contactNo, position, name },
    });

    return sendSuccess(res, {
      message: "Employee details updated successfully",
      employee,
    });
  } catch (error) {
    return sendError(res, "Failed to update employee details", 404);
  }
};