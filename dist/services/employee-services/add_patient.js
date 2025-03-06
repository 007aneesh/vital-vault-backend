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
exports.addPatient = void 0;
const db_1 = require("../../utils/db");
const handle_response_1 = require("../../utils/handle_response");
const bcrypt_1 = __importDefault(require("bcrypt"));
const patient_validation_1 = require("../../validations/patient_validation");
const crypto_1 = __importDefault(require("crypto"));
const addPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = patient_validation_1.patient_schema.safeParse(req.body);
        if (!result.success) {
            // const error = result.error.issues.reduce(
            //   (acc, issue) => {
            //     acc[issue.path.join(".")] = issue.message;
            //     return acc;
            //   },
            //   {} as Record<string, string>,
            // );
            return (0, handle_response_1.sendError)(res, result.error, 422);
        }
        const { username, aadhar_number, email, guardian_name, emergency_contact, first_name, last_name, gender, contact_number, profile, added_by = "", organisation_id, date_of_birth, age, blood_group, settings = {}, image, } = result.data;
        try {
            const existingPatient = yield db_1.prisma.patient.findUnique({
                where: {
                    aadhar_number,
                },
            });
            if (existingPatient) {
                return (0, handle_response_1.sendError)(res, "Patient already exists!", 400);
            }
        }
        catch (error) {
            return (0, handle_response_1.sendError)(res, `Internal server error: ${error}`, 500);
        }
        const password = crypto_1.default.randomBytes(32).toString("hex");
        const hash_password = yield bcrypt_1.default.hash(password, 10);
        try {
            const patient = yield db_1.prisma.patient.create({
                data: {
                    aadhar_number,
                    guardian_name,
                    emergency_contact,
                    first_name,
                    last_name,
                    gender,
                    contact_number,
                    profile,
                    added_by,
                    organisation_id,
                    date_of_birth: new Date(date_of_birth),
                    age,
                    blood_group,
                    settings,
                    image,
                },
            });
            yield db_1.prisma.entity_Mapping.create({
                data: {
                    ref_id: patient.id,
                    type: "patient",
                    password: hash_password,
                    email,
                    username,
                },
            });
            return (0, handle_response_1.sendSuccess)(res, "Patient registered successfully", 201);
        }
        catch (error) {
            return (0, handle_response_1.sendError)(res, `Failed to add patient! ${error}`, 404);
        }
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, `Internal server error ${error}`, 500);
    }
});
exports.addPatient = addPatient;
//# sourceMappingURL=add_patient.js.map