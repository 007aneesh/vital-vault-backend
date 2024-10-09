import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import bcrypt from "bcrypt";
import { patient_schema } from "../../validations/patient_validation";

export const addPatient = async (req: Request, res: Response) => {
  try {
    const result = patient_schema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return sendError(res, error, 500);
    }

    const {
      aadharNumber,
      email,
      guardianName,
      emergencyContact,
      name,
      gender,
      contact,
      password,
      image,
    } = result.data;

    const hash_password = await bcrypt.hash(password, 10);

    await prisma.patient.create({
      data: {
        aadharNumber: Number(aadharNumber),
        email,
        guardianName,
        emergencyContact,
        name,
        gender,
        contact,
        password: hash_password,
        image,
      },
    });

    return sendSuccess(
      res,
      {
        message: "Patient registered successfully",
      },
      201
    );
  } catch (error) {
    return sendError(res, "Internal server error", 500);
  }
};
