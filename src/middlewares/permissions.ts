import { prisma } from "../utils/db";

export default async function checkPermission(
  userId: string,
  resource: string,
  action: string,
  scope: string,
): Promise<boolean> {
  const userRoles = await prisma.entity_Mapping.findMany({
    where: { ref_id: userId },
    include: { role: true },
  });

  return userRoles.some((userRole: any) =>
    userRole.role.permissions.some(
      (permission: any) =>
        permission.resource === resource &&
        permission.action === action &&
        permission.scope === scope,
    ),
  );
}
