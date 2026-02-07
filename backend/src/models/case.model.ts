import mongoose, { Schema, Document } from "mongoose";

export interface CaseDocument extends Document {
  doctorId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;

  symptoms: string[];
  description: string;

  status: "open";
  createdAt: Date;
}

const CaseSchema = new Schema<CaseDocument>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },

    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    symptoms: {
      type: [String],
      required: true,
      default: [],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["open"],
      default: "open",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const CaseModel = mongoose.model<CaseDocument>("Case", CaseSchema);

export default CaseModel;
