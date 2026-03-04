import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/handle_response";
import { extractMedicationInfo } from "../../services/ai/gemini";

interface ParseTranscriptBody {
  transcript?: string;
}

interface ParseTranscriptResponse {
  transcript: string;
  medications: Array<{
    name: string;
    dose: string;
    frequency: string;
    duration: string;
    notes: string;
  }>;
}

export const parseTranscript = async (req: Request, res: Response) => {
  const body = req.body as ParseTranscriptBody;
  const transcript =
    typeof body?.transcript === "string" ? body.transcript.trim() : "";

  if (!transcript) {
    return sendError(
      res,
      "transcript is required and must be a non-empty string",
      400,
    );
  }

  try {
    const medicationResult = await extractMedicationInfo(transcript);

    const response: ParseTranscriptResponse = {
      transcript,
      medications: medicationResult.medications,
    };

    sendSuccess(res, "Transcript parsed successfully", 200, response);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    let statusCode = 500;

    if (errorMessage.includes("GEMINI_API_KEY")) {
      statusCode = 503;
    }

    sendError(res, errorMessage, statusCode);
  }
};
