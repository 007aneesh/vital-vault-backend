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
const buildWhereClause = (filterModel) => {
    if (!filterModel)
        return {};
    const where = {};
    for (const [key, value] of Object.entries(filterModel)) {
        if (value === null || value === undefined || value === "")
            continue;
        if (typeof value === "string") {
            where[key] = { contains: value, mode: "insensitive" };
        }
        else if (typeof value === "object" && "min" in value && "max" in value) {
            where[key] = { gte: value.min, lte: value.max };
        }
        else if (typeof value === "object" && "min" in value) {
            where[key] = { gte: value.min };
        }
        else if (typeof value === "object" && "max" in value) {
            where[key] = { lte: value.max };
        }
        else {
            where[key] = value;
        }
    }
    return where;
};
const getSSRMEmployees = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, sortModel, filterModel } = params;
    const where = buildWhereClause(filterModel);
    const orderBy = sortModel
        ? { [sortModel.sort_by]: sortModel.type }
        : undefined;
    const [data, totalCount] = yield Promise.all([
        db_1.prisma.employee.findMany({
            skip: 0,
            take: pageSize,
            where,
            orderBy,
            include: {
                medical_history: true,
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        }),
        db_1.prisma.employee.count({ where }),
    ]);
    return { rows: data, totalRows: totalCount };
});
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
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.employee.findUnique({
        where: { id },
        include: {
            medical_history: true,
            roles: {
                include: {
                    role: true,
                },
            },
        },
    });
});
exports.default = {
    updateDetails,
    changePassword,
    getEmployeeById,
    getSSRMEmployees,
};
//# sourceMappingURL=employee_services.js.map