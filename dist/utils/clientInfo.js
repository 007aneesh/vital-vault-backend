"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ua_parser_js_1 = require("ua-parser-js");
const getClientInfo = (req) => {
    const parser = new ua_parser_js_1.UAParser(req.headers["user-agent"] || "");
    const browser = parser.getBrowser();
    const os = parser.getOS();
    let device = parser.getDevice();
    // If it's Windows, set a default device name
    if (os.name === "Windows" && !device.model) {
        device = {
            vendor: "Microsoft",
            model: "Windows PC",
            type: undefined,
        };
    }
    const clientIp = req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        req.ip ||
        "Unknown";
    return JSON.parse(JSON.stringify({
        browser,
        os,
        device,
        ip: clientIp,
    }));
};
exports.default = getClientInfo;
