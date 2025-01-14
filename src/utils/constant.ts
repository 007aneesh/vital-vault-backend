export const Models = {
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

export const Appointment_Status = {
  SCHEDULED: "SCHEDULED",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
};

export const AccessLevel = {
  GOD: "GOD",
  ADMIN: "ADMIN",
  READ: "READ",
  WRITE: "WRITE",
  MODIFY: "MODIFY",
  NONE: "NONE",
} as const;

export const BloodGroup = {
  A_POSITIVE: "A_POSITIVE",
  A_NEGATIVE: "A_NEGATIVE",
  B_POSITIVE: "B_POSITIVE",
  B_NEGATIVE: "B_NEGATIVE",
  AB_POSITIVE: "AB_POSITIVE",
  AB_NEGATIVE: "AB_NEGATIVE",
  O_POSITIVE: "O_POSITIVE",
  O_NEGATIVE: "O_NEGATIVE",
} as const;

export type BloodGroup = (typeof BloodGroup)[keyof typeof BloodGroup];

export type AccessLevel = (typeof AccessLevel)[keyof typeof AccessLevel];
