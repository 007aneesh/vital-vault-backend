import { Request, Response } from "express";
import fs from "fs";
import { sendSuccess, sendError } from "../../utils/handle_response";
import { transcribeWithAssemblyAI } from "../../services/transcriber/assembly";
import { extractMedicationInfo } from "../../services/ai/gemini";
import AppError from "../../utils/appError";
import AppErrorCode from "../../utils/appErrorCode";

interface AudioRequest extends Request {
  audioFile?: {
    path: string;
    filename: string;
    mimetype: string;
    size: number;
  };
}

interface TranscriptionResponse {
  transcript: {
    text: string;
    confidence: number;
    duration: number;
    wordCount: number;
  };
  medications: Array<{
    name: string;
    dose: string;
    frequency: string;
    duration: string;
    notes: string;
  }>;
}

export const transcribeAudioWithAssemblyAI = async (
  req: AudioRequest,
  res: Response,
) => {
  const audioFilePath = req.audioFile?.path;

  if (!audioFilePath) {
    return sendError(res, "Audio file path not found", 400);
  }

  try {
    const transcriptionResult = await transcribeWithAssemblyAI(audioFilePath);

    const medicationResult = await extractMedicationInfo(
      transcriptionResult.transcriptText,
    );

    const response: TranscriptionResponse = {
      transcript: {
        text: transcriptionResult.transcriptText,
        confidence: transcriptionResult.confidence,
        duration: transcriptionResult.duration,
        wordCount: transcriptionResult.wordCount,
      },
      medications: medicationResult.medications,
    };

    sendSuccess(
      res,
      "Transcription and medication extraction completed successfully",
      200,
      response,
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    let statusCode = 500;

    if (
      errorMessage.includes("ASSEMBLYAI_API_KEY") ||
      errorMessage.includes("GEMINI_API_KEY")
    ) {
      statusCode = 503;
    } else if (errorMessage.includes("timeout")) {
      statusCode = 504;
    }

    sendError(res, errorMessage, statusCode);
  } finally {
    if (fs.existsSync(audioFilePath)) {
      fs.unlink(audioFilePath, (err) => {
        if (err) console.error(`Failed to delete audio file: ${err.message}`);
      });
    }
  }
};
