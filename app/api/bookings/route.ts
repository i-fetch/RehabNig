import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
  await dbConnect();
  const bookings = await Booking.find({}).sort({ scheduledDate: 1, scheduledTime: 1 }).lean();
  return NextResponse.json({ success: true, bookings });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { patientId, consultationType, scheduledDate, scheduledTime, fee } = body;

  if (!patientId || !consultationType || !scheduledDate || !scheduledTime) {
    return NextResponse.json({ error: "Missing required booking fields." }, { status: 400 });
  }

  await dbConnect();
  const booking = await Booking.create({
    patientId,
    consultationType,
    scheduledDate: new Date(scheduledDate),
    scheduledTime,
    fee: fee ?? 10000,
  });

  return NextResponse.json({ success: true, booking });
}
