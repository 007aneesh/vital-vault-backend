import resend from "../services/email/email.service";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const getFromEmail = () =>
  process.env.NODE_ENV === "local"
    ? "onboarding@resend.dev"
    : String(process.env.EMAIL_SENDER);

const getToEmail = (to: string) =>
  process.env.NODE_ENV === "local" ? "aneeshx000@gmail.com" : to;

export const sendMail = async ({ to, subject, text, html }: Params) =>
  await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
