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
exports.healthCheck = exports.transcribeAudio = void 0;
// import multer from "multer";
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const handle_response_1 = require("../../utils/handle_response");
const catchErrors_1 = __importDefault(require("../../utils/catchErrors"));
const openai_1 = __importDefault(require("openai"));
dotenv_1.default.config();
// const upload = multer({ dest: "uploads/" });
const openaiClient = new openai_1.default.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
exports.transcribeAudio = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.file) {
        return (0, handle_response_1.sendError)(res, "File must be an audio file", 400);
    }
    try {
        const tempFilePath = path_1.default.join("uploads", req.file.filename);
        const transcriptResponse = yield openaiClient.audio.transcriptions.create({
            model: "whisper-1",
            file: fs_1.default.createReadStream(tempFilePath),
        });
        const transcriptionText = transcriptResponse.text;
        const completion = yield openaiClient.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a medical assistant that extracts structured medication information from transcriptions.
                    Analyze the transcription and identify all medications mentioned, with their dosages, frequencies, durations, and any notes.`,
                },
                {
                    role: "user",
                    content: `Extract structured medication information from this transcription: ${transcriptionText}`,
                },
            ],
            response_format: { type: "json_object" },
        });
        fs_1.default.unlinkSync(tempFilePath);
        return (0, handle_response_1.sendSuccess)(res, (_a = completion.choices[0].message.content) !== null && _a !== void 0 ? _a : "", 200);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, `Error processing audio: ${error}`, 500);
    }
}));
const healthCheck = (req, res) => {
    return (0, handle_response_1.sendSuccess)(res, "Audio transcribe heathy working fine", 200);
};
exports.healthCheck = healthCheck;
//# sourceMappingURL=transcribe.js.map