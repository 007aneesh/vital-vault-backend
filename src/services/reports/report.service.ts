import { prisma } from "../../utils/db";

class ReportService {
  // Create a new report
  async createReport(data: any) {
    try {
      const { patient_id, image, description, data_type, signed_by, added_by } =
        data;

      if (!description || !data_type || !signed_by || !added_by) {
        throw new Error(
          "Description, data_type, signed_by, and added_by are required.",
        );
      }

      if (patient_id) {
        const patientExists = await prisma.patient.findUnique({
          where: { id: patient_id },
        });
        if (!patientExists) {
          throw new Error(`Patient with ID ${patient_id} not found.`);
        }
      }

      const employeeExists = await prisma.employee.findUnique({
        where: { id: added_by },
      });
      if (!employeeExists) {
        throw new Error(`Employee with ID ${added_by} not found.`);
      }

      const report = await prisma.report.create({
        data: {
          patient_id,
          image,
          description,
          data_type,
          signed_by,
          added_by,
        },
      });

      return report;
    } catch (error) {
      console.error("Error in creating report:", error);
      throw error;
    }
  }

  // Get all reports
  async getAllReports() {
    try {
      return await prisma.report.findMany();
    } catch (error) {
      console.error("Error in fetching all reports:", error);
      throw error;
    }
  }

  // Get a report by ID
  async getReportById(id: string) {
    try {
      const report = await prisma.report.findUnique({ where: { id } });
      if (!report) {
        throw new Error("Report not found.");
      }
      return report;
    } catch (error) {
      console.error("Error in fetching report by ID:", error);
      throw error;
    }
  }

  // Update a report
  async updateReport(id: string, data: any) {
    try {
      const updatedReport = await prisma.report.update({
        where: { id },
        data,
      });
      return updatedReport;
    } catch (error) {
      console.error("Error in updating report:", error);
      throw error;
    }
  }

  // Delete a report
  async deleteReport(id: string) {
    try {
      const deletedReport = await prisma.report.delete({
        where: { id },
      });
      return deletedReport;
    } catch (error) {
      console.error("Error in deleting report:", error);
      throw error;
    }
  }
}

export default new ReportService();
