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
const crypto_1 = __importDefault(require("crypto"));
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const appAssert_1 = __importDefault(require("../../utils/appAssert"));
const http_1 = require("../../utils/http");
const appError_1 = __importDefault(require("../../utils/appError"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.default = {
    uploadSingleFile(file, category, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = user
                ? `${crypto_1.default.randomBytes(4).toString("hex")}_id=${user}`
                : crypto_1.default.randomBytes(4).toString("hex");
            const filename = this.generateFilename(file.original.originalname, user, salt, file.processed.metadata);
            try {
                const uploadResult = yield this.uploadToCloudinary(file.processed.buffer, category, filename);
                (0, appAssert_1.default)(uploadResult && uploadResult.secure_url, http_1.INTERNAL_SERVER_ERROR, "Cloudinary upload returned no secure URL");
                return {
                    url: uploadResult.secure_url,
                    metadata: Object.assign({ salt }, file.processed.metadata),
                };
            }
            catch (err) {
                console.error("Error:", err);
                (0, appAssert_1.default)(err instanceof appError_1.default, http_1.INTERNAL_SERVER_ERROR, err.message);
            }
        });
    },
    generateFilename(original, user, salt, metadata) {
        const uid = String(user);
        console.log(uid);
        const sanitizedOriginalName = original
            .split(".")[0]
            .replace(/\s+/g, "_")
            .slice(0, 50); // Limit to 50 chars
        const timestamp = Date.now();
        const extension = "webp";
        return `${sanitizedOriginalName}_${salt}_${metadata.width}x${metadata.height}_${timestamp}.${extension}`;
    },
    // Helper function to upload the image to Cloudinary
    uploadToCloudinary(buffer, category, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const readStream = new stream_1.Readable({
                    read() {
                        this.push(buffer);
                        this.push(null);
                    },
                });
                const cld_upload_stream = cloudinary_1.v2.uploader.upload_stream({
                    folder: `health_management/${category}`,
                    access_mode: "authenticated",
                    resource_type: "image",
                    allowed_formats: ["jpg", "png", "jpeg", "webp"],
                    public_id: filename,
                }, (error, result) => {
                    (0, appAssert_1.default)(!error, http_1.INTERNAL_SERVER_ERROR, "Error uploading file to Cloudinary", "File upload failed" /* AppErrorCode.FileUploadFailed */);
                    if (error) {
                        return reject(new appError_1.default(http_1.INTERNAL_SERVER_ERROR, "Cloudinary upload failed", "File upload failed" /* AppErrorCode.FileUploadFailed */));
                    }
                    resolve(result);
                });
                readStream.pipe(cld_upload_stream);
            });
        });
    },
};
//# sourceMappingURL=uploadService.js.map