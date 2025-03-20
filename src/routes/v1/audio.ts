import express from "express";
import { transcribeAudio } from "../../services/transcriber/transcribe";

const router = express.Router();

router.get("/transcribe", transcribeAudio);

export default router;
