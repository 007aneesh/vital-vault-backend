import { Request, Response } from "express";
import { BloodGroup, Gender, prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import bcrypt from "bcrypt";
import { patient_schema } from "../../validations/patient_validation";
import crypto from "crypto";

export const addPatient = async (req: Request, res: Response) => {
  try {
    const result = patient_schema.safeParse(req.body);

    if (!result.success) {
      console.log(result.error.issues);
      const error = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return sendError(res, error, 422);
    }

    const {
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
      verified = false,
      date_of_birth,
      age,
      blood_group,
      settings = {},
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
      return sendError(res, "Internal server error", 500);
    }

    const genderEnum = Gender[gender as keyof typeof Gender];
    const bloodGroupEnum = BloodGroup[blood_group as keyof typeof BloodGroup];

    const password = "password"; //crypto.randomBytes(32).toString("hex");

    const hash_password = await bcrypt.hash(password, 10);

    try {
      await prisma.patient.create({
        data: {
          aadhar_number,
          email,
          guardian_name,
          emergency_contact,
          first_name,
          last_name,
          gender: genderEnum,
          contact_number,
          password: hash_password,
          profile,
          added_by,
          organisation_id,
          verified,
          date_of_birth: new Date(date_of_birth),
          age,
          blood_group: bloodGroupEnum,
          settings,
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
