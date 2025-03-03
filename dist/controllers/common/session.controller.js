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
exports.deleteSessionHandler = exports.getSessionsHandler = void 0;
const zod_1 = require("zod");
const http_1 = require("../../utils/http");
const db_1 = require("../../utils/db");
const catchErrors_1 = __importDefault(require("../../utils/catchErrors"));
const appAssert_1 = __importDefault(require("../../utils/appAssert"));
const handle_response_1 = require("../../utils/handle_response");
exports.getSessionsHandler = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user_id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.user_id;
    const sessions = yield db_1.prisma.session.findMany({
        where: {
            user_id,
            expires_at: {
                gt: new Date(),
            },
        },
        select: {
            id: true,
            user_agent: true,
            created_at: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
    return (0, handle_response_1.sendSuccess)(res, "Sessions retrieved", 200, {
        sessions: sessions.map((session) => (Object.assign(Object.assign({}, session), { is_current_session: session.id === req.payload.session_id }))),
    });
}));
exports.deleteSessionHandler = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sessionId = zod_1.z.string().parse(req.params.id);
    const deletedSession = yield db_1.prisma.session.deleteMany({
        where: {
            id: sessionId,
            user_id: (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.user_id,
        },
    });
    (0, appAssert_1.default)(deletedSession.count > 0, http_1.NOT_FOUND, "Session not found");
    return (0, handle_response_1.sendSuccess)(res, "Session deleted successfully");
}));
//# sourceMappingURL=session.controller.js.map