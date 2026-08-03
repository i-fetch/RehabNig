import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IPayment extends Document {
  bookingId: Types.ObjectId;
  patientId: Types.ObjectId;
  amount: number;
  currency: "NGN";
  reference: string;
  status: "pending" | "success" | "failed";
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, enum: ["NGN"], default: "NGN" },
    reference: { type: String, required: true, unique: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
