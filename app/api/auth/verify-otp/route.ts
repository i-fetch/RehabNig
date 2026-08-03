import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, otp } = body;

  if (!email || !otp) {
    return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
  }

  await dbConnect();

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  if (!user.otpCode || !user.otpExpiresAt) {
    return NextResponse.json({ error: "No OTP request found." }, { status: 400 });
  }

  if (user.otpCode !== otp) {
    return NextResponse.json({ error: "Invalid OTP." }, { status: 401 });
  }

  if (user.otpExpiresAt < new Date()) {
    return NextResponse.json({ error: "OTP expired." }, { status: 401 });
  }

  user.emailVerified = true;
  user.otpCode = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  return NextResponse.json({ success: true });
}
