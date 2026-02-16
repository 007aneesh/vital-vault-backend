import axios, { AxiosError } from "axios";
import fs from "fs";
import FormData from "form-data";

interface AssemblyAIUploadResponse {
  upload_url: string;
}

interface AssemblyAITranscriptResponse {
  id: string;
  status: "queued" | "processing" | "completed" | "error";
  text: string;
  confidence: number;
  words: Array<{ word: string; confidence: number }>;
  duration: number;
}

interface TranscriptionResult {
  transcriptText: string;
  confidence: number;
  duration: number;
  wordCount: number;
  fullTranscript: AssemblyAITranscriptResponse;
}

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const ASSEMBLYAI_BASE_URL = "https://api.assemblyai.com/v2";
const POLL_INTERVAL = 3000;
const MAX_RETRIES = 600;

const getAxiosInstance = () => {
  if (!ASSEMBLYAI_API_KEY) {
    throw new Error(
      "ASSEMBLYAI_API_KEY is not defined in environment variables",
    );
  }

  return axios.create({
    baseURL: ASSEMBLYAI_BASE_URL,
    headers: {
      Authorization: ASSEMBLYAI_API_KEY,
    },
  });
};

export const uploadAudioToAssemblyAI = async (
  filePath: string,
): Promise<string> => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const form = new FormData();
    form.append("file", fileStream);

    const response = await axios.post<AssemblyAIUploadResponse>(
      `${ASSEMBLYAI_BASE_URL}/upload`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: ASSEMBLYAI_API_KEY,
        },
      },
    );

    return response.data.upload_url;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Failed to upload audio to AssemblyAI: ${axiosError.message}`,
    );
  }
};

export const requestTranscription = async (
  audioUrl: string,
): Promise<string> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post("/transcript", {
      audio_url: audioUrl,
    });

    return response.data.id;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Failed to request transcription from AssemblyAI: ${axiosError.message}`,
    );
  }
};

export const pollTranscriptionStatus = async (
  transcriptId: string,
): Promise<AssemblyAITranscriptResponse> => {
  let retries = 0;
  const axiosInstance = getAxiosInstance();

  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const response = await axiosInstance.get<AssemblyAITranscriptResponse>(
          `/transcript/${transcriptId}`,
        );

        if (response.data.status === "completed") {
          resolve(response.data);
        } else if (response.data.status === "error") {
          reject(new Error("Transcription failed on AssemblyAI server"));
        } else {
          retries++;
          if (retries >= MAX_RETRIES) {
            reject(
              new Error("Transcription polling timeout exceeded (30 minutes)"),
            );
          } else {
            setTimeout(poll, POLL_INTERVAL);
          }
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        reject(
          new Error(
            `Error polling transcription status: ${axiosError.message}`,
          ),
        );
      }
    };

    poll();
  });
};

export const transcribeWithAssemblyAI = async (
  filePath: string,
): Promise<TranscriptionResult> => {
  const audioUrl = await uploadAudioToAssemblyAI(filePath);
  const transcriptId = await requestTranscription(audioUrl);
  const transcript = await pollTranscriptionStatus(transcriptId);

  return {
    transcriptText: transcript.text,
    confidence: transcript.confidence,
    duration: transcript.duration,
    wordCount: transcript.words?.length || 0,
    fullTranscript: transcript,
  };
};
