"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// resend email service
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
exports.default = resend;
//# sourceMappingURL=email.service.js.map