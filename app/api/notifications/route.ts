import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Notification from "@/models/Notification";

export async function GET() {
  await dbConnect();
  const notifications = await Notification.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, notifications });
}
