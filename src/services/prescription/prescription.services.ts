import { prisma } from "../../utils/db";

class PrescriptionService {
  /**
   * Create a new prescription.
   */
  async create(data: any) {
    try {
      const { prescribed_by, prescription_date, notes, visit_id } = data;

      if (!prescribed_by || !prescription_date || !visit_id) {
        throw new Error(
          "Prescribed_by, prescription_date, and visit_id are required fields.",
        );
      }

      const prescription = await prisma.prescription.create({
        data: {
          prescribed_by,
          prescription_date: new Date(prescription_date),
          notes,
          visit_id,
        },
      });

      return prescription;
    } catch (error) {
      console.error("Error in creating prescription:", error);
      throw error;
    }
  }

  /**
   * Get all prescriptions.
   */
  async getAll() {
    try {
      return await prisma.prescription.findMany({
        include: { medications: true, visit: true },
      });
    } catch (error) {
      console.error("Error in fetching all prescriptions:", error);
      throw error;
    }
  }

  /**
   * Get a prescription by ID.
   */
  async getById(id: string) {
    try {
      const prescription = await prisma.prescription.findUnique({
        where: { id },
        include: { medications: true, visit: true },
      });

      return prescription;
    } catch (error) {
      console.error("Error in fetching prescription by ID:", error);
      throw error;
    }
  }

  /**
   * Update a prescription by ID.
   */
  async update(id: string, data: any) {
    try {
      const updatedPrescription = await prisma.prescription.update({
        where: { id },
        data,
      });

      return updatedPrescription;
    } catch (error) {
      console.error("Error in updating prescription:", error);
      throw error;
    }
  }

  /**
   * Delete a prescription by ID.
   */
  async delete(id: string) {
    try {
      const deletedPrescription = await prisma.prescription.delete({
        where: { id },
      });

      return deletedPrescription;
    } catch (error) {
      console.error("Error in deleting prescription:", error);
      throw error;
    }
  }
}

export default new PrescriptionService();
