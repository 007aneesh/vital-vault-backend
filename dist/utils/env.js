"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESEND_API_KEY = exports.EMAIL_SENDER = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.FRONTEND_ORIGIN = exports.APP_ORIGIN = exports.DATABASE_URL = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw Error(`Missing String environment variable for ${key}`);
    }
    return value;
};
exports.NODE_ENV = getEnv("NODE_ENV", "local");
exports.PORT = getEnv("PORT", "5000");
exports.DATABASE_URL = getEnv("DATABASE_URL");
exports.APP_ORIGIN = getEnv("APP_ORIGIN");
exports.FRONTEND_ORIGIN = getEnv("FRONTEND_ORIGIN");
exports.ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
exports.REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");
exports.EMAIL_SENDER = getEnv("EMAIL_SENDER");
exports.RESEND_API_KEY = getEnv("RESEND_API_KEY");
