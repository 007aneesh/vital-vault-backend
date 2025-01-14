"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../utils/db");
class ReportService {
    // Create a new report
    createReport(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patient_id, image, description, data_type, signed_by, added_by } = data;
                if (!description || !data_type || !signed_by || !added_by) {
                    throw new Error("Description, data_type, signed_by, and added_by are required.");
                }
                if (patient_id) {
                    const patientExists = yield db_1.prisma.patient.findUnique({
                        where: { id: patient_id },
                    });
                    if (!patientExists) {
                        throw new Error(`Patient with ID ${patient_id} not found.`);
                    }
                }
                const employeeExists = yield db_1.prisma.employee.findUnique({
                    where: { id: added_by },
                });
                if (!employeeExists) {
                    throw new Error(`Employee with ID ${added_by} not found.`);
                }
                const report = yield db_1.prisma.report.create({
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
            }
            catch (error) {
                console.error("Error in creating report:", error);
                throw error;
            }
        });
    }
    // Get all reports
    getAllReports() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.prisma.report.findMany();
            }
            catch (error) {
                console.error("Error in fetching all reports:", error);
                throw error;
            }
        });
    }
    // Get a report by ID
    getReportById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield db_1.prisma.report.findUnique({ where: { id } });
                if (!report) {
                    throw new Error("Report not found.");
                }
                return report;
            }
            catch (error) {
                console.error("Error in fetching report by ID:", error);
                throw error;
            }
        });
    }
    // Update a report
    updateReport(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedReport = yield db_1.prisma.report.update({
                    where: { id },
                    data,
                });
                return updatedReport;
            }
            catch (error) {
                console.error("Error in updating report:", error);
                throw error;
            }
        });
    }
    // Delete a report
    deleteReport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedReport = yield db_1.prisma.report.delete({
                    where: { id },
                });
                return deletedReport;
            }
            catch (error) {
                console.error("Error in deleting report:", error);
                throw error;
            }
        });
    }
}
exports.default = new ReportService();
