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
const db_1 = require("../../utils/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const updateDetails = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.prisma.employee.update({
            where: { id },
            data: Object.assign({}, data),
        });
    }
    catch (error) {
        throw new Error(`Error updating employee details: ${error}`);
    }
});
const changePassword = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        return yield db_1.prisma.entity_Mapping.updateMany({
            where: { ref_id: id },
            data: {
                password: hashedPassword,
            },
        });
    }
    catch (error) {
        throw new Error(`Error changing password: ${error}`);
    }
});
const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.employee.findMany({
        include: {
            medical_history: true,
        },
    });
});
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.employee.findUnique({
        where: { id },
        include: {
            medical_history: true,
        },
    });
});
exports.default = {
    updateDetails,
    changePassword,
    getEmployeeById,
    getAllEmployees,
};
