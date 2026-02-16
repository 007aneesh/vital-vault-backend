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
exports.transcribeWithAssemblyAI = exports.pollTranscriptionStatus = exports.requestTranscription = exports.uploadAudioToAssemblyAI = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const ASSEMBLYAI_BASE_URL = "https://api.assemblyai.com/v2";
const POLL_INTERVAL = 3000;
const MAX_RETRIES = 600;
if (!ASSEMBLYAI_API_KEY) {
    throw new Error("ASSEMBLYAI_API_KEY is not defined in environment variables");
}
const axiosInstance = axios_1.default.create({
    baseURL: ASSEMBLYAI_BASE_URL,
    headers: {
        Authorization: ASSEMBLYAI_API_KEY,
    },
});
const uploadAudioToAssemblyAI = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileStream = fs_1.default.createReadStream(filePath);
        const form = new form_data_1.default();
        form.append("file", fileStream);
        const response = yield axios_1.default.post(`${ASSEMBLYAI_BASE_URL}/upload`, form, {
            headers: Object.assign(Object.assign({}, form.getHeaders()), { Authorization: ASSEMBLYAI_API_KEY }),
        });
        return response.data.upload_url;
    }
    catch (error) {
        const axiosError = error;
        throw new Error(`Failed to upload audio to AssemblyAI: ${axiosError.message}`);
    }
});
exports.uploadAudioToAssemblyAI = uploadAudioToAssemblyAI;
const requestTranscription = (audioUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axiosInstance.post("/transcript", {
            audio_url: audioUrl,
        });
        return response.data.id;
    }
    catch (error) {
        const axiosError = error;
        throw new Error(`Failed to request transcription from AssemblyAI: ${axiosError.message}`);
    }
});
exports.requestTranscription = requestTranscription;
const pollTranscriptionStatus = (transcriptId) => __awaiter(void 0, void 0, void 0, function* () {
    let retries = 0;
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const poll = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axiosInstance.get(`/transcript/${transcriptId}`);
                if (response.data.status === "completed") {
                    resolve(response.data);
                }
                else if (response.data.status === "error") {
                    reject(new Error("Transcription failed on AssemblyAI server"));
                }
                else {
                    retries++;
                    if (retries >= MAX_RETRIES) {
                        reject(new Error("Transcription polling timeout exceeded (30 minutes)"));
                    }
                    else {
                        setTimeout(poll, POLL_INTERVAL);
                    }
                }
            }
            catch (error) {
                const axiosError = error;
                reject(new Error(`Error polling transcription status: ${axiosError.message}`));
            }
        });
        poll();
    }));
});
exports.pollTranscriptionStatus = pollTranscriptionStatus;
const transcribeWithAssemblyAI = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const audioUrl = yield (0, exports.uploadAudioToAssemblyAI)(filePath);
        const transcriptId = yield (0, exports.requestTranscription)(audioUrl);
        const transcript = yield (0, exports.pollTranscriptionStatus)(transcriptId);
        return {
            transcriptText: transcript.text,
            confidence: transcript.confidence,
            duration: transcript.duration,
            wordCount: ((_a = transcript.words) === null || _a === void 0 ? void 0 : _a.length) || 0,
            fullTranscript: transcript,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.transcribeWithAssemblyAI = transcribeWithAssemblyAI;
//# sourceMappingURL=assembly.js.map