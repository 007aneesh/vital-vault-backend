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
const db_1 = require("../../utils/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Update Organisation details
const updateOrganisation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.prisma.organisation.update({
            where: { id },
            data: Object.assign({}, data),
        });
    }
    catch (error) {
        throw new Error(`Error updating organisation: ${error}`);
    }
});
// Delete Organisation
const deleteOrganisation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.prisma.organisation.delete({
            where: { id },
        });
    }
    catch (error) {
        throw new Error(`Error deleting organisation: ${error}`);
    }
});
// zChange Organisation Password
const changePassword = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        return yield db_1.prisma.entity_Mapping.updateMany({
            where: { ref_id: id },
            data: {
                password: hashedPassword,
            },
        });
    }
    catch (error) {
        throw new Error(`Error changing password: ${error}`);
    }
});
exports.default = {
    updateOrganisation,
    deleteOrganisation,
    changePassword,
};
//# sourceMappingURL=organisation_services.js.map