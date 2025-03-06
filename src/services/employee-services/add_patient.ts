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
      // const error = result.error.issues.reduce(
      //   (acc, issue) => {
      //     acc[issue.path.join(".")] = issue.message;
      //     return acc;
      //   },
      //   {} as Record<string, string>,
      // );
      return sendError(res, result.error, 422);
    }

    const {
      username,
      aadhar_number,
      email,
      guardian_name,
      emergency_contact,
      first_name,
      last_name,
      gender,
      contact_number,
      profile,
      added_by = "",
      organisation_id,
      date_of_birth,
      age,
      blood_group,
      settings = {},
      image,
    } = result.data;

    try {
      const existingPatient = await prisma.patient.findUnique({
        where: {
          aadhar_number,
        },
      });
      if (existingPatient) {
        return sendError(res, "Patient already exists!", 400);
      }
    } catch (error) {
      return sendError(res, `Internal server error: ${error}`, 500);
    }

    const password = crypto.randomBytes(32).toString("hex");

    const hash_password = await bcrypt.hash(password, 10);

    try {
      const patient = await prisma.patient.create({
        data: {
          aadhar_number,
          guardian_name,
          emergency_contact,
          first_name,
          last_name,
          gender,
          contact_number,
          profile,
          added_by,
          organisation_id,
          date_of_birth: new Date(date_of_birth),
          age,
          blood_group,
          settings,
          image,
        },
      });

      await prisma.entity_Mapping.create({
        data: {
          ref_id: patient.id,
          type: "patient",
          password: hash_password,
          email,
          username,
        },
      });

      return sendSuccess(res, "Patient registered successfully", 201);
    } catch (error) {
      return sendError(res, `Failed to add patient! ${error}`, 404);
    }
  } catch (error) {
    return sendError(res, `Internal server error ${error}`, 500);
  }
};
