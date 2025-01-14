import { prisma } from "../../utils/db";

class InsuranceService {
  /**
   * Create a new insurance policy.
   * @param data - Insurance data
   * @returns Created insurance policy
   * @throws Error if required fields are missing or validation fails
   */
  async createInsurance(data: any) {
    try {
      const {
        policy_number,
        provider,
        valid_till,
        coverage_amount,
        owner_type,
        owner_id,
      } = data;

      if (
        !policy_number ||
        !provider ||
        !valid_till ||
        !coverage_amount ||
        !owner_type ||
        !owner_id
      ) {
        throw new Error(
          "All required fields (policy_number, provider, valid_till, coverage_amount, owner_type, owner_id) must be provided.",
        );
      }

      if (!["patient", "employee"].includes(owner_type)) {
        throw new Error(
          "Invalid owner_type. It must be either 'patient' or 'employee'.",
        );
      }

      const ownerExists =
        owner_type === "patient"
          ? await prisma.patient.findUnique({ where: { id: owner_id } })
          : await prisma.employee.findUnique({ where: { id: owner_id } });

      if (!ownerExists) {
        throw new Error(
          `Owner with ID ${owner_id} not found in ${
            owner_type === "patient" ? "Patient" : "Employee"
          } database.`,
        );
      }

      const policyExists = await prisma.insuranceDetails.findUnique({
        where: { policy_number },
      });

      if (policyExists) {
        throw new Error(
          "A policy with the given policy_number already exists.",
        );
      }

      const validTill = new Date(valid_till);

      const insurance = await prisma.insuranceDetails.create({
        data: {
          ...data,
          valid_till: validTill,
        },
      });

      return insurance;
    } catch (error) {
      console.error("Error while adding insurance:", error);
      throw error;
    }
  }

  /**
   * Get all insurance policies.
   * @returns List of all insurance policies
   */
  async getAllInsuranceDetails() {
    try {
      return await prisma.insuranceDetails.findMany();
    } catch (error) {
      console.error("Error in getAllInsuranceDetails:", error);
      throw error;
    }
  }

  /**
   * Get insurance policy by ID.
   * @param id - Policy number
   * @returns Insurance policy or null
   */
  async getInsuranceById(id: string) {
    try {
      const insurance = await prisma.insuranceDetails.findUnique({
        where: { policy_number: id },
      });

      if (!insurance) {
        throw new Error(`Insurance policy with ID ${id} not found.`);
      }

      return insurance;
    } catch (error) {
      console.error("Error in getInsuranceById:", error);
      throw error;
    }
  }

  /**
   * Update insurance policy.
   * @param id - Policy number
   * @param data - Updated insurance data
   * @returns Updated insurance policy
   */
  async updateInsurance(id: string, data: any) {
    try {
      const updatedInsurance = await prisma.insuranceDetails.update({
        where: { policy_number: id },
        data,
      });

      return updatedInsurance;
    } catch (error) {
      console.error("Error in updateInsurance:", error);
      throw error;
    }
  }

  /**
   * Delete an insurance policy by ID.
   * @param id - Policy ID
   * @returns Deleted insurance policy
   */
  async deleteInsurance(id: string) {
    try {
      const deletedInsurance = await prisma.insuranceDetails.delete({
        where: { id },
      });

      return deletedInsurance;
    } catch (error) {
      console.error("Error in deleteInsurance:", error);
      throw error;
    }
  }
}

const insuranceService = new InsuranceService();
export default insuranceService;
