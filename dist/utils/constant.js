"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloodGroup = exports.AccessLevel = exports.Appointment_Status = exports.Models = void 0;
exports.Models = {
    EMPLOYEE: "employee",
    ORGANISATION: "organisation",
    PATIENT: "patient",
    PATIENT_MEDICAL_RECORD: "patientmedicalhistory",
    EMPLOYEE_MEDICAL_RECORD: "employeemedicalhistory",
    VISIT_HISTORY: "visithistory",
    INSURANCE_DETAILS: "insurancedetails",
    MEDICATION: "medication",
    PRESCRIPTION: "prescription",
    REPORT: "report",
    APPOINTMENT: "appointment",
};
exports.Appointment_Status = {
    SCHEDULED: "SCHEDULED",
    COMPLETED: "COMPLETED",
    CANCELED: "CANCELED",
};
exports.AccessLevel = {
    GOD: "GOD",
    ADMIN: "ADMIN",
    READ: "READ",
    WRITE: "WRITE",
    MODIFY: "MODIFY",
    NONE: "NONE",
};
exports.BloodGroup = {
    A_POSITIVE: "A_POSITIVE",
    A_NEGATIVE: "A_NEGATIVE",
    B_POSITIVE: "B_POSITIVE",
    B_NEGATIVE: "B_NEGATIVE",
    AB_POSITIVE: "AB_POSITIVE",
    AB_NEGATIVE: "AB_NEGATIVE",
    O_POSITIVE: "O_POSITIVE",
    O_NEGATIVE: "O_NEGATIVE",
};
