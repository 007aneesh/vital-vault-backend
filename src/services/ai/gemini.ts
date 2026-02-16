import { GoogleGenerativeAI } from "@google/generative-ai";

interface ExtractedMedication {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  notes: string;
}

interface MedicationExtractionResult {
  medications: ExtractedMedication[];
  rawResponse: string;
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const extractMedicationInfo = async (
  transcriptText: string,
): Promise<MedicationExtractionResult> => {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

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

    const result = await model.generateContent(prompt);
    const responseText =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    const jsonString = jsonMatch ? jsonMatch[0] : "[]";
    const medications = JSON.parse(jsonString) as ExtractedMedication[];

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
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        `Failed to parse medication extraction response: ${error.message}`,
      );
    }
    throw new Error(
      `Failed to extract medication info with Gemini: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
