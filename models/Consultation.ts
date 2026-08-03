import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IConsultation extends Document {
  bookingId: Types.ObjectId;
  patientId: Types.ObjectId;
  coordinatorId: Types.ObjectId;
  type: "chat" | "voice" | "video" | "physical";
  notes: string;
  summary: string;
  followUpDate?: Date;
  status: "in_progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<IConsultation>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    coordinatorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: {
      type: String,
      enum: ["chat", "voice", "video", "physical"],
      required: true,
    },
    notes: { type: String, default: "" },
    summary: { type: String, default: "" },
    followUpDate: { type: Date },
    status: {
      type: String,
      enum: ["in_progress", "completed"],
      default: "in_progress",
    },
  },
  {
    timestamps: true,
  }
);

const Consultation: Model<IConsultation> = mongoose.models.Consultation || mongoose.model<IConsultation>("Consultation", ConsultationSchema);

export default Consultation;
