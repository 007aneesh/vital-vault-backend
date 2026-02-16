import multer from "multer";
import path from "path";
import fs from "fs";
import AppError from "../utils/appError";
import AppErrorCode from "../utils/appErrorCode";
import { sendError } from "../utils/handle_response";

const uploadDir = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true });
      } catch (err) {
        return cb(err as Error, "");
      }
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "audio-" + uniqueSuffix + ".mp3");
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = [
    "audio/mpeg",
    "audio/mp4",
    "audio/wav",
    "audio/webm",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new AppError(
        400,
        "Only audio files (mp3, mp4, wav, webm) are allowed!",
        AppErrorCode.InvalidFile,
      ),
      false,
    );
  }
  cb(null, true);
};

export default () => {
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 25 * 1024 * 1024 },
  });

  return [
    upload.single("audio"),
    async (req: any, res: any, next: any) => {
      try {
        if (!req.file) {
          return sendError(res, "No audio file uploaded", 400);
        }

        req.audioFile = {
          path: req.file.path,
          filename: req.file.filename,
          mimetype: req.file.mimetype,
          size: req.file.size,
        };

        next();
      } catch (err) {
        if (req.file) {
          fs.unlink(req.file.path, () => {});
        }
        sendError(res, err ?? "Unable to process audio file", 500);
      }
    },
  ];
};
