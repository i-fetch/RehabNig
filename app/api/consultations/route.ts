import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Consultation from "@/models/Consultation";

export async function GET() {
  await dbConnect();
  const consultations = await Consultation.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, consultations });
}
