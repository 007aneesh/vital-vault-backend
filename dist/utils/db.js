"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessLevel = exports.prisma = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "AccessLevel", { enumerable: true, get: function () { return client_1.AccessLevel; } });
exports.prisma = new client_1.PrismaClient();
