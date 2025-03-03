import { prisma } from "./db";

/**
 * Build a grants object for a given employee based on their roles and permissions.
 * Assumes that permission names are stored as "action:resource", e.g., "read:patient".
 */
export const getEmployeeGrants = async (employee_id: string) => {
  try {
    // Fetch employee roles along with permissions
    const employee_roles = await prisma.employeeRole.findMany({
      where: { employee_id },
      include: {
        role: {
          include: {
            permissions: { include: { permission: true } },
          },
        },
      },
    });

    const grants = new Map<
      string,
      { can: Record<string, string[]>; inherits?: string[] }
    >();

    for (const { role } of employee_roles) {
      const { name: role_name, permissions } = role;

      const role_grant = grants.get(role_name) ?? { can: {} };

      for (const { permission } of permissions) {
        if (!permission?.name) continue;

        const [action, resource] = permission.name.split(":");
        if (!action || !resource) continue;

        role_grant.can[resource] ??= [];
        if (!role_grant.can[resource].includes(action)) {
          role_grant.can[resource].push(action);
        }
      }

      grants.set(role_name, role_grant);
    }

    // Convert Map to a plain object before returning
    return Object.fromEntries(grants);
  } catch (error) {
    console.error("Error fetching employee grants:", error);
    throw new Error("Failed to retrieve employee grants.");
  }
};

/**
 * Optionally, if you need just a list of role names for the employee.
 */
export const getEmployeeRoleNames = async (employee_id: string) => {
  try {
    const employee_roles = await prisma.employeeRole.findMany({
      where: { employee_id },
      include: { role: true },
    });
    return employee_roles.map((er) => er.role.name);
  } catch (error) {
    console.error("Error fetching employee role names:", error);
    throw new Error("Failed to retrieve employee roles.");
  }
};
