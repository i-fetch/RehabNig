import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IAssessment extends Document {
  patientId: Types.ObjectId;
  condition: string;
  painLevel: number;
  mobilityNotes: string;
  injuryDate?: Date;
  status: "pending" | "reviewed";
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentSchema = new Schema<IAssessment>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    condition: { type: String, required: true, trim: true },
    painLevel: { type: Number, required: true, min: 0, max: 10 },
    mobilityNotes: { type: String, default: "" },
    injuryDate: { type: Date },
    status: {
      type: String,
      enum: ["pending", "reviewed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Assessment: Model<IAssessment> = mongoose.models.Assessment || mongoose.model<IAssessment>("Assessment", AssessmentSchema);

export default Assessment;
