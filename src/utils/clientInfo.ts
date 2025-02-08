import { Request } from "express";
import { UAParser } from "ua-parser-js";

interface ClientDeviceInfo {
  browser: {
    name?: string;
    version?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
  device: {
    vendor?: string;
    model?: string;
    type?: string;
  };
  ip: string;
}

const getClientInfo = (req: Request): ClientDeviceInfo => {
  const parser = new UAParser(req.headers["user-agent"] || "");

  const browser = parser.getBrowser();
  const os = parser.getOS();
  let device: any = parser.getDevice();

  // If it's Windows, set a default device name
  if (os.name === "Windows" && !device.model) {
    device = {
      vendor: "Microsoft",
      model: "Windows PC",
      type: undefined,
    };
  }

  const clientIp: string =
    (req.headers["x-forwarded-for"] as string) ||
    req.socket.remoteAddress ||
    req.ip ||
    "Unknown";

  return JSON.parse(
    JSON.stringify({
      browser,
      os,
      device,
      ip: clientIp,
    }),
  );
};

export default getClientInfo;
