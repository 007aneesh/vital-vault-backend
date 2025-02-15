const enum AppErrorCode {
  InvalidAccessToken = "InvalidAccessToken",
  InvalidFile = "Invalid File",
  NoFilesUploaded = "No files uploaded",
  FileUploadFailed = "File upload failed",
  FileProcessingFailed = "Failed to process the file",
}

export const ERROR_MESSAGES = {
  UNPROCESSABLE_ENTITY:
    "The request could not be processed due to invalid input.",
  NOT_FOUND: "The requested resource was not found.",
  INTERNAL_SERVER_ERROR:
    "An unexpected error occurred. Please try again later.",
  UNPROCESSABLE_CONTENT: "Unprocessable content",
};

export default AppErrorCode;
