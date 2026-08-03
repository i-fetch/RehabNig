import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Assessment from "@/models/Assessment";

export async function GET() {
  await dbConnect();
  const assessments = await Assessment.find({}).sort({ createdAt: -1 }).limit(20).lean();
  return NextResponse.json({ success: true, assessments });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { patientId, condition, painLevel, mobilityNotes, injuryDate } = body;

  if (!patientId || !condition || painLevel === undefined) {
    return NextResponse.json({ error: "Missing required assessment fields." }, { status: 400 });
  }

  await dbConnect();
  const assessment = await Assessment.create({
    patientId,
    condition,
    painLevel,
    mobilityNotes: mobilityNotes || "",
    injuryDate: injuryDate ? new Date(injuryDate) : undefined,
  });

  return NextResponse.json({ success: true, assessment });
}
