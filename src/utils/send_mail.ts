import resend from "../services/email/email.service";
import { EMAIL_SENDER, NODE_ENV } from "./env";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const getFromEmail = () =>
  NODE_ENV === "local" ? "onboarding@resend.dev" : EMAIL_SENDER;

const getToEmail = (to: string) =>
  NODE_ENV === "local" ? "aneeshx000@gmail.com" : to;

export const sendMail = async ({ to, subject, text, html }: Params) =>
  await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
