// nodemailer email service
import { createTransporter } from "../../config/nodemailer.config";

export const transporter = createTransporter();

export default transporter;
