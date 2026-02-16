import { prisma } from "../../utils/db";

interface SSRMParams {
  pageSize: number;
  sortModel?: {
    sort_by: string;
    type: "asc" | "desc";
  };
  filterModel?: Record<string, any>;
}

class PatientService {
  private buildWhereClause(filterModel?: Record<string, any>) {
    if (!filterModel) return {};

    const where: any = {};

    for (const [key, value] of Object.entries(filterModel)) {
      if (value === null || value === undefined || value === "") continue;

      if (typeof value === "string") {
        where[key] = { contains: value, mode: "insensitive" };
      } else if (
        typeof value === "object" &&
        "min" in value &&
        "max" in value
      ) {
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
  }

  async getSSRMPatients(params: SSRMParams) {
    const { pageSize, sortModel, filterModel } = params;

    const where = this.buildWhereClause(filterModel);
    const orderBy = sortModel
      ? { [sortModel.sort_by]: sortModel.type }
      : undefined;

    const [data, totalCount] = await Promise.all([
      prisma.patient.findMany({
        skip: 0,
        take: pageSize,
        where,
        orderBy,
      }),
      prisma.patient.count({ where }),
    ]);

    return { rows: data, totalRows: totalCount };
  }

  async getPatientById(id: string) {
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        medical_history: true,
        visits: true,
        insurance_details: true,
      },
    });

    if (!patient) {
      throw { message: "Patient not found", status: 404 };
    }

    return patient;
  }

  async updatePatient(id: string, updatedData: any) {
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: updatedData,
    });

    return updatedPatient;
  }

  async deletePatient(id: string) {
    const existingPatient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!existingPatient) {
      throw { message: "Patient not found", status: 404 };
    }

    await prisma.patient.delete({
      where: { id },
    });
  }
}

export default new PatientService();
