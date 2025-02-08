"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// resend email service
const resend_1 = require("resend");
const env_1 = require("../../utils/env");
const resend = new resend_1.Resend(env_1.RESEND_API_KEY);
exports.default = resend;
