import { Response } from "express";
import AppError from "./appError"; // Import your custom AppError
import { ZodError } from "zod";

/**
 * Sends an error response in a structured format.
 * Automatically handles 'Zod Error' , `AppError` instances and standard `Error` objects.
 *
 * @param {Response} res - Express response object
 * @param {any} error - The error object or message
 * @param {number} [status=500] - HTTP status code (default: 500)
 */
export const sendError = (
  res: Response,
  error: any,
  status: number = 500,
): void => {
  let errorResponse: {
    message: string;
    status: number;
    errorCode?: string;
    stack?: string;
    errors?: Record<string, string>;
  } = {
    message: "An unexpected error occurred",
    status,
  };

  if (error instanceof ZodError) {
    const formattedErrors = error.errors.reduce(
      (acc, issue) => {
        acc[issue.path.join(".")] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );

    errorResponse = {
      message: "Validation failed",
      status: 422, // Unprocessable Entity for validation errors
      errorCode: "VALIDATION_ERROR",
      errors: formattedErrors, // Send formatted validation errors
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    };
  } else if (error instanceof Error) {
    errorResponse = {
      message: error.message,
      status,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined, // Stack trace only in dev
    };
  } else if (error instanceof AppError) {
    errorResponse = {
      message: error.message,
      status: error.statusCode,
      errorCode: error.errorCode || "UNKNOWN_ERROR",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined, // Show stack trace in development
    };
  } else if (typeof error === "string") {
    errorResponse = {
      message: error,
      status,
      errorCode: "BAD_REQUEST",
    };
  } else {
    errorResponse = {
      message: "Unknown error",
      status,
      errorCode: "UNKNOWN_ERROR",
    };
  }

  res.status(errorResponse.status).json({ error: errorResponse });
};

/**
 * Sends a success response in a structured format.
 *
 * @param {Response} res - Express response object
 * @param {any} data - The success response data
 * @param {string} [message="Request successful"] - Success message
 * @param {number} [status=200] - HTTP status code (default: 200)
 */
export const sendSuccess = (
  res: Response,
  message: string = "Success",
  status: number = 200,
  data?: any,
): void => {
  res.status(status).json({
    success: true,
    status,
    message,
    ...(data !== undefined && { data }),
  });
};
