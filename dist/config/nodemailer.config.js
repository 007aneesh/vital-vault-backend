"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const createTransporter = () => {
    return nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "aneeshx000@gmail.com",
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });
};
exports.createTransporter = createTransporter;
//# sourceMappingURL=nodemailer.config.js.map