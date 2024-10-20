import { PrismaClient, AccessLevel } from "@prisma/client";

export const prisma = new PrismaClient();
export {AccessLevel}