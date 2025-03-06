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
const patient_services_1 = __importDefault(require("../../services/patient-services/patient_services"));
const appAssert_1 = __importDefault(require("../../utils/appAssert"));
const http_1 = require("../../utils/http");
const db_1 = require("../../utils/db");
const employee_services_1 = __importDefault(require("../../services/employee-services/employee_services"));
const organisation_services_1 = __importDefault(require("../../services/settings/organisation_services"));
class UploadController {
    constructor() {
        this.handleUpload = (req, category) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!req.processedFiles) {
                throw new Error("No files provided for upload");
            }
            if (!((_a = req.payload) === null || _a === void 0 ? void 0 : _a.user_id)) {
                throw new Error("User authentication required");
            }
            try {
                return yield uploadService_1.default.uploadSingleFile(req.processedFiles, category, req.payload.user_id);
            }
            catch (error) {
                console.error("Error in handleUpload:", error);
                throw new Error("Internal server error");
            }
        });
        this.uploadOrganization = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield this.handleUpload(req, "organization");
            return (0, handle_response_1.sendSuccess)(res, "File uploaded successfully", 200, results);
        });
        this.uploadReports = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield this.handleUpload(req, "reports");
            return (0, handle_response_1.sendSuccess)(res, "File uploaded successfully", 200, results);
        });
        this.uploadVerifiedDocs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield this.handleUpload(req, "verified_docs");
            return (0, handle_response_1.sendSuccess)(res, "File uploaded successfully", 200, results);
        });
        this.uploadProfileImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.handleUpload(req, "verified_docs");
            if (!response) {
                return (0, handle_response_1.sendError)(res, "Error uploading profile image", 400);
            }
            const updatedData = {
                image: response.url,
            };
            const user = yield db_1.prisma.entity_Mapping.findUnique({
                where: { ref_id: req.payload.user_id },
                include: {
                    organisation: true,
                    employee: true,
                    patient: true,
                },
            });
            if (!user)
                return (0, handle_response_1.sendError)(res, "User not found", 404);
            let result = null;
            if (user.type === "organisation" /* UserType.ORGANISATION */ && user.organisation) {
                result = yield organisation_services_1.default.updateOrganisation(req.payload.user_id, updatedData);
            }
            else if (user.type === "employee" /* UserType.EMPLOYEE */ && user.employee) {
                result = yield employee_services_1.default.updateDetails(req.payload.user_id, updatedData);
            }
            else if (user.type === "patient" /* UserType.PATIENT */ && user.patient) {
                result = yield patient_services_1.default.updatePatient(req.payload.user_id, updatedData);
            }
            (0, appAssert_1.default)(result, http_1.INTERNAL_SERVER_ERROR, "Error uploading image", "File upload failed" /* AppErrorCode.FileUploadFailed */);
            return (0, handle_response_1.sendSuccess)(res, "Profile image uploaded successfully", 200, response);
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(UploadController);
exports.default = methods;
//# sourceMappingURL=uploadController.js.map