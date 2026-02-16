import express from "express";
import { transcribeAudio } from "../../services/transcriber/transcribe";
import { transcribeAudioWithAssemblyAI } from "../../controllers/audio";
import audioUploadMiddleware from "../../middlewares/audioUploadMiddleware";

const router = express.Router();

router.get("/transcribe", transcribeAudio);

router.post(
  "/transcribe-assembly",
  audioUploadMiddleware(),
  transcribeAudioWithAssemblyAI,
);

export default router;
