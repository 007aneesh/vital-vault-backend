"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.BloodGroup = exports.AccessLevel = exports.prisma = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "AccessLevel", { enumerable: true, get: function () { return client_1.AccessLevel; } });
Object.defineProperty(exports, "BloodGroup", { enumerable: true, get: function () { return client_1.BloodGroup; } });
Object.defineProperty(exports, "Gender", { enumerable: true, get: function () { return client_1.Gender; } });
exports.prisma = new client_1.PrismaClient();
//# sourceMappingURL=db.js.map