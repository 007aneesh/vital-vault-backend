import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import bcrypt from "bcrypt";
import { patient_schema } from "../../validations/patient_validation";
import crypto from "crypto";

export const addPatient = async (req: Request, res: Response) => {
  try {
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
      addedBy = "",
      organisationId,
    } = result.data;

    try {
      const existingPatient = await prisma.patient.findUnique({
        where: {
          aadharNumber,
        },
      });
      if (existingPatient) {
        return sendError(res, "Patient already exists!", 400);
      }
    } catch (error) {
      return sendError(res, "Internal server error", 500);
    }

    const password = crypto.randomBytes(32).toString("hex");

    const hash_password = await bcrypt.hash(password, 10);

    try {
      await prisma.patient.create({
        data: {
          aadharNumber,
          email,
          guardianName,
          emergencyContact,
          name,
          gender,
          contact,
          password: hash_password,
          image,
          addedBy,
          organisationId,
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
      return sendError(res, `Failed to add patient! ${error}`, 404);
    }
  } catch (error) {
    return sendError(res, `Internal server error`, 500);
  }
};