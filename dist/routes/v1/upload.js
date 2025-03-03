"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/uploadRoutes.js
const express_1 = __importDefault(require("express"));
const uploadMiddleware_1 = __importDefault(require("../../middlewares/uploadMiddleware"));
const globalErrorMiddleware_1 = require("../../middlewares/globalErrorMiddleware");
const uploads_1 = require("../../controllers/uploads");
const router = express_1.default.Router();
// Organization Images (5MB max, keep original aspect ratio)
router.post("/organization", (0, uploadMiddleware_1.default)({
    maxSize: 5 * 1024 * 1024,
    width: 1920,
    height: 1080,
    stripMetadata: true,
}), globalErrorMiddleware_1.globalErrorHandler, uploads_1.uploadController.uploadOrganization);
// Medical Reports (3MB max)
router.post("/reports", (0, uploadMiddleware_1.default)({
    maxSize: 3 * 1024 * 1024,
    quality: 90,
    lossless: true,
}), globalErrorMiddleware_1.globalErrorHandler, uploads_1.uploadController.uploadReports);
router.post("/docs", (0, uploadMiddleware_1.default)({
    maxSize: 2 * 1024 * 1024,
    width: 800,
    height: 600,
    fit: "inside",
}), globalErrorMiddleware_1.globalErrorHandler, uploads_1.uploadController.uploadVerifiedDocs);
exports.default = router;
//# sourceMappingURL=upload.js.map