import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER || process.env.SMTP_USERNAME;
  const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

export async function sendOtpEmail(email: string, otp: string) {
  const activeTransport = getTransporter();
  if (!activeTransport) {
    console.warn("SMTP configuration missing; skipping OTP email delivery.");
    return { success: false, reason: "smtp-unconfigured" };
  }

  const message = {
    from: process.env.SMTP_FROM || process.env.EMAIL_FROM || "Rehab Nigeria <noreply@rehabconnect.app>",
    to: email,
    subject: "Your Rehab Nigeria verification code",
    text: `Your Rehab Nigeria verification code is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your Rehab Nigeria verification code is <strong>${otp}</strong>.</p><p>It expires in 10 minutes.</p>`,
  };

  await activeTransport.sendMail(message);
  return { success: true };
}
