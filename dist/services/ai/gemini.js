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
exports.extractMedicationInfo = void 0;
const generative_ai_1 = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const extractMedicationInfo = (transcriptText) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `
You are a medical data extraction assistant. Extract medication information from the following medical transcript.

TRANSCRIPT:
"${transcriptText}"

Extract ALL medications mentioned in the transcript. For each medication, provide:
1. Medication name (e.g., Aspirin, Amoxicillin, Metformin)
2. Dose (e.g., 500mg, 2 tablets, 10ml)
3. Frequency (e.g., twice daily, every 8 hours, once at bedtime)
4. Duration (e.g., 7 days, 2 weeks, ongoing)
5. Notes (any additional instructions or warnings)

Return the response as a JSON array with this exact structure:
[
  {
    "name": "medication name",
    "dose": "dosage",
    "frequency": "frequency",
    "duration": "duration",
    "notes": "additional notes or empty string"
  }
]

If no medications are mentioned, return an empty array: []

Return ONLY valid JSON, no additional text.
`;
        const result = yield model.generateContent(prompt);
        const responseText = ((_e = (_d = (_c = (_b = (_a = result.response.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) || "[]";
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        const jsonString = jsonMatch ? jsonMatch[0] : "[]";
        const medications = JSON.parse(jsonString);
        return {
            medications: medications.map((med) => ({
                name: med.name || "",
                dose: med.dose || "",
                frequency: med.frequency || "",
                duration: med.duration || "",
                notes: med.notes || "",
            })),
            rawResponse: responseText,
        };
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`Failed to parse medication extraction response: ${error.message}`);
        }
        throw new Error(`Failed to extract medication info with Gemini: ${error instanceof Error ? error.message : String(error)}`);
    }
});
exports.extractMedicationInfo = extractMedicationInfo;
//# sourceMappingURL=gemini.js.map