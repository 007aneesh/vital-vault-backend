"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transcribe_1 = require("../../services/transcriber/transcribe");
const router = express_1.default.Router();
router.get("/transcribe", transcribe_1.transcribeAudio);
exports.default = router;
//# sourceMappingURL=audio.js.map