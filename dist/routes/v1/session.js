"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = require("../../controllers/common/session.controller");
const router = (0, express_1.Router)();
router.get("/", session_controller_1.getSessionsHandler);
router.delete("/:id", session_controller_1.deleteSessionHandler);
exports.default = router;
//# sourceMappingURL=session.js.map