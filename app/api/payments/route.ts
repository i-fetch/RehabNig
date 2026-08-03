import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Payment from "@/models/Payment";

export async function GET() {
  await dbConnect();
  const payments = await Payment.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, payments });
}
