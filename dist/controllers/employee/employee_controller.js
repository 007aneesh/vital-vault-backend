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
const employee_services_1 = __importDefault(require("../../services/employee-services/employee_services"));
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
const db_1 = require("../../utils/db");
class EmployeeController {
    getSSRMEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageSize, sortModel, filterModel } = req.body;
            const result = yield employee_services_1.default.getSSRMEmployees({
                pageSize: pageSize || 50,
                sortModel,
                filterModel,
            });
            return (0, handle_response_1.sendSuccess)(res, "success", 200, result);
        });
    }
    // Get employee by ID
    getEmployeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const employee = yield employee_services_1.default.getEmployeeById(id);
            if (!employee) {
                throw new Error("Employee not found");
            }
            return (0, handle_response_1.sendSuccess)(res, "success", 200, employee);
        });
    }
    changeEmployeeDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.user_id;
            const data = req.body;
            const updatedEmployee = yield employee_services_1.default.updateDetails(id, data);
            if (!updatedEmployee) {
                throw new Error("Employee not found");
            }
            return (0, handle_response_1.sendSuccess)(res, "success", 200, updatedEmployee);
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.user_id;
            const { new_password } = req.body;
            const updatedEmployee = yield employee_services_1.default.changePassword(id, new_password);
            if (!updatedEmployee) {
                throw new Error("Employee not found");
            }
            return (0, handle_response_1.sendSuccess)(res, "Password updated successfully", 200, updatedEmployee);
        });
    }
    /**
     * Assign Role to Employee
     */
    assignRoleToEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employee_id, role_id } = req.body;
            try {
                const employee = yield db_1.prisma.employee.findUnique({
                    where: { id: employee_id },
                });
                if (!employee) {
                    throw new Error("Employee not found");
                }
                const role = yield db_1.prisma.role.findUnique({
                    where: { id: role_id },
                });
                if (!role) {
                    throw new Error("Role not found");
                }
                const existingRole = yield db_1.prisma.employeeRole.findFirst({
                    where: {
                        employee_id,
                        role_id,
                    },
                });
                if (existingRole) {
                    throw new Error("Role already assigned to this employee");
                }
                yield db_1.prisma.employeeRole.create({
                    data: {
                        employee_id,
                        role_id,
                    },
                });
                return (0, handle_response_1.sendSuccess)(res, "Role assigned to employee successfully", 201, null);
            }
            catch (error) {
                console.error("Error assigning role to employee:", error);
                throw new Error("Internal Server Error");
            }
        });
    }
    /**
     * Set Permissions for Role
     */
    setRolePermissions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roleId, permissionIds } = req.body;
            try {
                const role = yield db_1.prisma.role.findUnique({
                    where: { id: roleId },
                });
                if (!role) {
                    throw new Error("Role not found");
                }
                const permissions = yield db_1.prisma.permission.findMany({
                    where: {
                        id: {
                            in: permissionIds,
                        },
                    },
                });
                if (permissions.length !== permissionIds.length) {
                    throw new Error("One or more permissions not found");
                }
                yield db_1.prisma.role.update({
                    where: {
                        id: roleId,
                    },
                    data: {
                        permissions: {
                            connect: permissionIds.map((permissionId) => ({
                                id: permissionId,
                            })),
                        },
                    },
                });
                return (0, handle_response_1.sendSuccess)(res, "Permissions set for role successfully", 201, null);
            }
            catch (error) {
                console.error("Error setting role permissions:", error);
                throw new Error("Internal Server Error");
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(EmployeeController);
exports.default = methods;
//# sourceMappingURL=employee_controller.js.map