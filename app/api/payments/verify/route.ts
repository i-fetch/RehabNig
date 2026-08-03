import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Payment from "@/models/Payment";
import Booking from "@/models/Booking";
import Notification from "@/models/Notification";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { reference, status = "success" } = body;

  if (!reference) {
    return NextResponse.json({ error: "Reference is required." }, { status: 400 });
  }

  await dbConnect();
  const payment = await Payment.findOne({ reference });
  if (!payment) {
    return NextResponse.json({ error: "Payment not found." }, { status: 404 });
  }

  payment.status = status === "success" ? "success" : "failed";
  if (status === "success") {
    payment.paidAt = new Date();
  }
  await payment.save();

  if (status === "success") {
    await Booking.findByIdAndUpdate(payment.bookingId, { status: "scheduled" });
    await Notification.create({
      userId: payment.patientId,
      title: "Consultation payment confirmed",
      message: "Your consultation booking is now confirmed.",
      type: "payment",
      read: false,
    });
  }

  return NextResponse.json({ success: true, payment });
}
