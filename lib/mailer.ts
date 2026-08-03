import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || "Rehab Nigeria <no-reply@Rehab Nigeria.app>";

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
  throw new Error("Missing SMTP configuration in environment variables.");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function sendOtpEmail(email: string, otp: string) {
  const message = {
    from: EMAIL_FROM,
    to: email,
    subject: "Your Rehab Nigeria verification code",
    text: `Your Rehab Nigeria verification code is ${otp}. It expires in ${10} minutes.`,
    html: `<p>Your Rehab Nigeria verification code is <strong>${otp}</strong>.</p><p>It expires in 10 minutes.</p>`,
  };

  await transporter.sendMail(message);
}
