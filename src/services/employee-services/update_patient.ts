import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { patient_schema } from "../../validations/patient_validation";

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.id;
    const result = patient_schema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return sendError(res, error, 422);
    }

    const {
      aadharNumber,
      email,
      guardianName,
      emergencyContact,
      name,
      gender,
      contact,
      image,
      organisationId,
    } = result.data;

    try {
      await prisma.patient.update({
        where: { id: patientId },
        data: {
          aadharNumber,
          email,
          guardianName,
          emergencyContact,
          name,
          gender,
          contact,
          image,
          organisationId,
        },
      });

      return sendSuccess(
        res,
        {
          message: "Patient updated successfully"
        },
        200
      );
    } catch (error) {
      return sendError(res, "Patient not found", 404);
    }
  } catch (error) {
    return sendError(res, `Internal server error`, 500);
  }
};
