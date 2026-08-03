import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Payment from "@/models/Payment";
import { FLAT_CONSULTATION_FEE_NGN } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { bookingId, patientId } = body;

  if (!bookingId || !patientId) {
    return NextResponse.json({ error: "Booking and patient are required." }, { status: 400 });
  }

  await dbConnect();
  const reference = `rehab-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const payment = await Payment.create({
    bookingId,
    patientId,
    amount: FLAT_CONSULTATION_FEE_NGN,
    currency: "NGN",
    reference,
    status: "pending",
  });

  return NextResponse.json({
    success: true,
    payment,
    checkoutUrl: `/patient/book/pay?reference=${reference}`,
  });
}
