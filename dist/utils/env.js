"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = (key, default_value) => {
    const value = process.env[key] || default_value;
    if (value === undefined) {
        console.warn(`Missing environment variable for ${key}. Using default value: ${default_value}`);
        return default_value || "";
    }
    return String(value);
};
