"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const handle_response_1 = require("../utils/handle_response");
const appError_1 = __importDefault(require("../utils/appError"));
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image")) {
        return cb(new appError_1.default(400, "Only image files are allowed!", "Invalid File" /* AppErrorCode.InvalidFile */), false);
    }
    cb(null, true);
};
const processFile = (file, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const processor = (0, sharp_1.default)(file.buffer)
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
                buffer: yield processor.toBuffer(),
                metadata: yield processor.metadata(),
            },
        };
    }
    catch (err) {
        throw new appError_1.default(500, `Error processing the image: ${err}`, "Failed to process the file" /* AppErrorCode.FileProcessingFailed */);
    }
});
exports.default = (options) => {
    const upload = (0, multer_1.default)({
        storage,
        fileFilter,
        limits: { fileSize: options.maxSize || 100 * 1024 * 1024 },
    });
    return [
        upload.single("image"),
        (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return (0, handle_response_1.sendError)(res, "No files uploaded", 404);
                }
                req.processedFiles = yield processFile(req.file, options);
                next();
            }
            catch (err) {
                (0, handle_response_1.sendError)(res, err !== null && err !== void 0 ? err : "Unable to process file", 500);
            }
        }),
    ];
};
//# sourceMappingURL=uploadMiddleware.js.map