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
exports.transcribeAudioWithAssemblyAI = void 0;
const fs_1 = __importDefault(require("fs"));
const handle_response_1 = require("../../utils/handle_response");
const assembly_1 = require("../../services/transcriber/assembly");
const gemini_1 = require("../../services/ai/gemini");
const transcribeAudioWithAssemblyAI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const audioFilePath = (_a = req.audioFile) === null || _a === void 0 ? void 0 : _a.path;
    if (!audioFilePath) {
        return (0, handle_response_1.sendError)(res, "Audio file path not found", 400);
    }
    try {
        const transcriptionResult = yield (0, assembly_1.transcribeWithAssemblyAI)(audioFilePath);
        const medicationResult = yield (0, gemini_1.extractMedicationInfo)(transcriptionResult.transcriptText);
        const response = {
            transcript: {
                text: transcriptionResult.transcriptText,
                confidence: transcriptionResult.confidence,
                duration: transcriptionResult.duration,
                wordCount: transcriptionResult.wordCount,
            },
            medications: medicationResult.medications,
        };
        (0, handle_response_1.sendSuccess)(res, "Transcription and medication extraction completed successfully", 200, response);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        let statusCode = 500;
        if (errorMessage.includes("ASSEMBLYAI_API_KEY") ||
            errorMessage.includes("GEMINI_API_KEY")) {
            statusCode = 503;
        }
        else if (errorMessage.includes("timeout")) {
            statusCode = 504;
        }
        (0, handle_response_1.sendError)(res, errorMessage, statusCode);
    }
    finally {
        if (fs_1.default.existsSync(audioFilePath)) {
            fs_1.default.unlink(audioFilePath, (err) => {
                if (err)
                    console.error(`Failed to delete audio file: ${err.message}`);
            });
        }
    }
});
exports.transcribeAudioWithAssemblyAI = transcribeAudioWithAssemblyAI;
//# sourceMappingURL=transcriptionController.js.map