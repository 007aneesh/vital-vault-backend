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
exports.getMe = void 0;
const db_1 = require("../../utils/db");
const handle_response_1 = require("../../utils/handle_response");
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.payload;
        const user = yield db_1.prisma.entity_Mapping.findUnique({
            where: { ref_id: user_id },
            include: {
                organisation: true,
                employee: true,
                patient: true,
            },
        });
        if (!user)
            return (0, handle_response_1.sendError)(res, "User not found", 404);
        let user_details = {};
        if (user.type === "organisation" /* UserType.ORGANISATION */ && user.organisation) {
            user_details = Object.assign({}, user.organisation);
        }
        else if (user.type === "employee" /* UserType.EMPLOYEE */ && user.employee) {
            user_details = Object.assign({}, user.employee);
        }
        else if (user.type === "patient" /* UserType.PATIENT */ && user.patient) {
            user_details = Object.assign({}, user.patient);
        }
        const response_data = Object.assign({ id: user.id, email: user.email, username: user.username, type: user.type, is_active: user.is_active, verified: user.verified, last_login_at: user.last_login_at }, user_details);
        return (0, handle_response_1.sendSuccess)(res, response_data, 200);
    }
    catch (error) {
        console.error("Error while fetching user data:", error);
        return (0, handle_response_1.sendError)(res, "Internal Server Error", 500);
    }
});
exports.getMe = getMe;
