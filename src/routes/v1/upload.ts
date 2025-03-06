// src/routes/uploadRoutes.js
import express from "express";
import uploadMiddleware from "../../middlewares/uploadMiddleware";
import { globalErrorHandler } from "../../middlewares/globalErrorMiddleware";
import { uploadController } from "../../controllers/uploads";

const router = express.Router();

// Organization Images (5MB max, keep original aspect ratio)
router.post(
  "/organization",
  uploadMiddleware({
    maxSize: 5 * 1024 * 1024,
    width: 1920,
    height: 1080,
    stripMetadata: true,
  }),
  globalErrorHandler,
  uploadController.uploadOrganization,
);

// Medical Reports (3MB max)
router.post(
  "/reports",
  uploadMiddleware({
    maxSize: 3 * 1024 * 1024,
    quality: 90,
    lossless: true,
  }),
  globalErrorHandler,
  uploadController.uploadReports,
);

router.post(
  "/docs",
  uploadMiddleware({
    maxSize: 2 * 1024 * 1024,
    width: 800,
    height: 600,
    fit: "inside",
  }),
  globalErrorHandler,
  uploadController.uploadVerifiedDocs,
);

router.post(
  "/profile",
  uploadMiddleware({
    maxSize: 10 * 1024 * 1024,
    width: 800,
    height: 800,
    fit: "inside",
  }),
  globalErrorHandler,
  uploadController.uploadProfileImage,
);

export default router;
