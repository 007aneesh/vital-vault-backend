import { Request, Response } from "express";
import uploadService from "../../services/uploads/uploadService";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class UploadController {
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
    return this.handleUpload(req, res, "verified-docs");
  }

  uploadProfileImage(req: any, res: Response) {
    return this.handleUpload(req, res, "profile-image");
  }
}

const methods = SingletonClass(UploadController);
export default methods;
