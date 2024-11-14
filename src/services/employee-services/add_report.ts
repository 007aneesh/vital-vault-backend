import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { Prisma } from "@prisma/client";

export const addPatientReport = async (req: Request, res: Response) => {
  try {
    const { patientId, image, description, dataType, signedBy, addedBy } =
      req.body;

    if (!patientId || !description || !dataType || !signedBy || !addedBy) {
      return sendError(res, "Missing required fields", 422);
    }

    try {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
      });
      const employee = await prisma.employee.findUnique({
        where: { id: addedBy },
      });

      if (!patient) {
        return sendError(res, "Patient not found", 404);
      }
      if (!employee) {
        return sendError(res, "Employee not found", 404);
      }

      const newReport = await prisma.report.create({
        data: {
          patientId,
          image,
          description,
          dataType,
          signedBy,
          addedBy,
          verified: false, 
        },
      });

      return sendSuccess(
        res,
        {
          message: "Report added successfully",
          report: newReport,
        },
        201
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return sendError(res, `Duplicate entry found`, 409);
      }
      return sendError(res, `Failed to add report!`, 500);
    }
  } catch (error) {
    return sendError(res, `Internal server error`, 500);
  }
};
