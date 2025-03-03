import { Response, NextFunction } from "express";
import RBAC from "easy-rbac";
import { getEmployeeGrants, getEmployeeRoleNames } from "../utils/rbac";

/**
 * Middleware to check permission using easy-rbac.
 * @param action The action to be checked (e.g., "read", "update", "delete").
 * @param resource The resource (e.g., "patient", "employee").
 */
export const checkPermission = (action: string, resource: any) => {
  return async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employeeId = req?.payload?.user_id;
      if (!employeeId) {
        res.status(400).json({ error: "Employee id missing" });
        return;
      }

      const grants: any = await getEmployeeGrants(employeeId);
      const roles = await getEmployeeRoleNames(employeeId);
      if (roles.length === 0) {
        res.status(403).json({ error: "No roles assigned" });
        return;
      }

      const rbac = new RBAC(grants);

      let allowed = false;
      for (const role of roles) {
        if (await rbac.can(role, action, resource)) {
          allowed = true;
          break;
        }
      }

      if (allowed) {
        next();
      } else {
        res.status(403).json({ error: "Access denied" });
      }
    } catch (error) {
      console.error("Error in permission middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
