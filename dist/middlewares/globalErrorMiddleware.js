"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const handle_response_1 = require("../utils/handle_response");
const globalErrorHandler = (err, req, res, next) => {
    if (!err) {
        return next();
    }
    console.log("Global Error Handler", err);
    if (err instanceof appError_1.default) {
        return (0, handle_response_1.sendError)(res, err.message, err.statusCode);
    }
    return (0, handle_response_1.sendError)(res, "Something went wrong", 500);
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=globalErrorMiddleware.js.map