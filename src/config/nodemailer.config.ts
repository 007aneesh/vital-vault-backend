import nodemailer from "nodemailer";

export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aneeshx000@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });
};
