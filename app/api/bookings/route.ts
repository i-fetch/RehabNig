import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, message: "Bookings API scaffold" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: "Booking creation scaffold", body });
}
