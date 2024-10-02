import { PrismaClient } from "@prisma/client";
import { prisma } from "../utils/db"; 

export const checkUniqueFields = async (
  model: keyof PrismaClient,
  fields: { [key: string]: any }
) => {
  const errors: string[] = [];

  for (const [key, value] of Object.entries(fields)) {
    const exists = await(prisma[model] as any).findUnique({
      where: { [key]: value },
    });
    if (exists) {
      errors.push(`${key} already exists`);
    }
  }

  return errors.length > 0 ? errors : null;
};
