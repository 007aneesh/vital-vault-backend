"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const common_1 = require("../../controllers/common");
const router = (0, express_1.Router)();
router.get("/me", common_1.UserController.getData);
exports.default = router;
