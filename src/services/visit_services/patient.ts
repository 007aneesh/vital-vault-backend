import { prisma } from "../../utils/db";

export class VisitHistoryService {
  async createVisitData(data: any) {
    try {
      const {
        visit_date,
        reason_for_visit,
        doctor_name,
        department,
        hospital_name,
        notes,
        patient_id,
      } = data;

      if (!visit_date || !patient_id) {
        throw new Error("visit_date and patient_id are required fields.");
      }

      const visit = await prisma.visitHistory.create({
        data: {
          visit_date: new Date(visit_date),
          reason_for_visit,
          doctor_name,
          department,
          hospital_name,
          notes,
          patient_id,
        },
      });

      return visit;
    } catch (error) {
      console.error("Error in createVisitData:", error);
      throw error;
    }
  }

  async getAllByPatientId(id: string) {
    return await prisma.visitHistory.findMany({
      where: { patient_id: id },
      include: {
        prescriptions: true,
      },
    });
  }

  async getById(id: string) {
    return await prisma.visitHistory.findUnique({
      where: { id },
      include: {
        prescriptions: true,
      },
    });
  }

  async getByDate(date: string, patient_id: string) {
    const parsedDate = new Date(date);
    return await prisma.visitHistory.findMany({
      where: {
        patient_id,
        visit_date: {
          gte: parsedDate,
          lt: new Date(parsedDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      include: {
        prescriptions: true,
      },
    });
  }

  async update(id: string, data: any) {
    return await prisma.visitHistory.update({
      where: { id },
      data,
    });
  }
}
