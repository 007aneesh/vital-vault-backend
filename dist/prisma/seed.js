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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const adminPermissions = [
            { name: "view_admin_data", description: "View admin-related data" },
            { name: "manage_users", description: "Manage user accounts" },
        ];
        const userPermissions = [
            { name: "view_profile", description: "View own profile" },
        ];
        // Create permissions
        // Clear existing permissions first
        yield prisma.permission.deleteMany();
        // Create permissions
        yield prisma.permission.createMany({
            data: [...adminPermissions, ...userPermissions],
        });
        // Fetch IDs of admin permissions
        const adminPermissionIds = yield prisma.permission.findMany({
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
        const userPermissionIds = yield prisma.permission.findMany({
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
        const adminRole = yield prisma.role.upsert({
            where: { name: "admin" },
            update: {},
            create: {
                name: "admin",
                description: "Administrator role with full access",
            },
        });
        const userRole = yield prisma.role.upsert({
            where: { name: "user" },
            update: {},
            create: {
                name: "user",
                description: "Regular user role with limited access",
            },
        });
        // Connect permissions to admin role
        yield prisma.rolePermission.createMany({
            data: adminPermissionIds.map((perm) => ({
                role_id: adminRole.id,
                permission_id: perm.id,
            })),
        });
        // Connect permissions to user role
        yield prisma.rolePermission.createMany({
            data: userPermissionIds.map((perm) => ({
                role_id: userRole.id,
                permission_id: perm.id,
            })),
        });
        console.log({ adminRole, userRole });
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=seed.js.map