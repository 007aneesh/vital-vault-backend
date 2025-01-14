import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";
import { Employee } from "@prisma/client";

const updateDetails = async (id: string, data: any): Promise<Employee> => {
  try {
    return await prisma.employee.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    throw new Error(`Error updating employee details: ${error}`);
  }
};

const changePassword = async (
  id: string,
  newPassword: string,
): Promise<Employee> => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await prisma.employee.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error(`Error changing password: ${error}`);
  }
};

const getAllEmployees = async () => {
  return await prisma.employee.findMany({
    include: {
      medical_history: true,
    },
  });
};

// Get employee by ID
const getEmployeeById = async (id: string) => {
  return await prisma.employee.findUnique({
    where: { id },
    include: {
      medical_history: true,
    },
  });
};

export default {
  updateDetails,
  changePassword,
  getEmployeeById,
  getAllEmployees,
};
