"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = exports.sendError = void 0;
const appError_1 = __importDefault(require("./appError")); // Import your custom AppError
const zod_1 = require("zod");
/**
 * Sends an error response in a structured format.
 * Automatically handles 'Zod Error' , `AppError` instances and standard `Error` objects.
 *
 * @param {Response} res - Express response object
 * @param {any} error - The error object or message
 * @param {number} [status=500] - HTTP status code (default: 500)
 */
const sendError = (res, error, status = 500) => {
    let errorResponse = {
        message: "An unexpected error occurred",
        status,
    };
    if (error instanceof zod_1.ZodError) {
        const formattedErrors = error.errors.reduce((acc, issue) => {
            acc[issue.path.join(".")] = issue.message;
            return acc;
        }, {});
        errorResponse = {
            message: "Validation failed",
            status: 422, // Unprocessable Entity for validation errors
            errorCode: "VALIDATION_ERROR",
            errors: formattedErrors, // Send formatted validation errors
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        };
    }
    else if (error instanceof Error) {
        errorResponse = {
            message: error.message,
            status,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined, // Stack trace only in dev
        };
    }
    else if (error instanceof appError_1.default) {
        errorResponse = {
            message: error.message,
            status: error.statusCode,
            errorCode: error.errorCode || "UNKNOWN_ERROR",
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined, // Show stack trace in development
        };
    }
    else if (typeof error === "string") {
        errorResponse = {
            message: error,
            status,
            errorCode: "BAD_REQUEST",
        };
    }
    else {
        errorResponse = {
            message: "Unknown error",
            status,
            errorCode: "UNKNOWN_ERROR",
        };
    }
    res.status(errorResponse.status).json({ error: errorResponse });
};
exports.sendError = sendError;
/**
 * Sends a success response in a structured format.
 *
 * @param {Response} res - Express response object
 * @param {any} data - The success response data
 * @param {string} [message="Request successful"] - Success message
 * @param {number} [status=200] - HTTP status code (default: 200)
 */
const sendSuccess = (res, message = "Success", status = 200, data) => {
    res.status(status).json(Object.assign({ success: true, status,
        message }, (data !== undefined && { data })));
};
exports.sendSuccess = sendSuccess;
//# sourceMappingURL=handle_response.js.map