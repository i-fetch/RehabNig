import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IBooking extends Document {
  patientId: Types.ObjectId;
  coordinatorId?: Types.ObjectId | null;
  consultationType: "chat" | "voice" | "video" | "physical";
  scheduledDate: Date;
  scheduledTime: string;
  status: "pending_payment" | "scheduled" | "completed" | "cancelled";
  fee: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    coordinatorId: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    consultationType: {
      type: String,
      enum: ["chat", "voice", "video", "physical"],
      required: true,
    },
    scheduledDate: { type: Date, required: true, index: true },
    scheduledTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending_payment", "scheduled", "completed", "cancelled"],
      default: "pending_payment",
    },
    fee: { type: Number, default: 10000 },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ coordinatorId: 1, scheduledDate: 1, scheduledTime: 1 }, { unique: true, sparse: true });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
