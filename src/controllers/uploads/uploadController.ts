import { Request, Response } from "express";
import uploadService from "../../services/uploads/uploadService";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class UploadController {
  constructor() {
    this.handleUpload = this.handleUpload.bind(this);
    this.uploadOrganization = this.uploadOrganization.bind(this);
    this.uploadReports = this.uploadReports.bind(this);
    this.uploadVerifiedDocs = this.uploadVerifiedDocs.bind(this);
    this.uploadProfileImage = this.uploadProfileImage.bind(this);
  }

  async handleUpload(req: any, res: Response, category: string) {
    if (!req.processedFiles) {
      return sendError(res, "No files provided for upload", 400);
    }
    if (!req.payload?.user_id) {
      return sendError(res, "User authentication required", 401);
    }

    const results = await uploadService.uploadSingleFile(
      req.processedFiles,
      category,
      req.payload.user_id,
    );

    return sendSuccess(res, "File uploaded successfully", 200, results);
  }

  uploadOrganization(req: Request, res: Response) {
    return this.handleUpload(req, res, "organization");
  }

  uploadReports(req: Request, res: Response) {
    return this.handleUpload(req, res, "reports");
  }

  uploadVerifiedDocs(req: Request, res: Response) {
    return this.handleUpload(req, res, "verified_docs");
  }

  uploadProfileImage(req: any, res: Response) {
    return this.handleUpload(req, res, "profile_images");
  }
}

const methods = SingletonClass(UploadController);
export default methods;
