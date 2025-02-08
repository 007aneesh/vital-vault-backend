import dotenv from "dotenv";
import path from "node:path";

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    console.log(`Missing environment variable for ${key}`);
    throw Error(`Missing String environment variable for ${key}`);
  }

  return value;
};

export const NODE_ENV = getEnv("NODE_ENV", "local");
export const PORT = getEnv("PORT", "5000");
export const DATABASE_URL = getEnv("DATABASE_URL");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const FRONTEND_ORIGIN = getEnv("FRONTEND_ORIGIN");
export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
