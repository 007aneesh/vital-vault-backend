"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transcribe_1 = require("../../services/transcriber/transcribe");
const audio_1 = require("../../controllers/audio");
const audioUploadMiddleware_1 = __importDefault(require("../../middlewares/audioUploadMiddleware"));
const router = express_1.default.Router();
router.get("/transcribe", transcribe_1.transcribeAudio);
router.post("/transcribe-assembly", (0, audioUploadMiddleware_1.default)(), audio_1.transcribeAudioWithAssemblyAI);
exports.default = router;
//# sourceMappingURL=audio.js.map