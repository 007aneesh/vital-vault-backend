import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const adminPermissions = [
    { name: "view_admin_data", description: "View admin-related data" },
    { name: "manage_users", description: "Manage user accounts" },
  ];

  const userPermissions = [
    { name: "view_profile", description: "View own profile" },
  ];

  // Create permissions
  // Clear existing permissions first
  await prisma.permission.deleteMany();

  // Create permissions
  await prisma.permission.createMany({
    data: [...adminPermissions, ...userPermissions],
  });

  // Fetch IDs of admin permissions
  const adminPermissionIds = await prisma.permission.findMany({
    where: {
      name: {
        in: adminPermissions.map((perm) => perm.name),
      },
    },
    select: {
      id: true,
    },
  });

  // Fetch IDs of user permissions
  const userPermissionIds = await prisma.permission.findMany({
    where: {
      name: {
        in: userPermissions.map((perm) => perm.name),
      },
    },
    select: {
      id: true,
    },
  });

  // Create roles and connect permissions using RolePermission
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      description: "Administrator role with full access",
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
      description: "Regular user role with limited access",
    },
  });

  // Connect permissions to admin role
  await prisma.rolePermission.createMany({
    data: adminPermissionIds.map((perm) => ({
      role_id: adminRole.id,
      permission_id: perm.id,
    })),
  });

  // Connect permissions to user role
  await prisma.rolePermission.createMany({
    data: userPermissionIds.map((perm) => ({
      role_id: userRole.id,
      permission_id: perm.id,
    })),
  });

  console.log({ adminRole, userRole });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
