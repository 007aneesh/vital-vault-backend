import { Request, Response } from "express";
import uploadService from "../../services/uploads/uploadService";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";
import patient_services from "../../services/patient-services/patient_services";
import appAssert from "../../utils/appAssert";
import { INTERNAL_SERVER_ERROR } from "../../utils/http";
import AppErrorCode from "../../utils/appErrorCode";
import { prisma } from "../../utils/db";
import { UserType } from "../../utils/constant";
import employee_services from "../../services/employee-services/employee_services";
import organisation_services from "../../services/settings/organisation_services";

class UploadController {
  handleUpload = async (req: any, category: string) => {
    if (!req.processedFiles) {
      throw new Error("No files provided for upload");
    }
    if (!req.payload?.user_id) {
      throw new Error("User authentication required");
    }

    try {
      return await uploadService.uploadSingleFile(
        req.processedFiles,
        category,
        req.payload.user_id,
      );
    } catch (error) {
      console.error("Error in handleUpload:", error);
      throw new Error("Internal server error");
    }
  };

  uploadOrganization = async (req: Request, res: Response) => {
    const results = await this.handleUpload(req, "organization");
    return sendSuccess(res, "File uploaded successfully", 200, results);
  };

  uploadReports = async (req: Request, res: Response) => {
    const results = await this.handleUpload(req, "reports");
    return sendSuccess(res, "File uploaded successfully", 200, results);
  };

  uploadVerifiedDocs = async (req: Request, res: Response) => {
    const results = await this.handleUpload(req, "verified_docs");
    return sendSuccess(res, "File uploaded successfully", 200, results);
  };

  uploadProfileImage = async (req: any, res: Response) => {
    const response = await this.handleUpload(req, "verified_docs");
    if (!response) {
      return sendError(res, "Error uploading profile image", 400);
    }
    const updatedData = {
      image: response.url,
    };

    const user = await prisma.entity_Mapping.findUnique({
      where: { ref_id: req.payload.user_id },
      include: {
        organisation: true,
        employee: true,
        patient: true,
      },
    });

    if (!user) return sendError(res, "User not found", 404);

    let result = null;
    if (user.type === UserType.ORGANISATION && user.organisation) {
      result = await organisation_services.updateOrganisation(
        req.payload.user_id,
        updatedData,
      );
    } else if (user.type === UserType.EMPLOYEE && user.employee) {
      result = await employee_services.updateDetails(
        req.payload.user_id,
        updatedData,
      );
    } else if (user.type === UserType.PATIENT && user.patient) {
      result = await patient_services.updatePatient(
        req.payload.user_id,
        updatedData,
      );
    }
    appAssert(
      result,
      INTERNAL_SERVER_ERROR,
      "Error uploading image",
      AppErrorCode.FileUploadFailed,
    );
    return sendSuccess(
      res,
      "Profile image uploaded successfully",
      200,
      response,
    );
  };
}

const methods = SingletonClass(UploadController);
export default methods;
