"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const email_service_1 = __importDefault(require("../services/email/email.service"));
const getFromEmail = () => process.env.NODE_ENV === "local"
    ? "onboarding@resend.dev"
    : String(process.env.EMAIL_SENDER);
const getToEmail = (to) => process.env.NODE_ENV === "local" ? "aneeshx000@gmail.com" : to;
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, text, html }) {
    return yield email_service_1.default.emails.send({
        from: getFromEmail(),
        to: getToEmail(to),
        subject,
        text,
        html,
    });
});
exports.sendMail = sendMail;
//# sourceMappingURL=send_mail.js.map