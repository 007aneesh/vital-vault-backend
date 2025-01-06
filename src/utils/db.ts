import { PrismaClient, AccessLevel, BloodGroup, Gender } from "@prisma/client";

export const prisma = new PrismaClient();
export { AccessLevel, BloodGroup , Gender};