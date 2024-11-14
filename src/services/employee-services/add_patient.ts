import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import bcrypt from "bcrypt";
import { patient_schema } from "../../validations/patient_validation";
import crypto from "crypto";
import { Prisma } from "@prisma/client";

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
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const target: string | undefined = Array.isArray(error.meta?.target)
          ? error.meta?.target[0]
          : "aadhar number";
        return sendError(res, `Duplicate entry found for ${target}`, 409);
      }
      return sendError(res, `Failed to add patient!`, 404);
    }
  } catch (error) {
    return sendError(res, `Internal server error`, 500);
  }
};