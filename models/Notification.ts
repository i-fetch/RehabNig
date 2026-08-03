import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface INotification extends Document {
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: "booking" | "payment" | "reminder" | "system";
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["booking", "payment", "reminder", "system"],
      default: "system",
    },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
