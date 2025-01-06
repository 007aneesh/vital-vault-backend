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
const addEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = employee_validations_1.employee_schema.safeParse(req.body);
        if (!result.success) {
            const error = result.error.issues
                .map((issue) => issue.message)
                .join(", ");
            return (0, handle_response_1.sendError)(res, error, 422);
        }
        const { username, aadhar_number, first_name, last_name, date_of_birth, age, gender, blood_group, contact_number, emergency_contact, email, employment_details, access_level = "READ", organisationId, } = result.data;
        const accessLevelEnum = db_1.AccessLevel[access_level];
        const bloodGroupEnum = db_1.BloodGroup[blood_group];
        const fieldsToCheck = [
            { field: "username", value: username },
            { field: "aadhar_number", value: Number(aadhar_number) },
            { field: "contact_number", value: Number(contact_number) },
            { field: "email", value: email },
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
                .filter((item) => existingEmployee[item.field] === item.value)
                .map((item) => item.field);
            const message = `Unique constraint violation on fields: ${existingFields.join(", ")}`;
            return (0, handle_response_1.sendError)(res, message, 400);
        }
        const password = "password"; // crypto.randomBytes(32).toString("hex");
        const hash_password = yield bcrypt_1.default.hash(password, 10);
        yield db_1.prisma.employee.create({
            data: {
                username,
                email,
                first_name,
                last_name,
                contact_number: Number(contact_number),
                organisationId,
                access_level: accessLevelEnum,
                password: hash_password,
                aadhar_number: Number(aadhar_number),
                date_of_birth: new Date(date_of_birth),
                age,
                gender,
                blood_group: bloodGroupEnum,
                emergency_contact: Number(emergency_contact),
                employment_details,
            },
        });
        return (0, handle_response_1.sendSuccess)(res, {
            message: "Employee registered successfully",
        }, 201);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, "Internal server error", 500);
    }
});
exports.addEmployee = addEmployee;
