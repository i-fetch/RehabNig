import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { sendOtpEmail } from "@/lib/mailer";
import { OTP_EXPIRY_MINUTES } from "@/lib/constants";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, password, role } = body;

  if (!name || !email || !phone || !password) {
    return NextResponse.json({ error: "Missing required registration fields." }, { status: 400 });
  }

  await dbConnect();

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const otpCode = generateOtp();
  const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const user = new User({
    name,
    email: email.toLowerCase(),
    phone,
    passwordHash,
    role: role || "patient",
    otpCode,
    otpExpiresAt,
  });

  await user.save();

  try {
    await sendOtpEmail(user.email, otpCode);
  } catch (error) {
    console.warn("OTP email delivery failed, but registration succeeded:", error);
  }

  return NextResponse.json({ success: true, email: user.email });
}
