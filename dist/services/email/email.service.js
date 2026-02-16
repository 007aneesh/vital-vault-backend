"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
// nodemailer email service
const nodemailer_config_1 = require("../../config/nodemailer.config");
exports.transporter = (0, nodemailer_config_1.createTransporter)();
exports.default = exports.transporter;
//# sourceMappingURL=email.service.js.map