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
exports.getEmployeeRoleNames = exports.getEmployeeGrants = void 0;
const db_1 = require("./db");
/**
 * Build a grants object for a given employee based on their roles and permissions.
 * Assumes that permission names are stored as "action:resource", e.g., "read:patient".
 */
const getEmployeeGrants = (employee_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    var _c;
    try {
        // Fetch employee roles along with permissions
        const employee_roles = yield db_1.prisma.employeeRole.findMany({
            where: { employee_id },
            include: {
                role: {
                    include: {
                        permissions: { include: { permission: true } },
                    },
                },
            },
        });
        const grants = new Map();
        for (const { role } of employee_roles) {
            const { name: role_name, permissions } = role;
            const role_grant = (_a = grants.get(role_name)) !== null && _a !== void 0 ? _a : { can: {} };
            for (const { permission } of permissions) {
                if (!(permission === null || permission === void 0 ? void 0 : permission.name))
                    continue;
                const [action, resource] = permission.name.split(":");
                if (!action || !resource)
                    continue;
                (_b = (_c = role_grant.can)[resource]) !== null && _b !== void 0 ? _b : (_c[resource] = []);
                if (!role_grant.can[resource].includes(action)) {
                    role_grant.can[resource].push(action);
                }
            }
            grants.set(role_name, role_grant);
        }
        // Convert Map to a plain object before returning
        return Object.fromEntries(grants);
    }
    catch (error) {
        console.error("Error fetching employee grants:", error);
        throw new Error("Failed to retrieve employee grants.");
    }
});
exports.getEmployeeGrants = getEmployeeGrants;
/**
 * Optionally, if you need just a list of role names for the employee.
 */
const getEmployeeRoleNames = (employee_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee_roles = yield db_1.prisma.employeeRole.findMany({
            where: { employee_id },
            include: { role: true },
        });
        return employee_roles.map((er) => er.role.name);
    }
    catch (error) {
        console.error("Error fetching employee role names:", error);
        throw new Error("Failed to retrieve employee roles.");
    }
});
exports.getEmployeeRoleNames = getEmployeeRoleNames;
//# sourceMappingURL=rbac.js.map