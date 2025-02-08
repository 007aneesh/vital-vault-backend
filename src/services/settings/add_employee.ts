import { Request, Response } from "express";
import { prisma, AccessLevel, BloodGroup } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import bcrypt from "bcrypt";
import { employee_schema } from "../../validations/employee_validations";
import crypto from "crypto";

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const result = employee_schema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues.reduce(
        (acc, issue) => {
          acc[issue.path.join(".")] = issue.message;
          return acc;
        },
        {} as Record<string, string>,
      );
      return sendError(res, error, 422);
    }

    const {
      username,
      aadhar_number,
      first_name,
      last_name,
      date_of_birth,
      age,
      gender,
      blood_group,
      contact_number,
      emergency_contact,
      email,
      employment_details,
      access_level = "READ",
      organisationId,
    } = result.data;

    const accessLevelEnum =
      AccessLevel[access_level as keyof typeof AccessLevel];
    const bloodGroupEnum = BloodGroup[blood_group as keyof typeof BloodGroup];

    const fieldsToCheck = [
      { field: "username", value: username },
      { field: "aadhar_number", value: Number(aadhar_number) },
      { field: "contact_number", value: Number(contact_number) },
      { field: "email", value: email },
    ];

    const existingEmployee = await prisma.employee.findFirst({
      where: {
        OR: fieldsToCheck.map((item) => ({
          [item.field]: item.value,
        })),
      },
    });

    if (existingEmployee) {
      const existingFields = fieldsToCheck
        .filter(
          (item) =>
            existingEmployee[item.field as keyof typeof existingEmployee] ===
            item.value,
        )
        .map((item) => item.field);

      const message = `Unique constraint violation on fields: ${existingFields.join(
        ", ",
      )}`;
      return sendError(res, message, 400);
    }

    const password = crypto.randomBytes(32).toString("hex");

    const hash_password = await bcrypt.hash(password, 10);

    const employee = await prisma.employee.create({
      data: {
        first_name,
        last_name,
        contact_number: Number(contact_number),
        organisationId,
        access_level: accessLevelEnum,
        aadhar_number: Number(aadhar_number),
        date_of_birth: new Date(date_of_birth),
        age,
        gender,
        blood_group: bloodGroupEnum,
        emergency_contact: Number(emergency_contact),
        employment_details,
      },
    });

    await prisma.entity_Mapping.create({
      data: {
        ref_id: employee.id,
        type: "employee",
        password: hash_password,
        email,
        username,
      },
    });

    return sendSuccess(
      res,
      {
        message: "Employee registered successfully",
      },
      201,
    );
  } catch (error) {
    return sendError(res, `Internal server error: ${error}`, 500);
  }
};
