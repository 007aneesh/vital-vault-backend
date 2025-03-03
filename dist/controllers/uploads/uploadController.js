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
const uploadService_1 = __importDefault(require("../../services/uploads/uploadService"));
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
class UploadController {
    handleUpload(req, res, category) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!req.processedFiles) {
                return (0, handle_response_1.sendError)(res, "No files provided for upload", 400);
            }
            if (!((_a = req.payload) === null || _a === void 0 ? void 0 : _a.user_id)) {
                return (0, handle_response_1.sendError)(res, "User authentication required", 401);
            }
            const results = yield uploadService_1.default.uploadSingleFile(req.processedFiles, category, req.payload.user_id);
            return (0, handle_response_1.sendSuccess)(res, "File uploaded successfully", 200, results);
        });
    }
    uploadOrganization(req, res) {
        return this.handleUpload(req, res, "organization");
    }
    uploadReports(req, res) {
        return this.handleUpload(req, res, "reports");
    }
    uploadVerifiedDocs(req, res) {
        return this.handleUpload(req, res, "verified-docs");
    }
}
const methods = (0, singleton_class_1.SingletonClass)(UploadController);
exports.default = methods;
//# sourceMappingURL=uploadController.js.map