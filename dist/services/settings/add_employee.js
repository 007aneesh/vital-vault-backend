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
const addEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = employee_validations_1.employee_schema.safeParse(req.body);
        if (!result.success) {
            const error = result.error.issues
                .map((issue) => issue.message)
                .join(", ");
            return (0, handle_response_1.sendError)(res, error, 422);
        }
        const { username, email, name, contactNo, position, organisationId, accessLevel = "READ", } = result.data;
        const accessLevelEnum = db_1.AccessLevel[accessLevel];
        try {
            const existingEmployee = yield db_1.prisma.employee.findUnique({
                where: {
                    username: username,
                },
            });
            if (existingEmployee) {
                return (0, handle_response_1.sendError)(res, "Employee already exists!", 400);
            }
        }
        catch (error) {
            return (0, handle_response_1.sendError)(res, "Internal server error", 500);
        }
        const password = crypto_1.default.randomBytes(32).toString("hex");
        const hash_password = yield bcrypt_1.default.hash(password, 10);
        yield db_1.prisma.employee.create({
            data: {
                username,
                email,
                name,
                contactNo,
                position,
                organisationId,
                accessLevel: accessLevelEnum,
                password: hash_password,
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
