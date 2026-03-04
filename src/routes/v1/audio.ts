import express from "express";
import { transcribeAudio } from "../../services/transcriber/transcribe";
import { parseTranscript } from "../../controllers/audio";

const router = express.Router();

router.get("/transcribe", transcribeAudio);

router.post("/parse-transcript", express.json(), parseTranscript);

export default router;
