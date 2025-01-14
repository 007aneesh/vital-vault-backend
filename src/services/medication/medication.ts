import { prisma } from "../../utils/db";

class MedicationService {
  /**
   * Create a new medication record.
   * @param data - Medication data
   */
  async create(data: any) {
    try {
      const { name, dose, frequency, duration, notes, prescription_id } = data;

      if (!name || !dose || !prescription_id) {
        throw new Error("Name, dose, and prescription_id are required fields.");
      }

      const medication = await prisma.medication.create({
        data: {
          name,
          dose,
          frequency,
          duration,
          notes,
          prescription_id,
        },
      });

      return medication;
    } catch (error) {
      console.error("Error in creating medication:", error);
      throw error;
    }
  }

  /**
   * Get all medications.
   */
  async getAll() {
    try {
      return await prisma.medication.findMany();
    } catch (error) {
      console.error("Error in fetching all medications:", error);
      throw error;
    }
  }

  /**
   * Get a medication by its ID.
   * @param id - Medication ID
   */
  async getById(id: string) {
    try {
      const medication = await prisma.medication.findUnique({
        where: { id },
      });

      return medication;
    } catch (error) {
      console.error("Error in fetching medication by ID:", error);
      throw error;
    }
  }

  /**
   * Update a medication by its ID.
   * @param id - Medication ID
   * @param data - Data to update
   */
  async update(id: string, data: any) {
    try {
      const updatedMedication = await prisma.medication.update({
        where: { id },
        data,
      });

      return updatedMedication;
    } catch (error) {
      console.error("Error in updating medication:", error);
      throw error;
    }
  }

  /**
   * Delete a medication by its ID.
   * @param id - Medication ID
   */
  async delete(id: string) {
    try {
      const deletedMedication = await prisma.medication.delete({
        where: { id },
      });

      return deletedMedication;
    } catch (error) {
      console.error("Error in deleting medication:", error);
      throw error;
    }
  }
}

export default new MedicationService();
