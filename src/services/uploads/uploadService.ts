import crypto from "crypto";
import AppErrorCode from "../../utils/appErrorCode.js";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import appAssert from "../../utils/appAssert.js";
import { INTERNAL_SERVER_ERROR } from "../../utils/http.js";
import AppError from "../../utils/appError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
  async uploadSingleFile(file: any, category: string, user?: any) {
    const salt = crypto.randomBytes(4).toString("hex");
    const filename = this.generateFilename(
      file.original.originalname,
      user,
      salt,
      file.processed.metadata,
    );

    try {
      const uploadResult = await this.uploadToCloudinary(
        file.processed.buffer,
        category,
        filename,
      );

      appAssert(
        uploadResult && uploadResult.secure_url,
        INTERNAL_SERVER_ERROR,
        "Cloudinary upload returned no secure URL",
      );

      return {
        url: uploadResult.secure_url,
        metadata: {
          salt,
          ...file.processed.metadata,
        },
      };
    } catch (err: any) {
      console.error("Error:", err);
      appAssert(err instanceof AppError, INTERNAL_SERVER_ERROR, err.message);
    }
  },

  generateFilename(
    original: string,
    user: any,
    salt: string,
    metadata: { width: number; height: number },
  ) {
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
  async uploadToCloudinary(
    buffer: Buffer,
    category: string,
    filename: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const readStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });

      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: `health_management/${category}`,
          access_mode: "authenticated",
          resource_type: "image",
          allowed_formats: ["jpg", "png", "jpeg", "webp"],
          public_id: filename,
        },
        (error, result) => {
          appAssert(
            !error,
            INTERNAL_SERVER_ERROR,
            "Error uploading file to Cloudinary",
            AppErrorCode.FileUploadFailed,
          );

          if (error) {
            return reject(
              new AppError(
                INTERNAL_SERVER_ERROR,
                "Cloudinary upload failed",
                AppErrorCode.FileUploadFailed,
              ),
            );
          }

          resolve(result!);
        },
      );

      readStream.pipe(cld_upload_stream);
    });
  },
};
