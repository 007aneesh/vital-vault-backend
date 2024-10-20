import { Request, Response } from "express";
import { prisma, AccessLevel } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import bcrypt from "bcrypt";
import { employee_schema } from "../../validations/employee_validations";
import crypto from "crypto";

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const result = employee_schema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return sendError(res, error, 422);
    }

    const {
      username,
      email,
      name,
      contactNo,
      position,
      organisationId,
      accessLevel = "READ",
    } = result.data;

    const accessLevelEnum =
      AccessLevel[accessLevel as keyof typeof AccessLevel];

    try {
      const existingEmployee = await prisma.employee.findUnique({
        where: {
          username: username,
        },
      });
      if (existingEmployee) {
        return sendError(res, "Employee already exists!", 400);
      }
    } catch (error) {
      return sendError(res, "Internal server error", 500);
    }

    const password = crypto.randomBytes(32).toString("hex");

    const hash_password = await bcrypt.hash(password, 10);

    await prisma.employee.create({
      data: {
        username,
        email,
        name,
        contactNo,
        position,
        organisationId,
        accessLevel: accessLevelEnum,
        password: hash_password,
      },
    });

    return sendSuccess(
      res,
      {
        message: "Employee registered successfully",
      },
      201
    );
  } catch (error) {
    return sendError(res, "Internal server error", 500);
  }
};
