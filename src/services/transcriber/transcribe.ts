import { Request, Response } from "express";
// import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { sendError, sendSuccess } from "../../utils/handle_response";
import catchErrors from "../../utils/catchErrors";
import openai from "openai";

dotenv.config();

// const upload = multer({ dest: "uploads/" });

const openaiClient = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const transcribeAudio = catchErrors(
  async (req: Request, res: Response) => {
    if (!req.file) {
      return sendError(res, "File must be an audio file", 400);
    }

    try {
      const tempFilePath = path.join("uploads", req.file.filename);

      const transcriptResponse = await openaiClient.audio.transcriptions.create(
        {
          model: "whisper-1",
          file: fs.createReadStream(tempFilePath),
        },
      );

      const transcriptionText = transcriptResponse.text;

      const completion = await openaiClient.chat.completions.create({
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

      fs.unlinkSync(tempFilePath);

      return sendSuccess(res, completion.choices[0].message.content ?? "", 200);
    } catch (error) {
      return sendError(res, `Error processing audio: ${error}`, 500);
    }
  },
);

export const healthCheck = (req: Request, res: Response) => {
  return sendSuccess(res, "Audio transcribe heathy working fine", 200);
};
