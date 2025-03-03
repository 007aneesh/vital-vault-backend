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
exports.checkPermission = void 0;
const easy_rbac_1 = __importDefault(require("easy-rbac"));
const rbac_1 = require("../utils/rbac");
/**
 * Middleware to check permission using easy-rbac.
 * @param action The action to be checked (e.g., "read", "update", "delete").
 * @param resource The resource (e.g., "patient", "employee").
 */
const checkPermission = (action, resource) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const employeeId = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.user_id;
            if (!employeeId) {
                res.status(400).json({ error: "Employee id missing" });
                return;
            }
            const grants = yield (0, rbac_1.getEmployeeGrants)(employeeId);
            const roles = yield (0, rbac_1.getEmployeeRoleNames)(employeeId);
            if (roles.length === 0) {
                res.status(403).json({ error: "No roles assigned" });
                return;
            }
            const rbac = new easy_rbac_1.default(grants);
            let allowed = false;
            for (const role of roles) {
                if (yield rbac.can(role, action, resource)) {
                    allowed = true;
                    break;
                }
            }
            if (allowed) {
                next();
            }
            else {
                res.status(403).json({ error: "Access denied" });
            }
        }
        catch (error) {
            console.error("Error in permission middleware:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
};
exports.checkPermission = checkPermission;
//# sourceMappingURL=checkPermissions.js.map