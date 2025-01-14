import { prisma } from "../../utils/db";

class PatientService {
  async getAllPatients() {
    const patients = await prisma.patient.findMany();
    return patients;
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
