import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";
import { Employee } from "@prisma/client";

interface SSRMParams {
  pageSize: number;
  sortModel?: {
    sort_by: string;
    type: "asc" | "desc";
  };
  filterModel?: Record<string, any>;
}

const buildWhereClause = (filterModel?: Record<string, any>) => {
  if (!filterModel) return {};

  const where: any = {};

  for (const [key, value] of Object.entries(filterModel)) {
    if (value === null || value === undefined || value === "") continue;

    if (typeof value === "string") {
      where[key] = { contains: value, mode: "insensitive" };
    } else if (typeof value === "object" && "min" in value && "max" in value) {
      where[key] = { gte: value.min, lte: value.max };
    } else if (typeof value === "object" && "min" in value) {
      where[key] = { gte: value.min };
    } else if (typeof value === "object" && "max" in value) {
      where[key] = { lte: value.max };
    } else {
      where[key] = value;
    }
  }

  return where;
};

const getSSRMEmployees = async (params: SSRMParams) => {
  const { pageSize, sortModel, filterModel } = params;

  const where = buildWhereClause(filterModel);
  const orderBy = sortModel
    ? { [sortModel.sort_by]: sortModel.type }
    : undefined;

  const [data, totalCount] = await Promise.all([
    prisma.employee.findMany({
      skip: 0,
      take: pageSize,
      where,
      orderBy,
      include: {
        medical_history: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
    }),
    prisma.employee.count({ where }),
  ]);

  return { rows: data, totalRows: totalCount };
};

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

const changePassword = async (id: string, newPassword: string) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await prisma.entity_Mapping.updateMany({
      where: { ref_id: id },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error(`Error changing password: ${error}`);
  }
};

const getEmployeeById = async (id: string) => {
  return await prisma.employee.findUnique({
    where: { id },
    include: {
      medical_history: true,
      roles: {
        include: {
          role: true,
        },
      },
    },
  });
};

export default {
  updateDetails,
  changePassword,
  getEmployeeById,
  getSSRMEmployees,
};
