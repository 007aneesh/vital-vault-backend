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
exports.logoutHandler = void 0;
const db_1 = require("../../utils/db");
const handle_response_1 = require("../../utils/handle_response");
const cookies_1 = require("../../utils/cookies");
const logoutHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.prisma.session.delete({
        where: {
            id: req.payload.session_id,
        },
    });
    (0, cookies_1.clearAuthCookies)(res);
    return (0, handle_response_1.sendSuccess)(res, "Logout successful");
});
exports.logoutHandler = logoutHandler;
//# sourceMappingURL=logout_controller.js.map