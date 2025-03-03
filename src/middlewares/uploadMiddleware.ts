import multer from "multer";
import sharp from "sharp";
import AppErrorCode from "../utils/appErrorCode";
import { sendError } from "../utils/handle_response";
import AppError from "../utils/appError";

interface options {
  width?: number;
  height?: number;
  fit?: "contain" | "cover" | "fill" | "inside" | "outside";
  quality?: number;
  lossless?: boolean;
  maxSize?: number;
  stripMetadata?: boolean;
}

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(
      new AppError(
        400,
        "Only image files are allowed!",
        AppErrorCode.InvalidFile,
      ),
      false,
    );
  }
  cb(null, true);
};

const processFile = async (file: any, options: options) => {
  try {
    const processor = sharp(file.buffer)
      .rotate()
      .resize({
        width: options.width,
        height: options.height,
        fit: options.fit,
        withoutEnlargement: true,
      })
      .webp({
        quality: options.quality || 80,
        lossless: options.lossless || false,
      })
      .toFormat("webp");

    if (options.stripMetadata) {
      processor.withMetadata();
    }

    return {
      original: file,
      processed: {
        buffer: await processor.toBuffer(),
        metadata: await processor.metadata(),
      },
    };
  } catch (err) {
    throw new AppError(
      500,
      `Error processing the image: ${err}`,
      AppErrorCode.FileProcessingFailed,
    );
  }
};

export default (options: options) => {
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: options.maxSize || 100 * 1024 * 1024 },
  });

  return [
    upload.single("image"),
    async (req: any, res: any, next: any) => {
      try {
        if (!req.file) {
          return sendError(res, "No files uploaded", 404);
        }

        req.processedFiles = await processFile(req.file, options);
        next();
      } catch (err) {
        sendError(res, err ?? "Unable to process file", 500);
      }
    },
  ];
};
