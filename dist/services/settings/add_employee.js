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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmployee = void 0;
const db_1 = require("../../utils/db");
const handle_response_1 = require("../../utils/handle_response");
const bcrypt_1 = __importDefault(require("bcrypt"));
const employee_validations_1 = require("../../validations/employee_validations");
const crypto_1 = __importDefault(require("crypto"));
const catchErrors_1 = __importDefault(require("../../utils/catchErrors"));
exports.addEmployee = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request body
    const validationResult = employee_validations_1.employee_schema.safeParse(req.body);
    if (!validationResult.success) {
        // const errors = validationResult.error.issues.reduce(
        //   (acc, issue) => {
        //     acc[issue.path.join(".")] = issue.message;
        //     return acc;
        //   },
        //   {} as Record<string, string>,
        // );
        return (0, handle_response_1.sendError)(res, validationResult.error, 422);
    }
    const { username, aadhar_number, first_name, last_name, date_of_birth, age, gender, blood_group, contact_number, emergency_contact, email, employment_details, access_level = "READ", organisationId, } = validationResult.data;
    const accessLevelEnum = db_1.AccessLevel[access_level];
    const bloodGroupEnum = db_1.BloodGroup[blood_group];
    const fieldsToCheck = [
        { field: "aadhar_number", value: Number(aadhar_number) },
        { field: "contact_number", value: Number(contact_number) },
    ];
    const existingEmployee = yield db_1.prisma.employee.findFirst({
        where: {
            OR: fieldsToCheck.map((item) => ({
                [item.field]: item.value,
            })),
        },
    });
    if (existingEmployee) {
        const existingFields = fieldsToCheck
            .filter((item) => existingEmployee[item.field] ===
            item.value)
            .map((item) => item.field);
        return (0, handle_response_1.sendError)(res, `Unique constraint violation on fields: ${existingFields.join(", ")}`, 400);
    }
    // Generate random password & hash it
    const password = crypto_1.default.randomBytes(32).toString("hex");
    const hash_password = yield bcrypt_1.default.hash(password, 10);
    // Create employee record
    const employee = yield db_1.prisma.employee.create({
        data: {
            first_name,
            last_name,
            contact_number: Number(contact_number),
            organisationId,
            access_level: accessLevelEnum,
            aadhar_number: Number(aadhar_number),
            date_of_birth: new Date(date_of_birth),
            age,
            gender,
            blood_group: bloodGroupEnum,
            emergency_contact: Number(emergency_contact),
            employment_details,
        },
    });
    // Store login credentials in entity mapping
    yield db_1.prisma.entity_Mapping.create({
        data: {
            ref_id: employee.id,
            type: "employee",
            password: hash_password,
            email,
            username,
        },
    });
    return (0, handle_response_1.sendSuccess)(res, "Employee registered successfully", 201);
}));
//# sourceMappingURL=add_employee.js.map