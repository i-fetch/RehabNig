import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    message: "Paystack integration will be wired here.",
    payload: body,
  });
}
