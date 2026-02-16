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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const appError_1 = __importDefault(require("../utils/appError"));
const handle_response_1 = require("../utils/handle_response");
const uploadDir = path_1.default.join(process.cwd(), "uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "audio-" + uniqueSuffix + ".mp3");
    },
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["audio/mpeg", "audio/mp4", "audio/wav", "audio/webm"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new appError_1.default(400, "Only audio files (mp3, mp4, wav, webm) are allowed!", "Invalid File" /* AppErrorCode.InvalidFile */), false);
    }
    cb(null, true);
};
exports.default = () => {
    const upload = (0, multer_1.default)({
        storage,
        fileFilter,
        limits: { fileSize: 25 * 1024 * 1024 },
    });
    return [
        upload.single("audio"),
        (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return (0, handle_response_1.sendError)(res, "No audio file uploaded", 400);
                }
                req.audioFile = {
                    path: req.file.path,
                    filename: req.file.filename,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                };
                next();
            }
            catch (err) {
                if (req.file) {
                    fs_1.default.unlink(req.file.path, () => { });
                }
                (0, handle_response_1.sendError)(res, err !== null && err !== void 0 ? err : "Unable to process audio file", 500);
            }
        }),
    ];
};
//# sourceMappingURL=audioUploadMiddleware.js.map